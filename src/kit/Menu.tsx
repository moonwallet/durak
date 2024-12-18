import cx from 'classnames'
import { useTranslation } from 'react-i18next'
import { useNavigate, useLocation } from 'react-router-dom'

import { Button } from '../kit'

import { ReactComponent as menuPlay } from '../assets/menuPlay.svg'
import { ReactComponent as menuFind } from '../assets/menuFind.svg'
import { ReactComponent as menuPoints } from '../assets/menuPoints.svg'
import { ReactComponent as menuRules } from '../assets/menuRules.svg'

export const Menu = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const routerLocation = useLocation()

  const items = [
    {
      icon: menuPlay,
      text: t('menu.play'),
      pathname: '/',
    },
    {
      icon: menuFind,
      text: t('menu.find'),
      pathname: '/find',
    },
    {
      icon: menuPoints,
      text: t('menu.points'),
      pathname: '/points',
    },
    {
      icon: menuRules,
      text: t('menu.rules'),
      pathname: '/rules',
    },
  ]

  return (
    <div
      className="flex items-center bg-[#3C3C435C] border-t border-t-[#FFFFFF08] backdrop-blur-lg"
      style={{
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      {items.map((item, i) => (
        <Button
          key={`button-${i}`}
          wrapperClassName="flex-grow basis-0"
          className={cx(
            'py-[6px]',
            routerLocation.pathname === item.pathname ? 'text-main' : 'text-text/50')
          }
          onClick={() => { navigate(item.pathname) }}
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
