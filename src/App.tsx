import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import { RouterProvider } from 'react-router-dom'

import { router } from './router'
import { track, usePersistStore } from './hooks'

import './i18n'

export const App = () => {
  const queryClient = useMemo(() => new QueryClient(), [])

  const { isLaunchedFirstTime, setIsLauncedFirstTime } = usePersistStore()

  const [isTracked, setIsTracked] = useState(false)
  useEffect(() => {
    if (!isTracked) {
      setIsTracked(true)
      track('Session start')
    }
  }, [isTracked, setIsTracked])

  useEffect(() => {
    if (isLaunchedFirstTime) {
      setIsLauncedFirstTime(false)
      track('Launch first time')
    }
  }, [isLaunchedFirstTime, setIsLauncedFirstTime])

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
