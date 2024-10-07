import cx from 'classnames'
import { TPlayer } from '../types'

export const Username = ({ className, player } : {
  className?: string
  player?: TPlayer | null
}) => {
  return (
    <span className={cx('Username', className)}>
      {player?.username ? `@${player.username}` : (player?.name || '')}
    </span>
  )
}
