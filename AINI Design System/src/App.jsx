import React, { useState } from "react";
import isotipo from "./design-system/assets/isotipo-sol-de-nodos.svg";
import { Button, Input, Select, Checkbox, Radio, Switch, Badge, Tag, Callout, Card } from "./design-system";
import { InstitutionalFlyer } from "./design-system/ui_kits/institutional-flyer/InstitutionalFlyer.jsx";

const COLORS = [
  { name: "Negro", varName: "--ini-black", hex: "#171717" },
  { name: "Hueso", varName: "--ini-bone", hex: "#F7F2E9" },
  { name: "Arena", varName: "--ini-sand", hex: "#C9B79C" },
  { name: "Blanco", varName: "--ini-white", hex: "#FFFFFF" },
  { name: "Terracota", varName: "--ini-terracotta", hex: "#C1440E" },
  { name: "Dorado", varName: "--ini-gold", hex: "#D9A441" },
  { name: "Ámbar oscuro", varName: "--ini-amber-dark", hex: "#8A4B0C" },
];

function Section({ eyebrow, title, children }) {
  return (
    <section style={{ marginBottom: "var(--space-9)" }}>
      <span style={{ display: "block", fontSize: "var(--fs-caption)", fontWeight: "var(--fw-semibold)", letterSpacing: "var(--ls-eyebrow)", textTransform: "uppercase", color: "var(--ini-terracotta)", marginBottom: "var(--space-2)" }}>
        {eyebrow}
      </span>
      <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "var(--fs-h2)", margin: "0 0 var(--space-5) 0", color: "var(--text-primary)" }}>{title}</h2>
      {children}
    </section>
  );
}

function Row({ children, style }) {
  return <div style={{ display: "flex", gap: "var(--space-4)", alignItems: "center", flexWrap: "wrap", marginBottom: "var(--space-4)", ...style }}>{children}</div>;
}

export default function App() {
  const [checked, setChecked] = useState(true);
  const [modality, setModality] = useState("p");
  const [notifications, setNotifications] = useState(true);

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "var(--space-8) var(--space-5)" }}>
      <header style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", marginBottom: "var(--space-9)" }}>
        <img src={isotipo} alt="Isotipo AINI — sol de nodos" width={48} height={48} />
        <div>
          <div style={{ fontFamily: "var(--font-serif)", fontWeight: "var(--fw-bold)", fontSize: "var(--fs-wordmark)", lineHeight: 1 }}>AINI</div>
          <div style={{ fontSize: "var(--fs-small)", color: "var(--text-muted)" }}>
            Instituto de Inteligencia Artificial para América Latina y el Caribe
          </div>
        </div>
      </header>

      <Section eyebrow="Fundamentos" title="Color">
        <Row>
          {COLORS.map((c) => (
            <div key={c.varName} style={{ width: 120 }}>
              <div style={{ height: 64, borderRadius: "var(--radius-md)", background: c.hex, border: "1px solid var(--border-subtle)" }} />
              <div style={{ fontSize: "var(--fs-caption)", marginTop: "var(--space-2)", color: "var(--text-primary)" }}>{c.name}</div>
              <div style={{ fontSize: "var(--fs-caption)", color: "var(--text-muted)" }}>{c.hex}</div>
            </div>
          ))}
        </Row>
      </Section>

      <Section eyebrow="Fundamentos" title="Tipografía">
        <div style={{ fontFamily: "var(--font-serif)", fontSize: "var(--fs-h1)", fontWeight: "var(--fw-bold)", marginBottom: "var(--space-2)" }}>
          Source Serif 4 — títulos
        </div>
        <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-body)", lineHeight: "var(--lh-body)", color: "var(--text-muted)", maxWidth: 640 }}>
          Source Sans 3 — copy institucional y componentes de interfaz. AINI es un think tank regional
          que co-crea políticas y estrategia de adopción de IA en América Latina y el Caribe.
        </div>
      </Section>

      <Section eyebrow="Componentes" title="Formularios">
        <Row>
          <Button variant="primary">Enviar propuesta</Button>
          <Button variant="secondary">Ver detalles</Button>
          <Button variant="outline">Descargar PDF</Button>
          <Button variant="ghost">Cancelar</Button>
          <Button variant="primary" disabled>Deshabilitado</Button>
        </Row>
        <Row style={{ maxWidth: 320 }}>
          <Input label="Nombre de la institución" placeholder="Ministerio de..." />
        </Row>
        <Row style={{ maxWidth: 320 }}>
          <Select
            label="Sector"
            options={[
              { value: "gob", label: "Gobierno" },
              { value: "aca", label: "Academia" },
              { value: "priv", label: "Sector privado" },
            ]}
          />
        </Row>
        <Row>
          <Checkbox label="Acepto los términos" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
          <Radio name="modality" label="Presencial" checked={modality === "p"} onChange={() => setModality("p")} />
          <Radio name="modality" label="Virtual" checked={modality === "v"} onChange={() => setModality("v")} />
          <Switch label="Notificaciones" checked={notifications} onChange={(e) => setNotifications(e.target.checked)} />
        </Row>
      </Section>

      <Section eyebrow="Componentes" title="Feedback">
        <Row>
          <Badge tone="neutral">Borrador</Badge>
          <Badge tone="dark">Publicado</Badge>
          <Badge tone="cta">Convocatoria abierta</Badge>
          <Badge tone="gold">Destacado</Badge>
        </Row>
        <Row>
          <Tag>Gobernanza de datos</Tag>
          <Tag onRemove={() => {}}>Salud</Tag>
          <Tag onRemove={() => {}}>Educación</Tag>
        </Row>
        <Callout title="Fecha límite" tone="notice">
          Las postulaciones cierran el 30 de septiembre.
        </Callout>
      </Section>

      <Section eyebrow="Componentes" title="Layout — Card">
        <div style={{ maxWidth: 420 }}>
          <Card
            eyebrow="Política pública"
            title="Marco regulatorio de IA en salud"
            footer={<Button size="sm" variant="outline">Leer más</Button>}
          >
            Resumen del brief de política sobre adopción responsable de IA en sistemas de salud pública.
          </Card>
        </div>
      </Section>

      <Section eyebrow="UI Kit" title="Flyer institucional">
        <InstitutionalFlyer />
      </Section>
    </div>
  );
}
