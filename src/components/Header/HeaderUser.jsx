import { Link } from 'react-router-dom'
import ProfileButton from '../Buttons/ProfileButton'

function HeaderUser() {
  return (
    <header className="headerUser">
      <Link to="/dashboard">
        <h1>TaskOTrack</h1>
      </Link>
      <div className="profileButton">
        <ProfileButton />
      </div>
    </header>
  )
}

export default HeaderUser