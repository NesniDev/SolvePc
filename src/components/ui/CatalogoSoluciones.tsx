import { useStore } from "@nanostores/react";
import { terminoBusquedaStore } from "@store/searchStore"; // Ajuste la ruta
import "./catalogo.css"
import { useQuery } from "@tanstack/react-query";
import { getAllSolutions } from "src/api/get/getSolutions";
import type { Solutions } from "src/interfaces/Solutions";

// { problemasIniciales }: CatalogoProps

export function CatalogoSoluciones() {
  // Nos suscribimos al estado global. Cuando cambie, este componente se re-renderizará.
  const terminoBusqueda = useStore(terminoBusquedaStore);

  const { data: resultados, isLoading } = useQuery({
    queryKey: ['problemas'],
    queryFn: () => getAllSolutions(),
    staleTime: 3000 * 60 * 5,
  })


  const resultadosFiltrados = resultados?.data?.filter((solucion: Solutions) =>
    solucion.title.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
    solucion.description.toLowerCase().includes(terminoBusqueda.toLowerCase())
  );
  if (isLoading) {
    return (
      <section className="cards">
        <span className="loader"></span>
      </section>
    )
  }
  return (
    // Retornamos directamente el section, sin el div contenedor del buscador
    <section className="cards">
      {

        resultadosFiltrados.length > 0 ? (
          resultadosFiltrados.map(({ slug, title, description, category, difficulty, image, explain }: Solutions) => {
            // Generamos el identificador único para las transiciones
            const transitionTitleName = `text-${title.split(' ').join('-').toLowerCase()}`;
            const transitionDescName = `description-${description.split(' ').join('-').toLowerCase()}`;

            return <article className="card" key={slug}>
              <a href={`/solutions/${slug}`}>
                <div className="card-info">
                  <div className="card-title">
                    <h2 >
                      {/* @ts-ignore */}
                      <img src={image} alt={category} />{' '}
                      {category}
                    </h2>
                    <span
                      className={`${difficulty === 'Avanzado' ? 'red' : difficulty === 'Intermedio' ? 'orange' : 'green'
                        }`}
                    >
                      {difficulty}
                    </span>
                  </div>
                  <h3 style={{ viewTransitionName: transitionTitleName } as React.CSSProperties}>
                    {title}
                  </h3>
                  <p style={{ viewTransitionName: transitionDescName } as React.CSSProperties}>
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

          }))
          : (
            <p style={{ color: "var(--color-white)", textAlign: "center", gridColumn: "1 / -1", fontFamily: 'system-ui' }}>
              No se encontraron soluciones para esta búsqueda.
            </p>
          )
      }
    </section >
  );
}