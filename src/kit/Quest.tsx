import cx from 'classnames'
import { useState, ReactElement } from 'react'
import { useTranslation } from 'react-i18next'

import { useOpenExternal, usePostTask } from '../hooks'
import { Button } from '../kit'

import { ReactComponent as Check } from '../assets/check.svg'

export const Quest = ({ className, id, image, title, subtitle, buttonText, link, claimable, isSuccess, bottom, onClick, afterClaim } : {
  className?: string
  id: number
  image?: string
  title: string
  subtitle: string
  buttonText: string
  link: string | null
  claimable: boolean
  isSuccess?: boolean
  bottom?: ReactElement
  onClick?: () => void
  afterClaim?: () => void
}) => {
  const { t } = useTranslation()
  const { openExternal } = useOpenExternal()

  const [isDone, setIsDone] = useState(false)

  const postTask = usePostTask()

  const [isBusy, setIsBusy] = useState(false)
  const onClaim = async () => {
    setIsBusy(true)
    try {
      await postTask({ taskId: id })
      afterClaim?.()
    } catch (e) {
      console.error(e)
    } finally {
      setIsBusy(false)
    }
  }

  return (
    <div className={cx(
      'Quest flex flex-col gap-5 p-3 bg-[#1C1B2A] rounded-[24px]',
      className,
    )}>
      <div className="flex items-center gap-3">
        <div className="w-[44px] h-[44px] bg-white/10 rounded-[8px] overflow-hidden">
          <img src={image} className="w-[44px] h-[44px]" />
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <div className="text-[16px] leading-[19px] font-semibold">{title}</div>
          <div className="text-[14px] leading-[14px] font-medium text-white/50">{subtitle}</div>
        </div>
        {!isSuccess ? (
          !isDone ? (
            <Button
              className="min-w-[72px] p-2 border border-main rounded-[12px] bg-main/10 text-[16px] leading-[19px] font-semibold text-main"
              onClick={
                onClick ? onClick :
                link ? () => {
                  openExternal(link)
                  if (claimable) {
                    setIsDone(true)
                  }
                } :
                () => {}
              }>
              {buttonText}
            </Button>
          ) : (
            <Button
              className="min-w-[72px] p-2 border border-main rounded-[12px] bg-main/10 text-[16px] leading-[19px] font-semibold text-main"
              onClick={onClaim}
              disabled={isBusy}
            >
              {t('points.claim')}
            </Button>
          )
        ) : (
          <Check className="w-[30px] h-[30px] text-main" />
        )}
      </div>
      {bottom &&
        <div className="Quest-bottom pb-[6px] text-white/50 text-[14px] leading-[14px] font-medium">{bottom}</div>
      }
    </div>
  )
}
