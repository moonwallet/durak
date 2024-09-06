import { useWebApp } from '@vkruglikov/react-telegram-web-app'

export const useOpenExternal = () => {
  const WebApp = useWebApp()
  const isTg = window.Telegram?.WebApp.platform !== 'unknown'

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
