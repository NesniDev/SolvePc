import { useState, useEffect, useRef, useMemo, type ChangeEvent, type KeyboardEvent } from "react";
import { useStore } from "@nanostores/react";
import { terminoBusquedaStore } from "@store/searchStore";
import "./SearchBox.css";

type Size = "normal" | "big";

export interface SugerenciaSolucion {
  title: string;
  category: string;
  slug: string;
}

interface SearchProblemProps {
  placeholder?: string;
  size?: Size;
  redirectTo?: string;
  datosSugerencias?: SugerenciaSolucion[];
}

export function SearchProblem({
  placeholder = "",
  size = "normal",
  datosSugerencias = [],
}: SearchProblemProps) {
  const busquedaGlobal = useStore(terminoBusquedaStore);

  const [valorLocal, setValorLocal] = useState<string>(busquedaGlobal);
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false);
  const contenedorRef = useRef<HTMLDivElement>(null);

  // 1. Limpieza rigurosa al navegar hacia otra vista y al usar el botón "Atrás"
  useEffect(() => {
    // Si el navegador restaura la página desde su caché interna (bfcache)
    const manejarRestauracionPagina = (event: PageTransitionEvent) => {
      if (event.persisted) {
        setValorLocal("");
        terminoBusquedaStore.set("");
        setMostrarSugerencias(false);
      }
    };

    window.addEventListener("pageshow", manejarRestauracionPagina);

    // Función de desmontaje (Cleanup): Se ejecuta al salir de la vista (ej. al hacer clic en una card)
    return () => {
      window.removeEventListener("pageshow", manejarRestauracionPagina);
      setValorLocal("");
      terminoBusquedaStore.set("");
      setMostrarSugerencias(false);
    };
  }, []);

  // 3. Cerrar sugerencias al hacer clic fuera
  useEffect(() => {
    const manejarClicFuera = (event: MouseEvent) => {
      if (contenedorRef.current && !contenedorRef.current.contains(event.target as Node)) {
        setMostrarSugerencias(false);
      }
    };
    document.addEventListener("mousedown", manejarClicFuera);
    return () => document.removeEventListener("mousedown", manejarClicFuera);
  }, []);

  const sugerenciasFiltradas = useMemo(() => {
    if (!valorLocal.trim()) return [];
    return datosSugerencias
      .filter((sug) => sug.title.toLowerCase().includes(valorLocal.toLowerCase()))
      .slice(0, 5);
  }, [datosSugerencias, valorLocal]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nuevoValor = e.target.value;
    setValorLocal(nuevoValor);
    setMostrarSugerencias(nuevoValor.trim().length > 0);
  };

  const ejecutarBusqueda = (termino: string) => {
    const terminoLimpio = termino.trim();
    if (!terminoLimpio) return;

    // Limpieza inmediata visual
    setValorLocal("");
    setMostrarSugerencias(false);

  };

  const handleSearch = () => ejecutarBusqueda(valorLocal);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div
      ref={contenedorRef}
      className={size === "normal" ? "box-input-normal" : "box-input"}
      style={{ position: "relative" }}
    >
      <input
        type="search"
        placeholder={placeholder}
        value={valorLocal}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setMostrarSugerencias(valorLocal.trim().length > 0)}
        required
      />
      <button onClick={handleSearch}>Buscar</button>

      {mostrarSugerencias && sugerenciasFiltradas.length > 0 && (
        <ul className="sugerencias-lista" role="listbox">
          {sugerenciasFiltradas.map((sug) => (
            <li
              key={sug.slug}
              onClick={() => ejecutarBusqueda(sug.title)}
              className="sugerencia-item"
              role="option"
              aria-selected={false}
            >
              <span className="sugerencia-categoria">[{sug.category}]</span>
              <span className="sugerencia-titulo">{sug.title}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}