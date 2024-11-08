import { useTranslation } from 'react-i18next'

import { Page, Menu, Button } from '../kit'

import find from '../assets/find.png'
import { useOpenLink } from '../hooks'

export const Find = () => {
  const { t } = useTranslation()
  const { openLink } = useOpenLink()

  return (
    <Page bottom={<Menu />}>
      <div className="Top"></div>
      <div className="Center py-10 flex flex-col items-center justify-center">
        <img
          className="w-[294px] h-[232px] grayscale"
          src={find}
        />
        <div className="max-w-[320px] text-[24px] leading-[29px] font-bold">{t('exploreGroup')}</div>
        <Button
          theme="big"
          wrapperClassName='mt-10'
          onClick={() => { openLink('https://t.me/durakton_chat') }}
        >
          {t('joinGroup')}
        </Button>
      </div>
      <div className="Bottom"></div>
    </Page>
  )
}
