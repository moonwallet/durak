import { useQuery } from '@tanstack/react-query'

import i18n from '../i18n'
import { useAuth, useJsonResponse, useStart } from '../hooks'
import { TMe, TTask } from '../types'

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
  const { ref, roomId } = useStart()

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

export const useGetTasks = () => {
  const { handleJsonResponse } = useJsonResponse()
  const { authString, userId } = useAuth()

  const url = `${apiUrl}/tasks?${new URLSearchParams({
    lang: i18n.language,
    auth: encodeURIComponent(authString) || '',
  })}`

  return useQuery<TTask[], Error>({
    queryKey: [`task-${userId}`],
    queryFn: () => fetch(url, {
      method: 'GET',
    }).then(handleJsonResponse),
    enabled: !!authString,
  })
}

export const usePostTask = () => {
  const { handleJsonResponse } = useJsonResponse()
  const { authString } = useAuth()

  return ({ taskId }: {
    taskId: number
  }): Promise<unknown> => {
    const url = `${apiUrl}/tasks/${taskId}?${new URLSearchParams({
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
