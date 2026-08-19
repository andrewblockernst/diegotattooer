/* Ornamento dibujado en la gramática del flash de Diego: línea de peso único, formas
   cerradas, nada de degradés. Hereda el color por currentColor, así que la misma pieza
   sirve como filete de catálogo y como marca de lámina reservada. */

export function Rule({ className = '', flourish = true }) {
  return (
    <svg
      className={`rule ${className}`}
      viewBox="0 0 600 16"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <line x1="0" y1="5" x2="600" y2="5" strokeWidth="2" />
      <line x1="0" y1="11" x2="600" y2="11" strokeWidth="0.75" />
      {flourish && (
        <g>
          <rect x="292" y="2" width="12" height="12" transform="rotate(45 298 8)" fill="currentColor" stroke="none" />
          <line x1="270" y1="8" x2="286" y2="8" strokeWidth="2" />
          <line x1="310" y1="8" x2="326" y2="8" strokeWidth="2" />
        </g>
      )}
    </svg>
  )
}

export function Anchor(props) {
  return (
    <svg viewBox="0 0 100 120" aria-hidden="true" focusable="false" {...props}>
      <g fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="50" cy="15" r="9" />
        <line x1="50" y1="24" x2="50" y2="104" />
        <line x1="22" y1="40" x2="78" y2="40" />
        <line x1="22" y1="34" x2="22" y2="46" />
        <line x1="78" y1="34" x2="78" y2="46" />
        <path d="M16,70 C16,94 31,108 50,108 C69,108 84,94 84,70" />
      </g>
      <path d="M16,70 L6,62 L10,80 Z" fill="currentColor" />
      <path d="M84,70 L94,62 L90,80 Z" fill="currentColor" />
    </svg>
  )
}

export function Dagger(props) {
  return (
    <svg viewBox="0 0 60 120" aria-hidden="true" focusable="false" {...props}>
      <g fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M30,6 L40,74 L20,74 Z" />
        <path d="M8,79 L52,79 L48,89 L12,89 Z" />
        <line x1="30" y1="89" x2="30" y2="106" />
        <circle cx="30" cy="112" r="6" />
      </g>
      <line x1="30" y1="20" x2="30" y2="70" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

/* Sello de goma para el pedido enviado. */
export function Stamp(props) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" focusable="false" {...props}>
      <circle cx="100" cy="100" r="92" fill="none" stroke="currentColor" strokeWidth="6" />
      <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="2" />
      <text className="stamp-word" x="100" y="80" textAnchor="middle">PEDIDO</text>
      <text className="stamp-word" x="100" y="136" textAnchor="middle">RECIBIDO</text>
      <line x1="34" y1="100" x2="60" y2="100" stroke="currentColor" strokeWidth="4" />
      <line x1="140" y1="100" x2="166" y2="100" stroke="currentColor" strokeWidth="4" />
    </svg>
  )
}

export function ArrowDown(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...props}>
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="4" x2="12" y2="20" />
        <polyline points="5 13 12 20 19 13" />
      </g>
    </svg>
  )
}

/* Pared de flash: los mismos motivos de línea que marcan las láminas reservadas
   (ancla, daga) más otros clásicos de flash tradicional (golondrina, faro,
   herradura), sembrados como una lámina de flash colgada detrás del catálogo.
   Un solo <pattern> que repite un mosaico de 300px; el trazo es hairline vía
   vector-effect (ver .flash-field), así que cada motivo tiene el mismo peso de
   línea sin importar a qué escala se coloca. Fijo y traslúcido: las placas del
   catálogo pasan por delante como recortes sobre la pared. */
export function FlashField(props) {
  return (
    <svg className="flash-field" aria-hidden="true" focusable="false" {...props}>
      <defs>
        <pattern
          id="flash-tile"
          width="300"
          height="300"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(-8 150 150)"
        >
          <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            {/* Ancla */}
            <g transform="translate(30 34) scale(0.44)">
              <circle cx="50" cy="15" r="9" />
              <line x1="50" y1="24" x2="50" y2="104" />
              <line x1="22" y1="40" x2="78" y2="40" />
              <line x1="22" y1="34" x2="22" y2="46" />
              <line x1="78" y1="34" x2="78" y2="46" />
              <path d="M16,70 C16,94 31,108 50,108 C69,108 84,94 84,70" />
              <path d="M16,70 L6,62 L10,80 Z" />
              <path d="M84,70 L94,62 L90,80 Z" />
            </g>
            {/* Daga */}
            <g transform="translate(214 26) rotate(9) scale(0.42)">
              <path d="M30,6 L40,74 L20,74 Z" />
              <path d="M8,79 L52,79 L48,89 L12,89 Z" />
              <line x1="30" y1="89" x2="30" y2="106" />
              <circle cx="30" cy="112" r="6" />
              <line x1="30" y1="20" x2="30" y2="70" />
            </g>
            {/* Herradura */}
            <g transform="translate(126 118) rotate(-6) scale(1.9)">
              <path d="M6.5,21 L6.5,11 A5.5,5.5 0 0,1 17.5,11 L17.5,21" />
              <circle cx="6.5" cy="19.5" r="0.8" />
              <circle cx="17.5" cy="19.5" r="0.8" />
            </g>
            {/* Golondrina verdadera */}
            <g transform="translate(15 195) scale(0.95) rotate(8)">
              <circle cx="30" cy="6" r="2.5" />
              <path d="M30,8 L30,16" />
              <path d="M30,10 Q16,5 3,17" />
              <path d="M30,10 Q44,5 57,17" />
              <path d="M30,16 L23,29" />
              <path d="M30,16 L37,29" />
            </g>
            {/* Faro */}
            <g transform="translate(210 194) rotate(4) scale(1)">
              <path d="M7,44 L9.5,17 L14.5,17 L17,44 Z" />
              <path d="M9.5,17 L10,11 L14,11 L14.5,17" />
              <path d="M9,11 L12,6.5 L15,11 Z" />
              <circle cx="12" cy="5" r="1" />
              <path d="M8.7,26 L15.3,26 M8.2,34 L15.8,34" />
              <path d="M15.6,13 L21,10.5 M8.4,13 L3,10.5" />
              <path d="M5,44 L19,44" />
            </g>
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#flash-tile)" />
    </svg>
  )
}
