import React, { useEffect, useRef, useState } from "react";
import { Button } from "../../index.js";
import { SiteHeader } from "../../components/layout/SiteHeader.jsx";
import { SiteFooter } from "../../components/layout/SiteFooter.jsx";
import { MetodoDiagrama, MetodoDiagramaMovil } from "./MetodoDiagrama.jsx";
import { AccesoAlumni } from "./AccesoAlumni.jsx";
import { CtaPostular } from "./CtaPostular.jsx";
import { Revelar, prefiereMenosMovimiento } from "./Revelar.jsx";
import { COHORTE, ENTREVISTA_MINUTOS, EQUIPOS_TOTALES, FACILITADORES } from "./academia.config.js";
import { calcularCuenta, fechaConDia, fechaLarga } from "./olas.js";
import { useEstadoPostulacion } from "./usePostulacion.js";
import styles from "./AiniAcademy.module.css";

const AINI_URL = "https://ainilac.com/";

const ENTREGABLES = [
  {
    eyebrow: "MES 1",
    titulo: "Landing page en producción",
    enlace: { texto: "ejemplo: ainilac.com", href: AINI_URL },
  },
  {
    eyebrow: "MES 2",
    titulo: "Un flujo de trabajo automatizado",
    enlace: { texto: "ejemplo: x.dennisvivas.com", href: "https://x.dennisvivas.com/" },
  },
];

// La Semana 0 es asíncrona y se entrega el día de la admisión: no cuenta
// dentro de las ocho semanas, y por eso su rótulo no es «SEMANA 0».
const SEMANAS = [
  {
    rotulo: "PREVIO · ASÍNCRONA",
    titulo: "Fundamentos",
    detalle:
      "Qué hay debajo: servidores, redes, datos y código. Para llegar parejos a la semana 1, mira nuestras clases teóricas grabadas.",
    meta: "Se entrega al ser admitido",
    previo: true,
  },
  {
    rotulo: "SEMANA 1",
    titulo: "Tu primer asistente",
    detalle: "Conviertes una tarea que hoy haces a mano en instrucciones que otro ejecuta.",
    meta: "2 sesiones",
  },
  {
    rotulo: "SEMANA 2",
    titulo: "Del chat a tu computadora",
    detalle: "La IA deja de responderte y empieza a crear y modificar archivos por ti.",
    meta: "2 sesiones",
  },
  {
    rotulo: "SEMANA 3",
    titulo: "Tu carpeta de trabajo, automatizada",
    detalle: "Reportes, planillas y documentos que se preparan solos.",
    meta: "2 sesiones",
  },
  {
    rotulo: "SEMANA 4",
    titulo: "Publicas tu landing",
    detalle: "Diseño y salida a producción.",
    entrega: "Entrega 1 de 2",
    meta: "2 sesiones",
  },
  {
    rotulo: "SEMANA 5",
    titulo: "Conectas tus sistemas",
    detalle: "Que tu CRM, tu base de datos o tu hoja de cálculo hablen con el agente.",
    meta: "2 sesiones",
  },
  {
    rotulo: "SEMANA 6",
    titulo: "Mides lo que automatizaste",
    detalle: "Cuánto tiempo ahorras y dónde falla el proceso.",
    meta: "2 sesiones",
  },
  {
    rotulo: "SEMANA 7",
    titulo: "Control antes de ejecutar",
    detalle: "Revisas qué va a hacer el agente antes de que lo haga.",
    meta: "2 sesiones",
  },
  {
    rotulo: "SEMANA 8",
    titulo: "Varios agentes trabajando juntos",
    detalle: "Tu flujo completo corriendo sin ti.",
    entrega: "Entrega 2 de 2",
    meta: "2 sesiones",
  },
];

