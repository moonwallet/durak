import cx from 'classnames'
import { ReactNode } from 'react'

import { useStart } from '../hooks'

// import Debug from './Debug'

export const Page = ({ className, contentClassName, children, bottom }: {
  className?: string
  contentClassName?: string
  children: ReactNode
  bottom?: ReactNode
}) => {
  useStart()

  return (
    <div
      className={cx('Page relative max-w-[640px] mx-auto min-h-[100vh] flex flex-col justify-between text-center', className)}
    >
      <div className={cx('flex-grow flex flex-col justify-between', contentClassName)}>
        {children}
        {/* <Debug /> */}
      </div>
      {bottom && (
        <div className="mt-4">
          {bottom}
        </div>
      )}
    </div>
  )
}
