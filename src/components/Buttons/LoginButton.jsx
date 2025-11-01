import { useNavigate } from 'react-router-dom'

function LoginButton() {
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate('/login')
  }

  return (
    <button type="button" className="loginButton" onClick={handleLogin}>
      Login
    </button>
  )
}

export default LoginButton