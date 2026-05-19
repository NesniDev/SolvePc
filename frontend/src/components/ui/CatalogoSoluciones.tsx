import { useEffect, useState } from "react";
import "./catalogo.css";
import { useQuery } from "@tanstack/react-query";
import { getAllSolutions } from "src/api/get/getSolutions";
import type { Solutions } from "src/interfaces/Solutions";

// Hook que lee la URL y se suscribe a cambios
function useFiltrosURL() {
  const [params, setParams] = useState(() => new URLSearchParams(window.location.search))

  useEffect(() => {
    const actualizar = () => setParams(new URLSearchParams(window.location.search))

    window.addEventListener('filtros-actualizados', actualizar)
    window.addEventListener('popstate', actualizar)

    return () => {
      window.removeEventListener('filtros-actualizados', actualizar)
      window.removeEventListener('popstate', actualizar)
    }
  }, [])

  return params
}

export function CatalogoSoluciones() {
  const params = useFiltrosURL()

  const query = params.get('search') ?? ''
  const categoria = params.get('category') ?? ''
  const dificultad = params.getAll('difficulty') ?? [] // ajusta al nombre exacto de tu filtro
  const so = params.getAll('so') ?? [] // ajusta al nombre exacto de tu filtro

  const { data: resultados, isLoading } = useQuery({
    queryKey: ['problemas', { query, categoria, dificultad, so }],
    queryFn: () => getAllSolutions(query, categoria, dificultad, so),
    staleTime: 1000 * 60 * 5,
  })

  // El backend filtra, no el cliente
  const resultadosFiltrados: Solutions[] = resultados?.data ?? []

  if (isLoading) {
    return (
      <section className="cards">
        <span className="loader"></span>
      </section>
    )
  }

  return (
    <section className="cards">
      {resultadosFiltrados.length > 0 ? (
        resultadosFiltrados.map(({ slug, title, image, description, category, difficulty, explain }: Solutions) => {

          const transitionTitleName = `text-${title.split(' ').join('-').toLowerCase()}`
          const transitionDescName = `description-${description.split(' ').join('-').toLowerCase()}`

          return (
            <article className="card" key={slug}>
              <a href={`/solutions/${slug}`}>
                <div className="card-info">
                  <div className="card-title">
                    <h2>
                      <img src={image} alt={`Categoría: ${category}`} />
                      {category}
                    </h2>
                    <span className={
                      difficulty === 'Avanzado' ? 'red' :
                        difficulty === 'Intermedio' ? 'orange' : 'green'
                    }>
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
                    <img src="/info-more/steps.svg" alt="icono de pasos" />
                    {explain?.steps?.length || 0} Pasos
                  </span>
                  <span>
                    <img src="/info-more/eye.svg" alt="icono de vistas" />
                    14.7k
                  </span>
                  <span>
                    <img src="/info-more/time.svg" alt="icono de tiempo" />
                    6 Días
                  </span>
                </div>
                <div className="button-see-more" style={{ flex: 1 }}>
                  <button>Ver Información</button>
                </div>
              </a>
            </article>
          )
        })
      ) : (
        <p style={{ color: "var(--color-white)", textAlign: "center", gridColumn: "1 / -1", fontFamily: 'system-ui' }}>
          No se encontraron soluciones para esta búsqueda.
        </p>
      )}
    </section>
  )
}