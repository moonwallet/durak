import cx from 'classnames'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useCopy, useGetMe, useGetPoints, useOpenExternal, useShareLink, usePlatform } from '../hooks'
import { Page, Menu, Button, Quest } from '../kit'

import { ReactComponent as Point } from '../assets/point.svg'
import { ReactComponent as Check } from '../assets/check.svg'
import pointsLeft from '../assets/pointsLeft.png'
import pointsRight from '../assets/pointsRight.png'
import questDurak from '../assets/questDurak.png'
import questMoon from '../assets/questMoon.png'

export const Points = () => {
  const { t } = useTranslation()
  const { data: me } = useGetMe()

  const textGradient = {
    background: 'linear-gradient(91.1deg, #FFFFFF 0.94%, #999999 117.2%)',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  }

  const [tab, setTab] = useState<1|2>(1)

  const { shareUrl, shareLink } = useShareLink({})
  const { openExternal } = useOpenExternal()
  const { copy, isCopied } = useCopy()
  const { isTg } = usePlatform()

  const share = () => {
    console.log(shareUrl)
    try {
      openExternal(shareLink)
      if (!isTg) {
        copy(shareUrl)
      }
    } catch {
      copy(shareUrl)
    }
  }

  const { points } = useGetPoints()

  return (
    <Page>
      <div className="Top px-3">
        <div className="mt-4 flex items-center justify-between">
          <img
            className="w-[36px] h-[133px]"
            src={pointsLeft}
          />
          <div className="flex flex-col gap-1">
            <div className="text-[48px] leading-[58px] font-bold">{me?.total_points || 0}</div>
            <div className="flex items-center text-main font-bold">
              <Point className="w-6 h-6" />
              <span>$DRK {t('points.points')}</span>
            </div>
          </div>
          <img
            className="w-[36px] h-[133px]"
            src={pointsRight}
          />
        </div>

        {tab === 1 &&
          <div className="text-left">
            <div className="mt-10 ml-[6px] text-[18px] leading-[22px] font-semibold">{t('points.durakQuests')}</div>
            <div className="mt-3 flex flex-col gap-3">
              <Quest
                image={questDurak}
                title={t('points.inviteFriends')}
                subtitle={`${t('points.pointsForInvite', { points: points.invite })}`}
                buttonText={isCopied ? t('copied') : t('points.invite')}
                onClick={share}
                bottom={
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="">{t('points.pointsEarned')}:</div>
                      <div className="">{me?.ref.points || 0}</div>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="">{t('points.friendsInvited')}:</div>
                      <div className="">{me?.ref.count || 0}</div>
                    </div>
                  </div>
                }
              />
              <Quest
                image={questDurak}
                title={t('points.followChannel', { name: 'Durak' })}
                subtitle={`${t('points.thankYou')}`}
                buttonText={t('points.follow')}
                link="https://t.me/durakton_news"
              />
              <Quest
                image={questDurak}
                title={t('points.joinChat', { name: 'Durak' })}
                subtitle={`${t('points.thankYou')}`}
                buttonText={t('points.join')}
                link="https://t.me/durakton_chat"
              />
            </div>
            <div className="mt-10 ml-[6px] text-[18px] leading-[22px] font-semibold">{t('points.partnerQuests')}</div>
            <div className="mt-3 flex flex-col gap-3">
              <Quest
                image={questMoon}
                title={t('points.launchApp', { name: 'Moon' })}
                subtitle={`${t('points.thankYou')}`} // {`+1,000 ${t('points.points')}`}
                link="https://t.me/moonWallet_solbot"
                buttonText={t('points.launch')}
              />
              <Quest
                image={questMoon}
                title={t('points.joinChat', { name: 'Moon' })}
                subtitle={`${t('points.thankYou')}`} // {`+1,000 ${t('points.points')}`}
                link="https://t.me/moon_wallet_xyz"
                buttonText={t('points.join')}
              />
            </div>
          </div>
        }

        {tab === 2 &&
          <div className="text-left">
            <div className="mt-[56px]">
              <div className="flex flex-col gap-1">
                <div className="text-[18px] leading-[22px] font-semibold">{t('points.aboutPoints')}</div>
                <div className="text-[20px] leading-[24px]" style={textGradient}>{t('points.aboutPointsText')}</div>
              </div>
            </div>
            <div className="mt-10">
              <div className="flex flex-col gap-1">
                <div className="text-[18px] leading-[22px] font-semibold">{t('points.howToEarn')}</div>
                <div className="flex flex-col gap-3">
                  <div className="flex items-start gap-1">
                    <Check className="w-[30px] h-[30px] text-main" />
                    <div className="flex-1 text-[20px] leading-[24px]" style={textGradient}>{t('points.howToEarn1', { winPoints: points.win, gamePoints: points.lose })}</div>
                  </div>
                  <div className="flex items-start gap-1">
                    <Check className="w-[30px] h-[30px] text-main" />
                    <div className="flex-1 text-[20px] leading-[24px]" style={textGradient}>{t('points.howToEarn2', { invitePoints: points.invite })}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>

      <div className="Bottom mt-4">
        <div className="mb-5 flex items-center justify-center">
          <div className="flex items-center justify-center bg-main/10 rounded-[12px]">
          <Button
            className={cx(
              'min-w-[100px] p-2 rounded-[12px] text-[16px] leading-[19px] font-semibold',
              tab === 1 ? 'bg-main text-black' : 'text-main',
            )}
            onClick={() => { setTab(1) }}
          >
            {t('points.tasks')}
          </Button>
          <Button
            className={cx(
              'min-w-[100px] p-2 rounded-[12px] text-[16px] leading-[19px] font-semibold',
              tab === 2 ? 'bg-main text-black' : 'text-main',
            )}
            onClick={() => { setTab(2) }}
          >
            {t('points.info')}
          </Button>
          </div>
        </div>
        <Menu />
      </div>
    </Page>
  )
}
