import { create } from 'zustand';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useAvailabilityStore = create((set) => ({
  availableShifts: [],
  loading: false,
  error: null,

  fetchAvailableShifts: async () => {
    try {
      set({ loading: true });
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));

      const response = await axios.get(
        `${API_BASE_URL}/api/v1/shifts/available/${user.company_unique_id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      set({ 
        availableShifts: response.data.data,
        loading: false,
        error: null 
      });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || error.message,
        loading: false 
      });
    }
  },

  markAvailability: async (shiftId, isAvailable) => {
    try {
      set({ loading: true });
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));

      const response = await axios.post(
        `${API_BASE_URL}/api/v1/shifts/availability/${shiftId}`,
        { 
          isAvailable,
          userId: user._id // explicitly send the userId
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      // Update local state with the response data
      set(state => ({
        availableShifts: state.availableShifts.map(shift =>
          shift._id === shiftId ? response.data.data : shift
        ),
        loading: false,
        error: null
      }));
    } catch (error) {
      set({ 
        error: error.response?.data?.message || error.message,
        loading: false 
      });
    }
  }
}));

export default useAvailabilityStore;