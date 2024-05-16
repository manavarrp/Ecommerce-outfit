import { create } from 'zustand'

interface State {
    isSidebarOpen: boolean
    isSideMenuOpen: () => void
    closeSidebar: () => void
}

export const useUIStore = create<State>()((set) => ({
    isSidebarOpen: false,
    isSideMenuOpen: () => set({ isSidebarOpen: true }),
    closeSidebar: () => set({ isSidebarOpen: false }),
 
}))