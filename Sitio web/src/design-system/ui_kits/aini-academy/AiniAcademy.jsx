import React, { useCallback, useEffect, useRef, useState } from "react";
import isotipo from "../../assets/isotipo-sol-de-nodos.svg";
import isotipoWhite from "../../assets/isotipo-sol-de-nodos-white.svg";
import { Button } from "../../index.js";
import { MetodoDiagrama, MetodoDiagramaMovil } from "./MetodoDiagrama.jsx";
import cindyJpg from "./retratos/cindy-rojas.jpg";
import cindyWebp from "./retratos/cindy-rojas.webp";
import jemilJpg from "./retratos/jemil-castro.jpg";
import jemilWebp from "./retratos/jemil-castro.webp";
import {
  CALENDARIO_URL,
  CUPOS_RESTANTES,
  CUPOS_TOTALES,
  HORARIO_SESIONES,
  INICIO_COHORTE,
  INICIO_COHORTE_LARGO,
  PRIMERA_SESION,
} from "./cohorte.js";
import styles from "./AiniAcademy.module.css";

const AINI_URL = "https://ainilac.com/";

const FICHA = [
  { etiqueta: "INICIO", valor: INICIO_COHORTE_LARGO },
  { etiqueta: "DURACIÓN", valor: "8 semanas", nota: "16 horas en total" },
  { etiqueta: "SESIONES", valor: "Mar y jue", nota: HORARIO_SESIONES },
  { etiqueta: "PRECIO", valor: "USD 299", nota: "pago único" },
  // ENTREGAS e IDIOMA se omiten en móvil (ficha 2×2).
  { etiqueta: "ENTREGAS", valor: "1 proyecto", nota: "entregas cada mes", soloDesktop: true },
  { etiqueta: "IDIOMA", valor: "Español", soloDesktop: true },
];

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

const SEMANAS = [
  { n: 1, tema: "Claude.ai chat" },
  { n: 2, tema: "Claude Code en el escritorio, CLI o IDE" },
  { n: 3, tema: "Claude Cowork" },
  { n: 4, tema: "Claude Design", entrega: "Entrega 1 de 2" },
  { n: 5, tema: "Uso vía API de Claude, Bedrock, Vertex o Microsoft Foundry" },
  { n: 6, tema: "Panel de analítica de Claude Code + Analytics API" },
  { n: 7, tema: "Plan mode: revisar la intención antes de editar" },
  { n: 8, tema: "Introducción a orquestación agéntica", entrega: "Entrega 2 de 2" },
];

const INSTRUCTORES = [
  {
    nombre: "Cindy Rojas",
    cargo: "IMF · MAS-CS @UPenn",
    href: "https://www.linkedin.com/in/cindy-rojas-alvarado/",
    jpg: cindyJpg,
    webp: cindyWebp,
    encuadre: styles.retratoCindy,
  },
  {
    nombre: "Jemil Castro",
    cargo: "Claude Certified Architect · AI Engineer & LLM Developer",
    href: "https://www.linkedin.com/in/jemil-castro-72146843/",
    jpg: jemilJpg,
    webp: jemilWebp,
    encuadre: styles.retratoJemil,
  },
];

const PERFILES = [
  { nombre: "Manuel de la Colina", cargo: "CEO, Justina", sitio: "juztina.ai", href: "https://www.juztina.ai/pe/es" },
  { nombre: "Ian Lee", cargo: "CEO, Nexor", sitio: "getnexor.ai", href: "https://www.getnexor.ai/es" },
  { nombre: "Vicente Cruz", cargo: "CEO, Sheriff", sitio: "thesheriff.cl", href: "https://thesheriff.cl/" },
];

const INCLUSIONES = [
  "16 sesiones en vivo, grabadas",
  "Tutor todos los días",
  "Office hours con instructor",
  "Feedback semanal de la cohorte",
  "Certificación AINI",
  "1 proyecto acompañado, con 2 entregas",
];

// El precio de la membresía (USD 299/año) solo puede aparecer aquí: coincide
// con el precio del bootcamp y fuera del FAQ se confunde con él.
const FAQ = [
  {
    pregunta: "¿Puedo tomar el bootcamp a mi propio ritmo?",
    respuesta:
      "Las sesiones son en vivo, martes y jueves, 7–8 p.m., hora de Perú (GMT-5). Todas quedan grabadas, así que puedes recuperar cualquiera. El contenido entre sesiones son 25 minutos diarios que tomas cuando quieras.",
  },
  {
    pregunta: "¿Recibo un certificado al completar el bootcamp?",
    respuesta:
      "Sí. Con la participación en las sesiones recibes el certificado de participación de AINI. Si además entregas y apruebas los dos entregables, recibes el certificado de aprobación de AINI.",
  },
  {
    pregunta: "¿Cuánto cuesta la membresía AINI?",
    respuesta: "USD 299 al año. Es un producto adicional, independiente de este bootcamp.",
  },
  {
    pregunta: "¿Qué incluye la membresía?",
    respuesta:
      "Acceso durante un año a todo nuestro contenido, descuentos en nuestros eventos privados y descuento en el evento anual.",
  },
];

