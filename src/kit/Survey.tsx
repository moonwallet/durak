import { useEffect } from 'react'
import cx from 'classnames'

export const Survey = ({ className } : {
  className?: string
}) => {

  useEffect(() => {
    const script = document.createElement('script')
    script.innerHTML = `
      (function(h,o,t,j,a,r){
          h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
          h._hjSettings={hjid:5186598,hjsv:6};
          a=o.getElementsByTagName('head')[0];
          r=o.createElement('script');r.async=1;
          r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
          a.appendChild(r);
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
    `

    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <span className={cx('Survey', className)}>
    </span>
  )
}
