import { useEffect, useRef, useState } from 'react'
import { Rule, Anchor, Dagger, Stamp, ArrowDown } from './Ornaments.jsx'
import Admin from './Admin.jsx'

/* ───────────────────────────────────────────────────────────────────────────
   MATERIAL DEL CATÁLOGO

   Todo lo que está acá es real y verificable en las fotos del estudio.
   Lo que falta va como PENDIENTE, nunca como texto plausible inventado.
   ─────────────────────────────────────────────────────────────────────────── */

const LAMINAS = [
  {
    n: '01',
    titulo: 'Rosas, ancla y víbora',
    tecnica: 'Flash pintado a mano',
    año: '2020',
    src: '/estudio/flash-2020.webp',
    alt: 'Lámina de flash pintada a mano por Diego: un ancla envuelta en una rosa roja y una víbora entre dos rosas, firmada y fechada 2020.',
    ancho: true,
  },
  {
    n: '02',
    titulo: 'Pantera',
    tecnica: 'Flash pintado a mano',
    año: '2020',
    src: '/estudio/flash-pantera.webp',
    alt: 'Lámina de flash pintada a mano por Diego: cabeza de pantera negra rugiendo, ojos amarillos, firmada y fechada 2020.',
  },
  {
    n: '03',
    titulo: '¡Bang!',
    tecnica: 'Flash pintado a mano',
    año: '2020',
    src: '/estudio/flash-bang.webp',
    alt: 'Lámina de flash pintada a mano por Diego: una muerte encapuchada disparando un revólver, con la palabra ¡BANG!, firmada y fechada 2020.',
  },
  { n: '04', motivo: 'anchor' },
  { n: '05', motivo: 'dagger' },
]

const ESTUDIO = [
  {
    src: '/estudio/estudio-04.webp',
    alt: 'Vista general del estudio: Diego sentado tatuando el brazo de un cliente que mira su teléfono, con la camilla, las paredes de autos a escala y los carteles.',
    pie: 'El estudio entero: la camilla, el puesto de trabajo y la colección.',
    ficha: 'Vista general',
    ancho: true,
  },
  {
    src: '/estudio/estudio-06.webp',
    alt: 'Primer plano de Diego tatuando: guantes negros, máquina en mano, tintas rotuladas en el estante.',
    pie: 'Guante puesto, máquina envuelta, tintas rotuladas.',
    ficha: 'La mano trabajando',
  },
  {
    src: '/estudio/estudio-09.webp',
    alt: 'La camilla de tatuaje vacía, envuelta en film protector, con el apoyabrazos también forrado y el rollo de papel al lado.',
    pie: 'Camilla y apoyabrazos forrados antes de cada sesión. Barrera descartable, no decorado.',
    ficha: 'Estación preparada',
  },
  {
    src: '/estudio/estudio-03.webp',
    alt: 'Pared del estudio con láminas de flash enmarcadas arriba y vitrinas de autos a escala en celdas numeradas abajo.',
    pie: 'Arriba las láminas, abajo las celdas. La grilla de este catálogo salió de esta pared.',
    ficha: 'Pared de láminas',
  },
  {
    src: '/estudio/estudio-01.webp',
    alt: 'Rincón de trabajo: estantes con autos a escala, tintas, frascos de pigmento y tres flash pintados por Diego colgados en la pared.',
    pie: 'El rincón donde se pinta. Las tres láminas de arriba son las N.º 01, 02 y 03.',
    ficha: 'Rincón de pintura',
  },
]

const PASOS = [
  {
    n: 'I',
    titulo: 'Escribís por Instagram',
    texto:
      'Mandás un mensaje directo contando tu idea, tamaño aproximado y zona del cuerpo. Si tenés referencias, sumalas.',
  },
  {
    n: 'II',
    titulo: 'Diego lo lee y contesta',
    texto:
      'Te dice si entra en lo que hace, cómo lo llevaría a su lenguaje y qué más necesita saber. Todo por DM.',
  },
  {
    n: 'III',
    titulo: 'Recién ahí hay fecha',
    texto:
      'El turno queda firme cuando él te lo confirma por mensaje. Mientras tanto es sólo una charla.',
  },
]

