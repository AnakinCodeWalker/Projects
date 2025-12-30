import './App.css'
import { useState } from 'react'
import { useCallback } from 'react'
function App() {
  const [length, setLenght] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")


  const passwordGenerator = useCallback(
    () => {

      let pass = ""
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

      if(charAllowed)
        str+"!@#$%^&*(){}[]~`"
if(numberAllowed)
     str+"0123456789"

for(let i=1;i<=array.length;i+=1){
let char = Math.floor(Math.random() * str.length+1)

}

}
    }, [length, numberAllowed, charAllowed, setPassword])



  return (
    <>
      <h1 className='color-white'>Password Genrator</h1>
    </>
  )
}

export default App
