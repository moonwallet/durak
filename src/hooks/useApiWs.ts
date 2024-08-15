import ReconnectingWebSocket from 'reconnecting-websocket'

import { useEffect, useMemo } from 'react'

import { TState } from '../types'
import { useStore } from './useStore'

const wsUrl = import.meta.env.VITE_API_WS_URL

export const useApiWsTransactions = () => {
  const { setState } = useStore()

  const ws = useMemo(() => new ReconnectingWebSocket(wsUrl), [])

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      try {
        const state: TState = JSON.parse(event.data)
        setState(state)
      } catch (e) {
        console.error('WS: cannot decode message', e)
      }
    }

    ws.addEventListener('message', onMessage)
    return () => {
      ws.removeEventListener('message', onMessage)
    }
  }, [ws, setState])

  useEffect(() => {
    const closeWs = () => {
      ws.close()
    }
    window.addEventListener('beforeunload', closeWs)
    return () => {
      window.removeEventListener('beforeunload', closeWs)
    }
  }, [ws])
}
