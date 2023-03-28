import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  nav {
    display: flex;
    gap: 0.5rem;
  }

  a {
    width: 3rem;
    height: 3rem;

    display: flex;
    justify-content: center;
    align-items: center;

    color: ${(props) => props.theme['gray-100']};

    border-top: 3px solid transparent;
    border-bottom: 3px solid transparent;
    /* A borda em cima e embaixo é para que o elemento não vá nem para cima nem para baixo quando o hover for ativado nos elementos.  */

    &:hover {
      border-bottom: 3px solid ${(props) => props.theme['green-500']};
    }
    /* Aparece como uma linha apenas embaixo */
    &.active {
      color: ${(props) => props.theme['green-500']};
    }
    /* Esse active é quando o botão for clicado e estiver com a classe active adicionado, significando que é a rota atual */
  }
`
