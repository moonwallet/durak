import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { TState } from '../types'

type TStore = {
  isDebug: boolean
  setDebug: (_: boolean) => void
  state: null | TState,
  setState: (state: TState) => void
}

export const useStore = create<TStore>((set) => ({
  isDebug: false,
  setDebug: (isDebug) => set({ isDebug }),
  state: null,
  setState: (state: TState) => set({ state }),
}))

type TPersistStore = {
  isOnboarded: boolean
  setIsOnboarded: (isOnboarded: boolean) => void
}

export const usePersistStore = create<TPersistStore>()(
  persist(
    (set) => ({
      isOnboarded: false,
      setIsOnboarded: (isOnboarded) => set({ isOnboarded }),
    }),
    {
      name: 'persist-storage',
    }
  )
)
