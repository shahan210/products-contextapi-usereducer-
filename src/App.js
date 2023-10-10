import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Page from './Pages/Page';
import ProductDetails from './Pages/ProductDetails';
import { GlobalState } from './ContextAPI/GlobalState';
import { reducer, initialState } from './ContextAPI/Reducer'

function App() {
  return (
    <div>
      <GlobalState initialState={initialState} reducer={reducer} >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Page />} />
            <Route path="/product-details" element={<ProductDetails />} />
          </Routes>
        </BrowserRouter>
      </GlobalState>
    </div>
  )
}
export default App;