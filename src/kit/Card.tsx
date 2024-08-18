import cx from 'classnames'

import { TCard } from '../types'

import cardBack from '../assets/card.png'

import { ReactComponent as ac } from '../assets/ac.svg'
import { ReactComponent as ad } from '../assets/ad.svg'
import { ReactComponent as ah } from '../assets/ah.svg'
import { ReactComponent as as } from '../assets/as.svg'

import { ReactComponent as qs } from '../assets/qs.svg'

const cards: { [Key in TCard]: typeof ac } = {
  'ac': ac,
  'ad': ad,
  'ah': ah,
  'as': as,
  'qs': qs,
}

/*
10D, 10C, 10H, 10S ?
6* 7* 8* 9* 10* J* Q* K* A*
*/

export const Card = ({ className, card }: {
  className?: string
  card?: TCard
}) => {
  if (!card) {
    return <img src={cardBack} className={cx('Card', className)} />
  }

  const Comp = cards[card]

  return (
    <Comp
      className={cx('Card', className)}
      title={card}
    />
  )
}
