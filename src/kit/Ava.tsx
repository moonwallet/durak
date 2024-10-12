import cx from 'classnames'

import { TAvaStatus } from '../types'

import avaWaiting from '../assets/avaWaiting.png'
import avaReady from '../assets/avaReady.png'
import avaProgress from '../assets/avaProgress.png'
import avaTimeLow from '../assets/avaTimeLow.png'
import avaDefault from '../assets/avaDefault.png'

export const Ava = ({ className, status } : {
  className?: string
  status?: TAvaStatus | undefined
}) => {
  return (
    <div className={cx('Ava w-[76px] h-[76px]', className)}>
      <img
        className="w-[76px] h-[76px]"
        src={
          status === 'waiting' && avaWaiting ||
          status === 'ready' && avaReady ||
          status === 'progress' && avaProgress ||
          status === 'timeLow' && avaTimeLow ||
          avaDefault
        }
      />
    </div>
  )
}
