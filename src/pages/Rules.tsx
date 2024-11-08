import { useTranslation } from 'react-i18next'

import { Page, Menu, Button } from '../kit'

import watch from '../assets/watch.png'
import { useOpenLink } from '../hooks'

export const Rules = () => {
  const { t } = useTranslation()
  const { openLink } = useOpenLink()

  return (
    <Page bottom={<Menu />}>
      <div className="Top"></div>
      <div className="Center py-10 px-4 flex flex-col items-center justify-center">
        <img
          className="w-[210px] h-[166px] grayscale"
          src={watch}
        />
        <div className="mt-8 max-w-[400px] text-[24px] leading-[29px] font-bold">{t('watchRules')}</div>
        <Button
          theme="big"
          wrapperClassName='mt-10'
          onClick={() => { openLink('https://youtu.be/3JagmUmUJOc') }}
        >
          {t('watchVideo')}
        </Button>
      </div>
      <div className="Bottom"></div>
    </Page>
  )
}
