import cx from 'classnames'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import chair from '../assets/chair.png'
import game from '../assets/game.png'
import win from '../assets/win.png'
import loose from '../assets/loose.png'

import { useApiWs, useShareLink, useStore, useAuth, useCopy, useOpenExternal } from '../hooks'
import { Page, Button, Card, Ava, Tip } from '../kit'
import { TCard } from '../types'

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

  const status = /* Math.random() < 2 ? 2 : */ state?.status

  const opponents = state?.players.filter(_ => _ !== String(userId))
  const opponent = !!opponents?.length && opponents[0] || null

  const opponentCardsN: null | number = opponent && state?.game_stats?.players[opponent] || 0
  const deckCardsN: null | number = state?.game_stats?.deck || 0
  const trump: TCard | undefined = state?.game_stats?.trump_suit

  const isWin = true
  const points = 100
  const invitePoints = 1000

  const { shareUrl, shareLink } = useShareLink({ roomId: roomId || '' })
  const { openExternal } = useOpenExternal()

  const { copy, isCopied } = useCopy()

  const share = () => {
    console.log(shareUrl)
    try {
      openExternal(shareLink)
    } catch {
      copy(shareUrl)
    }
  }

  const [isSendedReady, setSendedReady] = useState(false)

  const ready = () => {
    send({
      'type': 'player.ready',
      'data': {},
    })
    setSendedReady(true)
  }

  useEffect(() => {
    if (status && isSendedReady) {
      setSendedReady(false)
    }
  }, [status, isSendedReady])

  const myCards: TCard[] = (['ac', 'ad', 'ah', 'as', 'ac', 'ad', 'ah', 'as', 'ac', 'ad', 'ah', 'as', 'ac', 'ad', 'ah', 'as', 'ac', 'ad', 'ah', 'as', 'ac', 'ad', 'ah', 'as', 'ac', 'ad', 'ah', 'as', 'ac', 'ad', 'ah', 'as'] as TCard[]).slice(0, 5)

  const chunks: <T>(arr: T[], n: number) => T[][] = (arr, n) => {
    return Array.from({ length: Math.ceil(arr.length / n) }, (_, i) =>
      arr.slice(i * n, i * n + n),
    )
  }

  const pairs = chunks<TCard>(myCards, 2)
  console.log('pairs', pairs)

  const pairGroupsRows = chunks<TCard[]>(pairs, 3)

  const rotateCard = ({ i, n, isReverse }: {
    i: number
    n: number
    isReverse?: boolean
  }) => `rotate(${n < 2 ? 0 : (isReverse ? -1 : 1)* (-6 + 2 * 6 * i / (n-1))}deg)`

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
              <div className="absolute top-[85%] left-[50%] -translate-x-[50%] w-full text-[14px] leading-[14px]">@{opponent}</div>
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
        {!status && !opponent &&
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
        {!status && !!opponent &&
          <div className="px-[82px] text-[24px] leading-[29px] font-bold">
            {t('tapReadyToStart')}
          </div>
        }
        {(status === 2 && !!opponent) &&
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
                +{points} {t('points')}
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
      <div className="Bottom relative h-[200px]">
        {(status === 1 && !!opponent) &&
          <div className="flex items-center justify-center h-[110px] max-w-[100%] mx-auto px-[90px]">
            {myCards.map((card, i, arr) => (
              <Card
                className="-mx-[90px] h-[153px]"
                style={{
                  transform: rotateCard({ i, n: arr.length }),
                }}
                card={card}
              />
            ))}
          </div>
        }
        <div className="absolute h-[90px] bottom-0 left-0 w-full flex items-center justify-between p-5 bg-[#292834] rounded-t-[24px]">
          {!status && !opponent &&
            <Button
              theme="big"
              onClick={share}
              disabled={isCopied}
            >
              {/* I’m ready */}
              {isCopied ? t('copied') : t('shareRoomLink') }
            </Button>
          }
          {!status && !!opponent &&
            <>
              {!isSendedReady ? (
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
                >
                  {t('waiting')}
                </Button>
              )}
            </>
          }

          {status === 100 &&
            <Button
              theme="big"
              onClick={ready}
            >
              {(!isWin && opponent)
                ? t('ready') : t('startNew') }
            </Button>
          }

          <div className="absolute bottom-5 right-0 w-[120px] h-[120px]">
            <img src={chair} className="absolute bottom-2 w-[120px] h-[120px]" />
            <div className="absolute right-5 bottom-0 max-w-[110px] truncate text-text text-[14px] text-right">@{userId}</div>
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
