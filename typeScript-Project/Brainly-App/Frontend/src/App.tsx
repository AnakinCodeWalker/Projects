import './App.css'
import Button from './components/ui/Button'


//  in components you pass the props 
function App() {
  <>
  {/* while passing a fucntion you have to pass it inside { } */}
<Button  variants="primary" size="sm" color ="#000" text="hello" onClick={()=>console.log("hi")}></Button>
<Button  variants="secondary" size="sm" color ="#000" text="hello"></Button>
  </>


}

export default App
