# aini
AINI — Instituto de Inteligencia Artificial para América Latina y el Caribe. Think tank regional (público + privado + academia + sociedad civil) que co-crea políticas y estrategias de adopción de IA en la región. Interlocutores: ministerios, gremios empresariales, partners tecnológicos.

## Sistema de diseño

Este repo implementa el [AINI Design System](https://claude.ai/design/p/b75867ed-5879-461c-95c0-e56b9ce26196) — tokens de marca, 10 componentes React y un UI kit de flyer institucional, derivados del manual de marca oficial (`Sistema de marca AINI.pdf`). Tono institucional y creíble frente a gobierno — deliberadamente no estética "startup" (esquinas casi cuadradas, sin gradientes, sin badges tipo pill excepto el Switch).

- `src/design-system/tokens/` — color, tipografía, espaciado, fuentes (Source Serif 4 + Source Sans 3).
- `src/design-system/components/forms/` — Button, Input, Select, Checkbox, Radio, Switch.
- `src/design-system/components/feedback/` — Badge, Tag, Callout.
- `src/design-system/components/layout/` — Card.
- `src/design-system/ui_kits/institutional-flyer/` — plantilla de flyer (manual §05).
- `src/App.jsx` — guía de estilo viva que renderiza todos los fundamentos y componentes.

El isotipo en `src/design-system/assets/` ("Sol de nodos") es una reconstrucción geométrica placeholder — falta el archivo vectorial oficial (AI/SVG/EPS) para reemplazarlo.

### Desarrollo local

```bash
npm install
npm run dev
```
