import { useTranslation } from 'react-i18next'

import { Button } from '../kit'

import deck from '../assets/deck.jpg'
import { ReactComponent as LangRu } from '../assets/langRu.svg'
import { ReactComponent as LangEn } from '../assets/langEn.svg'

import i18n from '../i18n'

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
          {t('createRoom')}
        </Button>
      </div>
      <div>
        <div className="mb-[18px]">
          <Button
            className="w-[64px] p-3 bg-[#D9D9D91A] rounded-full"
            onClick={() => { i18n.changeLanguage(i18n.language === 'en' ? 'ru' : 'en') }}
          >
            <div className="flex items-center gap-1">
              <div className="w-4 h-3 mr-1">
                {i18n.language === 'ru' && <LangRu />}
                {i18n.language === 'en' && <LangEn />}
              </div>
              <div className="text-[10px] leading-[12px] uppercase">{i18n.language}</div>
            </div>
          </Button>
        </div>
      </div>
    </>
  )
}