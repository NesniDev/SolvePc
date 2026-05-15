import { useState, useEffect, useRef, type ChangeEvent, type KeyboardEvent } from "react";
import { useStore } from "@nanostores/react";
import { terminoBusquedaStore } from "@store/searchStore";
import "./SearchBox.css";

type Size = "normal" | "big";

// Interfaz ligera para las sugerencias, evitando importar toda la interfaz 'Solutions'
export interface SugerenciaSolucion {
  title: string;
  category: string;
  slug: string;
}

interface SearchProblemProps {
  placeholder?: string;
  size?: Size;
  redirectTo?: string;
  datosSugerencias?: SugerenciaSolucion[]; // Nuevo prop para recibir los datos a filtrar
}

export function SearchProblem({
  placeholder = "Buscar solución...",
  size = "normal",
  redirectTo,
  datosSugerencias = [],
}: SearchProblemProps) {
  const busquedaGlobal = useStore(terminoBusquedaStore);
  const [valorLocal, setValorLocal] = useState<string>(busquedaGlobal);

  // Estados y referencias para el menú de sugerencias
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false);
  const contenedorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setValorLocal(busquedaGlobal);
  }, [busquedaGlobal]);

  // Manejo del clic fuera del componente para cerrar las sugerencias
  useEffect(() => {
    const manejarClicFuera = (event: MouseEvent) => {
      if (contenedorRef.current && !contenedorRef.current.contains(event.target as Node)) {
        setMostrarSugerencias(false);
      }
    };
    document.addEventListener("mousedown", manejarClicFuera);
    return () => document.removeEventListener("mousedown", manejarClicFuera);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nuevoValor = e.target.value;
    setValorLocal(nuevoValor);
    setMostrarSugerencias(nuevoValor.trim().length > 0);
  };

  // Centralizamos la lógica de búsqueda para reutilizarla
  const ejecutarBusqueda = (termino: string) => {
    if (redirectTo) {
      window.location.href = `${redirectTo}?q=${encodeURIComponent(termino)}`;
    } else {
      terminoBusquedaStore.set(termino);

      const nuevaUrl = termino
        ? `${window.location.pathname}?q=${encodeURIComponent(termino)}`
        : window.location.pathname;

      window.history.replaceState({}, '', nuevaUrl);
      setMostrarSugerencias(false);
    }
  };

  const handleSuggestionClick = (titulo: string) => {
    setValorLocal(titulo);
    ejecutarBusqueda(titulo);
  };

  const handleSearch = () => ejecutarBusqueda(valorLocal);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
      setMostrarSugerencias(false);
    }
  };

  // Al hacer clic en una sugerencia, actualizamos el input y disparamos la búsqueda
  const seleccionarSugerencia = (titulo: string) => {
    setValorLocal(titulo);
    ejecutarBusqueda(titulo);
  };

  // Filtramos las sugerencias en tiempo real
  const sugerenciasFiltradas = datosSugerencias
    .filter((sug) => sug.title.toLowerCase().includes(valorLocal.toLowerCase()))
    .slice(0, 5);

  return (

    <div
      ref={contenedorRef}
      className={size === "normal" ? "box-input-normal" : "box-input"}
      style={{ position: 'relative' }} // Crítico: asegura que las sugerencias floten respecto a este contenedor
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
      {/* Renderizado condicional del menú desplegable */}
      {mostrarSugerencias && sugerenciasFiltradas.length > 0 && (
        <ul className="sugerencias-lista">
          {sugerenciasFiltradas.map((sug) => (
            <li
              key={sug.slug}
              onClick={() => seleccionarSugerencia(sug.title)}
              className="sugerencia-item"
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