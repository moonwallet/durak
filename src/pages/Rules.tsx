import { useTranslation } from 'react-i18next'
// import { useNavigate } from 'react-router-dom'

import { /* Button, */ Menu } from '../kit'

// import deck from '../assets/deck.jpg'

export const Rules = () => {
  const { t } = useTranslation()
  // const navigate = useNavigate()

  return (
    <>
      <div className="Top mt-5 flex flex-col items-center gap-1">
        {t('Rules content soon...')}
      </div>

      <div className="Bottom">
        <Menu />
      </div>
    </>
  )
}
