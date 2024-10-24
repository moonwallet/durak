import cx from 'classnames'
import { ReactElement } from 'react'

import { useOpenExternal } from '../hooks'
import { Button } from '../kit'

import { ReactComponent as Check } from '../assets/check.svg'

export const Quest = ({ className, image, title, subtitle, buttonText, link, isSuccess, bottom, onClick } : {
  className?: string
  image?: string
  title: string
  subtitle: string
  buttonText: string
  link?: string
  isSuccess?: boolean
  bottom?: ReactElement
  onClick?: () => void
}) => {
  const { openExternal } = useOpenExternal()

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
          <Button
            className="min-w-[72px] p-2 border border-main rounded-[12px] bg-main/10 text-[16px] leading-[19px] font-semibold text-main"
            onClick={
              onClick ? onClick :
              link ? () => { openExternal(link) } :
              () => {}
            }>
            {buttonText}
          </Button>
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
