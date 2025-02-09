import { create } from 'zustand';  
import { API_BASE_URL } from '../src/Config'


const useCompanyStore = create((set) => ({
  loading: false,
  error: null,
  registerCompany: async (formData) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/company/registercompany`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to register company');
      }
      set({ loading: false });
      return data;
    } catch (error) {
      set({ loading: false, error: error.message });
      return null;
    }
  },
}));

export default useCompanyStore;
