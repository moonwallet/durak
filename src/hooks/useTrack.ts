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

export const track: (event: TEvent, props?: object) => void = (event, props = undefined) => {
  if (AMPLITUDE_KEY) {
    amplitude.track(event, props)
  } else {
    console.info('[NO-track]', event, props)
  }
}

type TEvent =
  'Launch first time' |
  'Session start' |
  'Room created' |
  'Share room pressed' |
  'Two players joined' |
  'Game started' |
  'Game finished' |
  'Rated' |
  'Points viewed' |
  'Points info viewed' |
  'Points invite pressed' |
  'Points link pressed' |
  'Points claim pressed'
