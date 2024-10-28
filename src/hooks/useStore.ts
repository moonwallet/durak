import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { TState, TRoomId } from '../types'

type TStore = {
  isDebug: boolean
  setDebug: (_: boolean) => void
  isStarted: boolean
  setIsStarted: (_: boolean) => void
  state: null | TState,
  setState: (state: TState) => void
  roomId: null | TRoomId
  setRoomId: (_: null | TRoomId) => void
}

export const useStore = create<TStore>((set) => ({
  isDebug: false,
  setDebug: (isDebug) => set({ isDebug }),
  isStarted: false,
  setIsStarted: (isStarted) => set({ isStarted }),
  state: null,
  setState: (state: TState) => set({ state }),
  roomId: null,
  setRoomId: (roomId: null | TRoomId) => set({ roomId }),
}))

type TPersistStore = {
  isOnboarded: boolean
  setIsOnboarded: (isOnboarded: boolean) => void

  isLaunchedFirstTime: boolean
  setIsLauncedFirstTime: (_: boolean) => void
}

export const usePersistStore = create<TPersistStore>()(
  persist(
    (set) => ({
      isOnboarded: false,
      setIsOnboarded: (isOnboarded) => set({ isOnboarded }),

      isLaunchedFirstTime: true,
      setIsLauncedFirstTime: (isLaunchedFirstTime) => set({ isLaunchedFirstTime }),
    }), {
      name: 'persist-storage',
    },
  ),
)
