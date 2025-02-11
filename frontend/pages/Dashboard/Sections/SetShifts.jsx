import React, { useState, useEffect } from 'react';
import useShiftStore from '../../../Store/ShiftsStore';
import useAuthStore from '../../../Store/AuthStore';

const SetShifts = () => {
  const { shifts, fetchShifts, createShift, updateShift, deleteShift } = useShiftStore();
  const { user } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingShift, setEditingShift] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
  });

  useEffect(() => {
    fetchShifts();
  }, [fetchShifts]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const shiftData = {
      ...formData,
      createdBy: user._id,
      uniqueId: user.company_unique_id,
    };

    if (editingShift) {
      await updateShift(editingShift._id, shiftData);
    } else {
      await createShift(shiftData);
    }

    resetForm();
  };

  const handleEdit = (shift) => {
    setEditingShift(shift);
    setFormData({
      title: shift.title,
      description: shift.description || '',
      date: shift.date.split('T')[0],
      startTime: shift.startTime,
      endTime: shift.endTime,
    });
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', date: '', startTime: '', endTime: '' });
    setEditingShift(null);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manage Shifts</h1>
        <button onClick={() => setIsModalOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Create New Shift
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">Title</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">Date</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">Time</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {shifts.map((shift) => (
              <tr key={shift._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{shift.title}</td>
                <td className="px-6 py-4">{new Date(shift.date).toLocaleDateString()}</td>
                <td className="px-6 py-4">{`${shift.startTime} - ${shift.endTime}`}</td>
                <td className="px-6 py-4 flex space-x-4">
                  <button onClick={() => handleEdit(shift)} className="text-blue-500 hover:text-blue-700">Edit</button>
                  <button onClick={() => deleteShift(shift._id)} className="text-red-500 hover:text-red-700">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <h2 className="text-xl font-semibold mb-4">{editingShift ? 'Edit Shift' : 'Create New Shift'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {['title', 'description', 'date', 'startTime', 'endTime'].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
                  <input
                    type={field === 'description' ? 'text' : field === 'date' ? 'date' : 'time'}
                    value={formData[field]}
                    onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    required={field !== 'description'}
                  />
                </div>
              ))}
              <div className="flex justify-end space-x-2">
                <button type="button" onClick={resetForm} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                  {editingShift ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SetShifts;
