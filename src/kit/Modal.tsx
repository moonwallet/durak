import cx from 'classnames'
import type { ReactNode } from 'react'

export const Modal = ({ className, children } : {
  className?: string
  children: ReactNode
}) => {
  return (
    <div className={cx('Modal fixed w-full h-full inset-0 flex items-center justify-center bg-black/60', className)}>
      <div className="Modal-inner py-9 px-[14px] w-full max-w-[400px] rounded-[10px] bg-[#11101D]">
        {children}
      </div>
    </div>
  )
}
