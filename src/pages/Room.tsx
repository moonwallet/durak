import cx from 'classnames'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import chair from '../assets/chair.png'
import game from '../assets/game.png'
import win from '../assets/win.png'
import loose from '../assets/loose.png'

import { useApiWs, useShareLink, useStore, useAuth, useCopy, useOpenExternal } from '../hooks'
import { Page, Button, Card, Ava, Tip, Username } from '../kit'
import { TAction, TCard, TPlayer, TUserId } from '../types'

export const Room = () => {
  const { t } = useTranslation()
  const { roomId, state } = useStore()
  const navigate = useNavigate()
  const { send } = useApiWs()

  useEffect(() => {
    if (!roomId) {
      // navigate('/') // todo
    }
  }, [roomId, navigate])

  const { userId } = useAuth()

  const mockStatus: number | false = false && 2
  const status = mockStatus || state?.status

  const players = state?.players || {}
  const playersKeys = Object.keys(players)

  const opponentIds = playersKeys.filter(_ => _ !== String(userId))
  const opponentId: TUserId | null = opponentIds[0] || null
  const opponent: TPlayer | null = !!opponentId && players[opponentId] || null
  const me: TPlayer | null = userId && players[userId] || null

  const opponentCardsN: null | number = opponent?.cards?.length || 0
  const deckCardsN: null | number = state?.game?.deck || 0

  const trump: TCard | undefined = state?.game?.trump || undefined

  const isMyMove = status === 2 && state?.game?.current_attacker_id === userId
  const isOpponentsMove = status === 2 && state?.game?.current_defender_id === userId

  const notCoupled = status === 2 && !!state?.game?.table?.length && state.game.table[0].length === 1
  const isCoupled = status === 2 && !!state?.game?.table?.length && state.game.table[0].length === 2

  const isPassAvailable = false // todo

  const isWin = true
  const points = 100
  const invitePoints = 1000

  const { shareUrl, shareLink } = useShareLink({ roomId: roomId || '' })
  const { openExternal } = useOpenExternal()

  const { copy, isCopied } = useCopy()

  const share = () => {
    console.log(shareUrl)
    console.log('roomId', roomId)
    try {
      openExternal(shareLink)
    } catch {
      copy(shareUrl)
    }
  }

  const ready = () => {
    send({
      'type': 'player.ready',
      'data': null,
    })
  }

  const action = (action: TAction) => {
    send({
      'type': 'player.move',
      'data': {
        action,
      },
    })
  }

  const myCardsMock: TCard[] | false = false && (['ac', 'ad', 'ah', 'as', 'ac', 'ad', 'ah', 'as', 'ac', 'ad', 'ah', 'as', 'ac', 'ad', 'ah', 'as', 'ac', 'ad', 'ah', 'as', 'ac', 'ad', 'ah', 'as', 'ac', 'ad', 'ah', 'as', 'ac', 'ad', 'ah', 'as'] as TCard[]).slice(0, 5)

  const myCards: TCard[] = myCardsMock || me?.cards || []

  const chunks: <T>(arr: T[], n: number) => T[][] = (arr, n) => {
    return Array.from({ length: Math.ceil(arr.length / n) }, (_, i) =>
      arr.slice(i * n, i * n + n),
    )
  }

  // const pairs = chunks<TCard>(myCards, 2)
  // console.log('pairs', pairs)

  const table = state?.game?.table || []

  const pairGroupsRows = chunks<TCard[]>(table, 3)

  const rotateCard = ({ i, n, isReverse }: {
    i: number
    n: number
    isReverse?: boolean
  }) => `rotate(${n < 2 ? 0 : (isReverse ? -1 : 1)* (-6 + 2 * 6 * i / (n-1))}deg)`

  const onCardClick = (card: TCard) => {
    console.log('onCardClick', card)
    send({
      'type': 'player.move',
      'data': {
        card: card,
      },
    })
  }

  return (
    <Page>
      <div className="Top z-0 mt-1 flex flex-col items-center justify-center h-[158px]">
        <div className="z-[1] relative w-[200px] h-[90px] shadow-[0px_0px_30px_30px_#11101D]">
          <img src={chair} className={cx('mx-auto w-[90px] h-[90px]', !opponent && 'grayscale')} />
          {!opponent &&
            <div className="absolute top-[85%] left-[50%] -translate-x-[50%] w-full text-[16px] leading-[16px] font-semibold text-text/50">{t('roomIsEmpty')}</div>
          }
          {opponent &&
            <>
              <div className="absolute top-[85%] left-[50%] -translate-x-[50%] w-full text-[14px] leading-[14px]">
                <Username player={opponent} />
              </div>
              <Ava className="absolute -top-[10%] left-[50%] -translate-x-[50%] scale-75" />
              {false &&
                <Tip isReverse className="absolute top-[55%] left-[50%] -translate-x-[50%] scale-75">
                  {t('take')}
                </Tip>
              }
            </>
          }
        </div>
        <div className="h-[70px]">
          {status === 2 &&
            <div className="flex items-center justify-center h-[70px] max-w-[100%] mx-auto">
              {[...Array(opponentCardsN)].map((_, i, arr) => (
                <Card
                  className="-mx-[10px] h-[60px]"
                  style={{
                    transform: rotateCard({ i, n: arr.length, isReverse: true }),
                  }}
                />
              ))}
            </div>
          }
        </div>
      </div>

      {!!opponent &&
        <div className="Side absolute left-0 top-[50%] -translate-y-[50%]">
          {!!deckCardsN &&
            <div className="absolute -top-[48px] right-[48px] text-white/50 text-[16px] leading-[16px] font-semibold">{deckCardsN}</div>
          }
          <div className="relative -top-[20px]">
            {deckCardsN >= 1 && trump &&
              <Card card={trump} className="absolute -left-[110px] top-[50%] -translate-y-[50%] h-[110px] rotate-90" />
            }
            {deckCardsN >= 2 &&
              <div className="relative -left-[50px] w-[75px] h-[110px]">
                <Card className="absolute inset-0 w-[75px] h-[110px]" />
                {deckCardsN >= 3 &&
                  <Card className="absolute inset-0 w-[75px] h-[110px] rotate-6" />
                }
              </div>
            }
          </div>
        </div>
      }

      <div className="Center flex items-center justify-center">
        {status === 0 && !opponent &&
          <div className="">
            <div className="-mb-[50px]">
              <img src={game} className="mx-auto w-[294px] h-[232px]" />
            </div>
            <div className="px-8 text-[24px] leading-[29px] font-bold">
              {t('sendRoomLink')}
            </div>
            <div className="mt-2 text-text/60 text-[16px] leading-[18px] font-medium">
              <div>{t('forEveryFren')} <span className="text-main">500 $DRK {t('points_')}</span></div>
              <div>{t('forEveryWin')} <span className="text-main">2000 $DRK {t('points_')}</span></div>
              <div></div>
            </div>
          </div>
        }
        {status === 0 && !!opponent &&
          <div className="px-[82px] text-[24px] leading-[29px] font-bold">
            {t('tapReadyToStart')}
          </div>
        }
        {(status === 2) &&
          <div className="Groups flex flex-col gap-8">
            {pairGroupsRows.map((row, i) => (
              <div key={`row-${i}`} className="flex items-center justify-between gap-8">
                {row.map((group, j) => (
                  <div key={`group-${j}`} className="Group relative h-[79px] w-[54px]">
                    <Card className={cx('absolute left-0 top-0 w-full h-full', group[1] && '-rotate-12')} card={group[0]} />
                    {group[1] &&
                      <Card className="absolute left-0 top-0 w-full h-full rotate-12" card={group[1]} />
                    }
                  </div>
                ))}
              </div>
            ))}
          </div>
        }
        {(status === 100) &&
          <div className="flex flex-col items-center">
            {isWin &&
              <img src={win} className="-mb-[40px] w-[148px] h-[163px]" />
            }
            {!isWin &&
              <img src={loose} className="-mb-[70px] w-[188px] h-[188px]" />
            }
            {points &&
              <div className="p-[10px] text-[36px] leading-[36px] font-semibold" style={{ textShadow: '-2px -2px #454456, -2px 2px #454456, 2px 2px #454456, 2px -2px #454456' }}>
                +{points} {t('points_')}
              </div>
            }
            <div className="min-h-[22px]">
              {invitePoints &&
                <span className="text-main text-[18px] leading-[21px] font-semibold">{t('pointsForInviting')}</span>
              }
            </div>
            <div className="mt-10 text-[48px] leading-[48px] font-extrabold">
              {isWin && <div className="text-main">{t('win')}</div>}
              {!isWin && <div className="text-[#DF0000]">{t('gameOver')}</div>}
            </div>
            <div className="mt-[9px] text-[16px] leading-[18px] text-text/60">
              {!!opponent && isWin && <span>{t('tapReadyToPlayAgain')}</span>}
              {!!opponent && !isWin && <span>{t('tapReadyForRevanche')}</span>}
              {!opponent && <span>{t('opponentLeft')}</span>}
            </div>
          </div>
        }
      </div>
      <div className="Bottom relative h-[210px]">
        {(status === 2) &&
          <div className="flex items-center justify-center h-[162px] max-w-[100%] mx-auto px-[60px]">
            {myCards.map((card, i, arr) => (
              <div className="relative w-[40px] h-full">
                <div className="absolute top-0 left-[50%] -translate-x-[50%]">
                  <div
                    style={{
                      transform: rotateCard({ i, n: arr.length }),
                    }}
                  >
                    <Card
                      key={`my-card-${card}`}
                      className="h-[162px] w-[116px] hover:-translate-y-5 active:-translate-y-5"
                      card={card}
                      onClick={onCardClick}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        }
        <div className="absolute h-[90px] bottom-0 left-0 w-full flex items-center justify-between p-5 bg-[#292834] rounded-t-[24px]">
          {status === 0 && !opponent &&
            <Button
              theme="big"
              onClick={share}
              disabled={isCopied}
            >
              {isCopied ? t('copied') : t('shareRoomLink') }
            </Button>
          }
          {status === 0 && !!opponent && !!me &&
            <>
              {!me.ready ? (
                <Button
                  theme="big"
                  onClick={ready}
                >
                  {t('ready')}
                </Button>
              ) : (
                <Button
                  theme="big"
                  onClick={ready}
                  disabled
                >
                  {t('waiting')}
                </Button>
              )}
            </>
          }

          {isOpponentsMove && isCoupled &&
            <Button
              theme="big"
              onClick={() => { action('bat') }}
            >
              {t('bat')}
            </Button>
          }

          {isMyMove && notCoupled &&
            <Button
              theme="big"
              onClick={() => { action('take') }}
            >
              {t('take')}
            </Button>
          }

          {isMyMove && isPassAvailable &&
            <Button
              theme="big"
              onClick={() => { action('pass') }}
            >
              {t('pass')}
            </Button>
          }

          {status === 100 && !!opponent && !!me &&
            <>
              {!me.ready ? (
                <Button
                  theme="big"
                  onClick={ready}
                >
                  {isWin ? t('startNew') : t('ready')}
                </Button>
              ) : (
                <Button
                  theme="big"
                  onClick={ready}
                  disabled
                >
                  {t('waiting')}
                </Button>
              )}
            </>
          }

          <div className="absolute bottom-5 right-0 w-[120px] h-[120px]">
            <img src={chair} className="absolute bottom-2 w-[120px] h-[120px]" />
            <div className="absolute right-5 bottom-0 max-w-[110px] truncate text-text text-[14px] text-right">
              <Username player={me} />
            </div>
            <Ava className="absolute top-[0%] left-[50%] -translate-x-[50%] scale-[85%]" />
            {false &&
              <Tip className="absolute -top-[35%] left-[50%] -translate-x-[50%] scale-75">
                {t('take')}
              </Tip>
            }
          </div>
        </div>
      </div>
    </Page>
  )
}
