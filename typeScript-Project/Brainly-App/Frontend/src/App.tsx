import './App.css'
import Buttons from './components/ui/Buttons'
import Card from './components/ui/Card'
import PlusIcon from './icons/PlusIcon'
import { ShareIcon } from './icons/ShareIcon'
//  in components you pass the props 
function App() {
return   <>
{/*  " " -- plain text
     { } -- evaluated to js by bundler

*/}

  <Buttons variants="primary" startItem= {<PlusIcon/>} text= "Add content"></Buttons>
  <Buttons variants="secondary" startItem={<ShareIcon/>} text= "Share Brain"></Buttons>

{/*  item start help in changing the height of the container dynamically.. */}
<div className='flex gap-10 items-start'> 


<Card  link = " https://www.youtube.com/watch?v=OJixIQFF-wA&list=RDOJixIQFF-wA&start_radio=1" type="youtube" title="youtube video"></Card>
 <Card  link = " https://twitter.com/username/status/807811447862468608" type="twitter" title="twitter tweet"></Card>
 <Card  link = " https://x.com/RoshanKrRaii/status/2019995104405254428" type="twitter" title="twitter tweet"></Card>

</div>
  {/* while passing a function you have to pass it inside { } */}
  </>


}

export default App
