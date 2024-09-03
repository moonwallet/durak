import { useTranslation } from 'react-i18next'
// import { useNavigate } from 'react-router-dom'

import { Page, /* Button, */ Menu, Button } from '../kit'

import find from '../assets/find.png'
import { useOpenExternal } from '../hooks'

export const Find = () => {
  const { t } = useTranslation()
  // const navigate = useNavigate()
  const { openExternal } = useOpenExternal()

  return (
    <Page>
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
          onClick={() => { openExternal('https://t.me/durakton_chat') }}
        >
          {t('joinGroup')}
        </Button>
      </div>

      <div className="Bottom">
        <Menu />
      </div>
    </Page>
  )
}
