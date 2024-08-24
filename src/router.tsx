import { createHashRouter } from 'react-router-dom'

import { Room, Play, Find, Airdrop, Rules } from './pages'

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
    path: '/play',
    element: <Play />,
  },
  {
    path: '/find',
    element: <Find />,
  },
  {
    path: '/airdrop',
    element: <Airdrop />,
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
