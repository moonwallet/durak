import { useInitData } from '@vkruglikov/react-telegram-web-app'

const AUTH: undefined | string = import.meta.env.VITE_AUTH
const USER_ID: undefined | string = import.meta.env.VITE_USER_ID
console.log('AUTH', AUTH)
console.log('USER_ID', USER_ID)
console.log(import.meta.env)

export const useAuth = () => {
  const [initDataUnsafe, initData] = useInitData()

  const authString: string =
    initData ||
    AUTH ||
    ''

  const isAuth = !!authString

  const userId: number | undefined =
    initDataUnsafe?.user?.id ||
    (USER_ID ? parseInt(USER_ID) : undefined)

  const username: string | undefined =
    initDataUnsafe?.user?.username

  return { isAuth, authString, userId, username }
}
