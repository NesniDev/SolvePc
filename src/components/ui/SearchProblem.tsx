import { useState, useEffect, type ChangeEvent, type KeyboardEvent } from "react";
import { useStore } from "@nanostores/react";
import { terminoBusquedaStore } from "@store/searchStore";
import "./SearchBox.css";

type Size = "normal" | "big";

interface SearchProblemProps {
  placeholder?: string;
  size?: Size;
  redirectTo?: string; 
}

export function SearchProblem({
  placeholder = "Buscar solución...",
  size = "normal",
  redirectTo,
}: SearchProblemProps) {
  // 1. Leemos el valor oficial (global) de la búsqueda
  const busquedaGlobal = useStore(terminoBusquedaStore);
  
  // 2. ESTADO LOCAL: Memoria temporal solo para lo que el usuario está escribiendo
  const [valorLocal, setValorLocal] = useState<string>(busquedaGlobal);

  // 3. Sincronización: Si el estado global cambia (por ejemplo, al leer la URL al cargar la página),
  // actualizamos el texto que se ve en el input.
  useEffect(() => {
    setValorLocal(busquedaGlobal);
  }, [busquedaGlobal]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Solo actualizamos el estado local (lo visual), pero NO disparamos la búsqueda global
    setValorLocal(e.target.value);
  };

  const handleSearch = () => {
    // ¡AQUÍ SE EJECUTA LA ACCIÓN EXPLÍCITA!
    if (redirectTo) {
      // Si estamos en el Inicio, lo mandamos a la otra página
      window.location.href = `${redirectTo}?q=${encodeURIComponent(valorLocal)}`;
    } else {
      // Si ya estamos en el Catálogo, actualizamos el estado global para que se filtren las tarjetas
      terminoBusquedaStore.set(valorLocal);
      
      // Mejora Profesional: Actualizamos silenciosamente la URL de la página actual 
      // para que el usuario pueda copiar el link y compartir su búsqueda actual.
      const nuevaUrl = valorLocal 
        ? `${window.location.pathname}?q=${encodeURIComponent(valorLocal)}`
        : window.location.pathname;
        
      window.history.replaceState({}, '', nuevaUrl);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Escuchamos específicamente la tecla "Enter"
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={size === "normal" ? "box-input-normal" : "box-input"}>
      <input
        type="search"
        placeholder={placeholder}
        value={valorLocal}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
}