import ReconnectingWebSocket from 'reconnecting-websocket'

import { useEffect, useMemo } from 'react'

import { TState } from '../types'
import { useStore, useAuth } from './'

const wsUrl: undefined | string = import.meta.env.VITE_API_WS_URL

if (!wsUrl) {
  console.error('No VITE_API_WS_URL')
}

export const useApiWs = () => {
  const { roomId, setState } = useStore()
  const { userId } = useAuth()

  const ws = useMemo(() => {
    if (!roomId || !userId) {
      return null
    }
    const url = `${wsUrl}/rooms/${roomId}/ws?player_id=${userId}`
    return new ReconnectingWebSocket(url)
  }, [roomId, userId])

  useEffect(() => {
    if (!!ws && (!roomId || !userId)) {
      console.log('not', roomId, userId)
    }
  }, [ws, roomId, userId])

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      try {
        const parsedMessage: {
          type: string
          data: TState
        } = JSON.parse(event.data)
        console.log('WS:', parsedMessage)
        setState(parsedMessage.data)
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
