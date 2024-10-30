import * as amplitude from '@amplitude/analytics-browser'

const isDev = import.meta.env.MODE === 'development'

const AMPLITUDE_KEY: undefined | string = isDev
  ? undefined
  : import.meta.env.VITE_AMPLITUDE_KEY

if (AMPLITUDE_KEY) {
  amplitude.init(AMPLITUDE_KEY)
} else {
  console.error('⚠️ NO AMPLITUDE_KEY')
}

export const track: (_: TEvent) => void = (event: TEvent) => {
  if (AMPLITUDE_KEY) {
    amplitude.track(event)
  } else {
    console.info('[NO-track]', event)
  }
}

type TEvent =
  'Launch first time' |
  'Session start' |
  'Room created' |
  'Share room pressed' |
  'Game started' |
  'Game finished' |
  'Points viewed' |
  'Points info viewed' |
  'Points invite pressed' |
  'Points link pressed' |
  'Points claim pressed'
