import { create } from 'zustand';
import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useEmployeeStore = create((set) => ({
  employees: [],
  fetchEmployees: async () => {
    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));

      if (user.role !== 'employer') {
        throw new Error('Unauthorized: Only employers can fetch employees.');
      }

      const response = await axios.get(`${API_BASE_URL}/api/v1/auth/allusers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ employees: response.data });
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  },
  addEmployee: async (newEmployee) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_BASE_URL}/api/v1/auth/employees`, newEmployee, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set((state) => ({
        employees: [...state.employees, response.data],
      }));
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  },
  deleteEmployee: async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE_URL}/api/employees/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set((state) => ({
        employees: state.employees.filter((employee) => employee.id !== id),
      }));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  },
}));

export default useEmployeeStore;