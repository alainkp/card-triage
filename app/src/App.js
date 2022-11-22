import StoreProvider from './store/storeProvider'
import Columns from './containers/columns'
import Header from './components/header'
import GlobalStyles from './themes/global_styles'

const App = () => {
  return (
    <StoreProvider>
      <GlobalStyles />
      <Header />
      <Columns/>
    </StoreProvider>
  )
}

export default App;
