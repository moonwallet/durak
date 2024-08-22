import { useTranslation } from 'react-i18next'

import { Button } from '../kit'

import deck from '../assets/deck.jpg'

export const Play = () => {
  const { t } = useTranslation()

  return (
    <>
      <div className="mt-5 flex flex-col items-center gap-1">
        <div className="text-[60px] leading-[60px] font-semibold">0</div>
        <div className="text-[16px] leading-[16px] text-text/50">{t('yourPoints')}</div>
      </div>
      <div>
        <img src={deck} className="w-[239px] h-[173px] mx-auto" />
        <div className="text-[24px] leading-[29px] font-bold">
          <div>{t('playEarn')}</div>
          <div className="text-main">{t('getAirdrop')}</div>
        </div>
        <Button
          theme="big"
          className="mt-10 h-[55px]"
          onClick={() => {}}
        >
          Create room
        </Button>
      </div>
      <div>
        ...
      </div>
    </>
  )
}