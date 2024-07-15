import { toast } from 'sonner'
import { create } from 'zustand'

import { apiManagement } from '../Utils/api'

const initialState = {
  error: null,
  isLoading: true,
  listDbManager: [],
  isEntryVisible: false,
  actualDbManager: null
}

export const useStore = create((set) => ({
  ...initialState,

  setActualDbManager: (dbManager) => set({ actualDbManager: dbManager, isEntryVisible: true }),
  removeActualDbManager: () => set({ actualDbManager: null }),

  toggleEntryVisibility: () => set((state) => ({ isEntryVisible: !state.isEntryVisible })),

  getData: async () => {
    set({ isLoading: true, error: null })

    const data = await apiManagement.getData()

    if (data.error) {
      set({ error: data.error, isLoading: false })
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
      toast.success('Database Manager deleted successfully')
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
      toast.success('Database Manager added successfully')
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
      toast.success('Database Manager updated successfully')
    }
  }
}))
