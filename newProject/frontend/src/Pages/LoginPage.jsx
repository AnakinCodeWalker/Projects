import Template from "../Components/Common/Template"
import LoginForm from "../Components/core/LoginForm"
import loginImg from "../assets/Images/login.webp"

const Login = ({setIsLoggedIn}) => {
  return (
  <Template
    title="Welcome back"
    desc1="Build skills for today , tommorrow and beyond"
    desc2="Education to future Proof your Carrer"
    image={loginImg}
    formtype="login"
    setIsLoggedIn={setIsLoggedIn}>
      </Template>
  )
}

export default Login