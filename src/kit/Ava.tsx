import cx from 'classnames'

import avaWaiting from '../assets/avaWaiting.png'
import avaReady from '../assets/avaReady.png'
import avaProgress from '../assets/avaProgress.png'
import avaTimeLow from '../assets/avaavaTimeLow.png'
import avaDefault from '../assets/avaDefault.png'

export const Ava = ({ className, state } : {
  className?: string
  state?: 'waiting' | 'ready' | 'progress' | 'timeLow'
}) => {
  return (
    <div className={cx('Ava w-[76px] h-[76px]', className)}>
      <img
        className="w-[76px] h-[76px]"
        src={
          state === 'waiting' && avaWaiting ||
          state === 'ready' && avaReady ||
          state === 'progress' && avaProgress ||
          state === 'timeLow' && avaTimeLow ||
          avaDefault
        }
      />
    </div>
  )
}