const PERFILES = [
  {
    titulo: "Trabajas en un laboratorio de innovación",
    detalle:
      "— público o privado — y necesitas mostrar un proyecto interno funcionando, no un piloto en PowerPoint.",
  },
  {
    titulo: "¿Quieres lanzar un nuevo negocio?",
    // Sin el guion de continuación del otro perfil: detrás de una pregunta
    // rompe la frase. Aquí la segunda oración va suelta.
    detalle:
      "Tienes el criterio de negocio y la experiencia, pero nunca construiste un producto por tu cuenta.",
  },
];

const INCLUSIONES = [
  "16 sesiones en vivo de 1 hora, grabadas",
  "Más de 30 horas de material curado",
  "Canal de dudas en Slack con los instructores",
  "Office hours semanales",
  "Feedback semanal sobre tu proyecto",
  "Certificado AINI de participación o de aprobación",
  "1 proyecto acompañado, con 2 entregas publicadas",
];

function EnlaceExterno({ href, children, className = "" }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${styles.enlace} ${className}`}>
      {children}
    </a>
  );
}

function fichaDeCohorte(estado) {
  return [
    {
      etiqueta: "INICIO",
      valor: fechaLarga(COHORTE.inicioFecha),
      nota: estado.fase === "abierta" ? "postulaciones abiertas" : "postulaciones cerradas",
    },
    {
      etiqueta: "DURACIÓN",
      valor: `${COHORTE.semanas} semanas`,
      nota: `${COHORTE.sesiones} sesiones en vivo de 1 hora`,
    },
    { etiqueta: "SESIONES", valor: COHORTE.diasTexto, nota: COHORTE.horaTexto },
    { etiqueta: "MODALIDAD", valor: "100% online", nota: "¿no tienes equipo? te ayudamos" },
    // ENTREGAS e IDIOMA se omiten en móvil (ficha 2×2).
    { etiqueta: "ENTREGAS", valor: "1 proyecto", nota: "2 entregas publicadas", soloDesktop: true },
    { etiqueta: "IDIOMA", valor: "Español", soloDesktop: true },
  ];
}

function Hero({ centinelaRef, estado }) {
  const eyebrow =
    estado.fase === "abierta"
      ? `PRIMERA COHORTE · ${EQUIPOS_TOTALES} EQUIPOS · ${estado.ola.nombre.toUpperCase()} ABIERTA HASTA EL ${fechaLarga(
          estado.ola.hasta
        ).toUpperCase()}`
      : `PRIMERA COHORTE · ${EQUIPOS_TOTALES} EQUIPOS · POSTULACIONES CERRADAS`;

  return (
    <section id="hero" className={`${styles.banda} ${styles.bandaNegra}`}>
      <div className={`${styles.interior} ${styles.heroGrid}`}>
        <div>
          <span className={styles.eyebrowArena}>{eyebrow}</span>
          <h1 className={styles.h1}>De idea a producto funcionando en 8 semanas</h1>
          <p className={styles.heroLead}>
            Traes tu propio proyecto y un equipo de tres. En ocho semanas lo tienes publicado y
            funcionando. No necesitas ser programador.
          </p>
          <div className={styles.heroAcciones}>
            <CtaPostular estado={estado} size="lg" />
            <a href="#metodo" className={styles.heroEnlace}>
              Ver el método
            </a>
          </div>
          {estado.fase === "abierta" && (
            <p className={styles.heroMicrocopy}>
              Entrevista de {ENTREVISTA_MINUTOS} minutos por videollamada. Seleccionamos{" "}
              {EQUIPOS_TOTALES} equipos.
            </p>
          )}
          <div ref={centinelaRef} className={styles.centinela} aria-hidden="true" />
        </div>

        <dl className={styles.ficha}>
          {fichaDeCohorte(estado).map((f) => (
            <div key={f.etiqueta} className={`${styles.fichaCelda} ${f.soloDesktop ? styles.soloDesktop : ""}`}>
              <dt className={styles.fichaEtiqueta}>{f.etiqueta}</dt>
              <dd className={styles.fichaValor}>
                {f.valor}
                {f.nota && <span className={styles.fichaNota}>{f.nota}</span>}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Construir() {
  return (
    <section id="construir" className={`${styles.banda} ${styles.bandaHueso}`}>
      <div className={styles.interior}>
        <Revelar as="h2" className={styles.h2} indice={0}>
          Qué vas a construir
        </Revelar>
        <div className={styles.dosColumnas}>
          {ENTREGABLES.map((e, i) => (
            <Revelar key={e.eyebrow} indice={i + 1} className={styles.tarjetaElevada}>
              <span className={styles.eyebrowAtenuado}>{e.eyebrow}</span>
              <p className={styles.tarjetaTitulo}>{e.titulo}</p>
              <EnlaceExterno href={e.enlace.href}>{e.enlace.texto}</EnlaceExterno>
            </Revelar>
          ))}
        </div>
        <Revelar as="p" className={styles.nota} indice={3}>
          Sin las dos entregas: certificado de participación de AINI. Con las dos entregas aprobadas:
          certificado de aprobación de AINI.
        </Revelar>
      </div>
    </section>
  );
}

function Metodo() {
  return (
    <section id="metodo" className={`${styles.banda} ${styles.bandaBlanca}`}>
      <div className={styles.interior}>
        <Revelar as="h2" className={`${styles.h2} ${styles.h2Ancho}`} indice={0}>
          Clases en vivo dos veces por semana. Un canal de dudas abierto el resto de días.
        </Revelar>
        <Revelar as="p" className={`${styles.lead} ${styles.leadAmplio}`} indice={1}>
          Un ciclo de cuatro movimientos, ocho veces.
        </Revelar>
        <div className={styles.diagramaDesktop}>
          <MetodoDiagrama />
        </div>
        <div className={styles.diagramaMovil}>
          <MetodoDiagramaMovil />
        </div>
      </div>
    </section>
  );
}

function Curriculum() {
  return (
    <section id="curriculum" className={`${styles.banda} ${styles.bandaHueso}`}>
      <div className={styles.interior}>
        <Revelar as="h2" className={`${styles.h2} ${styles.h2ConLead}`} indice={0}>
          Ocho semanas
        </Revelar>
        <Revelar as="p" className={styles.lead} indice={1}>
          Todo el curso sobre un caso de uso para tu trabajo diario.
        </Revelar>
        <div className={styles.tabla}>
          {SEMANAS.map((s, i) => (
            <Revelar
              key={s.rotulo}
              indice={i + 2}
              className={`${styles.fila} ${s.previo ? styles.filaPrevio : ""}`}
            >
              <span className={styles.filaRotulo}>{s.rotulo}</span>
              <span className={styles.filaCuerpo}>
                <span className={styles.filaTitulo}>{s.titulo}</span>
                <span className={styles.filaDetalle}>{s.detalle}</span>
              </span>
              <span className={styles.filaAccion}>
                {s.entrega && (
                  <span className={styles.filaEntrega}>
                    <span className={styles.marcaEntrega} aria-hidden="true" />
                    {s.entrega}
                  </span>
                )}
                <span className={styles.filaSesiones}>{s.meta}</span>
              </span>
            </Revelar>
          ))}
        </div>
      </div>
    </section>
  );
}

function Instructores() {
  return (
    <section id="instructores" className={`${styles.banda} ${styles.bandaBlanca}`}>
      <div className={styles.interior}>
        <Revelar as="h2" className={styles.h2} indice={0}>
          Aprende de quienes operan hoy
        </Revelar>
        <div className={styles.tresColumnas}>
          {FACILITADORES.map((p, i) => (
            <Revelar key={p.nombre} indice={i + 1} className={styles.tarjetaInstructor}>
              {/* `alt=""` en los tres: el nombre va como texto justo debajo y
                  repetirlo haría que el lector de pantalla lo diga dos veces. */}
              <picture>
                <source srcSet={p.webp} type="image/webp" />
                <img
                  src={p.jpg}
                  alt=""
                  width={96}
                  height={96}
                  loading="lazy"
                  decoding="async"
                  className={`${styles.retrato} ${styles[p.encuadre]}`}
                />
              </picture>
              <div>
                <p className={styles.personaNombre}>{p.nombre}</p>
                <p className={styles.personaCargo}>{p.rol}</p>
                <EnlaceExterno href={p.linkedin} className={styles.enlaceFuerte}>
                  LinkedIn
                </EnlaceExterno>
              </div>
            </Revelar>
          ))}
        </div>
      </div>
    </section>
  );
}

function ParaQuien() {
  return (
    <section id="para-quien" className={`${styles.banda} ${styles.bandaHueso}`}>
      <div className={styles.interior}>
        <Revelar as="h2" className={`${styles.h2} ${styles.h2ConLead}`} indice={0}>
          Para quién es
        </Revelar>
        <Revelar as="p" className={`${styles.lead} ${styles.leadAncho}`} indice={1}>
          Diseñado para analistas, especialistas de instituciones públicas y privadas, fundadores y
          principales colaboradores de startups, ingenieros de software que quieren saber de negocio.
          No necesitas saber programación para participar.
        </Revelar>
        <div className={styles.dosColumnas}>
          {PERFILES.map((p, i) => (
            <Revelar key={p.titulo} indice={i + 2} className={styles.tarjetaElevada}>
              <p className={styles.perfilTexto}>
                <strong className={styles.perfilTitulo}>{p.titulo}</strong> {p.detalle}
              </p>
            </Revelar>
          ))}
        </div>
      </div>
    </section>
  );
}

function Inversion({ estado }) {
  const bono = estado.ola?.bono;

  return (
    <section id="inversion" className={`${styles.banda} ${styles.bandaNegra}`}>
      <div className={`${styles.interior} ${styles.inversionGrid}`}>
        <div>
          <h2 className={styles.h2}>Inversión</h2>
          <p className={styles.inversionLead}>
            Completa tu postulación para recibir los detalles de la inversión y del proceso de
            admisión.
          </p>
          <p className={styles.inversionNota}>
            Tenemos tres modalidades: individual, en equipo de tres y con facturación a tu empresa.
          </p>
        </div>
        <div>
          <p className={styles.inclusionesTitulo}>Todas incluyen:</p>
          <ul className={styles.inclusiones}>
            {INCLUSIONES.map((texto) => (
              <li key={texto} className={styles.inclusion}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className={styles.check}>
                  <path d="M2.5 8.5 L6.5 12.5 L13.5 4" stroke="var(--ini-sand)" strokeWidth="1.5" />
                </svg>
                {texto}
              </li>
            ))}
          </ul>
          {bono && (
            <p className={styles.bono}>
              <strong>
                Solo en la {estado.ola.nombre}, hasta el {fechaLarga(estado.ola.hasta)}:
              </strong>{" "}
              {bono}.
            </p>
          )}
          <CtaPostular estado={estado} size="lg" ancho />
          <p className={styles.garantia}>
            Garantía: si después de la primera semana esto no es para ti, escríbenos y te devolvemos
            el 100%. Sin preguntas.
          </p>
        </div>
      </div>
    </section>
  );
}

const CELDAS_CONTADOR = [
  ["dias", "DÍAS"],
  ["horas", "HORAS"],
  ["min", "MIN"],
  ["seg", "SEG"],
];

/** Sin animación de dígitos: se reemplaza el texto cada segundo y nada más. */
function Contador({ objetivo }) {
  const [cuenta, setCuenta] = useState(() => calcularCuenta(Date.now(), objetivo));

  useEffect(() => {
    setCuenta(calcularCuenta(Date.now(), objetivo));
    const id = setInterval(() => setCuenta(calcularCuenta(Date.now(), objetivo)), 1000);
    return () => clearInterval(id);
  }, [objetivo]);

  return (
    <div className={styles.contador} aria-live="off">
      {CELDAS_CONTADOR.map(([clave, etiqueta]) => (
        <div key={clave} className={styles.contadorCelda}>
          <span className={styles.contadorCifra}>{cuenta[clave]}</span>
          <span className={styles.contadorEtiqueta}>{etiqueta}</span>
        </div>
      ))}
    </div>
  );
}

function TarjetaCierre({ estado }) {
  if (estado.fase === "cerrada") {
    return (
      <div className={styles.tarjetaCierre}>
        <h2 className={styles.h2Cierre}>Postulaciones cerradas</h2>
        <p className={styles.cierreNota}>
          La cohorte empieza el {fechaConDia(COHORTE.inicioFecha)}, {COHORTE.horaInicioTexto}.
          Escríbenos si quieres saber de la siguiente.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.tarjetaCierre}>
      <h2 className={styles.h2Cierre}>
        La {estado.ola.nombre} cierra el {fechaLarga(estado.ola.hasta)}
      </h2>
      <p className={styles.cierreNota}>
        Quedan {estado.ola.equipos} equipos en esta ola. La cohorte empieza el{" "}
        {fechaConDia(COHORTE.inicioFecha)}, {COHORTE.horaInicioTexto}.
      </p>
      <Contador objetivo={estado.cierraEl} />
      <p className={styles.escasez}>
        {EQUIPOS_TOTALES} equipos en la primera cohorte · la {estado.ola.nombre} cierra el{" "}
        {fechaLarga(estado.ola.hasta)}
      </p>
      <CtaPostular estado={estado} size="lg" ancho />
    </div>
  );
}

/**
 * Banda de cierre. Las preguntas frecuentes salieron de la landing y viven en
 * `/academia/preguntas-frecuentes`, enlazadas desde el pie: aquí queda el
 * contador y el último empujón a postular.
 */
function Cierre({ estado }) {
  return (
    <section id="cierre" className={`${styles.banda} ${styles.bandaHueso}`}>
      <div className={`${styles.interior} ${styles.cierreInterior}`}>
        <TarjetaCierre estado={estado} />
      </div>
    </section>
  );
}

/** Barra fija al pie, solo móvil: aparece cuando el CTA del hero sale de viewport. */
function BarraMovil({ centinelaRef, estado }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = centinelaRef.current;
    if (!el) return;
    if (prefiereMenosMovimiento()) {
      setVisible(true);
      return;
    }
    // Este observer sí permanece: alterna en ambos sentidos.
    // El último registro es el estado actual: con varios cambios encolados
    // (scroll rápido, salto de ancla) el primero ya está obsoleto.
    const io = new IntersectionObserver(
      (entradas) => setVisible(!entradas[entradas.length - 1].isIntersecting),
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [centinelaRef]);

  if (estado.fase === "cerrada") return null;

  return (
    <div className={`${styles.barra} ${visible ? styles.barraVisible : ""}`}>
      <CtaPostular estado={estado} size="lg" ancho />
    </div>
  );
}

export function AiniAcademy() {
  const centinelaRef = useRef(null);
  const estado = useEstadoPostulacion();

  return (
    <div className={styles.pagina}>
      {/* Mismo nav y mismo footer que ainilac.com. El único cambio es el
          botón: aquí convierte en vez de llevar al grupo de WhatsApp. */}
      <SiteHeader variante="academia" cta={<AccesoAlumni />} />
      <main>
        <Hero centinelaRef={centinelaRef} estado={estado} />
        <Construir />
        <Metodo />
        <Curriculum />
        <Instructores />
        <ParaQuien />
        <Inversion estado={estado} />
        <Cierre estado={estado} />
      </main>
      <SiteFooter variante="academia" />
      <BarraMovil centinelaRef={centinelaRef} estado={estado} />
    </div>
  );
}
