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

export type TPlayer = {
  id: TUserId
  username: string | null
  name: string | null
  ready: boolean
  cards: TCard[] | null
  image_url: string | null
  action: TAction | null // ?
}

export type TMe = {
  id: TUserId
  username: string | null
  first_name: string | null
  last_name: string | null
  ref: {
    code: string
    count: number
    points: number
  },
  total_points: number
}

export type TState = {
  room_id: TRoomId
  room_host: TUserId
  players: {
   [key: TUserId]: TPlayer
  }
  status: 0 | 1 | 2 | 100 // 0 - not ready, 1 - all ready (no deck), 2 - playing, 100 - finished
  last_loser_id: TUserId | null
  current_game_id: string
  invite_link: string // "https://t.me/durak"
  game: null | { // only for status 2
    deck: number
    table: TCard[][] | null
    trump: TCard
    current_attacker_id: TUserId | null
    current_defender_id: TUserId | null
    players: {
      [key: TUserId]: number // player_id, num cards
    }
    next_move_until: string // iso time
    status: 2 | 10 | 11 | 100 // 2 - dealing, 10 - attacking, 11 - defending, 100 - finish
    has_taken: boolean // current defender
    rewards: null | {
      [key: TUserId]: {
        points: number
        invite_points: number
        result: TResult
      }
    }
  }
}

export type TShareLinkData = {
  room_id?: string
  ref?: string
}

export type TAction = 'bat' | 'take' | 'pass'

export type TAvaStatus = 'waiting' | 'ready' | 'progress' | 'timeLow'

export type TResult = 'win' | 'draw' | 'lose'
