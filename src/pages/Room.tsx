// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import chair from '../assets/chair.png'
import { Button, Card } from '../kit'

// import {  } from './hooks/useApi'
// import { TState } from './types'


export const Room = () => {
  // const [count, setCount] = useState(0)

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
      <div className="Top mt-1 flex flex-col items-center justify-center h-[158px]">
        <img src={chair} className="w-[90px] h-[90px]" />
        <div className="flex items-center justify-center h-[110px] max-w-[100%] mx-auto">
          <Card className="-mx-[10px] h-[60px] rotate-6" />
          <Card className="-mx-[10px] h-[60px] rotate-3" />
          <Card className="-mx-[10px] h-[60px] -rotate-3" />
          <Card className="-mx-[10px] h-[60px] -rotate-6" />
        </div>
      </div>

      <div className="Side absolute left-0 top-[50%] -translate-y-[50%]">
        <div className="relative -top-[20px]">
          <Card className="absolute -left-[90px] top-[50%] -translate-y-[50%] h-[150px] rotate-90" card="qs" />
          <Card className="relative -left-[50px] w-[100px]" />
        </div>
      </div>

      <div className="Center flex items-center justify-center">
        <div className="Group relative h-[130px] w-[90px]">
          <Card className="absolute left-0 top-0 w-full h-full -rotate-12" card="as" />
          <Card className="absolute left-0 top-0 w-full h-full rotate-12" card="ah" />
        </div>
      </div>
      
      <div className="relative Bottom h-[200px]">
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
