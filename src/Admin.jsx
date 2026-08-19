import { useMemo, useState } from 'react'
import { Rule } from './Ornaments.jsx'

/* ───────────────────────────────────────────────────────────────────────────
   LIBRO DE TURNOS — la vista de Diego

   Superficie de trabajo, no de convencer: hereda el mundo del catálogo (negro,
   Bevan, filetes, fichas) pero prioriza escanear rápido sobre expresión. Sin
   revelados al scroll, sin campos de color, densidad alta.

   Los pedidos de acá son DEMO. Cuando se conecte Supabase, este arreglo se
   reemplaza por la consulta y `mover()` por el update de estado.
   ─────────────────────────────────────────────────────────────────────────── */

const DEMO = [
  {
    id: 'P-0106',
    recibido: '2026-08-11 22:41',
    nombre: 'Camila Ferreyra',
    contacto: 'IG @camiferreyra',
    idea: 'Una golondrina en el antebrazo, tipo tradicional. Es por mi abuela, que era de Vigo y siempre decía que las golondrinas vuelven.',
    tamaño: 'Como la palma de la mano, 10 cm más o menos',
    zona: 'Antebrazo izquierdo, cara interna',
    referencias: 'Tengo un tablero armado, te lo mando por IG',
    disponibilidad: 'Martes y jueves después de las 18. Setiembre me sirve.',
    estado: 'nuevo',
  },
  {
    id: 'P-0105',
    recibido: '2026-08-11 19:07',
    nombre: 'Nahuel',
    contacto: 'WhatsApp, se lo paso por privado',
    idea: 'Quiero taparme un tatuaje viejo que me hice a los 18. Es un tribal en el hombro, chico pero oscuro. Pensaba algo con rosas.',
    tamaño: 'Lo que haga falta para taparlo',
    zona: 'Hombro derecho',
    referencias: '',
    disponibilidad: 'Cualquier día a la mañana',
    estado: 'nuevo',
  },
  {
    id: 'P-0104',
    recibido: '2026-08-10 13:22',
    nombre: 'Sol Giménez',
    contacto: 'sol.gimenez.arq@correo.example',
    idea: 'Daga con víbora enroscada, en la línea de la lámina 01 del catálogo. Primera vez que me tatúo, así que también quiero saber cómo es el proceso.',
    tamaño: '15 cm de largo',
    zona: 'Pantorrilla',
    referencias: 'La lámina 01 de la página',
    disponibilidad: 'Fines de semana',
    estado: 'nuevo',
  },
  {
    id: 'P-0103',
    recibido: '2026-08-08 11:50',
    nombre: 'Ezequiel Ríos',
    contacto: 'IG @ezerios.tt',
    idea: 'Pantera en el gemelo, como la lámina 02 pero mirando para el otro lado.',
    tamaño: '20 cm',
    zona: 'Gemelo izquierdo',
    referencias: 'Lámina 02',
    disponibilidad: 'Sábados',
    estado: 'confirmado',
    fecha: 'Sábado 23 de agosto, 15:00',
  },
  {
    id: 'P-0102',
    recibido: '2026-08-05 20:14',
    nombre: 'Malena Duarte',
    contacto: 'IG @male.duarte',
    idea: 'Ramo de rosas rojas cubriendo el antebrazo entero, de muñeca a codo. Sé que son varias sesiones.',
    tamaño: 'Antebrazo completo',
    zona: 'Antebrazo derecho',
    referencias: 'Le mandé fotos por IG',
    disponibilidad: 'Miércoles todo el día',
    estado: 'confirmado',
    fecha: 'Miércoles 20 de agosto, 11:00 — primera de tres',
  },
  {
    id: 'P-0101',
    recibido: '2026-08-02 09:33',
    nombre: 'Franco',
    contacto: 'IG @franco.mtb',
    idea: 'Un retrato hiperrealista de mi perro, con sombras suaves y mucho detalle de pelo.',
    tamaño: '25 cm',
    zona: 'Espalda alta',
    referencias: '',
    disponibilidad: 'Cuando sea',
    estado: 'archivado',
    nota: 'Rechazado: el realismo no es lo que hago. Le pasé dos colegas que sí.',
  },
]

const SECCIONES = [
  { clave: 'nuevo', titulo: 'Pedidos nuevos', vacio: 'No hay pedidos sin leer.' },
  { clave: 'confirmado', titulo: 'Turnos confirmados', vacio: 'Todavía no confirmaste ninguno.' },
  { clave: 'archivado', titulo: 'Archivo', vacio: 'No archivaste nada.' },
]

