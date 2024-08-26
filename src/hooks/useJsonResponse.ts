// import { usePersistStore } from '../hooks'

export const useJsonResponse = (deauthOn403 = true) => {
  // const { setWebAuthData } = usePersistStore()

  const handleJsonResponse = (res: Response) => {
    if (res.status === 403 && deauthOn403) {
      // setWebAuthData(null)
    }
    if (!res.ok) {
      throw new Error(`[${res.status}] ${res.statusText}`);
    }
    return res.json()
  }

  return { handleJsonResponse }
}
