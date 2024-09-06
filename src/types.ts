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
export type TMessageOutType = 'player.ready' | 'player.unready' | 'player.move'
export type TMessageType = TMessageInType | TMessageOutType

export type TUserId = string
export type TRoomId = string

export type TState = {
  room_id: TRoomId
  room_host: TUserId
  players: TUserId[]
  players_data: {
   [key: TUserId]: {
    ready: boolean
   }
  }
  status: 0 | 1 | 2 | 100 // 0 - not ready, 1 - all ready (no deck), 2 - playing, 100 - finished
  last_loser: TUserId
  current_game_id: string
  invite_link: string // "https://t.me/durak"
  game_stats?: { // only for status 2
    deck: number
    table: TCard[]
    trump_suit: TCard
    current_attacker_id: TUserId
    current_defender_id: TUserId
    hand: TCard[]
    players: {
      [key: TUserId]: number // player_id, num cards
    }
  }
}

export type TShareLinkData = {
  room_id: string
}
