import React, { useEffect, useState } from "react";
import isotipo from "../../assets/isotipo-sol-de-nodos.svg";
import isotipoWhite from "../../assets/isotipo-sol-de-nodos-white.svg";
import { Button, Card } from "../../index.js";
import styles from "./AiniHome.module.css";

const WHATSAPP_URL = "https://chat.whatsapp.com/EHKnMXdPdBO7dHNvIYj5Fc";

// Con barra final: es la forma que resuelve tanto en el servidor de
// desarrollo como en Vercel. En producción, `trailingSlash: false` la
// normaliza a /academia, que es la URL canónica.
const ACADEMY_URL = "/academia/";

const NAV_DISABLED = ["Investigación", "Política", "Compromisos"];

const ACTORS = [
  { label: "Sector público", desc: "Ministerios e instituciones de gobierno que definen la política pública de IA." },
  { label: "Sector privado", desc: "Gremios empresariales y compañías que adoptan IA en sus operaciones." },
  { label: "Academia", desc: "Universidades y centros de investigación que aportan evidencia y talento." },
  { label: "Sociedad civil", desc: "Organizaciones que representan el interés ciudadano en el uso responsable de la IA." },
];

const VERTICALS = [
  { eyebrow: "Educación", title: "AINI Academy", desc: "Preparación para certificaciones de IA, con casos prácticos a necesidades de la región. Lanzamiento primer curso: 15 de agosto.", cta: "Postular", href: ACADEMY_URL },
  { eyebrow: "Consultoría", title: "AINI Consulting", desc: "Consultoría e implementación de IA para organizaciones públicas y privadas, desde la estratégica hasta la implantación.", cta: "Despegar" },
  { eyebrow: "Inversión", title: "AINI Venture", desc: "Inversión y aceleración de fundadores IA. Mentorías e incorporación de nuestra red de agentes IA en tu organización.", cta: "Escalar" },
];

const EVENTS = [
  { badge: "Taller virtual", date: "Mié 22 jul · 7:00 pm (GMT-5)", title: "MCP en acción: conecta tu base de datos a Claude", desc: "Clase de prueba en vivo: construye un servidor MCP sobre datos reales y conéctalo a Claude.", href: "https://luma.com/v5xo1bts" },
  { badge: "Panel virtual", date: "22 jul · 7:00 pm CR · 9:00 pm CL", title: "El Gran Debate de la IA", desc: "Cuatro expertos internacionales debaten el presente y el futuro de la IA en América Latina.", href: "https://youtu.be/6Elnm0-kxF0", cta: "Ver video" },
  { badge: "Presencial · Lima", date: "Vie 24 jul · 7:00 pm", title: "Parrilla de lanzamiento AINI — Perú", desc: "Encuentro presencial en Miraflores para dar inicio a la comunidad de AINI en Perú.", href: "https://luma.com/nt2m8r1m" },
];

const COURSES = [
  { tag: "Curso destacado", title: "Introducción a MCP" },
  { tag: "Curso destacado", title: "Preparación Claude Certified Associate (CCA)" },
];

const STEPS = [
  { n: "01", title: "Regístrate", desc: "Sin costo, con tu correo institucional o personal." },
  { n: "02", title: "Aprende con proyectos reales", desc: "Casos aplicados a organizaciones públicas y privadas de LATAM." },
  { n: "03", title: "Certifícate", desc: "Obtén una certificación validada por AINI y sus aliados." },
];

function Eyebrow({ children, tone = "cta" }) {
  return (
    <span className={`${styles.eyebrow} ${tone === "cta" ? styles.eyebrowCta : styles.eyebrowMuted}`}>
      {children}
    </span>
  );
}

function DisabledText({ children, dark = true }) {
  return (
    <span className={`${styles.disabledText} ${dark ? styles.disabledTextDark : styles.disabledTextLight}`}>
      {children}
    </span>
  );
}

