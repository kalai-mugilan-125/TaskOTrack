import { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'
import Loading from './components/Loading/Loading'
import ProtectedRoute from './components/ProtectedRoute'

// Lazy load pages
const HomePage = lazy(() => import('./Pages/HomePage'))
const UserLogin = lazy(() => import('./Pages/UserLogin'))
const UserSignUp = lazy(() => import('./Pages/UserSignUp'))
const DashBoardPage = lazy(() => import('./Pages/DashBoardPage'))
const UserProfile = lazy(() => import('./Pages/UserProfile'))

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/signup" element={<UserSignUp />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashBoardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  )
}

export default App