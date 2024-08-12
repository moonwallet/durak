// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import { ReactComponent as Ac } from './assets/ac.svg'
import { ReactComponent as Ad } from './assets/ad.svg'
import { ReactComponent as Ah } from './assets/ah.svg'
import { ReactComponent as As } from './assets/as.svg'

import chair from './assets/chair.png'
import { Button } from './kit'

import './index.css'

type TCard = 'ac' | 'ad' | 'ah' | 'as'

const cards: { [Key in TCard]: typeof Ac } = {
  'ac': Ac,
  'ad': Ad,
  'ah': Ah,
  'as': As,
}

const Card = ({ className, card }: {
  className?: string
  card: TCard
}) => {
  const Comp = cards[card]
  return (
  <Comp
    className={className}
    title={card}
  />
  )
}

function App() {
  // const [count, setCount] = useState(0)

  /*
  10D, 10C, 10H, 10S ?
  6* 7* 8* 9* 10* J* Q* K* A*
  */

  return (
    <>
      {/*
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className="text-red-400">Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      */}
      <div className="Top mt-1 flex items-center justify-center h-[158px]">
        <img src={chair} className="w-[90px] h-[90px]" />
      </div>

      <div className="Center justi">
        <div className="Group relative h-[130px] w-[90px]">
          <Card className="absolute h-[122px] -rotate-12" card="as" />
          <Card className="absolute h-[122px] rotate-12" card="ah" />
        </div>
      </div>
      
      <div className="relative Bottom h-[200px]">
        <div className="flex items-center justify-center h-[110px] max-w-[100%] mx-auto">
          <Card className="-mx-[90px] h-[150px] -rotate-6" card="ac" />
          <Card className="-mx-[90px] h-[150px] -rotate-3" card="ad" />
          <Card className="-mx-[90px] h-[150px] rotate-3" card="ah" />
          <Card className="-mx-[90px] h-[150px] rotate-6" card="as" />
        </div>
        <div className="absolute h-[90px] bottom-0 left-0 w-full p-5 bg-[#292834] rounded-t-[24px]">
          <Button
            theme="big"
            wrapperClassName="w-[142px]"
            onClick={() => {}}
          >
            Bet
          </Button>
        </div>
      </div>
    </>
  )
}

export default App
