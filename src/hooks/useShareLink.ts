import { useGetMe } from '../hooks'
import { TShareLinkData } from '../types'

const botUrl = import.meta.env.VITE_BOT_URL

if (!botUrl) {
  console.error('No VITE_BOT_URL')
}

export const useShareLink = ({ roomId }: {
  roomId?: string
}) => {
  const { data: me } = useGetMe()

  const data: TShareLinkData = {
    room_id: roomId,
    ref: me?.ref.code || undefined,
  }

  const encodedData = btoa(JSON.stringify(data))
    .split('=').join('')
    .split('+').join('-')
    .split('/').join('_')

  const shareUrl = `${botUrl}/app?startapp=${encodedData}`
  const shareLink = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}`

  return { shareUrl, shareLink }
}
