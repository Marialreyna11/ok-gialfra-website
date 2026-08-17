/**
 * Renders brochure/index.html to A4 PDFs plus one PNG per page for review.
 *
 * Two editions come out of the same source. They are identical in layout and
 * text; only the resolution of the embedded photography differs.
 *
 *   …-Corporativo.pdf   ~230 dpi imagery — printing, and client hand-off
 *   …-Web.pdf           ~110 dpi imagery — e-mail, RFQ and vendor portals
 *
 * Run:  node brochure/build-pdf.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SRC = path.join(__dirname, 'index.html')
const PREVIEW = path.join(__dirname, 'preview')
const CHROME = '/opt/pw-browsers/chromium'

const EDITIONS = [
  { set: 'print', file: 'OK-GIALFRA-Brochure-Corporativo.pdf', preview: true },
  { set: 'web', file: 'OK-GIALFRA-Brochure-Web.pdf', preview: false },
]

// A4 at 96 CSS dpi. Page PNGs are captured at 2x for a crisp review copy.
const PAGE_W = 794
const PAGE_H = 1123
const SCALE = 2

fs.mkdirSync(PREVIEW, { recursive: true })

const browser = await chromium.launch({ executablePath: CHROME })
const page = await browser.newPage({
  viewport: { width: PAGE_W, height: PAGE_H },
  deviceScaleFactor: SCALE,
})

const errors = []
page.on('pageerror', (e) => errors.push(String(e)))
page.on('requestfailed', (r) => errors.push(`${r.failure()?.errorText} ${r.url()}`))

await page.goto(`file://${SRC}`, { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)
await page.waitForTimeout(400)

// Fail loudly rather than shipping a PDF with a missing photo or font.
if (errors.length) {
  console.error('Page errors:\n  ' + errors.join('\n  '))
  await browser.close()
  process.exit(1)
}

// Guard against content spilling past the bottom of a page. Horizontal
// overflow is ignored on purpose: several pages bleed artwork past the trim
// and rely on the page's own overflow:hidden to clip it.
const overflow = await page.evaluate(() => {
  const out = []
  document.querySelectorAll('.page').forEach((el, i) => {
    if (el.scrollHeight > el.clientHeight + 1) {
      out.push(`page ${i + 1}: content is ${el.scrollHeight - el.clientHeight}px taller than the page`)
    }
  })
  return out
})
if (overflow.length) console.warn('⚠ Overflow detected:\n  ' + overflow.join('\n  '))

const count = await page.evaluate(() => document.querySelectorAll('.page').length)

for (const ed of EDITIONS) {
  // The markup ships pointing at the print set; the web edition just repoints
  // each <img> at its lower-resolution twin, so both stay pixel-identical in
  // layout and can never drift apart.
  const swapped = await page.evaluate((set) => {
    let n = 0
    document.querySelectorAll('img[src*="assets/img/"]').forEach((img) => {
      const next = img.getAttribute('src').replace(/assets\/img\/[^/]+\//, `assets/img/${set}/`)
      if (next !== img.getAttribute('src')) {
        img.setAttribute('src', next)
        n++
      }
    })
    return n
  }, ed.set)

  await page.evaluate(() =>
    Promise.all([...document.images].filter((i) => !i.complete).map((i) => i.decode().catch(() => {})))
  )
  await page.waitForTimeout(250)

  const broken = await page.evaluate(() =>
    [...document.images].filter((i) => !i.naturalWidth).map((i) => i.getAttribute('src'))
  )
  if (broken.length) {
    console.error(`Missing images in the "${ed.set}" set:\n  ` + broken.join('\n  '))
    await browser.close()
    process.exit(1)
  }

  const out = path.join(__dirname, ed.file)
  await page.pdf({
    path: out,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  })

  if (ed.preview) {
    for (let i = 0; i < count; i++) {
      await page.locator('.page').nth(i).screenshot({ path: path.join(PREVIEW, `page-${i + 1}.png`) })
    }
  }

  const mb = (fs.statSync(out).size / 1024 / 1024).toFixed(2)
  console.log(`${ed.set.padEnd(5)}  ${ed.file}  (${count} pages, ${mb} MB, ${swapped} images)`)
}

await browser.close()
console.log(`preview  ${path.relative(process.cwd(), PREVIEW)}/page-1..${count}.png`)
