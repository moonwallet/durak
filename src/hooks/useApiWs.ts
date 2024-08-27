import ReconnectingWebSocket from 'reconnecting-websocket'

import { useEffect, useMemo } from 'react'

import { TState } from '../types'
import { useStore, useAuth } from './'

const wsUrl: undefined | string = import.meta.env.VITE_API_WS_URL

if (!wsUrl) {
  console.error('No VITE_API_WS_URL')
}

export const useApiWs = () => {
  const { room, setState } = useStore()
  const { userId } = useAuth()

  const ws = useMemo(() => {
    if (!room || !userId) {
      return null
    }
    const url = `${wsUrl}/rooms/${room}/ws?player_id=${userId}`
    return new ReconnectingWebSocket(url)
  }, [room, userId])

  useEffect(() => {
    if (!!ws && (!room || !userId)) {
      console.log('not', room, userId)
    }
  }, [ws, room, userId])

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      try {
        const data: TState = JSON.parse(event.data)
        console.log('WS:', data)
        setState(data)
      } catch (e) {
        console.error('WS: cannot decode message', e)
      }
    }

    ws?.addEventListener('message', onMessage)
    return () => {
      ws?.removeEventListener('message', onMessage)
    }
  }, [ws, setState])

  useEffect(() => {
    const closeWs = () => {
      ws?.close()
    }
    window.addEventListener('beforeunload', closeWs)
    return () => {
      window.removeEventListener('beforeunload', closeWs)
    }
  }, [ws])
}
