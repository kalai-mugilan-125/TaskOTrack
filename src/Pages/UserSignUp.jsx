import Header from '../components/Header/loginHeader'
import SignUpCard from '../components/Cards/SignUpCard'
import Footer from '../components/Footer/Footer'

function UserSignUp() {
  return (
    <div className="page-container">
      <Header />
      <SignUpCard />
      <div className="footerContainer">
        <Footer />
      </div>
    </div>
  )
}

export default UserSignUp