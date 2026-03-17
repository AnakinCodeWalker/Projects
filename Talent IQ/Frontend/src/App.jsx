
import './App.css'
import { SignInButton } from '@clerk/react'
function App() {
 

  return (
    <>
    <h1>Welcome to app</h1>

  <SignInButton mode="modal">
        <button>Sign In</button>
      </SignInButton>
      
    </>
  )
}

export default App
