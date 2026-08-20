// Sistema de diseño de la versión 2.
// Geometría en pulgadas; color en una paleta natural apagada, no saturada.

export const GEO = {
  trimW: 5,          // pulgadas
  trimH: 7,
  bleed: 0.125,      // 3.175 mm por lado
  safe: 0.25,        // margen de seguridad desde el corte
  artRatio: 0.665,   // porción de la altura que ocupa la ilustración
};

export const C = {
  // Papel y tinta
  paper:      '#F7F1E5',
  paperWarm:  '#F1E8D8',
  paperDeep:  '#E8DCC6',
  ink:        '#241F19',
  inkSoft:    '#6A5F51',
  inkFaint:   '#9C8F7C',
  rule:       '#CFC2A9',

  // Acentos de la colección
  terracota:  '#A8503A',
  terracotaL: '#C4704F',
  ocre:       '#C08A3E',
  verde:      '#2C5344',
  verdeMedio: '#3E6B54',
  verdeSalvia:'#7D9A83',
  azulNiebla: '#8AA4B4',
  azulNoche:  '#22384B',
};

// Etapas del viaje de treinta días.
export const ETAPAS = [
  { id: 'aterrizar',  nombre: 'Aterrizar',      dias: [1, 6],   color: C.terracota },
  { id: 'ordenar',    nombre: 'Ordenar',        dias: [7, 12],  color: C.ocre },
  { id: 'reconstruir',nombre: 'Reconstruir',    dias: [13, 18], color: C.verde },
  { id: 'avanzar',    nombre: 'Avanzar',        dias: [19, 24], color: C.azulNiebla },
  { id: 'construir',  nombre: 'Construir',      dias: [25, 29], color: C.verdeMedio },
  { id: 'comienzo',   nombre: 'Nuevo comienzo', dias: [30, 30], color: C.terracota },
];

export const etapaDe = (dia) =>
  ETAPAS.find((e) => dia >= e.dias[0] && dia <= e.dias[1]) || ETAPAS[0];
