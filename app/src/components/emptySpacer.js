import styled from '@emotion/styled'

const EmptySpacer = () => {
  return (
    <Container>
    </Container>
  )
}

export default EmptySpacer

const Container = styled.div`
  height: 10rem;
  width: 100%;
  border: 1px dashed #bdbdbd;
  border-radius: .3rem;
  margin-bottom: 1rem;
`