import { create } from 'zustand'
import { apiManagement } from '../Utils/api'

const initialState = {
  listDbManager: [],
  isLoading: true,
  error: null
}

export const useStore = create((set) => ({
  ...initialState,

  getData: async () => {
    set({ isLoading: true, error: null })

    const data = await apiManagement.getData()

    if (data.error) {
      set({ error: data.error })
    } else {
      set({ listDbManager: data, isLoading: false })
    }
  },

  deleteDbManager: async (id) => {
    set({ isLoading: true, error: null })

    const data = await apiManagement.deleteData(id)

    if (data.error) {
      set({ error: data.error })
    } else {
      set((state) => ({
        listDbManager: state.listDbManager.filter((dbManager) => dbManager.id !== id),
        isLoading: false
      }))
    }
  },

  addDbManager: async (data) => {
    set({ isLoading: true, error: null })

    const response = await apiManagement.addData(data)

    if (response.error) {
      set({ error: response.error })
    } else {
      set((state) => ({
        listDbManager: [...state.listDbManager, response],
        isLoading: false
      }))
    }
  },

  updateDbManager: async (data) => {
    set({ isLoading: true, error: null })

    const response = await apiManagement.updateData(data)

    if (response.error) {
      set({ error: response.error })
    } else {
      set((state) => ({
        listDbManager: state.listDbManager.map((dbManager) =>
          dbManager.id === data.id ? response : dbManager
        ),
        isLoading: false
      }))
    }
  },

  reset: () => set({ ...initialState })
}))
