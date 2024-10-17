import { useQuery } from '@tanstack/react-query'
import { useAuth, useJsonResponse, usePersistStore } from '../hooks'

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
    })}`

    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': authString,
      },
      // body: JSON.stringify({ }),
    }).then(handleJsonResponse)
  }
}

export const useSendRef = () => {
  const { handleJsonResponse } = useJsonResponse()
  const { ref } = usePersistStore()
  const { authString } = useAuth()
  const url = `${apiUrl}/users/me?${new URLSearchParams({
    auth: encodeURIComponent(authString) || '',
    ref: ref || '',
  })}`

  return useQuery<unknown, Error>({
    queryKey: [`ref-${authString}-${ref}`],
    queryFn: () => fetch(url, {
      method: 'GET',
    }).then(handleJsonResponse),
    enabled: !!authString && !!ref,
    staleTime: Infinity,
  })
}
