import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthProvider'

function MenuCard({ activeSection, setActiveSection }) {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleNavigation = (id) => {
    if (id === 'profile') {
      navigate('/profile')
    } else {
      setActiveSection(id)
    }
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'fa-tachometer-alt' },
    { id: 'profile', label: 'User Profile', icon: 'fa-user-circle' }
  ]

  return (
    <nav className="menuCard" aria-label="Main navigation">
      <h2>Menu</h2>
      <hr className="hrline" />
      
      <div className="menuItems">
        {menuItems.map(item => (
          <button
            key={item.id}
            className={activeSection === item.id ? 'active' : ''}
            onClick={() => handleNavigation(item.id)}
            aria-current={activeSection === item.id ? 'page' : undefined}
          >
            <i className={`fas ${item.icon}`}></i>
            {item.label}
          </button>
        ))}
      </div>

      <div className="menuFooter">
        <hr className="hrline" />
        
        <button onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default MenuCard