/* ─────────────────────────────────────────────────────────────────────────── */

/** Marca visible para todo dato que el usuario todavía no proveyó. */
function Pendiente({ children, nota }) {
  return (
    <span className="pendiente" title={nota}>
      {children}
      <span className="pendiente__marca" aria-label="dato pendiente de confirmar">
        pendiente
      </span>
    </span>
  )
}

/** Revela un elemento cuando entra en pantalla. Respeta prefers-reduced-motion. */
function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-in')
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
    )
    for (const child of el.querySelectorAll('[data-reveal]')) io.observe(child)
    return () => io.disconnect()
  }, [])
  return ref
}

function Motivo({ nombre, className }) {
  if (nombre === 'dagger') return <Dagger className={className} />
  return <Anchor className={className} />
}

/* ─── Tapa ────────────────────────────────────────────────────────────────── */

function Tapa() {
  return (
    <header className="tapa" id="tapa">
      <div className="tapa__marco">
        <h1 className="mastil" aria-label="diegotattooer">
          <span aria-hidden="true">Diego</span>
          <span aria-hidden="true">Tattooer</span>
        </h1>
        <Rule className="mastil__filete" />
        {/* BOTÓN DE PEDIR TURNO EN LA TAPA:
            Este es un enlace (anchor link) que dirige al usuario a la sección
            con el ID "turno", donde se encuentra el formulario.
        <a className="boton boton--grande" href="#turno">
          Pedí tu turno
        </a>
        */}
        <div className="tapa__scroll-indicador" aria-hidden="true">
          <ArrowDown />
        </div>
      </div>
    </header>
  )
}

function AvatarIG({ className = '' }) {
  return (
    <a 
      className={`ig-avatar ${className}`} 
      href="https://www.instagram.com/diegotattooer?igsh=dGVuem84ZWZ3emw1"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram de Diego Tattooer"
    >
      <div className="ig-avatar__border">
        <img src="/logo/diegotattooer.jpg" alt="Avatar IG de Diego" />
      </div>
      <span>@diegotattooer</span>
    </a>
  )
}

/* ─── Barra de índice ─────────────────────────────────────────────────────── */

function Indice() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.85)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`indice ${visible ? 'is-visible' : ''}`} aria-label="Índice del catálogo">
      <a className="indice__mastil" href="#tapa">
        diegotattooer
      </a>
      <ol className="indice__lista">
        <li><a href="#laminas">Láminas</a></li>
        <li><a href="#estudio">El estudio</a></li>
        <li><a href="#pedido">Cómo se pide</a></li>
      </ol>
      {/* BOTÓN CTA DEL ÍNDICE:
          Aparece en la barra de navegación pegajosa cuando se hace scroll,
          y también lleva al formulario de turno. 
      <a className="indice__cta" href="#turno">
        Pedir turno
      </a>
      */}
      <AvatarIG className="indice__ig-avatar" />
    </nav>
  )
}

/* ─── Láminas ─────────────────────────────────────────────────────────────── */

function Laminas() {
  const ref = useReveal()
  return (
    <section className="seccion seccion--laminas" id="laminas" ref={ref}>
      <SeccionTitulo n="I" titulo="Láminas" />
      <p className="seccion__intro" data-reveal>
        El catálogo se está imprimiendo. Las tres primeras láminas son flash pintado a
        mano por Diego y colgado en la pared del estudio. Las celdas vacías esperan las
        fotos de los tatuajes terminados.
      </p>

      <ol className="grilla">
        {LAMINAS.map((l) => (
          <li
            key={l.n}
            className={`celda ${l.ancho ? 'celda--ancha' : ''} ${l.src ? '' : 'celda--reservada'}`}
            data-reveal
          >
            {l.src ? (
              <figure className="celda__fig">
                <div className="placa placa--obra">
                  <img src={l.src} alt={l.alt} loading="lazy" decoding="async" />
                </div>
                <figcaption className="ficha">
                  <span className="ficha__n">Lám. {l.n}</span>
                  <span className="ficha__t">{l.titulo}</span>
                  <span className="ficha__d">
                    {l.tecnica} · {l.año}
                  </span>
                </figcaption>
              </figure>
            ) : (
              <div className="reservada">
                <div className="reservada__marco">
                  <Motivo nombre={l.motivo} className="reservada__motivo" />
                </div>
                <p className="ficha">
                  <span className="ficha__n">Lám. {l.n}</span>
                  <span className="ficha__t">Reservada</span>
                  <span className="ficha__d">Foto pendiente</span>
                </p>
              </div>
            )}
          </li>
        ))}
      </ol>
    </section>
  )
}

