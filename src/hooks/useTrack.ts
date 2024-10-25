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

export const track: (_: string) => void = AMPLITUDE_KEY
  ? amplitude.track
  : (event: string) => { console.info('[NO-track]', event) }