function Header({ screen, isMobileNav, mobileMenuOpen, learnDropdownOpen, onGoHome, onGoEvents, onToggleMobileMenu, onToggleLearnDropdown }) {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div onClick={onGoHome} className={styles.brand}>
          <img src={isotipoWhite} alt="AINI" className={styles.brandLogo} />
          <span className={styles.brandName}>AINI</span>
        </div>

        {!isMobileNav && (
          <nav className={styles.nav}>
            {NAV_DISABLED.map((item) => <DisabledText key={item}>{item}</DisabledText>)}

            <div className={styles.learnWrap}>
              <button onClick={onToggleLearnDropdown} className={`${styles.learnButton} ${screen === "learn" ? styles.learnButtonActive : ""}`}>
                Aprender
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              {learnDropdownOpen && (
                <div className={styles.learnDropdown}>
                  <span className={styles.dropdownLabel}>Aprender</span>
                  <a href={ACADEMY_URL} className={styles.dropdownButton}>AINI Academy</a>
                  <div className={styles.dropdownDivider} />
                  <span className={styles.dropdownLabel}>Institución</span>
                  <span className={styles.dropdownItemDisabled}>Sobre nosotros</span>
                  <button onClick={onGoEvents} className={styles.dropdownButton}>Events</button>
                </div>
              )}
            </div>

            <DisabledText>Noticias</DisabledText>

            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={styles.joinLink}>
              <Button variant="primary" size="md">Únete</Button>
            </a>
          </nav>
        )}

        {isMobileNav && (
          <button onClick={onToggleMobileMenu} aria-label="Menú" className={styles.mobileMenuButton}>
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLineShort} />
          </button>
        )}
      </div>

      {isMobileNav && mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          {NAV_DISABLED.map((item) => (
            <span key={item} className={`${styles.mobileMenuRow} ${styles.mobileMenuDisabled}`}>{item}</span>
          ))}

          <button
            onClick={onToggleLearnDropdown}
            aria-expanded={learnDropdownOpen}
            className={`${styles.mobileMenuRow} ${styles.mobileAccordionTrigger}`}
          >
            Aprender
            <svg
              className={`${styles.mobileChevron} ${learnDropdownOpen ? styles.mobileChevronOpen : ""}`}
              width="10" height="6" viewBox="0 0 10 6" fill="none"
            >
              <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {learnDropdownOpen && (
            <div className={styles.mobileAccordionPanel}>
              <a href={ACADEMY_URL} className={styles.mobileAccordionButton}>AINI Academy</a>
              <span className={styles.mobileMenuDisabled}>Sobre nosotros</span>
              <button onClick={onGoEvents} className={styles.mobileAccordionButton}>Eventos</button>
            </div>
          )}

          <span className={`${styles.mobileMenuRow} ${styles.mobileMenuDisabled}`}>Noticias</span>

          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={styles.mobileJoinWrap}>
            <Button variant="primary" size="md">Únete</Button>
          </a>
        </div>
      )}
    </header>
  );
}

function EventCard({ ev, elevated = false }) {
  return (
    <div className={`${styles.eventCard} ${elevated ? styles.eventCardElevated : ""}`}>
      <span className={styles.eventBadge}>{ev.badge}</span>
      <span className={styles.eventDate}>{ev.date}</span>
      <h3 className={styles.eventTitle}>{ev.title}</h3>
      <p className={styles.eventDesc}>{ev.desc}</p>
      <a href={ev.href} target="_blank" rel="noopener noreferrer">
        <Button variant="secondary" size="sm">{ev.cta ?? "Inscribirse"}</Button>
      </a>
    </div>
  );
}

