import { useTranslation } from 'react-i18next'

import { Page, Menu } from '../kit'

import coins from '../assets/coins.png'
import airdrop from '../assets/airdrop.png'

export const Airdrop = () => {
  const { t } = useTranslation()

  return (
    <Page>
      <div className="Top relative overflow-x-clip">
        <img
          className="-top-[10px] -left-[40px] absolute w-[195px] h-[208px] grayscale"
          src={coins}
        />
        <img
          className="-top-[10px] -right-[80px] absolute w-[195px] h-[208px] grayscale rotate-[60deg]"
          src={coins}
        />
      </div>
      <div className="Center py-10 flex flex-col items-center justify-center">
        <img
          className="w-[294px] h-[232px] grayscale"
          src={airdrop}
        />
        <div className="flex flex-col gap-[1em] max-w-[320px] text-[24px] leading-[29px] font-bold">
          <div>{t('airdropComing')}</div>
          <div>{t('pointsWillBeConverted')}</div>
          <div>{t('abilities')}</div>
        </div>
      </div>

      <div className="Bottom">
        <Menu />
      </div>
    </Page>
  )
}
