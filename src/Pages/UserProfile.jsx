import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'
import HeaderUser from '../components/Header/HeaderUser'
import Footer from '../components/Footer/Footer'

function UserProfile() {
  const { user, logout, token } = useAuth()
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState({
    total: 0,
    notStarted: 0,
    inProgress: 0,
    completed: 0
  })
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const fetchTaskStats = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:4000/api/tasks/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch {
      console.error('Failed to fetch stats')
    }
  }, [token])

  useEffect(() => {
    fetchTaskStats()
  }, [fetchTaskStats])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    if (formData.newPassword || formData.confirmPassword) {
      if (!formData.currentPassword) {
        setError('Current password is required to change password')
        setLoading(false)
        return
      }
      if (formData.newPassword !== formData.confirmPassword) {
        setError('New passwords do not match')
        setLoading(false)
        return
      }
      if (formData.newPassword.length < 6) {
        setError('New password must be at least 6 characters')
        setLoading(false)
        return
      }
    }

    try {
      const response = await fetch('http://localhost:4000/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          currentPassword: formData.currentPassword || undefined,
          newPassword: formData.newPassword || undefined
        })
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data.user))
        setSuccess('Profile updated successfully!')
        setIsEditing(false)
        setFormData(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }))
        
        setTimeout(() => window.location.reload(), 1500)
      } else {
        setError(data.error || 'Failed to update profile')
      }
    } catch {
      setError('Server error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      username: user?.username || '',
      email: user?.email || '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
    setError('')
    setSuccess('')
    setIsEditing(false)
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="page-container">
      <HeaderUser />
      
      <main className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              {user?.username?.charAt(0).toUpperCase()}
            </div>
            <h1 className="profile-username">{user?.username}</h1>
            <p className="profile-email">{user?.email}</p>
          </div>

          <hr className="hrline" />

          {/* Task Statistics */}
          <div className="task-statistics">
            <h3>Task Statistics</h3>
            <div className="stats-grid">
              <div className="stat-card stat-total">
                <div className="stat-number">{stats.total}</div>
                <div className="stat-label">Total Tasks</div>
              </div>
              <div className="stat-card stat-completed">
                <div className="stat-number">{stats.completed}</div>
                <div className="stat-label">Completed</div>
              </div>
              <div className="stat-card stat-inprogress">
                <div className="stat-number">{stats.inProgress}</div>
                <div className="stat-label">In Progress</div>
              </div>
              <div className="stat-card stat-notstarted">
                <div className="stat-number">{stats.notStarted}</div>
                <div className="stat-label">Not Started</div>
              </div>
            </div>
          </div>

          <hr className="hrline" />

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          {!isEditing ? (
            <div className="profile-view">
              <div className="account-info">
                <h3>Account Information</h3>
                <div className="info-box">
                  <p><strong>Username:</strong> {user?.username}</p>
                  <p><strong>Email:</strong> {user?.email}</p>
                  <p>
                    <strong>Member Since:</strong> {new Date().toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>

              <div className="profile-actions">
                <button className="loginButton" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </button>
                <button className="signupButton" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSave} className="profile-edit-form">
              <h3>Edit Profile</h3>
              
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="userInput"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="userInput"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>

              <h4 className="password-section-title">Change Password (Optional)</h4>

              <div className="form-group">
                <label>Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  placeholder="Current Password"
                  className="userInput"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  className="userInput"
                  value={formData.newPassword}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm New Password"
                  className="userInput"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <div className="profile-actions">
                <button type="submit" className="loginButton" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
                <button type="button" className="signupButton" onClick={handleCancel} disabled={loading}>
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </main>

      <div className="footerContainer">
        <Footer />
      </div>
    </div>
  )
}

export default UserProfile