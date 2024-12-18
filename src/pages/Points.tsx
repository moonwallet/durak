import cx from 'classnames'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useCopy, useGetMe, useGetPoints, useOpenLink, useShareLink, usePlatform, track, useGetTasks } from '../hooks'
import { Page, Menu, Button, Task } from '../kit'

import { ReactComponent as Point } from '../assets/point.svg'
import { ReactComponent as Check } from '../assets/check.svg'
import pointsLeft from '../assets/pointsLeft.png'
import pointsRight from '../assets/pointsRight.png'
import taskDurak from '../assets/taskDurak.png'
import taskMoon from '../assets/taskMoon.png'
import taskSatoshi from '../assets/taskSatoshi.png'

export const Points = () => {
  const { t } = useTranslation()
  const { data: me, refetch: refetchMe } = useGetMe()

  const textGradient = {
    background: 'linear-gradient(91.1deg, #FFFFFF 0.95%, #999999 117.2%)',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  }

  const [tab, setTab] = useState<1|2>(1)

  const { shareUrl, shareLink } = useShareLink({})
  const { openLink } = useOpenLink()
  const { copy, isCopied } = useCopy()
  const { isTg } = usePlatform()

  const share = () => {
    console.log(shareUrl)
    try {
      openLink(shareLink)
      if (!isTg) {
        copy(shareUrl)
      }
    } catch {
      copy(shareUrl)
    }
    track('Points invite pressed')
  }

  const { points } = useGetPoints()

  useEffect(() => {
    if (tab === 1) {
      track('Points viewed')
      console.log('Points viewed')
    }
    if (tab === 2) {
      track('Points info viewed')
      console.log('Points info viewed')
    }
  }, [tab])

  const { data: tasks, refetch: refetchTasks } = useGetTasks()

  const afterClaim = () => {
    refetchMe()
    refetchTasks()
  }

  return (
    <Page bottom={
      <>
        <div className="mb-5 flex items-center justify-center">
          <div className="flex items-center justify-center bg-main/10 rounded-[12px] backdrop-blur-lg">
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
      </>
    }>
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
              {(tasks || []).filter(task => !task.is_partner).map(task => (
                <Task
                  key={`task-${task.id}`}
                  id={task.id}
                  image={taskDurak}
                  title={task.name}
                  subtitle={task.description}
                  buttonText={(task.id === 1 && isCopied) ? t('copied') : task.cta}
                  link={task.target_url}
                  claimable={task.claimable}
                  afterClaim={afterClaim}
                  isSuccess={task.is_completed}
                  onClick={task.id === 1 ? share : undefined}
                  bottom={task.id === 1 ? (
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
                  ) : undefined}
                />
              ))}
            </div>

            <div className="mt-10 ml-[6px] text-[18px] leading-[22px] font-semibold">{t('points.partnerQuests')}</div>
            <div className="mt-3 flex flex-col gap-3">
              {(tasks || []).filter(task => task.is_partner).map(task => (
                <Task
                  key={`task-${task.id}`}
                  id={task.id}
                  image={
                    task.name.toLowerCase().includes(' satoshi') ? taskSatoshi :
                    task.name.toLowerCase().includes(' moon') ? taskMoon :
                    task.image_url
                  }
                  title={task.name}
                  subtitle={task.description}
                  buttonText={task.cta}
                  link={task.target_url}
                  claimable={task.claimable}
                  afterClaim={afterClaim}
                  isSuccess={task.is_completed}
                />
              ))}
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
    </Page>
  )
}
