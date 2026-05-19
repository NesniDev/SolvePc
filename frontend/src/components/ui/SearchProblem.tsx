import { useState, useEffect, useRef, useMemo, type ChangeEvent, type KeyboardEvent } from "react";
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
  datosSugerencias?: SugerenciaSolucion[];
}

export function SearchProblem({
  placeholder = "",
  size = "normal",
  datosSugerencias = [],
}: SearchProblemProps) {
  const [valorLocal, setValorLocal] = useState("");
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false);
  const contenedorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const manejarRestauracionPagina = (event: PageTransitionEvent) => {
      if (event.persisted) {
        setValorLocal("");
        setMostrarSugerencias(false);
      }
    };
    window.addEventListener("pageshow", manejarRestauracionPagina);
    return () => {
      window.removeEventListener("pageshow", manejarRestauracionPagina);
      setValorLocal("");
      setMostrarSugerencias(false);
    };
  }, []);

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

  const ejecutarBusqueda = (termino: string) => {
    const terminoLimpio = termino.trim()
    if (!terminoLimpio) return

    // 🔥 Crear URL limpia SIN parámetros previos
    const newUrl = new URL(window.location.href)

    // eliminar TODOS los parámetros
    newUrl.search = ""

    // agregar solo search
    newUrl.searchParams.set("search", terminoLimpio)

    // actualizar URL sin recargar
    window.history.pushState({}, "", newUrl.toString())

    // notificar cambios
    window.dispatchEvent(new Event("filtros-actualizados"))

    setValorLocal("")
    setMostrarSugerencias(false)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nuevoValor = e.target.value;
    setValorLocal(nuevoValor);
    setMostrarSugerencias(nuevoValor.trim().length > 0);
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