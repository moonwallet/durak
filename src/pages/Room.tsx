import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Card } from '../kit'

import chair from '../assets/chair.png'
import { useStore } from '../hooks'

export const Room = () => {
  const { room } = useStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!room) {
      navigate('/')
    }
  }, [room, navigate])

  return (
    <>
      <div className="Top z-0 mt-1 flex flex-col items-center justify-center h-[158px]">
        <div className="z-[1] relative w-[90px] h-[90px] shadow-[0px_0px_30px_30px_#11101D]">
          <img src={chair} className="w-[90px] h-[90px]" />
          <div className="absolute top-[85%] left-[50%] -translate-x-[50%] text-[14px] leading-[14px]">@username</div>
        </div>
        <div className="flex items-center justify-center h-[110px] max-w-[100%] mx-auto">
          <Card className="-mx-[10px] h-[60px] rotate-6" />
          <Card className="-mx-[10px] h-[60px] rotate-3" />
          <Card className="-mx-[10px] h-[60px] -rotate-3" />
          <Card className="-mx-[10px] h-[60px] -rotate-6" />
        </div>
      </div>

      <div className="Side absolute left-0 top-[50%] -translate-y-[50%]">
        <div className="absolute -top-[48px] right-[48px] text-white/50 text-[16px] leading-[16px] font-semibold">24</div>
        <div className="relative -top-[20px]">
          <Card card="qs" className="absolute -left-[110px] top-[50%] -translate-y-[50%] h-[110px] rotate-90" />
          <Card className="relative -left-[50px] h-[110px]" />
        </div>
      </div>

      <div className="Center flex items-center justify-center">
        <div className="Group relative h-[130px] w-[90px]">
          <Card className="absolute left-0 top-0 w-full h-full -rotate-12" card="as" />
          <Card className="absolute left-0 top-0 w-full h-full rotate-12" card="ah" />
        </div>
      </div>
      
      <div className="Bottom relative h-[200px]">
        <div className="flex items-center justify-center h-[110px] max-w-[100%] mx-auto">
          <Card className="-mx-[90px] h-[150px] -rotate-6" card="ac" />
          <Card className="-mx-[90px] h-[150px] -rotate-3" card="ad" />
          <Card className="-mx-[90px] h-[150px] rotate-3" card="ah" />
          <Card className="-mx-[90px] h-[150px] rotate-6" card="as" />
        </div>
        <div className="absolute h-[90px] bottom-0 left-0 w-full flex items-center justify-between p-5 bg-[#292834] rounded-t-[24px]">
          <Button
            theme="big"
            wrapperClassName="w-[142px]"
            onClick={() => {}}
          >
            Bet
          </Button>
          <div className="relative w-[100px] h-[50px] flex flex-col items-end justify-end">
            <img src={chair} className="absolute -right-[20px] -top-[60px]" />
            <div className="text-text text-[14px] text-right">@username</div>
          </div>
        </div>
      </div>
    </>
  )
}
