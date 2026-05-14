import { useStore } from "@nanostores/react";
import { terminoBusquedaStore } from "@store/searchStore"; // Ajuste la ruta
import "./catalogo.css"
import { useEffect } from "react";

export interface CommonErrors {
  code: string;
  label: string;
  percentage: number;
}

export interface Explain {
  title: string;
  description: string;
  photo: string;
  commonErrors: CommonErrors[];
  prerequisites: string[];
  steps: string[];
  terminal: string;
}

export interface Solutions {
  title: string;
  slug: string;
  description: string;
  category: "OS" | "Red" | "Rendimiento" | "Virus" | "Hardware" | "Software";
  difficulty: "Fácil" | "Intermedio" | "Avanzado";
  image: string;
  explain: Explain;
}

interface CatalogoProps {
  problemasIniciales: Solutions[];
}

export function CatalogoSoluciones({ problemasIniciales }: CatalogoProps) {
  // Nos suscribimos al estado global. Cuando cambie, este componente se re-renderizará.
  const terminoBusqueda = useStore(terminoBusquedaStore);

  useEffect(() => {
    // Extraemos los parámetros de la barra de direcciones del navegador
    const parametrosDeUrl = new URLSearchParams(window.location.search);
    
    const busquedaPrevia = parametrosDeUrl.get('q'); // Buscamos nuestro parámetro "q"
    
    if (busquedaPrevia) {
      // Si existe, actualizamos nuestro estado global con lo que el usuario escribió en el inicio
      terminoBusquedaStore.set(busquedaPrevia);
      
      // (Opcional) Limpiamos la URL para dejarla estéticamente limpia (/solutions) 
      // sin recargar la página.
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []); // El arreglo vacío [] indica que esto solo se ejecuta UNA vez al cargar.

  const resultados = problemasIniciales.filter((problema) =>
    problema.title.toLowerCase().includes(terminoBusqueda.toLowerCase())
  );

  return (
    // Retornamos directamente el section, sin el div contenedor del buscador
    <section className="cards">
      {resultados.length > 0 ? (
        resultados.map(({ slug, title, description, category, difficulty, image, explain }) => (
          <article className="card" key={slug}>
            <a href={`/solutions/${slug}`}>
              <div className="card-info">
                <div className="card-title">
                  <h2>
                    {/* @ts-ignore */}
                    <img src={image} alt={category} transition:persist="" />{' '}
                    {category}
                  </h2>
                  <span
                    className={`${
                      difficulty === 'Avanzado' ? 'red' : difficulty === 'Intermedio' ? 'orange' : 'green'
                    }`}
                  >
                    {difficulty}
                  </span>
                </div>
                {/* @ts-ignore */}
                <h3 transition:name={`text-${title.split(' ').join('-').toLowerCase()}`}>
                  {title}
                </h3>
                {/* @ts-ignore */}
                <p transition:name={`description-${title.split(' ').join('-').toLowerCase()}`}>
                  {description}
                </p>
              </div>
              <div className="wrapper-items-card">
                <span>
                  {/* @ts-ignore */}
                  <img src="/info-more/steps.svg" alt="icono de pasos" transition:persist="" />
                  {explain.steps.length} Pasos
                </span>
                <span>
                  {/* @ts-ignore */}
                  <img src="/info-more/eye.svg" alt="icono de vistas" transition:persist="" />
                  14.7k
                </span>
                <span>
                  {/* @ts-ignore */}
                  <img src="/info-more/time.svg" alt="icono de tiempo" transition:persist="" />
                  6 Días
                </span>
              </div>
              <div className="button-see-more" style={{ flex: 1 }}>
                <button>Ver Información</button>
              </div>
            </a>
          </article>
        ))
      ) : (
        <p style={{ color: "var(--color-white)", textAlign: "center", gridColumn: "1 / -1", fontFamily: 'system-ui' }}>
          No se encontraron soluciones para esta búsqueda.
        </p>
      )}
    </section>
  );
}