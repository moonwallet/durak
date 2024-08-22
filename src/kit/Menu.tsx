import cx from 'classnames'
import { useTranslation } from 'react-i18next'

import { Button } from '../kit'

import { ReactComponent as menuPlay } from '../assets/menuPlay.svg'
import { ReactComponent as menuFind } from '../assets/menuFind.svg'
import { ReactComponent as menuAirdrop } from '../assets/menuAirdrop.svg'
import { ReactComponent as menuRules } from '../assets/menuRules.svg'

export const Menu = () => {
  const { t } = useTranslation()

  const items = [
    {
      icon: menuPlay,
      text: t('play'),
      isActive: true,
    },
    {
      icon: menuFind,
      text: t('find'),
      isActive: false,
    },
    {
      icon: menuAirdrop,
      text: t('airdrop'),
      isActive: false,
    },
    {
      icon: menuRules,
      text: t('rules'),
      isActive: false,
    },
  ]

  return (
    <div className="flex items-center bg-[#3C3C435C] border-t border-t-[#FFFFFF08] py-[6px]">
      {items.map((item, i) => (
        <Button
          key={`button-${i}`}
          wrapperClassName="flex-grow basis-0"
          className={cx(item.isActive ? 'text-main' : 'text-text/50')}
          onClick={() => {}}
        >
          <div className="flex flex-col gap-[2px] items-center justify-center">
            <div className="w-8 h-8">
              <item.icon />
            </div>
            <div className="text-[10px] leading-[12px]">{item.text}</div>
          </div>
        </Button>
      ))}
    </div>
  )
}
