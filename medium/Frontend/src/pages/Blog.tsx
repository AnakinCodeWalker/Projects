import {useParams} from "react-router-dom" // extracts data from params..
// you can only call a hook inside a component or a react hook
const Blog = () => {
 const {id}= useParams() //  useParams is used to extracts the params 

 return <>
  Blog routes {id} 
  </>
}

export default Blog