function HomeScreen({ onGoEvents }) {
  return (
    <main>
      <section className={styles.heroSection}>
        <img src={isotipo} alt="" className={styles.heroIsotipo} />
        <div className={styles.heroInner}>
          <Eyebrow>Instituto de IA para América Latina y el Caribe</Eyebrow>
          <h1 className={styles.heroTitle}>
            La inteligencia artificial de LATAM se construye en conjunto.
          </h1>
          <p className={styles.heroDesc}>
            AINI reúne al sector público, al sector privado, a la academia y a la sociedad civil para co-crear investigación, política y adopción responsable de IA en la región.
          </p>
          <div className={styles.heroActions}>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="lg">Únete a la comunidad</Button>
            </a>
          </div>
        </div>
      </section>

      <section className={styles.actorsSection}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionIntro}>
            <Eyebrow>Sobre AINI</Eyebrow>
            <h2 className={styles.sectionTitle}>Un think tank regional con cuatro actores en la misma mesa.</h2>
            <p className={styles.sectionLead}>
              Nuestra misión es co-crear investigación, desarrollo y innovación utilizando modelos de IA de frontera para América Latina y el Caribe, articulando a quienes deciden, invierten, investigan y representan a la ciudadanía.
            </p>
          </div>
          <div className={styles.actorsGrid}>
            {ACTORS.map((actor) => (
              <div key={actor.label} className={styles.actorCard}>
                <span className={styles.actorLabel}>{actor.label}</span>
                <span className={styles.actorDesc}>{actor.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.verticalsSection}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionIntro}>
            <Eyebrow>Nuestras verticales</Eyebrow>
            <h2 className={styles.sectionTitle}>Tres formas de trabajar con AINI.</h2>
          </div>
          <div className={styles.grid300}>
            {VERTICALS.map((v) => (
              <Card key={v.title} eyebrow={v.eyebrow} title={v.title}>
                <div className={styles.verticalBody}>
                  <span>{v.desc}</span>
                  <div>
                    {v.href ? (
                      <a href={v.href} className={styles.joinLink}>
                        <Button variant="outline" size="sm">{v.cta}</Button>
                      </a>
                    ) : (
                      <Button variant="outline" size="sm" disabled>{v.cta}</Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.bandedSection}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionIntro}>
            <Eyebrow>Agenda</Eyebrow>
            <h2 className={styles.sectionTitle}>Nuestros eventos.</h2>
          </div>
          <div className={styles.grid300}>
            {EVENTS.map((ev) => <EventCard key={ev.title} ev={ev} />)}
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.ctaInner}>
          <img src={isotipoWhite} alt="" className={styles.ctaLogo} />
          <h2 className={styles.ctaTitle}>Súmate a la comunidad de AINI.</h2>
          <p className={styles.ctaDesc}>
            Conversa con founders, funcionarios públicos, académicos y líderes de innovación que están construyendo el futuro de la IA en LATAM.
          </p>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <Button variant="primary" size="lg">Únete</Button>
          </a>
        </div>
      </section>
    </main>
  );
}

function EventsScreen() {
  return (
    <main>
      <section className={styles.pageHeroSection}>
        <div className={styles.pageHeroInner}>
          <Eyebrow tone="muted">Agenda</Eyebrow>
          <h1 className={styles.pageTitle}>Nuestros eventos</h1>
          <p className={styles.pageLead}>
            Talleres, paneles y encuentros presenciales de la comunidad AINI en América Latina y el Caribe.
          </p>
        </div>
      </section>
      <section className={styles.eventsListSection}>
        <div className={`${styles.grid300} ${styles.grid300Contained}`}>
          {EVENTS.map((ev) => <EventCard key={ev.title} ev={ev} elevated />)}
        </div>
      </section>
    </main>
  );
}

function LearnScreen() {
  return (
    <main>
      <section className={styles.pageHeroSection}>
        <div className={styles.pageHeroInner}>
          <Eyebrow tone="muted">Learn</Eyebrow>
          <h1 className={styles.pageTitle}>AINI Academy</h1>
          <p className={styles.pageLead}>
            Preparación práctica para certificaciones de IA, como Claude Certified Associate (CCA), pensada para equipos y profesionales de LATAM.
          </p>
        </div>
      </section>

      <section className={styles.coursesSection}>
        <div className={styles.coursesPanel}>
          <div className={styles.coursesPanelIntro}>
            <h2 className={styles.coursesPanelTitle}>Cursos destacados</h2>
            <p className={styles.coursesPanelDesc}>Nuevos cursos disponibles en AINI Academy, con certificado al completarlos.</p>
          </div>
          <div className={styles.grid220}>
            {COURSES.map((c) => (
              <div key={c.title} className={styles.courseCard}>
                <span className={styles.courseTag}>{c.tag}</span>
                <h3 className={styles.courseTitle}>{c.title}</h3>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 14L14 4M14 4H6M14 4V12" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.stepsSection}>
        <div className={`${styles.grid220} ${styles.grid220Contained}`}>
          {STEPS.map((s) => (
            <div key={s.n} className={styles.step}>
              <span className={styles.stepNumber}>{s.n}</span>
              <h3 className={styles.stepTitle}>{s.title}</h3>
              <p className={styles.stepDesc}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.learnCtaSection}>
        <div className={styles.learnCtaInner}>
          <h2 className={styles.learnCtaTitle}>¿Quieres inscribirte a AINI Academy?</h2>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <Button variant="primary" size="lg">Join us</Button>
          </a>
        </div>
      </section>
    </main>
  );
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.59l5.24 6.93zM17.61 20.64h2.04L6.49 3.24H4.3z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.55 15.57V8.43L15.82 12z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/ainilac", Icon: LinkedInIcon },
  { label: "X", href: "https://x.com/ainilac", Icon: XIcon },
  { label: "YouTube", href: "https://www.youtube.com/@ainilac", Icon: YouTubeIcon },
];

function Footer() {
  const columns = [
    { title: "Productos", links: [{ label: "DVZ", href: "https://x.dennisvivas.com/" }] },
    { title: "Soluciones", links: [{ label: "Financial Services", href: "https://dennisvivas.com/" }] },
    { title: "Recursos", links: [{ label: "Comunidad", href: WHATSAPP_URL }], disabled: ["Cursos"] },
    { title: "Sobre nosotros", disabled: ["AI Institute"] },
    { title: "Modelos", disabled: ["Claude"] },
    { title: "Términos y condiciones", disabled: ["Política de privacidad"] },
  ];
  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid}>
        {columns.map((col) => (
          <div key={col.title} className={styles.footerCol}>
            <span className={styles.footerColTitle}>{col.title}</span>
            {(col.links || []).map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className={styles.footerLink}>{l.label}</a>
            ))}
            {(col.disabled || []).map((label) => (
              <span key={label} className={styles.footerDisabled}>{label}</span>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.footerBottom}>
        <p className={styles.footerCopy}>© 2026 AINI — Instituto de Inteligencia Artificial para América Latina y el Caribe.</p>
        <div className={styles.socialRow}>
          {SOCIAL_LINKS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`AINI en ${label}`}
              className={styles.socialLink}
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export function AiniHome() {
  const [screen, setScreen] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [learnDropdownOpen, setLearnDropdownOpen] = useState(false);
  const mobileQuery = typeof window !== "undefined" ? "(max-width: 879px)" : null;
  const [isMobileNav, setIsMobileNav] = useState(
    typeof window !== "undefined" ? window.matchMedia(mobileQuery).matches : false
  );

  useEffect(() => {
    const mql = window.matchMedia(mobileQuery);
    const onChange = () => setIsMobileNav(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  const goTo = (next) => {
    setScreen(next);
    setMobileMenuOpen(false);
    setLearnDropdownOpen(false);
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  };

  return (
    <div className={styles.page}>
      <Header
        screen={screen}
        isMobileNav={isMobileNav}
        mobileMenuOpen={mobileMenuOpen}
        learnDropdownOpen={learnDropdownOpen}
        onGoHome={() => goTo("home")}
        onGoEvents={() => goTo("events")}
        onToggleMobileMenu={() => setMobileMenuOpen((v) => !v)}
        onToggleLearnDropdown={() => setLearnDropdownOpen((v) => !v)}
      />

      {screen === "home" && <HomeScreen />}
      {screen === "events" && <EventsScreen />}
      {screen === "learn" && <LearnScreen />}

      <Footer />
    </div>
  );
}
