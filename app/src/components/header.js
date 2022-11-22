import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHospitalUser } from '@fortawesome/free-solid-svg-icons'

import Filter from './filter'

const Header = () => {
  return (
    <Container>
      <h1>
        <FontAwesomeIcon icon={faHospitalUser} />Card triage
      </h1>
      <Filter />
    </Container>
  )
}

export default Header;

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  right: 0;
  top: 0;
  left: 0;
  padding: 0 5rem;
  background: white;
  height: 8rem;
  width: 100vw;
  box-shadow: rgb(0 0 0 / 20%) 0px 0px 2px;
  svg {
    path {
      fill: #3b95c9
    }
  }
`