import { useNavigate } from 'react-router-dom'

function SignUpButton() {
  const navigate = useNavigate()

  const handleSignUp = () => {
    navigate('/signup')
  }

  return (
    <button type="button" className="signupButton" onClick={handleSignUp}>
      Sign Up
    </button>
  )
}

export default SignUpButton