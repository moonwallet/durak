// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'


// import {  } from './hooks/useApi'
// import { TState } from './types'

import { Play, Room } from './pages'
import { useStore } from './hooks'

import './i18n'

export const App = () => {
  const { room } = useStore()

  if (room) {
    return <Room />
  }

  return <Play />
}
