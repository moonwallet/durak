// see example: https://github.com/i18next/react-i18next/tree/master/example/react-typescript/simple
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

import { TLanguageCode } from '../types'

import en from './en.json'
import ru from './ru.json'

const langs: TLanguageCode[] = ['en', 'ru']

i18next.use(initReactI18next).init({
  // if you're using a language detector, do not define the lng option
  // lng: window.Telegram?.WebApp.initDataUnsafe.user?.language_code === 'ru' ? 'ru' : 'en',
  lng: langs[0],
  fallbackLng: langs,
  supportedLngs: langs,
  debug: false,
  resources: {
    en: { translation: en },
    ru: { translation: ru },
  },
})

export default i18next
