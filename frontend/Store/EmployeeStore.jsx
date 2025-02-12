import { create } from "zustand";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useEmployeeStore = create((set) => ({
  employees: [],
  fetchEmployees: async () => {
    try {
      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");
      const user = JSON.parse(userStr);

      if (!user || user.role !== "employer") {
        throw new Error("Unauthorized: Only employers can fetch employees.");
      }
      const companyId = Number(user.company_unique_id);
      console.log("companyId", companyId);
      const response = await axios.get(
        `${API_BASE_URL}/api/v1/auth/company-users/${companyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response", response.data.data);
      if (response.data && response.data.data) {
        set({ employees: response.data.data });
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error(
        "Error fetching employees:",
        error.response?.data?.message || error.message
      );
      set({ employees: [] });
    }
  },
  addEmployee: async (newEmployee) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/auth/employees`,
        newEmployee,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set((state) => ({
        employees: [...state.employees, response.data],
      }));
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  },
  deleteEmployee: async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE_URL}/api/employees/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set((state) => ({
        employees: state.employees.filter((employee) => employee.id !== id),
      }));
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  },
  toggleEmployeeStatus: async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `${API_BASE_URL}/api/employees/${id}/toggle-status`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set((state) => ({
        employees: state.employees.map((employee) =>
          employee.id === id
            ? { ...employee, active: response.data.active }
            : employee
        ),
      }));
    } catch (error) {
      console.error("Error toggling employee status:", error);
    }
  },
}));

export default useEmployeeStore;
