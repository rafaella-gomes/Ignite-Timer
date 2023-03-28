import { Header } from '../../components/Header'
import { Outlet } from 'react-router-dom'
import { LayoutContainer } from './styles'

export function DefaultLayout() {
  // Esse Default Layout foi criado para que a estrutura de repetição das rotas possa estar em apenas um lugar e eu não ter que fazer a importação manual do Header em cada rota.
  return (
    <LayoutContainer>
      <Header />
      <Outlet />
      {/* Espaço para ser inserido um conteúdo */}
    </LayoutContainer>
  )
}
