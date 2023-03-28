import styled from 'styled-components'

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: ${(props) => props.theme['gray-100']};
  font-size: 1.125rem;
  font-weight: bold;
  flex-wrap: wrap;
  /* Para que quando a tela for menor ele quebre os campos em mais linhas.  */
`

const BaseInput = styled.input`
  background: transparent;
  height: 2.5rem;
  border: 0;
  border-bottom: 2px solid ${(props) => props.theme['gray-500']};
  font-weight: bold;
  font-size: inherit;
  /* o input não herda o font size do container, mas ao colocar inherit ele passa a herdar */
  padding: 0 0.5rem;
  color: ${(props) => props.theme['gray-100']};

  &:focus {
    box-shadow: none;
    border-color: ${(props) => props.theme['green-500']};
  }

  &::placeholder {
    color: ${(props) => props.theme['gray-500']};
  }
`

export const TaskInput = styled(BaseInput)`
  flex: 1;
  /* Aqui eu digo pelo flex 1 (forma condensada) que meu input pude crescer pelo flex grow, reduzir pelo flex shrimp e pelo basis eu digo o tamanho ideal */
  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
  /* Serve para tirar a seta no final do input que reduz o espaço do texto. */
`

export const MinutesAmountInput = styled(BaseInput)`
  width: 4rem;
`
