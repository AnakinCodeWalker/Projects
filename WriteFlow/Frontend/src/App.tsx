
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Userroutes from './routes/Userroutes'
import Blogroutes from './routes/Blogroutes'

const App = () => {
  return  <>
  <BrowserRouter>
  <Userroutes/>
  <Blogroutes/>
  </BrowserRouter>
  </>
  
}


export default App
