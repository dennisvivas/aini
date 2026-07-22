import React, { useEffect, useState } from "react";
import isotipo from "../../assets/isotipo-sol-de-nodos.svg";
import isotipoWhite from "../../assets/isotipo-sol-de-nodos-white.svg";
import { Button, Card } from "../../index.js";

const WHATSAPP_URL = "https://chat.whatsapp.com/EHKnMXdPdBO7dHNvIYj5Fc";

const NAV_DISABLED = ["Investigación", "Política", "Compromisos"];

const ACTORS = [
  { label: "Sector público", desc: "Ministerios e instituciones de gobierno que definen la política pública de IA." },
  { label: "Sector privado", desc: "Gremios empresariales y compañías que adoptan IA en sus operaciones." },
  { label: "Academia", desc: "Universidades y centros de investigación que aportan evidencia y talento." },
  { label: "Sociedad civil", desc: "Organizaciones que representan el interés ciudadano en el uso responsable de la IA." },
];

const VERTICALS = [
  { eyebrow: "Educación", title: "AINI Academy", desc: "Preparación para certificaciones de IA, con casos prácticos a necesidades de la región. Lanzamiento primer curso: 15 de agosto.", cta: "Postular" },
  { eyebrow: "Consultoría", title: "AINI Consulting", desc: "Consultoría e implementación de IA para organizaciones públicas y privadas, desde la estratégica hasta la implantación.", cta: "Despegar" },
  { eyebrow: "Inversión", title: "AINI Venture", desc: "Inversión y aceleración de fundadores IA. Mentorías e incorporación de nuestra red de agentes IA en tu organización.", cta: "Escalar" },
];

const EVENTS = [
  { badge: "Taller virtual", date: "Mié 22 jul · 7:00 pm (GMT-5)", title: "MCP en acción: conecta tu base de datos a Claude", desc: "Clase de prueba en vivo: construye un servidor MCP sobre datos reales y conéctalo a Claude.", href: "https://luma.com/v5xo1bts" },
  { badge: "Panel virtual", date: "22 jul · 7:00 pm CR · 9:00 pm CL", title: "El Gran Debate de la IA", desc: "Cuatro expertos internacionales debaten el presente y el futuro de la IA en América Latina.", href: "https://luma.com/ts5mgwoq" },
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
    <span style={{
      fontSize: "var(--fs-caption)", fontWeight: "var(--fw-semibold)", letterSpacing: "var(--ls-eyebrow)",
      textTransform: "uppercase", color: tone === "cta" ? "var(--ini-terracotta)" : "var(--text-muted)",
    }}>
      {children}
    </span>
  );
}

function DisabledText({ children, dark = true }) {
  return (
    <span style={{ fontSize: "var(--fs-body)", color: dark ? "rgba(255,255,255,0.35)" : "rgba(23,23,23,0.35)", cursor: "default", userSelect: "none" }}>
      {children}
    </span>
  );
}

