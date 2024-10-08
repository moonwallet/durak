import cx from 'classnames'
import type { ReactNode } from 'react'

import { ReactComponent as Tail } from '../assets/tail.svg'

export const Tip = ({ className, children, isReverse } : {
  className?: string
  children: ReactNode
  isReverse?: boolean
}) => {
  return (
    <div className={cx('Tip', className)}>
      <div className={cx(
        'inline-block relative min-w-[68px] w-auto rounded-[13px] bg-main/90 px-[10px] py-2 text-black text-[14px] leading-[22px]',
        !isReverse ? 'mb-[13px]' : 'mt-[13px]',
      )}>
        {children}
        <Tail className={cx(
          'absolute left-[50%] -translate-x-[50%] w-[47px] h-[13px] text-[#87D723E5]',
          !isReverse ? 'top-[95%]' : 'bottom-[95%] rotate-180',
        )} />
      </div>
    </div>
  )
}
