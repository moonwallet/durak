import { useWebApp } from '@vkruglikov/react-telegram-web-app'

import { usePlatform } from '../hooks'

export const useOpenExternal = () => {
  const WebApp = useWebApp()
  const { isTg } = usePlatform()

  const openExternal = (url: string) => {
    if (isTg) {
      if (url.startsWith('https://t.me')) {
        WebApp.openTelegramLink(url)
      } else {
        WebApp.openLink(url)
      }
    } else {
      window.open(url, '_blank')?.focus()
    }
  }
  return { openExternal }
}
