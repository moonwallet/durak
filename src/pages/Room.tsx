import { BackButton } from '@vkruglikov/react-telegram-web-app'
import cx from 'classnames'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

import chair from '../assets/chair.png'
import game from '../assets/game.png'
import win from '../assets/win.png'
import lose from '../assets/lose.png'
import tg from '../assets/tg.png'

import { useApiWs, useShareLink, useStore, useAuth, useCopy, useOpenExternal, useGetMe, useGetPoints, usePlatform, track } from '../hooks'
import { Page, Button, Card, Ava, Tip, Username, Modal, Stars } from '../kit'
import { TAction, TAvaStatus, TCard, TPlayer, TResult, TUserId } from '../types'


export const Room = () => {
  const { t } = useTranslation()
  const { setRoomId, state } = useStore()
  const navigate = useNavigate()
  const { points } = useGetPoints()
  const { send } = useApiWs()
  useGetMe()

  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const roomId: string | undefined = searchParams.get('roomId') || undefined

  useEffect(() => {
    if (roomId) {
      setRoomId(roomId)
    } else {
      navigate('/')
    }
  }, [roomId, navigate, setRoomId])

  const { userId } = useAuth()

  const myIdNumber: number | undefined = userId || undefined
  const myIdString: string | undefined = userId ? String(userId) : undefined

  const mockStatus: number | false = false && 2
  const status = mockStatus || state?.status

  const players = state?.players || {}
  const playersKeys = Object.keys(players)

  const opponentIds = playersKeys.filter(_ => _ !== myIdString)
  const opponentId: TUserId | null = opponentIds[0] || null
  const opponent: TPlayer | null = !!opponentId && players[opponentId] || null
  const me: TPlayer | null = myIdNumber && players[myIdNumber] || null

  const opponentCardsN: null | number = opponent?.cards?.length || 0
  const deckCardsN: null | number = state?.game?.deck || 0

  const trump: TCard | undefined = state?.game?.trump || undefined

  const isMyMove: boolean = status === 2 && state?.game?.current_attacker_id === myIdString
  const isOpponentsMove: boolean = status === 2 && state?.game?.current_defender_id === myIdString

  const isBatAvailable: boolean = isMyMove && state?.game?.status === 10 && !!state.game && !state.game.has_taken && !!state.game.table && state.game.table.length > 0
  const isTakeAvailable: boolean = isOpponentsMove && state?.game?.status === 11 && state?.game?.has_taken === false
  const isPassAvailable: boolean = isMyMove && state?.game?.status === 10 &&!!state?.game?.has_taken

  const myStatus: undefined | TAvaStatus = (isMyMove && state?.game?.status === 10 || isOpponentsMove && state?.game?.status === 11) ? 'progress' : undefined

  const opponentStatus: undefined | TAvaStatus = (isMyMove && state?.game?.status === 11 || isOpponentsMove && state?.game?.status === 10) ? 'progress' : undefined

  const result: TResult | undefined = !!myIdString && state?.game?.rewards?.[myIdString] && state.game.rewards[myIdString].result || undefined
  const rewardPoints: number | undefined = !!myIdString && state?.game?.rewards?.[myIdString] && state.game.rewards[myIdString].points || undefined
  const invitePoints: number | undefined = !!myIdString && state?.game?.rewards?.[myIdString] && state.game.rewards[myIdString].invite_points || undefined

  const { shareUrl, shareLink } = useShareLink({ roomId })
  const { openExternal } = useOpenExternal()
  const { copy, isCopied } = useCopy()
  const { isTg } = usePlatform()

  const share = () => {
    console.log(shareUrl)
    console.log('roomId', roomId)
    try {
      openExternal(shareLink)
      if (!isTg) {
        copy(shareUrl)
      }
    } catch {
      copy(shareUrl)
    }
    track('Share room pressed')
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

  const leave = () => {
    send({
      'type': 'player.leave',
      'data': null,
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

  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false)

  useEffect(() => {
    if (status === 2) {
      track('Game started')
    }
    if (status === 100) {
      track('Game finished')
    }
  }, [status])

  useEffect(() => {
    if (playersKeys.length >= 2) {
      track('Two players joined')
    }
  }, [playersKeys.length])

  return (
    <Page bottom={
      <div className="relative h-[154px]">
        {(status === 2) &&
          <div className="absolute bottom-[45px] w-full h-[162px]">
            <div className="flex items-center justify-center h-full max-w-[100%] mx-auto px-[60px]">
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
                        className="h-[162px] w-[116px] hoverable:hover:-translate-y-5 active:-translate-y-5"
                        card={card}
                        onClick={onCardClick}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        }
        <div className="absolute h-[90px] bottom-0 left-0 w-full flex items-center justify-between p-5 bg-[#292834] rounded-t-[24px]">
          {!status && !opponent &&
            <Button
              theme="big"
              onClick={share}
              disabled={isCopied}
            >
              {isCopied ? t('copied') : t('shareRoomLink') }
            </Button>
          }
          {!status && !!opponent && !!me &&
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

          {isBatAvailable &&
            <Button
              theme="big"
              onClick={() => { action('bat') }}
            >
              {t('bat')}
            </Button>
          }

          {isTakeAvailable &&
            <Button
              theme="big"
              onClick={() => { action('take') }}
            >
              {t('take')}
            </Button>
          }

          {isPassAvailable &&
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
                  {t('playAgain')}
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
            <Ava
              className="!absolute top-[0%] left-[50%] -translate-x-[50%] scale-[85%]"
              username={me?.username || null}
              status={myStatus}
            />
            {false &&
              <Tip className="absolute -top-[35%] left-[50%] -translate-x-[50%] scale-75">
                {t('take')}
              </Tip>
            }
          </div>
        </div>
      </div>
    }>
      <BackButton onClick={() => { setIsLeaveModalOpen(true) }} />
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
              <Ava
                className="!absolute -top-[10%] left-[50%] -translate-x-[50%] scale-75"
                username={opponent.username}
                status={opponentStatus}
              />
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
                  className="-mx-[10px] h-[60px] w-[40px]"
                  style={{
                    transform: rotateCard({ i, n: arr.length, isReverse: true }),
                  }}
                />
              ))}
            </div>
          }
        </div>
      </div>

      {status === 2 &&
        <div className="Side absolute left-0 top-[50%] -translate-y-[50%]">
          {!!deckCardsN &&
            <div className="absolute -top-[48px] right-[48px] text-white/50 text-[16px] leading-[16px] font-semibold">{deckCardsN}</div>
          }
          <div className="relative -top-[20px] w-[75px] h-[110px]">
            {deckCardsN >= 1 && trump &&
              <Card card={trump} className="absolute -left-[30px] top-[50%] -translate-y-[50%] w-[75px] h-[110px] rotate-90" />
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
        {!status && !opponent &&
          <div className="px-4">
            <div className="-mt-[30px] -mb-[50px]">
              <img src={game} className="mx-auto w-[294px] h-[232px]" />
            </div>
            <div className="max-w-[470px] mx-auto text-[24px] leading-[29px] font-bold">
              <span>{t('sendRoomLink')}</span>
              &nbsp;
              <Button
                wrapperClassName="inline-block"
                onClick={() => { openExternal('https://t.me/durakton_chat/4') }}
              >
                <span className="text-nowrap">
                  <img src={tg} className="w-[28px] h-[28px] inline-block" />&nbsp;<span className="underline text-main">{t('ourChat')}</span>
                </span>
              </Button>
              &nbsp;
              <span>{t('toStart')}</span>
            </div>
            <div className="mt-2 text-text/60 text-[16px] leading-[18px] font-medium">
              <div className="text-main">{points.invite} {t('points_')} {t('forEveryFren')}</div>
              <div className="text-main">{points.win} {t('points_')} {t('forEveryWin')}</div>
              <div></div>
            </div>
          </div>
        }
        {!status && !!opponent &&
          <div className="px-[82px] text-[24px] leading-[29px] font-bold">
            {t('tapReadyToStart')}
          </div>
        }
        {(status === 2) &&
          <div className="Groups flex flex-col gap-8">
            {pairGroupsRows.map((row, i) => (
              <div key={`row-${i}`} className="flex items-center justify-center gap-8">
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
            {(result === 'win' || result === 'draw') &&
              <img src={win} className="w-[148px] h-[163px]" />
            }
            {result === 'lose' &&
              <img src={lose} className="w-[186px] h-[112px]" />
            }
            <div className="text-[48px] leading-[48px] font-extrabold">
              {result === 'win' && <div className="text-main">{t('win')}</div>}
              {result === 'draw' && <div className="text-[#EBECEA]">{t('draw')}</div>}
              {result === 'lose' && <div className="text-[#DF0000]">{t('lose')}</div>}
            </div>
            {!!rewardPoints &&
              <div className="p-[10px] text-[36px] leading-[36px] font-semibold" style={{ textShadow: '-2px -2px #454456, -2px 2px #454456, 2px 2px #454456, 2px -2px #454456' }}>
                +{rewardPoints} {t('points_')}
              </div>
            }
            {!!invitePoints &&
              <div className="text-main text-[18px] leading-[21px] font-semibold">+{invitePoints} {t('pointsForInviting')}</div>
            }
            <div className="mt-6 flex flex-col gap-[10px] p-[10px]">
              <Stars />
              <div className="text-[16px] leading-[18px] text-text/60 font-medium">{t('reviewGameplay')}</div>
            </div>
          </div>
        }
      </div>

      <div className="Bottom" />

      {isLeaveModalOpen &&
        <Modal>
          <div className="mx-auto mb-[50px] max-w-[280px] text-[16px] leading-[18px] font-medium text-text/60">
            <div>{status === 2 ? t('gameWillBeLost') : t('gameWillBeLost_')}</div>
            <div>{t('areYouSure')}</div>
          </div>
          <div className="flex flex-col gap-4">
            <Button
              theme='big'
              onClick={() => { setIsLeaveModalOpen(false) }}>
              {t('stayAndPlay')}
            </Button>
            <Button
              theme='big'
              className=""
              onClick={() => {
                leave()
                setIsLeaveModalOpen(false)
                setRoomId(null)
                navigate('/')
              }}>
              {status === 2 ? t('leaveAndLose') : t('leave')}
            </Button>
          </div>
        </Modal>
      }
    </Page>
  )
}
