import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { Droppable } from 'react-beautiful-dnd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import EmptyCard from './emptyCard'
import EmptySpacer from './emptySpacer'
import Card from './card'

const Columns = ({ isLoading, cards, title, handleChangeStatus }) => {

  return (
    <Container>
      <Header>
        <span>{title}</span>
        {isLoading && <FontAwesomeIcon icon={faSpinner} spin />}
        {!isLoading && <span>{`(${cards.length})`}</span>}
      </Header>
      <Droppable droppableId={title}>

        {(provided, snapshot) => {
          return (
            <>
              <Bucket
                {...provided.droppableProps}
                ref={provided.innerRef}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {snapshot.isDraggingOver && <EmptySpacer />}
                {cards?.length === 0 && !snapshot.isDraggingOver && <EmptyCard />}
                {cards.map((card, index) =>
                  <Card card={card} key={card.id} index={index} handleChangeStatus={handleChangeStatus} />
                  )}
                {provided.placeholder}
              </Bucket>
            </>
          )
        }}
      </Droppable>
    </Container>
  )
}

Columns.propTypes = {
  isLoading: PropTypes.bool,
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string.isRequired,
  handleChangeStatus: PropTypes.func.isRequired
}

export default Columns

const Container = styled.div`
  flex: 1;
  min-width: 30rem;
  max-width: 53rem;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  margin-bottom: 1.5rem;
`

const Bucket = styled.div`
  min-height: 35rem;
`
