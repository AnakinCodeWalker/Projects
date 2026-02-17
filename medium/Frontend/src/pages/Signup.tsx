import Quote from "../components/ui/Quote"
import Auth from "../components/ui/Auth"
const Signup = () => {
  return <div className="grid grid-cols-2">
    
    <div className="flex items-center justify-center">
      <div>
        <Auth/>
        </div>
    </div>

<div className="invisible lg:visible">
  <Quote/>
  </div>
  
 </div>
}

export default Signup