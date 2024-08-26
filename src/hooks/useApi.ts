import { useAuth, useJsonResponse } from '../hooks'

export const apiUrl = import.meta.env.VITE_API_URL


export const usePostRoom = () => {
  const { authString, userId } = useAuth()
  const { handleJsonResponse } = useJsonResponse()

  return (): Promise<{
    room_id: string
    invite_link: string
  }> => {

    const url = `${apiUrl}/rooms?${new URLSearchParams({
      telegram_id: String(userId || ''),
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
