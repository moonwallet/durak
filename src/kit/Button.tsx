import { useHapticFeedback } from '@vkruglikov/react-telegram-web-app'
import cx from 'classnames'
import type { MouseEventHandler, ReactNode } from 'react'

// import Loader from './Loader'

export const Button = ({ theme = 'default', className, wrapperClassName, children, disabled, isBusy, onClick }: {
  theme?: 'default' | 'big'
  className?: string
  wrapperClassName?: string
  disabled?: boolean
  isBusy?: boolean
  children: ReactNode
  onClick: MouseEventHandler<HTMLButtonElement>
}) => {
  const [impactOccurred] = useHapticFeedback()

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (theme === 'big') {
      impactOccurred('soft')
    }
    onClick(e)
  }

  const themeStyle = {
    'default': '',
    'big': 'min-h-[50px] min-w-[142px] px-8 rounded-[16px] bg-main text-[#000] font-semibold text-[18px] leading-[20px]',
  }[theme]

  return (
    <div className={cx(
      'ButtonWrapper relative',
      wrapperClassName,
    )}>
      <button
        className={cx(
          'w-full enabled:hover:brightness-[1.15] enabled:active:brightness-[1.3] transition-all disabled:opacity-30 disabled:cursor-not-allowed truncate',
          themeStyle,
          className,
        )}
        disabled={disabled || isBusy}
        onClick={handleClick}
      >
        {children}
      </button>
      {/* isBusy && <Loader size={24} /> */}
    </div>
  )
}
