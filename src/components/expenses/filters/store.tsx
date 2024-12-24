import { create } from 'zustand';

interface FilterState {
  filters: Record<string, any>;
  setFilters: (filters: Record<string, any>) => void;
  updateFilters: (filters: Record<string, any>) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  filters: {},
  setFilters: (filters) => set({ filters }),
  updateFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters } })),
}));
