import { createHashRouter } from 'react-router-dom'

import { Room, Play, Find, Points, Rules } from './pages'

export const router = createHashRouter([
  {
    path: '/',
    element: <Play />,
    errorElement: <Play />,
  },
  {
    path: '*',
    element: <Play />,
  },
  {
    path: '/find',
    element: <Find />,
  },
  {
    path: '/points',
    element: <Points />,
  },
  {
    path: '/rules',
    element: <Rules />,
  },
  {
    path: '/room',
    element: <Room />,
  },
])
