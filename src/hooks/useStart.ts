import { useInitData } from '@vkruglikov/react-telegram-web-app'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useStore } from '../hooks'
import { TShareLinkData } from '../types'

export const useStart = () => {
  const [initDataUnsafe] = useInitData()
  const { isStarted, setIsStarted, setRoomId } = useStore()
  const navigate = useNavigate()
  const routerLocation = useLocation()

  let startParam = initDataUnsafe?.start_param

  if (!startParam) {
    const queryParameters = new URLSearchParams(routerLocation.search)
    const queryStartParam = queryParameters.get('start')
    if (queryStartParam) {
      startParam = queryStartParam
    }
  }

  let startParamJson: undefined | TShareLinkData

  if (startParam) {
    try {
      const startParamReplaced = startParam
        .split('-').join('+')
        .split('_').join('/')
      const startParamJsonEncoded = atob(startParamReplaced)
      startParamJson = JSON.parse(startParamJsonEncoded)
      console.log('startParamJson', startParamJson)
    } catch (e) {
      console.error('Cannot parse start param', e)
    }
  }

  useEffect(() => {
    if (!isStarted) {
      setIsStarted(true)

      const roomId = startParamJson?.room_id
      if (roomId) {
        setRoomId(roomId)
        navigate('/room')
        return
      }
    }
  }, [startParamJson, isStarted, navigate, setIsStarted])

  return { startParam, startParamJson }
}
