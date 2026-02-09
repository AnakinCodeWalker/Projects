import{Routes ,Route} from "react-router-dom"
import SVGAnimatedEnumerationney from "../pages/SVGAnimatedEnumerationney"
const PaymentRoutes = () => {
  return <Routes>
    <Route path="/send" element ={<SVGAnimatedEnumerationney/>}></Route>
    
  </Routes>
}

export default PaymentRoutes