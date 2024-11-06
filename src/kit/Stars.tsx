import cx from 'classnames'
import { useState } from 'react'

import { track } from '../hooks'
import { Button, Survey } from '../kit'
import { ReactComponent as Star } from '../assets/star.svg'

type TRating = 1 | 2 | 3 | 4 | 5
const ratings: TRating[] = [1, 2, 3, 4, 5]

export const Stars = ({ className } : {
  className?: string
}) => {
  const [rated, setRated] = useState<TRating | 0>(0)

  const rate = (rating: TRating) =>  {
    setRated(rating)
    track('Rated', {
      rating,
    })
  }

  return (
    <>
      <div className={cx('Stars flex items-center justify-around', className)}>
        {ratings.map(rating => (
          <Button
            key={`star-${rating}`}
            wrapperClassName='w-[36px] h-[26px]'
            className="px-[5px]"
            onClick={() => { rate(rating) }}
          >
            <Star className={cx(
              'w-[26px] h-[26px] transition-all',
              rated >= rating ? 'text-main' : 'text-[#2C2946]',
            )} />
          </Button>
        ))}
      </div>
      {!!rated &&
        <Survey />
      }
    </>
  )
}
