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

  const queryParameters = new URLSearchParams(routerLocation.search)

  const startParam: string | undefined = initDataUnsafe?.start_param || queryParameters.get('start') || undefined


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

  const ref: string | undefined = startParamJson?.ref || queryParameters.get('ref') || undefined
  const roomId: string | undefined = startParamJson?.room_id || queryParameters.get('room_id') || undefined

  useEffect(() => {
    if (!isStarted) {
      setIsStarted(true)

      if (roomId) {
        setRoomId(roomId)
        navigate(`/room?roomId=${roomId}`)
      }
    }
  }, [isStarted, ref, roomId, navigate, setIsStarted, setRoomId])

  return { startParam, startParamJson, ref }
}
