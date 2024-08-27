import './i18n'

import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { useApiWs } from './hooks'

export const App = () => {
  useApiWs()

  return (
    <RouterProvider router={router} />
  )
}
