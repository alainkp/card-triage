import { useEffect, useContext } from 'react'
import styled from '@emotion/styled'
import { DragDropContext } from 'react-beautiful-dnd'

import { DispatchContext } from '../store/storeProvider'
import { StoreContext } from '../store/storeProvider'
import Column from '../components/column'

const allowedStatusByCurrentStatus = {
  PENDING: ['DONE'],
  REJECTED: ['DONE'],
  DONE: ['REJECTED'],
}

const Columns = () => {
  const dispatch = useContext(DispatchContext)
  const store = useContext(StoreContext)
  const { isLoading, cards, query } = store
  const sanitizedQuery = query.trim().toLowerCase()

  const filteredCards = sanitizedQuery.length === 0
    ? cards
    : cards.filter(({ patient_name: patientName, arrhythmias }) => {
      const sanitizedQueryRegex = new RegExp(sanitizedQuery, 'i')
      return patientName.match(sanitizedQueryRegex) || arrhythmias.join('#').match(sanitizedQueryRegex)
    })

  const sortedCards = filteredCards.sort((cardA, cardB) => {
    if (cardA.created_date === cardB.created_date) return 0
    if (cardA.created_date > cardB.created_date) return -1

    return 1
  })

  const todoCards = sortedCards.filter(card => card.status === 'PENDING' || card.status === 'REJECTED')
  const doneCards = sortedCards.filter(card => card.status === 'DONE')

  useEffect(() => {
    dispatch({ type: 'LOADING' })
    fetch("http://localhost:3001/cards")
      .then(response => response.json())
      .then(data => {
        dispatch({ type: 'FETCH_CARDS', cards: data })
      })
      .catch(error => {
        dispatch({ type: 'STOP_LOADING' })
        console.error(error)
      })
  }, [dispatch])

  const handleChangeStatus = (card, newStatus) => {
    if (!allowedStatusByCurrentStatus[card.status].includes(newStatus)) return

    fetch(`http://localhost:3001/cards/${card.id}`, {
      method: 'PATCH',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus })
    }).then(response => {
      if (response.status === 200) {
        dispatch({ type: 'UPDATE', cardId: card.id, status: newStatus })
      }
    })
  }

  const onDragEnd = (result) => {
    if(!result.destination) return

    const { draggableId, source, destination } = result
    if(source.droppableId === destination.droppableId) return

    const targetedCardIndex = sortedCards.findIndex(card => card.id === parseInt(draggableId))
    const newStatus = destination.droppableId === 'Done'
      ? 'DONE'
      : 'REJECTED'
    handleChangeStatus(sortedCards[targetedCardIndex], newStatus)
  }

  return (
    <Container>
      <DragDropContext onDragEnd={onDragEnd}>
        <Column isLoading={isLoading} cards={todoCards} title={'Todo'} handleChangeStatus={handleChangeStatus}/>
        <Column isLoading={isLoading} cards={doneCards} title={'Done'} handleChangeStatus={handleChangeStatus}/>
      </DragDropContext>
    </Container>
  )
}

export default Columns

const Container = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  background: #F6F6F6;
  padding: 10rem 15rem 0 15rem;
  height: 100%;
`
