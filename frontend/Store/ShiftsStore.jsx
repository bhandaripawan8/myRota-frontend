import { create } from 'zustand';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const formatShiftData = (shift) => ({
    ...shift,
    date: new Date(shift.date).toISOString().split('T')[0],
    startTime: shift.startTime,
    endTime: shift.endTime,
  });

const useShiftStore = create((set) => ({
  shifts: [],
  loading: false,
  error: null,
  fetchShifts: async () => {
    try {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      if (!token || !user) {
        throw new Error('User or token not found in localStorage');
      }
      const parsedUser = JSON.parse(user);
      if (!parsedUser.company_unique_id) {
        throw new Error('Company unique ID not found in user data');
      }
      const employerId = parsedUser.company_unique_id;
      const response = await axios.get(
        `${API_BASE_URL}/api/v1/shifts/getshiftsbyemployerid/${employerId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    //   console.log(response.data);
      set({ shifts: response.data.data, error: null });
    } catch (error) {
      set({ error: error.message });
    }
  },
  

  createShift: async (shiftData) => {
    try {
      set({ loading: true });
      const token = localStorage.getItem('token');
      const formattedData = {
        ...shiftData,
        date: new Date(shiftData.date).toISOString().split('T')[0],
      };
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/shifts/createshifts`,
        formattedData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      const formattedShift = formatShiftData(response.data);
      set(state => ({
        shifts: [...state.shifts, formattedShift],
        error: null,
        loading: false
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  updateShift: async (id, shiftData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${API_BASE_URL}/api/v1/shifts/updateshifts/${id}`,
        shiftData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      const formattedShift = formatShiftData(response.data);
  
      set(state => ({
        shifts: state.shifts.map(shift => 
          shift._id === id ? formattedShift : shift
        ),
        error: null
      }));
    } catch (error) {
      set({ error: error.message });
    }
  },
  

  deleteShift: async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(
        `${API_BASE_URL}/api/v1/shifts/deleteshifts/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      if (response.status === 200) { 
        set(state => ({
          shifts: state.shifts.filter(shift => shift._id !== id),
          error: null
        }));
      } else {
        throw new Error('Failed to delete shift');
      }
    } catch (error) {
      set({ error: error.message });
    }
  },
  
}));

export default useShiftStore;