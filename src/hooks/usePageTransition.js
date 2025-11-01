import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function usePageTransition() {
  const [isLoading, setIsLoading] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 300) // Match this with your CSS transition duration

    return () => clearTimeout(timer)
  }, [location])

  return isLoading
}