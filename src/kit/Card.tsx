import cx from 'classnames'

import { TCard } from '../types'

import cardBack from '../assets/card.png'

import { ReactComponent as _6c } from '../assets/6c.svg'
import { ReactComponent as _6d } from '../assets/6d.svg'
import { ReactComponent as _6h } from '../assets/6h.svg'
import { ReactComponent as _6s } from '../assets/6s.svg'

import { ReactComponent as _7c } from '../assets/7c.svg'
import { ReactComponent as _7d } from '../assets/7d.svg'
import { ReactComponent as _7h } from '../assets/7h.svg'
import { ReactComponent as _7s } from '../assets/7s.svg'

import { ReactComponent as _8c } from '../assets/8c.svg'
import { ReactComponent as _8d } from '../assets/8d.svg'
import { ReactComponent as _8h } from '../assets/8h.svg'
import { ReactComponent as _8s } from '../assets/8s.svg'

import { ReactComponent as _9c } from '../assets/9c.svg'
import { ReactComponent as _9d } from '../assets/9d.svg'
import { ReactComponent as _9h } from '../assets/9h.svg'
import { ReactComponent as _9s } from '../assets/9s.svg'

import { ReactComponent as _10c } from '../assets/10c.svg'
import { ReactComponent as _10d } from '../assets/10d.svg'
import { ReactComponent as _10h } from '../assets/10h.svg'
import { ReactComponent as _10s } from '../assets/10s.svg'

import { ReactComponent as jc } from '../assets/jc.svg'
import { ReactComponent as jd } from '../assets/jd.svg'
import { ReactComponent as jh } from '../assets/jh.svg'
import { ReactComponent as js } from '../assets/js.svg'

import { ReactComponent as qc } from '../assets/qc.svg'
import { ReactComponent as qd } from '../assets/qd.svg'
import { ReactComponent as qh } from '../assets/qh.svg'
import { ReactComponent as qs } from '../assets/qs.svg'

import { ReactComponent as kc } from '../assets/kc.svg'
import { ReactComponent as kd } from '../assets/kd.svg'
import { ReactComponent as kh } from '../assets/kh.svg'
import { ReactComponent as ks } from '../assets/ks.svg'

import { ReactComponent as ac } from '../assets/ac.svg'
import { ReactComponent as ad } from '../assets/ad.svg'
import { ReactComponent as ah } from '../assets/ah.svg'
import { ReactComponent as as } from '../assets/as.svg'

const cards: { [Key in TCard]: typeof ac } = {
  '6c': _6c, '6d': _6d, '6h': _6h, '6s': _6s,
  '7c': _7c, '7d': _7d, '7h': _7h, '7s': _7s,
  '8c': _8c, '8d': _8d, '8h': _8h, '8s': _8s,
  '9c': _9c, '9d': _9d, '9h': _9h, '9s': _9s,
  '10c': _10c, '10d': _10d, '10h': _10h, '10s': _10s,
  'jc': jc, 'jd': jd, 'jh': jh, 'js': js,
  'qc': qc, 'qd': qd, 'qh': qh, 'qs': qs,
  'kc': kc, 'kd': kd, 'kh': kh, 'ks': ks,
  'ac': ac, 'ad': ad, 'ah': ah, 'as': as,
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