export default function Admin() {
  const [pedidos, setPedidos] = useState(DEMO)
  const [seccion, setSeccion] = useState('nuevo')

  const porSeccion = useMemo(() => {
    const grupos = { nuevo: [], confirmado: [], archivado: [] }
    for (const p of pedidos) grupos[p.estado]?.push(p)
    return grupos
  }, [pedidos])

  function mover(id, estado, extra = {}) {
    setPedidos((ps) => ps.map((p) => (p.id === id ? { ...p, estado, ...extra } : p)))
  }

  const activa = SECCIONES.find((s) => s.clave === seccion)
  const lista = porSeccion[seccion]

  return (
    <div className="admin">
      <header className="admin__cabecera">
        <div className="admin__marca">
          <p className="rotulo">diegotattooer</p>
          <h1 className="admin__titulo">Libro de turnos</h1>
        </div>
        <a className="admin__salida" href="/">
          Ver la página ↗
        </a>
      </header>

      <Rule className="admin__filete" />

      <p className="marcador admin__demo">
        Demo: estos {DEMO.length} pedidos son de ejemplo y viven sólo en esta pestaña. No
        hay base de datos conectada, y <strong>esta URL todavía no pide contraseña</strong>.
      </p>

      <nav className="admin__pestanas" aria-label="Secciones del libro">
        {SECCIONES.map((s) => (
          <button
            key={s.clave}
            type="button"
            className={`pestana ${seccion === s.clave ? 'is-activa' : ''}`}
            aria-current={seccion === s.clave ? 'true' : undefined}
            onClick={() => setSeccion(s.clave)}
          >
            {s.titulo}
            <span className="pestana__n">{porSeccion[s.clave].length}</span>
          </button>
        ))}
      </nav>

      <section className="admin__lista" aria-live="polite">
        <h2 className="admin__seccion-titulo">{activa.titulo}</h2>

        {lista.length === 0 ? (
          <p className="admin__vacio">{activa.vacio}</p>
        ) : (
          <ol className="admin__pedidos">
            {lista.map((p) => (
              <li key={p.id}>
                <Pedido pedido={p} mover={mover} />
              </li>
            ))}
          </ol>
        )}
      </section>
    </div>
  )
}

function Pedido({ pedido: p, mover }) {
  return (
    <article className="pedido-ficha">
      <header className="pedido-ficha__cabecera">
        <span className="ficha__n">{p.id}</span>
        <h3 className="pedido-ficha__nombre">{p.nombre}</h3>
        <span className="pedido-ficha__fecha">Recibido {p.recibido}</span>
      </header>

      {p.fecha && (
        <p className="pedido-ficha__turno">
          <strong>Turno:</strong> {p.fecha}
        </p>
      )}
      {p.nota && <p className="pedido-ficha__nota">{p.nota}</p>}

      <p className="pedido-ficha__idea">{p.idea}</p>

      <dl className="pedido-ficha__datos">
        <Dato rotulo="Contacto" valor={p.contacto} />
        <Dato rotulo="Tamaño" valor={p.tamaño} />
        <Dato rotulo="Zona" valor={p.zona} />
        <Dato rotulo="Disponibilidad" valor={p.disponibilidad} />
        <Dato rotulo="Referencias" valor={p.referencias} />
      </dl>

      <footer className="pedido-ficha__acciones">
        {p.estado === 'nuevo' && (
          <>
            <button
              type="button"
              className="boton boton--chico"
              onClick={() => mover(p.id, 'confirmado', { fecha: 'A coordinar con la persona' })}
            >
              Confirmar
            </button>
            <button type="button" className="boton boton--fantasma boton--chico">
              Pedir más datos
            </button>
            <button
              type="button"
              className="boton boton--fantasma boton--chico"
              onClick={() => mover(p.id, 'archivado', { nota: 'Rechazado.' })}
            >
              Rechazar
            </button>
          </>
        )}
        {p.estado === 'confirmado' && (
          <>
            <button
              type="button"
              className="boton boton--fantasma boton--chico"
              onClick={() => mover(p.id, 'archivado', { nota: 'Hecho.' })}
            >
              Marcar como hecho
            </button>
            <button
              type="button"
              className="boton boton--fantasma boton--chico"
              onClick={() => mover(p.id, 'nuevo', { fecha: undefined })}
            >
              Volver a pendiente
            </button>
          </>
        )}
        {p.estado === 'archivado' && (
          <button
            type="button"
            className="boton boton--fantasma boton--chico"
            onClick={() => mover(p.id, 'nuevo', { nota: undefined })}
          >
            Reabrir
          </button>
        )}
      </footer>
    </article>
  )
}

function Dato({ rotulo, valor }) {
  return (
    <div className="dato">
      <dt>{rotulo}</dt>
      <dd className={valor ? '' : 'dato--sin'}>{valor || 'No lo puso'}</dd>
    </div>
  )
}
