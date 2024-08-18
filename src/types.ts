export type TLanguageCode = 'en' | 'ru'

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
