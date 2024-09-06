import cx from 'classnames'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { Page, Button, Card } from '../kit'

import chair from '../assets/chair.png'
import { useApiWs, useShareLink, useStore, useAuth, useCopy, useOpenExternal } from '../hooks'
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

  const opponents = state?.players.filter(_ => _ !== String(userId))
  const opponent = !!opponents?.length && opponents[0] || null

  const status = state?.status || false

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

  const myCards: TCard[] = (['ac', 'ad', 'ah', 'as', 'ac', 'ad', 'ah', 'as', 'ac', 'ad', 'ah', 'as', 'ac', 'ad', 'ah', 'as'] as TCard[]).slice(0, 11)

  const rotateCard = ({ i, n }: {
    i: number
    n: number
  }) => `rotate(${n < 2 ? 0 : (-6 + 2 * 6 * i / (n-1))}deg)`

  return (
    <Page>
      <div className="Top z-0 mt-1 flex flex-col items-center justify-center h-[158px]">
        <div className="z-[1] relative w-[150px] h-[90px] shadow-[0px_0px_30px_30px_#11101D]">
          <img src={chair} className={cx('mx-auto w-[90px] h-[90px]', !opponent && 'grayscale')} />
          {opponent &&
            <div className="absolute top-[85%] left-[50%] -translate-x-[50%] w-full text-[14px] leading-[14px]">@{opponent}</div>
          }
          {!opponent &&
            <div className="absolute top-[85%] left-[50%] -translate-x-[50%] w-full text-[16px] leading-[16px] font-semibold text-text/50">{t('roomIsEmpty')}</div>
          }
        </div>
        <div className="h-[70px]">
          {!!status &&
            <div className="flex items-center justify-center h-[70px] max-w-[100%] mx-auto">
              <Card className="-mx-[10px] h-[60px] rotate-6" />
              <Card className="-mx-[10px] h-[60px] rotate-3" />
              <Card className="-mx-[10px] h-[60px] -rotate-3" />
              <Card className="-mx-[10px] h-[60px] -rotate-6" />
            </div>
          }
        </div>
      </div>

      {!!opponent &&
        <div className="Side absolute left-0 top-[50%] -translate-y-[50%]">
          <div className="absolute -top-[48px] right-[48px] text-white/50 text-[16px] leading-[16px] font-semibold">N?</div>
          <div className="relative -top-[20px]">
            <Card card="qs" className="absolute -left-[110px] top-[50%] -translate-y-[50%] h-[110px] rotate-90" />
            <Card className="relative -left-[50px] h-[110px]" />
          </div>
        </div>
      }

      <div className="Center flex items-center justify-center">
        {!status && !opponent &&
          <div className="px-8 text-[24px] leading-[29px] font-bold">
            {t('sendRoomLink')}
          </div>
        }
        {!status && !!opponent &&
          <div className="px-[82px] text-[24px] leading-[29px] font-bold">
            {t('tapReadyToStart')}
          </div>
        }
        {!!status && !!opponent &&
          <div className="Group relative h-[130px] w-[90px]">
            <Card className="absolute left-0 top-0 w-full h-full -rotate-12" card="as" />
            <Card className="absolute left-0 top-0 w-full h-full rotate-12" card="ah" />
          </div>
        }
      </div>
      <div className="Bottom relative h-[200px]">
        {!status &&
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
          <div className="relative w-[100px] h-[50px] flex flex-col items-end justify-end">
            <img src={chair} className="absolute -right-[20px] -top-[60px]" />
            <div className="text-text text-[14px] text-right">@{userId}</div>
          </div>
        </div>
      </div>
    </Page>
  )
}