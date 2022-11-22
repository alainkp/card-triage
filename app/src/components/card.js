import styled from '@emotion/styled/macro'
import { Draggable } from 'react-beautiful-dnd'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons'
import { faSquare } from '@fortawesome/free-regular-svg-icons'

const colorByStatus = {
  PENDING: '#3b95c9',
  REJECTED: '#dd5e5e',
  DONE: '#72b96f'
}

const Card = ({ card, index, handleChangeStatus }) => {
  const { status, patient_name: patientName, arrhythmias, created_date: createdDate } = card

  const date = new window.Date(createdDate.split('+')[0])
  return (
    <Draggable draggableId={`${card.id}`} index={index}>
      {(provided, snapshot) => {
        return (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
            style={{ ...provided.draggableProps.style}}
          >
            <div>
              <Header>
                <span>{patientName}</span>
                <Date>{date.toLocaleDateString('en')}</Date>
              </Header>
              <Content>
                {arrhythmias.map((arrhythmia, i) => <Tags key={i}>{arrhythmia}</Tags>)}
              </Content>
            </div>
            <div>
              <Status color={colorByStatus[status]}>
                {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
              </Status>
            </div>
            {status !== 'DONE'
              && <Button type='checkbox' onClick={() => handleChangeStatus(card, 'DONE')} >
                <FontAwesomeIcon icon={faSquare} color='#AAA' />
              </Button>}
            {status === 'DONE'
              && <Button type='checkbox' onClick={() => handleChangeStatus(card, 'REJECTED')} >
                <FontAwesomeIcon icon={faSquareCheck} color='#72b96f' />
              </Button>}
          </Container>
        )
      }}
    </Draggable>
  )
}

Card.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    patient_name: PropTypes.string.isRequired,
    arrhythmias: PropTypes.arrayOf(PropTypes.string).isRequired,
    created_date: PropTypes.string.isRequired
  }).isRequired,
  index: PropTypes.number.isRequired,
  handleChangeStatus: PropTypes.func.isRequired
}

export default Card

const Button = styled.button`
  cursor: pointer;
  position: absolute;
  display: none;
  bottom: 0;
  right: 0;
  background-color: white;
  border: 0;
  outline: none;
  padding: .8rem;
  box-shadow: rgb(0 0 0 / 12%) -1px -1px 1px;
  border-top-left-radius: .6rem;
  border-bottom-right-radius: .6rem;
  svg {
    margin: 0;
    path: {
      fill: #3b95c9
    }
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  border-radius: .6rem;
  background-color: white;
  min-height: 13rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px -1px #0000001f, 0 3px 9px -3px #00000014;
  margin-bottom: 1rem;
  &:hover {
    box-shadow: 0 1px 3px -1px #0003, 0 3px 9px -3px #0000001a;
    transform: translateY(-.1rem);
    ${Button} {
      display: block;
    }
  }
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  margin-bottom: 1rem;
`

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

`

const Tags = styled.div`
  font-size: 1.2rem;
  border: 1px solid #dddddd;
  border-radius: .5rem;
  padding: 3px 8px;
`

const Date = styled.span`
  color: #3b95c9AA;
`

const Status = styled.span`
  background: ${({ color }) => color};
  color: #EEE;
  font-size: 1.2rem;
  border-radius: .5rem;
  padding: 3px 8px;
`
