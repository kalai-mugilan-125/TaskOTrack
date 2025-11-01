import Footer from '../components/Footer/Footer'
import LoginCard from '../components/Cards/loginCard'
import Header from '../components/Header/loginHeader'

function UserLogin() {
  return (
    <div className="page-container">
      <Header />
      <LoginCard />
      <div className="footerContainer">
        <Footer />
      </div>
    </div>
  )
}

export default UserLogin