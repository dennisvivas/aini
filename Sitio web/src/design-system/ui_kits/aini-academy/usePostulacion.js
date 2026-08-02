import { useEffect, useState } from "react";
import { OLAS } from "./academia.config.js";
import { estadoPostulacion } from "./olas.js";

/**
 * Estado de la postulación: qué ola está vigente y si todavía se puede postular.
 *
 * Lo comparten la landing y la página de postulación para que las dos lean el
 * mismo reloj: si una pestaña cruza el cierre de la última ola, las dos pasan a
 * «cerradas» al mismo tiempo y no queda un formulario vivo en una de ellas.
 *
 * El tic de cada segundo lo lleva el contador, no la página: aquí se devuelve
 * el estado anterior sin tocar cuando nada cambió, y React se salta el
 * re-render. Solo se repinta al pasar de una ola a la siguiente o al cerrarse.
 */
export function useEstadoPostulacion() {
  const [estado, setEstado] = useState(() => estadoPostulacion(Date.now(), OLAS));

  useEffect(() => {
    const id = setInterval(() => {
      const siguiente = estadoPostulacion(Date.now(), OLAS);
      setEstado((actual) =>
        actual.fase === siguiente.fase && actual.ola?.id === siguiente.ola?.id ? actual : siguiente
      );
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return estado;
}