/* ─── La mano (campo rojo) ────────────────────────────────────────────────── */

function LaMano() {
  const ref = useReveal()
  return (
    <section className="seccion seccion--mano" id="mano" ref={ref} aria-labelledby="mano-t">
      <div className="mano__grid">
        <div className="mano__texto" data-reveal>
          <h2 id="mano-t" className="titular titular--claro">
            El que dibuja es el que tatúa
          </h2>
          <Rule className="filete filete--claro" />
          <p>
            Las láminas de la sección anterior no son descargas ni plantillas compradas.
            Están pintadas a mano, firmadas y fechadas, y cuelgan en la pared a un metro
            de la camilla.
          </p>
          <p>
            Eso es lo que hay que mirar antes de elegir un tatuador: si la línea que ves
            en la pared es la misma línea que va a quedar en tu piel.
          </p>
        </div>

        <figure className="mano__fig" data-reveal>
          <div className="placa placa--oscura">
            <img
              src="/estudio/estudio-06.webp"
              alt="Primer plano de Diego tatuando el brazo de un cliente: guantes negros, máquina en mano, y el estante con tintas rotuladas."
              loading="lazy"
              decoding="async"
            />
          </div>
          <figcaption className="ficha ficha--clara">
            <span className="ficha__n">Fot. A</span>
            <span className="ficha__t">Sesión en curso</span>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}

/* ─── El estudio ──────────────────────────────────────────────────────────── */

function ElEstudio() {
  const ref = useReveal()
  return (
    <section className="seccion seccion--estudio" id="estudio" ref={ref}>
      <SeccionTitulo n="III" titulo="El estudio" />
      <p className="seccion__intro" data-reveal>
        Acá tatúa Diego. Madera, colección y material descartable. Estas fotos son del
        lugar tal como está, sin ordenarlo para la ocasión.
      </p>

      <div className="estudio__grid">
        {ESTUDIO.map((f) => (
          <figure
            key={f.src}
            className={`estudio__item ${f.ancho ? 'estudio__item--ancho' : ''}`}
            data-reveal
          >
            <div className="placa">
              <img src={f.src} alt={f.alt} loading="lazy" decoding="async" />
            </div>
            <figcaption className="ficha">
              <span className="ficha__t">{f.ficha}</span>
              <span className="ficha__pie">{f.pie}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

/* ─── Cómo se pide ────────────────────────────────────────────────────────── */

function ComoSePide() {
  const ref = useReveal()
  return (
    <section className="seccion seccion--pedido" id="pedido" ref={ref}>
      <SeccionTitulo n="IV" titulo="Cómo se pide" />
      <ol className="pasos">
        {PASOS.map((p) => (
          <li className="paso" key={p.n} data-reveal>
            <span className="paso__n">{p.n}</span>
            <div className="paso__cuerpo">
              <h3 className="paso__titulo">{p.titulo}</h3>
              <p>{p.texto}</p>
            </div>
          </li>
        ))}
      </ol>
      <div style={{ marginTop: '3rem', textAlign: 'center' }} data-reveal>
        <a 
          className="boton boton--grande" 
          href="https://www.instagram.com/diegotattooer?igsh=dGVuem84ZWZ3emw1"
          target="_blank"
          rel="noopener noreferrer"
        >
          Escribir por Instagram
        </a>
      </div>
    </section>
  )
}

/* ─── Pedir turno ─────────────────────────────────────────────────────────── */

const CAMPOS_INICIALES = {
  nombre: '',
  contacto: '',
  idea: '',
  tamaño: '',
  zona: '',
  referencias: '',
  disponibilidad: '',
}

function PedirTurno() {
  const [campos, setCampos] = useState(CAMPOS_INICIALES)
  const [errores, setErrores] = useState({})
  const [enviado, setEnviado] = useState(false)
  const resumenRef = useRef(null)

  const set = (k) => (e) => setCampos((c) => ({ ...c, [k]: e.target.value }))

  /* Lógica de validación del formulario de turnos */
  function validar() {
    const err = {}
    if (!campos.nombre.trim()) err.nombre = 'Poné tu nombre.'
    if (!campos.contacto.trim()) err.contacto = 'Sin esto Diego no te puede contestar.'
    if (campos.idea.trim().length < 12)
      err.idea = 'Contá un poco más: dos renglones alcanzan.'
    if (!campos.zona.trim()) err.zona = 'Decí en qué parte del cuerpo va.'
    return err
  }

  /* Manejador del evento Submit del formulario */
  function onSubmit(e) {
    e.preventDefault()
    const err = validar()
    setErrores(err)
    if (Object.keys(err).length > 0) {
      const primero = document.getElementById(`c-${Object.keys(err)[0]}`)
      primero?.focus()
      return
    }
    // ponytail: el envío real se conecta en la etapa de lógica.
    // Único punto de integración: acá va el insert a Supabase.
    setEnviado(true)
  }

  useEffect(() => {
    if (enviado) resumenRef.current?.focus()
  }, [enviado])

  /* Vista de éxito tras enviar el formulario */
  if (enviado) {
    return (
      <section className="seccion seccion--pedido" id="turno">
        <div className="pedido pedido--recibido" tabIndex={-1} ref={resumenRef}>
          <Stamp className="pedido__sello" />
          <h2 className="titular">Listo, {campos.nombre.trim().split(' ')[0]}</h2>
          <Rule className="filete" />
          <p>
            Tu pedido quedó anotado. Diego lo lee y te contesta por donde nos dejaste el
            contacto.
          </p>
          <p className="aviso aviso--chico">
            <strong>Todavía no hay fecha.</strong> El turno existe cuando él te lo
            confirma.
          </p>
          <p className="marcador">
            Demo: el envío todavía no está conectado. Este pedido no salió a ningún lado.
          </p>
          <button
            type="button"
            className="boton boton--fantasma"
            onClick={() => {
              setCampos(CAMPOS_INICIALES)
              setEnviado(false)
            }}
          >
            Cargar otro pedido
          </button>
        </div>
      </section>
    )
  }

  /* EL FORMULARIO DE TURNO:
     Este es el formulario principal que el usuario llena para enviar un pedido.
     Utiliza el evento onSubmit definido más arriba. */
  return (
    <section className="seccion seccion--pedido" id="turno">
      <form className="pedido" onSubmit={onSubmit} noValidate>
        <div className="pedido__cabecera">
          <h2 className="titular">Pedir turno</h2>
          <Rule className="filete" />
          <p className="pedido__nota">
            Recortá y mandá. Lo lee Diego, no un sistema. Contestar puede tardar unos
            días.
          </p>
        </div>

        <div className="pedido__campos">
          {/* Los campos del formulario, manejados por el estado local de React */}
          <Campo
            id="c-nombre"
            etiqueta="Nombre"
            valor={campos.nombre}
            onChange={set('nombre')}
            error={errores.nombre}
            autoComplete="name"
          />
          <Campo
            id="c-contacto"
            etiqueta="Dónde te escribimos"
            ayuda="Instagram, WhatsApp o mail"
            valor={campos.contacto}
            onChange={set('contacto')}
            error={errores.contacto}
          />
          <Campo
            id="c-idea"
            etiqueta="La idea"
            ayuda="Qué querés tatuarte y por qué, si viene al caso"
            valor={campos.idea}
            onChange={set('idea')}
            error={errores.idea}
            multilinea
            ancho
          />
          <Campo
            id="c-tamaño"
            etiqueta="Tamaño aproximado"
            ayuda="En centímetros, o comparado con algo"
            valor={campos.tamaño}
            onChange={set('tamaño')}
          />
          <Campo
            id="c-zona"
            etiqueta="Zona del cuerpo"
            valor={campos.zona}
            onChange={set('zona')}
            error={errores.zona}
          />
          <Campo
            id="c-referencias"
            etiqueta="Referencias"
            ayuda="Link a fotos o a un tablero, si tenés"
            valor={campos.referencias}
            onChange={set('referencias')}
            ancho
          />
          <Campo
            id="c-disponibilidad"
            etiqueta="Cuándo podés"
            ayuda="Días, franjas horarias, o el mes que te sirve"
            valor={campos.disponibilidad}
            onChange={set('disponibilidad')}
            ancho
          />
        </div>

        <div className="pedido__pie">
          <button className="boton" type="submit">
            Pedir turno
          </button>
          <p className="pedido__legal">
            Mandarlo no reserva fecha. Diego confirma el turno con vos.
          </p>
        </div>
      </form>
    </section>
  )
}

function Campo({ id, etiqueta, ayuda, valor, onChange, error, multilinea, ancho, ...rest }) {
  const ayudaId = ayuda ? `${id}-ayuda` : undefined
  const errorId = error ? `${id}-error` : undefined
  const descrito = [ayudaId, errorId].filter(Boolean).join(' ') || undefined
  const Tag = multilinea ? 'textarea' : 'input'

  return (
    <p className={`campo ${ancho ? 'campo--ancho' : ''} ${error ? 'campo--error' : ''}`}>
      <label className="campo__etiqueta" htmlFor={id}>
        {etiqueta}
      </label>
      {ayuda && (
        <span className="campo__ayuda" id={ayudaId}>
          {ayuda}
        </span>
      )}
      <Tag
        className="campo__input"
        id={id}
        name={id}
        value={valor}
        onChange={onChange}
        rows={multilinea ? 4 : undefined}
        aria-describedby={descrito}
        aria-invalid={error ? 'true' : undefined}
        {...rest}
      />
      {error && (
        <span className="campo__error" id={errorId} role="alert">
          {error}
        </span>
      )}
    </p>
  )
}

/* ─── Pie ─────────────────────────────────────────────────────────────────── */

function Pie() {
  return (
    <footer className="pie">
      <div className="pie__grid">
        <div>
          <p className="rotulo rotulo--claro">Dónde sigue</p>
          <div className="pie__linea">
            <AvatarIG />
          </div>
          <p className="pie__chico">Ahí está todo lo que publica.</p>
        </div>
      </div>
    </footer>
  )
}

function SeccionTitulo({ n, titulo }) {
  return (
    <div className="seccion__cabecera" data-reveal>
      <h2 className="titular">{titulo}</h2>
      <Rule className="filete" />
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────── */

function Landing() {
  // El hash llega antes de que React monte, así que el salto hay que rehacerlo
  // a mano. Sin esto, un link a #turno desde Instagram cae en la tapa.
  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (!id) return
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ block: 'start', behavior: 'instant' })
    })
  }, [])

  return (
    <>
      {/* 
      <a className="saltar" href="#turno">
        Saltar al pedido de turno
      </a>
      */}
      <Indice />
      <Tapa />
      <main>
        <Laminas />
        <LaMano />
        <ElEstudio />
        <ComoSePide />
        {/* <PedirTurno /> */}
      </main>
      <Pie />
    </>
  )
}

/* ponytail: dos rutas no justifican react-router. Si aparece una tercera con
   navegación real sin recargar, ahí sí. En producción el host tiene que reescribir
   /admin a index.html. */
export default function App() {
  const ruta = window.location.pathname.replace(/\/+$/, '')
  return ruta === '/admin' ? <Admin /> : <Landing />
}
