import './App.css'
import Button from './components/ui/Button'


//  in components you pass the props 
function App() {
  <>
  {/* while passing a fucntion you have to pass it inside { } */}
<Button  variants="primary" size="sm" text="hello" onClick={()=>console.log("hi")}></Button>
<Button  variants="primary" size="sm" text="hello"></Button>
  </>


}

export default App
