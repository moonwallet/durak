import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'


// import {  } from './hooks/useApi'
// import { TState } from './types'

import { Play, Room } from './pages'

import './i18n'

export const App = () => {
  const [room, setRoom] = useState(false)

  if (Math.random() < 0) {
    setRoom(true)
  }

  if (room) {
    return <Room />
  }

  return <Play />
}