function Header({ screen, isMobileNav, mobileMenuOpen, learnDropdownOpen, onGoHome, onGoEvents, onToggleMobileMenu, onToggleLearnDropdown }) {
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 40, background: "var(--ini-black)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <div onClick={onGoHome} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
          <img src={isotipoWhite} alt="AINI" style={{ width: 30, height: 30, display: "block" }} />
          <span style={{ fontFamily: "var(--font-serif)", fontWeight: "var(--fw-bold)", fontSize: "var(--fs-h3)", color: "var(--ini-white)", letterSpacing: "0.01em" }}>AINI</span>
        </div>

        {!isMobileNav && (
          <nav style={{ display: "flex", alignItems: "center", gap: 28 }}>
            {NAV_DISABLED.map((item) => <DisabledText key={item}>{item}</DisabledText>)}

            <div style={{ position: "relative" }}>
              <button onClick={onToggleLearnDropdown} style={{
                background: "none", border: "none", padding: 0, display: "flex", alignItems: "center", gap: 6,
                fontFamily: "var(--font-sans)", fontSize: "var(--fs-body)", fontWeight: screen === "learn" ? "var(--fw-bold)" : "var(--fw-regular)",
                color: "var(--ini-white)", cursor: "pointer",
              }}>
                Aprender
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              {learnDropdownOpen && (
                <div style={{ position: "absolute", top: 36, left: 0, background: "var(--surface-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-card)", padding: 12, minWidth: 200, display: "flex", flexDirection: "column", gap: 4 }}>
                  <span style={{ padding: "4px 12px", fontSize: "var(--fs-caption)", fontWeight: "var(--fw-semibold)", letterSpacing: "var(--ls-eyebrow)", textTransform: "uppercase", color: "var(--text-muted)" }}>Aprender</span>
                  <span style={{ padding: "10px 12px", fontFamily: "var(--font-sans)", fontSize: "var(--fs-body)", color: "rgba(23,23,23,0.35)", cursor: "default" }}>AINI Academy</span>
                  <div style={{ height: 1, background: "var(--border-subtle)", margin: "6px 4px" }} />
                  <span style={{ padding: "4px 12px", fontSize: "var(--fs-caption)", fontWeight: "var(--fw-semibold)", letterSpacing: "var(--ls-eyebrow)", textTransform: "uppercase", color: "var(--text-muted)" }}>Institución</span>
                  <span style={{ padding: "10px 12px", fontFamily: "var(--font-sans)", fontSize: "var(--fs-body)", color: "rgba(23,23,23,0.35)", cursor: "default" }}>Sobre nosotros</span>
                  <button onClick={onGoEvents} style={{ width: "100%", textAlign: "left", background: "none", border: "none", padding: "10px 12px", borderRadius: "var(--radius-sm)", fontFamily: "var(--font-sans)", fontSize: "var(--fs-body)", fontWeight: "var(--fw-medium)", color: "var(--text-primary)", cursor: "pointer" }}>Events</button>
                </div>
              )}
            </div>

            <DisabledText>Noticias</DisabledText>

            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <Button variant="primary" size="md">Únete</Button>
            </a>
          </nav>
        )}

        {isMobileNav && (
          <button onClick={onToggleMobileMenu} aria-label="Menú" style={{ background: "none", border: "none", padding: 8, cursor: "pointer", display: "flex", flexDirection: "column", gap: 5 }}>
            <span style={{ width: 24, height: 2, background: "var(--ini-white)", display: "block" }} />
            <span style={{ width: 24, height: 2, background: "var(--ini-white)", display: "block" }} />
            <span style={{ width: 16, height: 2, background: "var(--ini-white)", display: "block" }} />
          </button>
        )}
      </div>

      {isMobileNav && mobileMenuOpen && (
        <div style={{ background: "var(--ini-black)", borderTop: "1px solid rgba(255,255,255,0.12)", padding: "16px 20px 24px", display: "flex", flexDirection: "column", gap: 4 }}>
          {NAV_DISABLED.map((item) => (
            <span key={item} style={{ padding: "12px 4px", fontSize: "var(--fs-body)", color: "rgba(255,255,255,0.35)", cursor: "default" }}>{item}</span>
          ))}
          <span style={{ padding: "12px 4px", fontSize: "var(--fs-body)", color: "rgba(255,255,255,0.35)", cursor: "default" }}>AINI Academy (Aprender)</span>
          <button onClick={onGoEvents} style={{ textAlign: "left", background: "none", border: "none", padding: "12px 4px", fontFamily: "var(--font-sans)", fontSize: "var(--fs-body)", fontWeight: "var(--fw-medium)", color: "var(--ini-white)", cursor: "pointer" }}>Eventos</button>
          <span style={{ padding: "12px 4px", fontSize: "var(--fs-body)", color: "rgba(255,255,255,0.35)", cursor: "default" }}>Sobre nosotros</span>
          <span style={{ padding: "12px 4px", fontSize: "var(--fs-body)", color: "rgba(255,255,255,0.35)", cursor: "default" }}>Noticias</span>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{ marginTop: 10 }}>
            <Button variant="primary" size="md">Únete</Button>
          </a>
        </div>
      )}
    </header>
  );
}

