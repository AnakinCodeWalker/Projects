import "../App.css" // import it later
const LandingPage = () => {
  return (
    <>
      <div className="landingPageContainer">
        <nav>

          <div className="navHeader">

            <h1>  PeerMeet </h1>

          </div>

          <div className="navList">
            <p>Join as Guest</p>
            <p>Register</p>
            <div role="button">
              <p>Login</p>
            </div>
          </div>
        </nav>
      </div>
    </>)
}

export default LandingPage