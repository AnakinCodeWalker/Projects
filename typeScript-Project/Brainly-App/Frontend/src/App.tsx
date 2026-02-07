import './App.css'
import Buttons from './components/ui/Buttons'
import PlusIcon from './icons/PlusIcon'
import { ShareIcon } from './icons/ShareIcon'
//  in components you pass the props 
function App() {
return   <>

  <Buttons variants="primary" startItem= {<PlusIcon/>} text= "Add content"></Buttons>
  <Buttons variants="secondary" startItem={<ShareIcon/>} text= "Add content"></Buttons>

  {/* while passing a fucntion you have to pass it inside { } */}
  </>


}

export default App