function EventCard({ ev, elevated = false }) {
  return (
    <div style={{
      background: elevated ? "var(--ini-white)" : "var(--surface-page)",
      border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", padding: 24,
      display: "flex", flexDirection: "column", gap: 14,
      boxShadow: elevated ? "var(--shadow-card)" : "none",
    }}>
      <span style={{ alignSelf: "flex-start", fontSize: "var(--fs-caption)", fontWeight: "var(--fw-semibold)", letterSpacing: "var(--ls-eyebrow)", textTransform: "uppercase", padding: "4px 10px", borderRadius: "var(--radius-sm)", background: "var(--ini-black)", color: "var(--ini-white)" }}>{ev.badge}</span>
      <span style={{ fontSize: "var(--fs-small)", fontWeight: "var(--fw-semibold)", color: "var(--ini-terracotta)" }}>{ev.date}</span>
      <h3 style={{ margin: 0, fontFamily: "var(--font-serif)", fontSize: "var(--fs-h3)", fontWeight: "var(--fw-semibold)", color: "var(--text-primary)" }}>{ev.title}</h3>
      <p style={{ margin: 0, fontSize: "var(--fs-body)", lineHeight: "var(--lh-body)", color: "var(--text-muted)", flex: 1 }}>{ev.desc}</p>
      <a href={ev.href} target="_blank" rel="noopener noreferrer">
        <Button variant="secondary" size="sm">Inscribirse</Button>
      </a>
    </div>
  );
}

