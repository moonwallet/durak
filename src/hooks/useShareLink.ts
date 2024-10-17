import { TShareLinkData } from '../types'
import { useAuth } from '../hooks/useAuth'

const botUrl = import.meta.env.VITE_BOT_URL

if (!botUrl) {
  console.error('No VITE_BOT_URL')
}

export const useShareLink = ({ roomId }: {
  roomId?: string
}) => {
  const { userId } = useAuth()

  const data: TShareLinkData = {
    room_id: roomId,
    ref: userId ? String(userId) : undefined,
  }

  const encodedData = btoa(JSON.stringify(data))
    .split('=').join('')
    .split('+').join('-')
    .split('/').join('_')

  const shareUrl = `${botUrl}/app?startapp=${encodedData}`
  const shareLink = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}`

  return { shareUrl, shareLink }
}
