import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import i18n from '../i18n'
import { Page, Button, Menu } from '../kit'
import { usePostRoom, useGetMe, track } from '../hooks'

import deck from '../assets/deck.jpg'
import { ReactComponent as LangRu } from '../assets/langRu.svg'
import { ReactComponent as LangEn } from '../assets/langEn.svg'


export const Play = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { data: me } = useGetMe()

  const [isBusy, setIsBusy] = useState(false)
  const postRoom = usePostRoom()

  const createRoom = async () => {
    setIsBusy(true)
    try {
      const { room_id } = await postRoom()
      if (room_id) {
        track('Room created')
        navigate(`/room?roomId=${room_id}`)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setIsBusy(false)
    }
  }

  return (
    <Page bottom={
      <>
        <div className="mb-[18px]">
          <Button
            wrapperClassName="inline-block"
            className="w-[64px] p-3 bg-[#D9D9D91A] rounded-full backdrop-blur-lg"
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
        <Menu />
      </>
    }>
      <div className="Top mt-5 flex flex-col items-center gap-1">
        <div className="text-[60px] leading-[60px] font-semibold">{me?.total_points || 0}</div>
        <div className="text-[16px] leading-[16px] text-text/50">{t('yourPoints')}</div>
      </div>

      <div className="Center px-4">
        <img src={deck} className="w-[239px] h-[173px] mx-auto" />
        <div className="text-[24px] leading-[29px] font-bold">
          <div>{t('playEarn')}</div>
          <div className="text-main">{t('getAirdrop')}</div>
        </div>
        <Button
          theme="big"
          className="mt-10 h-[55px]"
          onClick={createRoom}
          isBusy={isBusy}
        >
          {t('createRoom')}
        </Button>
      </div>

      <div className="Bottom" />
    </Page>
  )
}
