import cx from 'classnames'
import type { ReactNode } from 'react'

export const Modal = ({ className, children } : {
  className?: string
  children: ReactNode
}) => {
  return (
    <span className={cx('Modal fixed w-full h-full inset-0 bg-black/60', className)}>
      {children}
    </span>
  )
}
