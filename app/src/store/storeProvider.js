import { createContext, useReducer } from 'react'

import reducer from './reducer'
import initialStore from './initialStore'

export const StoreContext = createContext({})
export const DispatchContext = createContext({})

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialStore)

  return (
    <DispatchContext.Provider value={dispatch}>
      <StoreContext.Provider value={state}>
        {children}
      </StoreContext.Provider>
    </DispatchContext.Provider>
  )
}

export default StoreProvider

