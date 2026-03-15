import Quote from "../components/ui/Quote"
import Auth from "../components/ui/Auth"
const Signup = () => {
  // at default it will have a single column if itsbigger than large then it will have 2 column
  return <div className="grid grid-cols-1 lg:grid-cols-2">
    
    <div className="flex items-center justify-center">
      <div>
        <Auth/>
        </div>
    </div>

{/* it is visible by default if u go above the large breakpoint then it should become visible and invisible by default  */}
<div className="invisible lg:visible">
  <Quote/>
  </div>
  
 </div>
}

export default Signup