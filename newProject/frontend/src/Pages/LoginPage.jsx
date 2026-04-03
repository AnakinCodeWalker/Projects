import Template from "../Components/Common/FormTemplate"
import LoginForm from "../Components/core/LoginForm"
import loginImg from "../assets/Images/login.webp"

const Login = ({setIsLoggedIn}) => {
  return (
  <Template
    title="Welcome back"
    desc1="Build skills for tommorrow "
    desc2={` Skills,that actually move you forward one skill at a time.`}
    image={loginImg}
    formtype="login"
    setIsLoggedIn={setIsLoggedIn}>
      </Template>
  )
}

export default Login