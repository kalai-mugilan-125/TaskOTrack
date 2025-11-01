import { Link } from 'react-router-dom'
import LoginButton from '../Buttons/LoginButton'
import SignUpButton from '../Buttons/SignUpButton'

function Header() {
  return (
    <header className="loginHeader">
      <div className="header">
        <Link to="/">
          <h1>TaskOTrack</h1>
        </Link>
      </div>
      <div className="authButtons">
        <LoginButton />
        <SignUpButton />
      </div>
    </header>
  )
}

export default Header