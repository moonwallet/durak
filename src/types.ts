export type TLanguageCode = 'en' | 'ru'

export type TCard =
  '6c' | '6d' | '6h' | '6s' |
  '7c' | '7d' | '7h' | '7s' |
  '8c' | '8d' | '8h' | '8s' |
  '9c' | '9d' | '9h' | '9s' |
  '10c' | '10d' | '10h' | '10s' |
  'jc' | 'jd' | 'jh' | 'js' |
  'qc' | 'qd' | 'qh' | 'qs' |
  'kc' | 'kd' | 'kh' | 'ks' |
  'ac' | 'ad' | 'ah' | 'as'

export type TMessageInType = 'room.data'
export type TMessageOutType = 'player.ready'
export type TMessageType = TMessageInType | TMessageOutType

export type TUserId = string

export type TState = {
  room_id: string
  room_host: TUserId
  players: TUserId[]
  players_data: {
   [key: TUserId]: {
    ready: boolean
   }
  }
  status: 0 | 1 // 0 - not ready, 1 - all read
  last_loser: TUserId
  current_game_id: string
  invite_link: string // "https://t.me/durak"
}
