import cx from 'classnames'
import { useState } from 'react'

import { Button } from '../kit'
import { ReactComponent as Star } from '../assets/star.svg'

type TRating = 1 | 2 | 3 | 4 | 5
const ratings: TRating[] = [1, 2, 3, 4, 5]

export const Stars = ({ className } : {
  className?: string
}) => {
  const [rated, setRated] = useState<TRating | 0>(0)

  const rate = (rating: TRating) =>  {
    setRated(rating)
  }

  return (
    <div className={cx('Stars', className)}>
      {ratings.map(rating => (
        <Button
          className="px-5 w-[26px] h-[26px]"
          onClick={() => { rate(rating) }}
        >
          <Star className={cx(
            'w-[26px] h-[26px]',
            rated <= rating ? 'text-main' : 'text-[#2C2946]',
          )} />
        </Button>
      ))}
    </div>
  )
}
