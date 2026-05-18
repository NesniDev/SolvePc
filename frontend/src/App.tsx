import QueryProvider from './QueryProvider'
import { CatalogoSoluciones } from '@components/ui/CatalogoSoluciones'

export default function App() {
  return (
    <QueryProvider>
      <CatalogoSoluciones />
    </QueryProvider>
  )
}