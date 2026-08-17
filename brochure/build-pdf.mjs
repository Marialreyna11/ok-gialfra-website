/**
 * Renders brochure/index.html to a print-ready A4 PDF plus one PNG per page
 * for on-screen review.
 *
 * Run:  node brochure/build-pdf.mjs
 * Out:  brochure/OK-GIALFRA-Brochure-Corporativo.pdf
 *       brochure/preview/page-1.png … page-8.png
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SRC = path.join(__dirname, 'index.html')
const PDF = path.join(__dirname, 'OK-GIALFRA-Brochure-Corporativo.pdf')
const PREVIEW = path.join(__dirname, 'preview')
const CHROME = '/opt/pw-browsers/chromium'

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

await page.pdf({
  path: PDF,
  format: 'A4',
  printBackground: true,
  preferCSSPageSize: true,
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
})

// Per-page PNGs, captured from the on-screen stack.
const count = await page.evaluate(() => document.querySelectorAll('.page').length)
for (let i = 0; i < count; i++) {
  const el = page.locator('.page').nth(i)
  await el.screenshot({ path: path.join(PREVIEW, `page-${i + 1}.png`) })
}

await browser.close()

const kb = (fs.statSync(PDF).size / 1024 / 1024).toFixed(2)
console.log(`PDF      ${path.relative(process.cwd(), PDF)}  (${count} pages, ${kb} MB)`)
console.log(`Preview  ${path.relative(process.cwd(), PREVIEW)}/page-1..${count}.png`)
