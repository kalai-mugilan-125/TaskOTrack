import { useNavigate } from 'react-router-dom'

function ProfileButton() {
  const navigate = useNavigate()

  return (
    <div className="profile">
      <button
        type="button"
        className="profileButton"
        onClick={() => navigate('/profile')}
        aria-label="User profile"
      >
        Profile
      </button>
    </div>
  )
}

export default ProfileButton