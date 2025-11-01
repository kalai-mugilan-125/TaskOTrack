import Header from '../components/Header/loginHeader'
import Footer from '../components/Footer/Footer'

function HomePage() {
  return (
    <div className="page-container">
      <Header />
      <main style={{ 
        flex: 1, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        marginTop: '105px',
        padding: '20px',
        height: 'calc(100vh - 200px)'
      }}>
        <div style={{ textAlign: 'center', maxWidth: '800px', maxHeight: '600px', overflow: 'auto' }}>
          <h1 style={{ fontSize: '48px', marginBottom: '20px', color: '#333' }}>
            Welcome to TaskOTrack
          </h1>
          <p style={{ fontSize: '20px', color: '#666', marginBottom: '30px' }}>
            Your personal task management solution. Stay organized, boost productivity, and never miss a deadline.
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '40px' }}>
            <a href="/signup" style={{ textDecoration: 'none' }}>
              <button className="loginButton" style={{ fontSize: '18px', padding: '15px 30px' }}>
                Get Started
              </button>
            </a>
            <a href="/login" style={{ textDecoration: 'none' }}>
              <button className="signupButton" style={{ fontSize: '18px', padding: '15px 30px' }}>
                Login
              </button>
            </a>
          </div>
        </div>
      </main>
      <div className="footerContainer">
        <Footer />
      </div>
    </div>
  )
}

export default HomePage