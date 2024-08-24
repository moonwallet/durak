// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'


// import {  } from './hooks/useApi'
// import { TState } from './types'

import './i18n'

import { RouterProvider } from 'react-router-dom'
import { router } from './router'

export const App = () => {
  return (
    <RouterProvider router={router} />
  )
}
