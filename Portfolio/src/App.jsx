import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home  from "./pages/Home"
import NotFound from "./pages/NotFound"
function App() {

  return (
    <>
    {/* helps in routing */}
<BrowserRouter>  
{/* two routes 1 for main page  1 for other that is not defined in our page like other routes - not found routes */}
<Routes>

<Route index element={<Home></Home>}>

</Route>

{/* will go this route if user want anything else */}
<Route path="*" element={<NotFound></NotFound>}>

</Route>

</Routes>


</BrowserRouter>

    </>
  )
}

export default App