const STAGGER = [styles.s0, styles.s1, styles.s2, styles.s3, styles.s4, styles.s5, styles.s6, styles.s7, styles.s8];

function prefiereMenosMovimiento() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Entrada de sección: opacity 0→1 + translateY 12px→0, al 20% de viewport, una vez. */
function Revelar({ children, indice = 0, className = "", as: Etiqueta = "div" }) {
  const ref = useRef(null);
  const [dentro, setDentro] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefiereMenosMovimiento()) {
      setDentro(true);
      return;
    }
    const io = new IntersectionObserver(
      (entradas, obs) => {
        entradas.forEach((e) => {
          if (!e.isIntersecting) return;
          setDentro(true);
          obs.unobserve(e.target);
        });
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Etiqueta
      ref={ref}
      className={`${styles.revelar} ${STAGGER[Math.min(indice, 8)]} ${dentro ? styles.dentro : ""} ${className}`}
    >
      {children}
    </Etiqueta>
  );
}

const ROTULO_CTA = "Aplicar ahora";
const ROTULO_ABRIENDO = "Abriendo el calendario…";

// Hoy nunca es true: `CUPOS_RESTANTES` es una constante. El estado queda
// escrito para cuando los cupos se conecten a una fuente real.
const AGOTADO = CUPOS_RESTANTES <= 0;

/**
 * CTA primario. Abre HubSpot Meetings en pestaña nueva; el cambio de rótulo es
 * puramente visual y no retrasa la apertura. Clicable desde el primer frame.
 */
function CtaAplicar({ size = "lg", ancho = false }) {
  const [rotulo, setRotulo] = useState(ROTULO_CTA);
  const [ocupado, setOcupado] = useState(false);
  const [oculto, setOculto] = useState(false);
  const temporizadores = useRef([]);

  useEffect(() => () => temporizadores.current.forEach(clearTimeout), []);

  const programar = (fn, ms) => temporizadores.current.push(setTimeout(fn, ms));

  const abrirCalendario = useCallback(() => {
    if (ocupado) return;
    // La secuencia anterior ya terminó: sus ids no sirven para nada y sin
    // esto el array crece con cada clic.
    temporizadores.current = [];
    setOcupado(true);
    setOculto(true);
    programar(() => {
      setRotulo(ROTULO_ABRIENDO);
      setOculto(false);
    }, 120);
    window.open(CALENDARIO_URL, "_blank", "noopener");
    programar(() => {
      setOculto(true);
      programar(() => {
        setRotulo(ROTULO_CTA);
        setOculto(false);
        setOcupado(false);
      }, 120);
    }, 1200);
  }, [ocupado]);

  if (AGOTADO) {
    return (
      <Button
        variant="primary"
        size={size}
        aria-disabled="true"
        className={`${styles.cta} ${styles.ctaAgotado} ${ancho ? styles.ctaAncho : ""}`}
      >
        Cupos agotados
      </Button>
    );
  }

  return (
    <Button
      variant="primary"
      size={size}
      onClick={abrirCalendario}
      aria-busy={ocupado || undefined}
      className={`${styles.cta} ${ancho ? styles.ctaAncho : ""}`}
    >
      <span className={`${styles.ctaRotulo} ${oculto ? styles.ctaRotuloOculto : ""}`}>{rotulo}</span>
      {!ocupado && (
        <span className={styles.ctaFlecha} aria-hidden="true">
          →
        </span>
      )}
    </Button>
  );
}

