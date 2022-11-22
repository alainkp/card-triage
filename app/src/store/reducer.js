const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_CARDS': {
      return {
        ...state,
        cards: action.cards,
        isLoading: false,
      }
    }
    case 'LOADING': {
      return {
        ...state,
        isLoading: true,
      }
    }
    case 'STOP_LOADING': {
      return {
        ...state,
        isLoading: false,
      }
    }
    case 'UPDATE': {
      const cards = [...state.cards]
      const cardIndex = cards.findIndex(({ id }) => id === action.cardId)
      cards[cardIndex].status = action.status
      return {
        ...state,
        cards
      }
    }
    case 'UPDATE_QUERY': {
      return {
        ...state,
        query: action.query
      }
    }
    default:
      return state
  }
}

export default reducer
