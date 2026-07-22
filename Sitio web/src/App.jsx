import React, { useState } from "react";
import isotipo from "./design-system/assets/isotipo-sol-de-nodos.svg";
import { Button, Input, Select, Checkbox, Radio, Switch, Badge, Tag, Callout, Card } from "./design-system";
import { InstitutionalFlyer } from "./design-system/ui_kits/institutional-flyer/InstitutionalFlyer.jsx";
import styles from "./App.module.css";

const COLORS = [
  { name: "Negro", varName: "--ini-black", hex: "#171717" },
  { name: "Hueso", varName: "--ini-bone", hex: "#F7F2E9" },
  { name: "Arena", varName: "--ini-sand", hex: "#C9B79C" },
  { name: "Blanco", varName: "--ini-white", hex: "#FFFFFF" },
  { name: "Terracota", varName: "--ini-terracotta", hex: "#C1440E" },
  { name: "Dorado", varName: "--ini-gold", hex: "#D9A441" },
  { name: "Ámbar oscuro", varName: "--ini-amber-dark", hex: "#8A4B0C" },
];

const SWATCH_CLASS = {
  "--ini-black": styles.swatchBlack,
  "--ini-bone": styles.swatchBone,
  "--ini-sand": styles.swatchSand,
  "--ini-white": styles.swatchWhite,
  "--ini-terracotta": styles.swatchTerracotta,
  "--ini-gold": styles.swatchGold,
  "--ini-amber-dark": styles.swatchAmberDark,
};

function Section({ eyebrow, title, children }) {
  return (
    <section className={styles.section}>
      <span className={styles.sectionEyebrow}>
        {eyebrow}
      </span>
      <h2 className={styles.sectionTitle}>{title}</h2>
      {children}
    </section>
  );
}

function Row({ children, className = "" }) {
  return <div className={`${styles.row} ${className}`}>{children}</div>;
}

export default function App() {
  const [checked, setChecked] = useState(true);
  const [modality, setModality] = useState("p");
  const [notifications, setNotifications] = useState(true);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <img src={isotipo} alt="Isotipo AINI — sol de nodos" width={48} height={48} />
        <div>
          <div className={styles.wordmark}>AINI</div>
          <div className={styles.wordmarkSub}>
            Instituto de Inteligencia Artificial para América Latina y el Caribe
          </div>
        </div>
      </header>

      <Section eyebrow="Fundamentos" title="Color">
        <Row>
          {COLORS.map((c) => (
            <div key={c.varName} className={styles.swatchWrap}>
              <div className={`${styles.swatch} ${SWATCH_CLASS[c.varName] || ""}`} />
              <div className={styles.colorName}>{c.name}</div>
              <div className={styles.colorHex}>{c.hex}</div>
            </div>
          ))}
        </Row>
      </Section>

      <Section eyebrow="Fundamentos" title="Tipografía">
        <div className={styles.typeHeading}>
          Source Serif 4 — títulos
        </div>
        <div className={styles.typeBody}>
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
        <Row className={styles.rowNarrow}>
          <Input label="Nombre de la institución" placeholder="Ministerio de..." />
        </Row>
        <Row className={styles.rowNarrow}>
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
        <div className={styles.cardWrap}>
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
