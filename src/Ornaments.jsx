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
