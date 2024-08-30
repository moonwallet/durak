import { TShareLinkData } from '../types'

const botUrl = import.meta.env.VITE_BOT_URL

if (!botUrl) {
  console.error('No VITE_BOT_URL')
}

export const useShareLink = ({ roomId }: {
  roomId: string
}) => {
  const data: TShareLinkData = {
    room_id: roomId,
  }

  const encodedData = btoa(JSON.stringify(data))
    .split('=').join('')
    .split('+').join('-')
    .split('/').join('_')

  const shareLink = `${botUrl}/app?startapp=${encodedData}`

  return { shareLink }
}
