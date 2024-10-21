import { useQuery } from '@tanstack/react-query'

import { useAuth, useJsonResponse, usePersistStore, useStore } from '../hooks'
import { TMe } from '../types'

export const apiUrl = import.meta.env.VITE_API_URL


export const usePostRoom = () => {
  const { authString, userId } = useAuth()
  const { handleJsonResponse } = useJsonResponse()

  return (): Promise<{
    room_id: string
    invite_link: string
  }> => {

    const url = `${apiUrl}/rooms?${new URLSearchParams({
      player_id: String(userId || ''),
      auth: encodeURIComponent(authString) || '',
    })}`

    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        // 'Authorization': authString,
      },
      // body: JSON.stringify({ }),
    }).then(handleJsonResponse)
  }
}

export const useGetMe = () => {
  const { handleJsonResponse } = useJsonResponse()
  const { ref } = usePersistStore()
  const { roomId } = useStore()

  const { authString } = useAuth()
  const url = `${apiUrl}/users/me?${new URLSearchParams({
    auth: encodeURIComponent(authString) || '',
    ...(ref ? { ref } : {} ),
    ...(roomId ? { room_id: roomId } : {}),
  })}`

  return useQuery<TMe, Error>({
    queryKey: [`ref-${authString}-${ref}-${roomId}`],
    queryFn: () => fetch(url, {
      method: 'GET',
    }).then(handleJsonResponse),
    enabled: !!authString,
  })
}

export const useGetPoints = () => {
  const points = {
    invite: 3000,
    win: 1000,
    draw: 500,
    lose: 100,
  }
  return {
    points,
  }
}