function HomeScreen({ onGoEvents }) {
  return (
    <main>
      <section style={{ position: "relative", overflow: "hidden", padding: "72px 20px 88px", background: "var(--surface-page)" }}>
        <img src={isotipo} alt="" style={{ position: "absolute", top: -60, right: -60, width: 340, height: 340, opacity: 0.08, pointerEvents: "none" }} />
        <div style={{ maxWidth: 760, margin: "0 auto", position: "relative", display: "flex", flexDirection: "column", gap: 28 }}>
          <Eyebrow>Instituto de IA para América Latina y el Caribe</Eyebrow>
          <h1 style={{ margin: 0, fontFamily: "var(--font-serif)", fontWeight: "var(--fw-bold)", fontSize: "var(--fs-display)", lineHeight: "var(--lh-tight)", color: "var(--text-primary)" }}>
            La inteligencia artificial de LATAM se construye en conjunto.
          </h1>
          <p style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: "var(--fs-body-lg)", lineHeight: "var(--lh-body)", color: "var(--text-muted)", maxWidth: 620 }}>
            AINI reúne al sector público, al sector privado, a la academia y a la sociedad civil para co-crear investigación, política y adopción responsable de IA en la región.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 8 }}>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="lg">Únete a la comunidad</Button>
            </a>
          </div>
        </div>
      </section>

      <section style={{ padding: "80px 20px", background: "var(--ini-white)", borderTop: "1px solid var(--border-subtle)", borderBottom: "1px solid var(--border-subtle)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", flexDirection: "column", gap: 40 }}>
          <div style={{ maxWidth: 680, display: "flex", flexDirection: "column", gap: 16 }}>
            <Eyebrow>Sobre AINI</Eyebrow>
            <h2 style={{ margin: 0, fontFamily: "var(--font-serif)", fontWeight: "var(--fw-semibold)", fontSize: "var(--fs-h1)", color: "var(--text-primary)" }}>Un think tank regional con cuatro actores en la misma mesa.</h2>
            <p style={{ margin: 0, fontSize: "var(--fs-body-lg)", lineHeight: "var(--lh-body)", color: "var(--text-muted)" }}>
              Nuestra misión es co-crear investigación, desarrollo y innovación utilizando modelos de IA de frontera para América Latina y el Caribe, articulando a quienes deciden, invierten, investigan y representan a la ciudadanía.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {ACTORS.map((actor) => (
              <div key={actor.label} style={{ background: "var(--surface-page)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", padding: 24, display: "flex", flexDirection: "column", gap: 8 }}>
                <span style={{ fontFamily: "var(--font-serif)", fontWeight: "var(--fw-semibold)", fontSize: "var(--fs-h3)", color: "var(--text-primary)" }}>{actor.label}</span>
                <span style={{ fontSize: "var(--fs-body)", lineHeight: "var(--lh-body)", color: "var(--text-muted)" }}>{actor.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "80px 20px", background: "var(--surface-page)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", flexDirection: "column", gap: 40 }}>
          <div style={{ maxWidth: 680, display: "flex", flexDirection: "column", gap: 16 }}>
            <Eyebrow>Nuestras verticales</Eyebrow>
            <h2 style={{ margin: 0, fontFamily: "var(--font-serif)", fontWeight: "var(--fw-semibold)", fontSize: "var(--fs-h1)", color: "var(--text-primary)" }}>Tres formas de trabajar con AINI.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {VERTICALS.map((v) => (
              <Card key={v.title} eyebrow={v.eyebrow} title={v.title}>
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  <span>{v.desc}</span>
                  <div>
                    <Button variant="outline" size="sm" disabled>{v.cta}</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "80px 20px", background: "var(--ini-white)", borderTop: "1px solid var(--border-subtle)", borderBottom: "1px solid var(--border-subtle)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", flexDirection: "column", gap: 40 }}>
          <div style={{ maxWidth: 680, display: "flex", flexDirection: "column", gap: 16 }}>
            <Eyebrow>Agenda</Eyebrow>
            <h2 style={{ margin: 0, fontFamily: "var(--font-serif)", fontWeight: "var(--fw-semibold)", fontSize: "var(--fs-h1)", color: "var(--text-primary)" }}>Próximos eventos.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {EVENTS.map((ev) => <EventCard key={ev.title} ev={ev} />)}
          </div>
        </div>
      </section>

      <section style={{ padding: "88px 20px", background: "var(--ini-black)", textAlign: "center" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
          <img src={isotipoWhite} alt="" style={{ width: 48, height: 48 }} />
          <h2 style={{ margin: 0, fontFamily: "var(--font-serif)", fontWeight: "var(--fw-semibold)", fontSize: "var(--fs-h1)", color: "var(--ini-white)" }}>Súmate a la comunidad de AINI.</h2>
          <p style={{ margin: 0, fontSize: "var(--fs-body-lg)", lineHeight: "var(--lh-body)", color: "rgba(255,255,255,0.75)" }}>
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
      <section style={{ padding: "72px 20px 48px", background: "var(--surface-page)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", flexDirection: "column", gap: 20 }}>
          <Eyebrow tone="muted">Agenda</Eyebrow>
          <h1 style={{ margin: 0, fontFamily: "var(--font-serif)", fontWeight: "var(--fw-bold)", fontSize: "var(--fs-display)", color: "var(--text-primary)" }}>Próximos eventos</h1>
          <p style={{ margin: 0, fontSize: "var(--fs-body-lg)", lineHeight: "var(--lh-body)", color: "var(--text-muted)", maxWidth: 640 }}>
            Talleres, paneles y encuentros presenciales de la comunidad AINI en América Latina y el Caribe.
          </p>
        </div>
      </section>
      <section style={{ padding: "0 20px 88px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {EVENTS.map((ev) => <EventCard key={ev.title} ev={ev} elevated />)}
        </div>
      </section>
    </main>
  );
}

function LearnScreen() {
  return (
    <main>
      <section style={{ padding: "72px 20px 48px", background: "var(--surface-page)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", flexDirection: "column", gap: 20 }}>
          <Eyebrow tone="muted">Learn</Eyebrow>
          <h1 style={{ margin: 0, fontFamily: "var(--font-serif)", fontWeight: "var(--fw-bold)", fontSize: "var(--fs-display)", color: "var(--text-primary)" }}>AINI Academy</h1>
          <p style={{ margin: 0, fontSize: "var(--fs-body-lg)", lineHeight: "var(--lh-body)", color: "var(--text-muted)", maxWidth: 640 }}>
            Preparación práctica para certificaciones de IA, como Claude Certified Associate (CCA), pensada para equipos y profesionales de LATAM.
          </p>
        </div>
      </section>

      <section style={{ padding: "0 20px 80px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", background: "var(--ini-sand)", borderRadius: "var(--radius-lg)", padding: 40, display: "grid", gridTemplateColumns: "minmax(220px,1fr) minmax(280px, 2fr)", gap: 32, alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <h2 style={{ margin: 0, fontFamily: "var(--font-serif)", fontWeight: "var(--fw-semibold)", fontSize: "var(--fs-h1)", color: "var(--ini-black)" }}>Cursos destacados</h2>
            <p style={{ margin: 0, fontSize: "var(--fs-body)", lineHeight: "var(--lh-body)", color: "rgba(23,23,23,0.75)" }}>Nuevos cursos disponibles en AINI Academy, con certificado al completarlos.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {COURSES.map((c) => (
              <div key={c.title} style={{ background: "var(--ini-white)", borderRadius: "var(--radius-md)", padding: 24, display: "flex", flexDirection: "column", gap: 20, minHeight: 160, boxShadow: "var(--shadow-card)" }}>
                <span style={{ fontSize: "var(--fs-caption)", fontWeight: "var(--fw-semibold)", letterSpacing: "var(--ls-eyebrow)", textTransform: "uppercase", color: "var(--text-muted)" }}>{c.tag}</span>
                <h3 style={{ margin: 0, fontFamily: "var(--font-serif)", fontWeight: "var(--fw-semibold)", fontSize: "var(--fs-h3)", color: "var(--text-primary)", flex: 1 }}>{c.title}</h3>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 14L14 4M14 4H6M14 4V12" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "0 20px 88px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
          {STEPS.map((s) => (
            <div key={s.n} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ fontFamily: "var(--font-serif)", fontWeight: "var(--fw-bold)", fontSize: "var(--fs-h1)", color: "var(--ini-sand)" }}>{s.n}</span>
              <h3 style={{ margin: 0, fontFamily: "var(--font-sans)", fontWeight: "var(--fw-semibold)", fontSize: "var(--fs-body-lg)", color: "var(--text-primary)" }}>{s.title}</h3>
              <p style={{ margin: 0, fontSize: "var(--fs-body)", lineHeight: "var(--lh-body)", color: "var(--text-muted)" }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "72px 20px", background: "var(--ini-white)", borderTop: "1px solid var(--border-subtle)", textAlign: "center" }}>
        <div style={{ maxWidth: 560, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
          <h2 style={{ margin: 0, fontFamily: "var(--font-serif)", fontWeight: "var(--fw-semibold)", fontSize: "var(--fs-h2)", color: "var(--text-primary)" }}>¿Quieres inscribirte a AINI Academy?</h2>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <Button variant="primary" size="lg">Join us</Button>
          </a>
        </div>
      </section>
    </main>
  );
}

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
    <footer style={{ marginTop: "auto", background: "var(--ini-black)", padding: "56px 20px 32px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 32, paddingBottom: 32, borderBottom: "1px solid rgba(255,255,255,0.14)" }}>
        {columns.map((col) => (
          <div key={col.title} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <span style={{ fontSize: "var(--fs-caption)", fontWeight: "var(--fw-semibold)", letterSpacing: "var(--ls-eyebrow)", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}>{col.title}</span>
            {(col.links || []).map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" style={{ color: "var(--ini-white)", fontSize: "var(--fs-body)" }}>{l.label}</a>
            ))}
            {(col.disabled || []).map((label) => (
              <span key={label} style={{ fontSize: "var(--fs-body)", color: "rgba(255,255,255,0.35)", cursor: "default" }}>{label}</span>
            ))}
          </div>
        ))}
      </div>
      <p style={{ maxWidth: 1280, margin: "24px auto 0", fontSize: "var(--fs-caption)", color: "rgba(255,255,255,0.4)" }}>© 2026 AINI — Instituto de Inteligencia Artificial para América Latina y el Caribe.</p>
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
    <div style={{ minHeight: "100vh", background: "var(--surface-page)", fontFamily: "var(--font-sans)", color: "var(--text-primary)", display: "flex", flexDirection: "column" }}>
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
