import { useState, useRef, useContext, useEffect, useCallback } from 'react'
import styled from '@emotion/styled/macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons'

import { DispatchContext } from '../store/storeProvider'

const Filter = () => {
  const dispatch = useContext(DispatchContext)
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const handleFocus = () => inputRef.current.focus()
  const handleQueryChange = useCallback((value) => {
    setQuery(value)
    dispatch({ type: 'UPDATE_QUERY', query: value })
  }, [dispatch])

  const handleEscapeKey = useCallback((event) => {
    if (event.key === "Escape") {
      handleQueryChange('')
    }
  }, [handleQueryChange])

  useEffect(() => {
    document.addEventListener("keydown", handleEscapeKey)
    return () => {
      document.removeEventListener("keydown", handleEscapeKey)
    }
  }, [handleEscapeKey])

  return (
    <Container onClick={handleFocus}>
      <FontAwesomeIcon icon={faMagnifyingGlass} />
      <Input ref={inputRef} type='text' value={query} onChange={(e) => handleQueryChange(e.currentTarget.value)} />
      <Delete icon={faXmark} onClick={(e) => setQuery('')} />
    </Container>
  )
}

export default Filter;

const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: #f6f6f6;
  height: 4rem;
  min-width: 20rem;
  border-radius: 2rem;
  padding: 0 1.5rem;
  svg {
    path {
      fill: #a2a2a2;
    }
  }
`

const Input = styled.input`
  flex: 1;
  height: 3rem;
  width: inherit;
  border: none;
  background: transparent;
  outline: none;
  color: #888;
  width: 1rem;
  transition: all .3s ease-in-out;
  &:focus {
    width: 23rem;
  }
`

const Delete = styled(FontAwesomeIcon)`
  margin-left: 1rem;
  margin-right: 0;
`