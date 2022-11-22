import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard } from '@fortawesome/free-solid-svg-icons'

const EmptyCard = () => {
  return (
    <Container>
      <FontAwesomeIcon icon={faAddressCard} />  No cards
    </Container>
  )
}

export default EmptyCard

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5rem;
  width: 100%;
  border: 1px dashed #bdbdbd;
  border-radius: .3rem;
  svg {
    path {
      fill: #a2a2a2;
    }
  }
  color: #777;
`
