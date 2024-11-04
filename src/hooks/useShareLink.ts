import { useTranslation } from 'react-i18next'

import { useGetMe, useGetPoints } from '../hooks'
import { TShareLinkData } from '../types'

const botUrl = import.meta.env.VITE_BOT_URL

if (!botUrl) {
  console.error('No VITE_BOT_URL')
}

export const useShareLink = ({ roomId }: {
  roomId?: string
}) => {
  const { data: me } = useGetMe()
  const { t } = useTranslation()

  const { points } = useGetPoints()

  const data: TShareLinkData = {
    room_id: roomId,
    ref: me?.ref.code || undefined,
  }

  const encodedData = btoa(JSON.stringify(data))
    .split('=').join('')
    .split('+').join('-')
    .split('/').join('_')

  const shareUrl = `${botUrl}/app?startapp=${encodedData}`
  const shareLink = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(t('playDurakWithMe', { winPoints: points.win }))}`

  return { shareUrl, shareLink }
}
