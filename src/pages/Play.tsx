import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import i18n from '../i18n'
import { Page, Button, Menu, Modal } from '../kit'
import { usePostRoom, useStore } from '../hooks'

import deck from '../assets/deck.jpg'
import { ReactComponent as LangRu } from '../assets/langRu.svg'
import { ReactComponent as LangEn } from '../assets/langEn.svg'


export const Play = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { roomId, setRoomId } = useStore()

  const [isBusy, setIsBusy] = useState(false)
  const postRoom = usePostRoom()

  const createRoom = async () => {
    setIsBusy(true)
    try {
      const { room_id } = await postRoom()
      if (room_id) {
        navigate(`/room?roomId=${room_id}`)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setIsBusy(false)
    }
  }

  return (
    <Page>
      <div className="Top mt-5 flex flex-col items-center gap-1">
        <div className="text-[60px] leading-[60px] font-semibold">0</div>
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

      <div className="Bottom">
        <div className="my-[18px]">
          <Button
            wrapperClassName="inline-block"
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
        <Menu />
      </div>

      {!!roomId &&
        <Modal>
          <div className="mx-auto mb-[50px] max-w-[240px] text-[16px] leading-[18px] font-medium text-text/60">{t('leaveSure')}</div>
          <div className="flex flex-col gap-4">
            <Button
              theme='big'
              onClick={() => {
                navigate(`/room?roomId=${roomId}`)
              }}>
              {t('stayAndPlay')}
            </Button>
            <Button
              theme='big'
              onClick={() => {
                setRoomId(null)
              }}>
              {t('leaveAndLoose')}
            </Button>
          </div>
        </Modal>
      }
    </Page>
  )
}
