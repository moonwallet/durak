import { useTranslation } from 'react-i18next'
// import { useNavigate } from 'react-router-dom'

import { Page, /* Button, */ Menu } from '../kit'

// import deck from '../assets/deck.jpg'

export const Airdrop = () => {
  const { t } = useTranslation()
  // const navigate = useNavigate()

  return (
    <Page>
      <div className="Top mt-5 flex flex-col items-center gap-1">
        {t('Airdrop content soon...')}
      </div>

      <div className="Bottom">
        <Menu />
      </div>
    </Page>
  )
}
