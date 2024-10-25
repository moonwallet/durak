import ReconnectingWebSocket from 'reconnecting-websocket'

import { useEffect, useMemo } from 'react'

import { TState } from '../types'
import { useStore, useStart, useAuth } from '../hooks'

const wsUrl: undefined | string = import.meta.env.VITE_API_WS_URL

if (!wsUrl) {
  console.error('No VITE_API_WS_URL')
}

export const useApiWs = () => {
  const { roomId, setState } = useStore()
  const { ref } = useStart()
  const { userId, authString } = useAuth()

  const ws = useMemo(() => {
    if (!roomId || !userId) {
      return null
    }
    const url = `${wsUrl}/rooms/${roomId}/ws?player_id=${userId}${ref ? `&ref=${ref}` : ''}&auth=${encodeURIComponent(authString)}`
    return new ReconnectingWebSocket(url)
  }, [roomId, userId, authString, ref])

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
          data?: TState
          error?: string
        } = JSON.parse(event.data)
        console.log('WS:', parsedMessage)

        if (parsedMessage.error) {
          console.error('WS error', parsedMessage.error)
        }
        if (parsedMessage.data) {
          setState(parsedMessage.data)
        }
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

  useEffect(() => {
    return () => {
      ws?.close()
    }
  })

  const send = (payload: unknown) => {
    ws?.send(JSON.stringify(payload))
  }

  return { send }
}
