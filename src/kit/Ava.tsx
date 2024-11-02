import cx from 'classnames'

import { TAvaStatus } from '../types'

import ava from '../assets/ava.png'
import avaWaiting from '../assets/avaWaiting.png'
import avaReady from '../assets/avaReady.png'
import avaProgress from '../assets/avaProgress.png'
import avaTimeLow from '../assets/avaTimeLow.png'

export const Ava = ({ className, username, status } : {
  className?: string
  username: string | null
  status?: TAvaStatus | undefined
}) => {
  const src = username
    ? `https://t.me/i/userpic/320/${username}.jpg`
    : ava
  return (
    <div className={cx('Ava flex-shrink-0 w-[76px] h-[76px] relative', className)}>
      <div className="relative w-full h-full p-[2px]">
        <div className="relative w-full h-full">
          <img
            className="absolute left-0 top-0 w-full h-full rounded-full object-cover overflow-hidden"
            src={src}
            onLoad={({ currentTarget }) => {
              if ((currentTarget.naturalWidth === 1 || currentTarget.naturalHeight === 1) && currentTarget.src !== ava) {
                currentTarget.src = ava
              }
            }}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null
              if (currentTarget.src !== ava) {
                currentTarget.src = ava
              }
            }}
          />
        </div>
      </div>
      {!!status &&
        <img
          className="absolute left-0 top-0 w-full h-full"
          src={
            status === 'waiting' && avaWaiting ||
            status === 'ready' && avaReady ||
            status === 'progress' && avaProgress ||
            status === 'timeLow' && avaTimeLow ||
            undefined
          }
        />
      }
    </div>
  )
}
