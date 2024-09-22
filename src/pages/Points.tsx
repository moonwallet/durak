import { useTranslation } from 'react-i18next'

import { Page, Menu } from '../kit'

import pointsLeft from '../assets/pointsLeft.png'
import pointsRight from '../assets/pointsRight.png'
import { ReactComponent as Point } from '../assets/point.svg'
import { ReactComponent as Check } from '../assets/check.svg'

export const Points = () => {
  const { t } = useTranslation()

  const points = 0

  const textGradient = {
    background: 'linear-gradient(91.1deg, #FFFFFF 0.94%, #999999 117.2%)',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  }

  return (
    <Page>
      <div className="Top px-3">
        <div className="mt-4 flex items-center justify-between">
          <img
            className="w-[36px] h-[133px]"
            src={pointsLeft}
          />
          <div className="flex flex-col gap-1">
            <div className="text-[48px] leading-[58px] font-bold">{points}</div>
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
                  <div className="flex-1 text-[20px] leading-[24px]" style={textGradient}>{t('points.howToEarn1', { winPoints: '???', gamePoints: '???' })}</div>
                </div>
                <div className="flex items-start gap-1">
                  <Check className="w-[30px] h-[30px] text-main" />
                  <div className="flex-1 text-[20px] leading-[24px]" style={textGradient}>{t('points.howToEarn2', { invitePoints: '???' })}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="Bottom">
        <Menu />
      </div>
    </Page>
  )
}
