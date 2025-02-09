import { useEffect, useState } from "react";
import useEmployeeStore from "../../../Store/EmployeeStore";

const ManageEmployees = () => {
  const { employees, fetchEmployees, addEmployee, deleteEmployee } = useEmployeeStore();
  const [newEmployee, setNewEmployee] = useState({ name: "", email: "", role: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEmployees = async () => {
      await fetchEmployees();
    };
    loadEmployees();
  }, [fetchEmployees]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    if (!newEmployee.name || !newEmployee.email || !newEmployee.role) {
      setError("All fields are required");
      return;
    }
    setError("");
    await addEmployee(newEmployee);
    setNewEmployee({ name: "", email: "", role: "" });
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold text-gray-700 text-center">Manage Employees</h1>

      {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}

      {/* Employee Form */}
      <form className="mt-4 space-y-4" onSubmit={handleAddEmployee}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newEmployee.name}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newEmployee.email}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={newEmployee.role}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Add Employee
        </button>
      </form>

      {/* Employee List */}
      <ul className="mt-6 divide-y divide-gray-200">
        {employees.map((employee) => (
          <li key={employee.id} className="flex justify-between items-center py-3">
            <span className="text-gray-600">{employee.name} - {employee.email} - {employee.role}</span>
            <button
              onClick={() => deleteEmployee(employee.id)}
              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-300"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageEmployees;