function EnlaceExterno({ href, children, className = "" }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${styles.enlace} ${className}`}>
      {children}
      <span className={styles.enlaceExt} aria-hidden="true">
        {" ↗"}
      </span>
    </a>
  );
}

function Nav() {
  const [fijo, setFijo] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);

  useEffect(() => {
    let pendiente = false;
    const alHacerScroll = () => {
      if (pendiente) return;
      pendiente = true;
      requestAnimationFrame(() => {
        setFijo(window.scrollY > 80);
        pendiente = false;
      });
    };
    alHacerScroll();
    window.addEventListener("scroll", alHacerScroll, { passive: true });
    return () => window.removeEventListener("scroll", alHacerScroll);
  }, []);

  const enlaces = [
    { href: "#metodo", texto: "Método" },
    { href: "#curriculum", texto: "Currículum" },
    { href: "#precio", texto: "Precio" },
  ];

  return (
    <header id="nav" className={`${styles.nav} ${fijo ? styles.navFijo : ""}`}>
      <div className={styles.navInterior}>
        <a href={AINI_URL} className={styles.marca}>
          <img src={isotipo} alt="Isotipo AINI, sol de nodos" width={32} height={32} />
          <span className={styles.marcaNombre}>AINI Academy</span>
        </a>

        <nav className={styles.navEnlaces} aria-label="Secciones de la página">
          {enlaces.map((e) => (
            <a key={e.href} href={e.href} className={styles.navEnlace}>
              {e.texto}
            </a>
          ))}
        </nav>

        <div className={styles.navDerecha}>
          <span className={styles.navFecha}>
            {INICIO_COHORTE_LARGO} · {CUPOS_TOTALES} cupos
          </span>
          <CtaAplicar size="md" />
        </div>

        <button
          type="button"
          className={styles.hamburguesa}
          aria-expanded={menuAbierto}
          aria-controls="nav-menu-movil"
          aria-label="Menú"
          onClick={() => setMenuAbierto((v) => !v)}
        >
          <span className={styles.hamburguesaLinea} />
          <span className={styles.hamburguesaLinea} />
          <span className={styles.hamburguesaLinea} />
        </button>
      </div>

      <div id="nav-menu-movil" className={styles.menuMovil} hidden={!menuAbierto}>
        {enlaces.map((e) => (
          <a key={e.href} href={e.href} className={styles.menuMovilEnlace} onClick={() => setMenuAbierto(false)}>
            {e.texto}
          </a>
        ))}
      </div>
    </header>
  );
}

function Hero({ centinelaRef }) {
  return (
    <section id="hero" className={`${styles.banda} ${styles.bandaNegra}`}>
      <div className={`${styles.interior} ${styles.heroGrid}`}>
        <div>
          <span className={styles.eyebrowArena}>PRIMERA COHORTE · {CUPOS_TOTALES} CUPOS</span>
          <h1 className={styles.h1}>De idea a producto funcionando en 8 semanas</h1>
          <p className={styles.heroLead}>IA aplicada a tu propio producto o servicio digital.</p>
          <div className={styles.heroAcciones}>
            <CtaAplicar size="lg" />
            <a href="#metodo" className={styles.heroEnlace}>
              Ver el método
            </a>
          </div>
          <div ref={centinelaRef} className={styles.centinela} aria-hidden="true" />
        </div>

        <dl className={styles.ficha}>
          {FICHA.map((f) => (
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
          Tu tutor está todos los días. Tu profesor, cuando el tutor no basta.
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
          Adaptado a casos de negocio de América Latina.
        </Revelar>
        <div className={styles.tabla}>
          {SEMANAS.map((s, i) => (
            <Revelar key={s.n} indice={i + 2} className={styles.fila}>
              <span className={styles.filaSemana}>SEMANA {s.n}</span>
              <span className={styles.filaTema}>{s.tema}</span>
              {s.entrega && (
                <span className={styles.filaEntrega}>
                  <span className={styles.marcaEntrega} aria-hidden="true" />
                  {s.entrega}
                </span>
              )}
              <span className={styles.filaSesiones}>2 sesiones</span>
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
          Quién facilita
        </Revelar>
        <div className={styles.dosColumnas}>
          {INSTRUCTORES.map((p, i) => (
            <Revelar key={p.nombre} indice={i + 1} className={styles.tarjetaInstructor}>
              <picture>
                <source srcSet={p.webp} type="image/webp" />
                <img
                  src={p.jpg}
                  alt={p.nombre}
                  width={96}
                  height={96}
                  loading="lazy"
                  decoding="async"
                  className={`${styles.retrato} ${p.encuadre}`}
                />
              </picture>
              <div>
                <p className={styles.personaNombre}>{p.nombre}</p>
                <p className={styles.personaCargo}>{p.cargo}</p>
                <EnlaceExterno href={p.href} className={styles.enlaceFuerte}>
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
        <Revelar as="p" className={styles.lead} indice={1}>
          Al finalizar el bootcamp, esperamos que puedas construir productos y servicios con impacto
          real en América Latina en el sector público y sector privado
        </Revelar>
        <div className={styles.tresColumnas}>
          {PERFILES.map((p, i) => (
            <Revelar key={p.nombre} indice={i + 2} className={styles.tarjetaElevada}>
              <p className={styles.personaNombre}>{p.nombre}</p>
              <p className={`${styles.personaCargo} ${styles.personaCargoAmplio}`}>{p.cargo}</p>
              <EnlaceExterno href={p.href} className={styles.enlaceFuerte}>
                {p.sitio}
              </EnlaceExterno>
            </Revelar>
          ))}
        </div>
      </div>
    </section>
  );
}

function Precio() {
  return (
    <section id="precio" className={`${styles.banda} ${styles.bandaNegra}`}>
      <div className={`${styles.interior} ${styles.precioGrid}`}>
        <div>
          {/* El mockup no dibuja título aquí, pero sin él quien navega por
              encabezados se salta el precio entero. */}
          <h2 className={styles.soloLectores}>Precio</h2>
          <span className={styles.eyebrowArena}>PRIMERA COHORTE</span>
          <p className={styles.cifra}>USD 299</p>
          <p className={styles.precioNota}>Pago único.</p>
        </div>
        <div>
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
          <CtaAplicar size="lg" ancho />
          <p className={styles.garantia}>
            Garantía: si después de la primera semana no es para ti, te devolvemos el 100%.
          </p>
          <p className={styles.notaPago}>
            Pago por transferencia: al registrarte enviamos los datos de la cuenta por correo.
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

function calcularCuenta(ahora) {
  const objetivo = Date.parse(INICIO_COHORTE);
  const restante = Math.max(0, objetivo - ahora);
  const s = Math.floor(restante / 1000);
  const p = (n) => String(n).padStart(2, "0");
  return {
    dias: p(Math.floor(s / 86400)),
    horas: p(Math.floor((s % 86400) / 3600)),
    min: p(Math.floor((s % 3600) / 60)),
    seg: p(s % 60),
  };
}

/** Sin animación de dígitos: se reemplaza el texto cada segundo y nada más. */
function Contador() {
  const [cuenta, setCuenta] = useState(() => calcularCuenta(Date.now()));

  useEffect(() => {
    const id = setInterval(() => setCuenta(calcularCuenta(Date.now())), 1000);
    return () => clearInterval(id);
  }, []);

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

function TarjetaCierre() {
  return (
    <div className={styles.tarjetaCierre}>
      <h2 className={styles.h2Cierre}>Empieza el {INICIO_COHORTE_LARGO}</h2>
      <p className={styles.cierreNota}>Primera sesión: {PRIMERA_SESION}</p>
      <Contador />
      <p className={styles.cupos}>
        Cupos restantes: <strong className={styles.cuposCifra}>{CUPOS_RESTANTES}</strong> de{" "}
        {CUPOS_TOTALES}
      </p>
      <CtaAplicar size="lg" ancho />
    </div>
  );
}

function Faq() {
  // Varios paneles pueden estar abiertos a la vez: es el comportamiento
  // aprobado en el mockup.
  const [abiertos, setAbiertos] = useState({});

  return (
    <div className={styles.faqLista}>
      {FAQ.map((f, i) => {
        const abierto = !!abiertos[i];
        return (
          <div key={f.pregunta} className={styles.faqItem}>
            <button
              type="button"
              id={`faq-boton-${i}`}
              className={styles.faqBoton}
              aria-expanded={abierto}
              aria-controls={`faq-panel-${i}`}
              onClick={() => setAbiertos((s) => ({ ...s, [i]: !s[i] }))}
            >
              <span>{f.pregunta}</span>
              <span className={styles.faqSigno} aria-hidden="true">
                +
              </span>
            </button>
            <div
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-boton-${i}`}
              className={`${styles.faqPanel} ${abierto ? styles.faqPanelAbierto : ""}`}
            >
              <div>
                <p className={styles.faqRespuesta}>{f.respuesta}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function FaqYCierre() {
  return (
    <section id="faq" className={`${styles.banda} ${styles.bandaHueso}`}>
      <div className={`${styles.interior} ${styles.faqGrid}`}>
        <div className={styles.faqColumna}>
          <h2 className={styles.h2}>Preguntas frecuentes</h2>
          <Faq />
        </div>
        <div className={styles.cierreColumna}>
          <TarjetaCierre />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.interior} ${styles.footerInterior}`}>
        <img src={isotipoWhite} alt="" width={28} height={28} />
        <span>Instituto de Inteligencia Artificial para América Latina y el Caribe</span>
      </div>
    </footer>
  );
}

/** Barra fija al pie, solo móvil: aparece cuando el CTA del hero sale de viewport. */
function BarraMovil({ centinelaRef }) {
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

  return (
    <div className={`${styles.barra} ${visible ? styles.barraVisible : ""}`}>
      <CtaAplicar size="lg" ancho />
    </div>
  );
}

export function AiniAcademy() {
  const centinelaRef = useRef(null);

  return (
    <div className={styles.pagina}>
      <Nav />
      <main>
        <Hero centinelaRef={centinelaRef} />
        <Construir />
        <Metodo />
        <Curriculum />
        <Instructores />
        <ParaQuien />
        <Precio />
        <FaqYCierre />
      </main>
      <Footer />
      <BarraMovil centinelaRef={centinelaRef} />
    </div>
  );
}
