import React, { useEffect, useState } from 'react';
import useAvailabilityStore from '../../../Store/AvailabilityStore';
import useAuthStore from '../../../Store/AuthStore';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SetAvailability = () => {
  const { availableShifts, loading: shiftsLoading, error: shiftsError, fetchAvailableShifts, markAvailability } = useAvailabilityStore();
  const { user } = useAuthStore();
  const [currentWeekStart, setCurrentWeekStart] = useState(() => getStartOfWeek(new Date()));
  const [shiftTypes, setShiftTypes] = useState([]);
  const [loadingShiftTypes, setLoadingShiftTypes] = useState(false);
  const [errorShiftTypes, setErrorShiftTypes] = useState(null);

  useEffect(() => {
    fetchAvailableShifts();
    fetchShiftTypes();
  }, [fetchAvailableShifts]);

  function getStartOfWeek(date) {
    const newDate = new Date(date);
    const day = newDate.getDay();
    const diff = newDate.getDate() - day + (day === 0 ? -6 : 1); // Adjust to Monday start (ISO week)
    newDate.setDate(diff);
    return new Date(newDate.setHours(0, 0, 0, 0)); // Remove time component
  }

  const weekDates = [...Array(7)].map((_, index) => {
    const date = new Date(currentWeekStart);
    date.setDate(date.getDate() + index);
    return date;
  });

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const fetchShiftTypes = async () => {
    setLoadingShiftTypes(true);
    setErrorShiftTypes(null);
    try {
      const token = localStorage.getItem('token');
      const employerId = user.company_unique_id;

      const response = await axios.get(
        `${API_BASE_URL}/api/v1/shifts/getshiftsbyemployerid/${employerId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const types = response.data.data.map(shift => shift.title);
      setShiftTypes([...new Set(types)]);
    } catch (error) {
      console.error("Error fetching shift types:", error);
      setErrorShiftTypes(error.response?.data?.message || error.message);
    } finally {
      setLoadingShiftTypes(false);
    }
  };

  const formatDateString = (date) => {
    try {
      if (!date) return null;
      return new Date(date).toISOString().split('T')[0];
    } catch (error) {
      console.error('Date formatting error:', error);
      return null;
    }
  };

  const handleAvailabilityToggle = async (shiftId, e) => {
    e.preventDefault(); // Prevent form submission
    try {
      const shift = availableShifts.find(s => s._id === shiftId);
      if (!shift) {
        console.error('Shift not found');
        return;
      }
      
      const isCurrentlyAvailable = shift.employeesAvailable?.includes(user._id);
      await markAvailability(shiftId, !isCurrentlyAvailable);
      // Refetch shifts to update the UI
      await fetchAvailableShifts();
    } catch (error) {
      console.error('Error toggling availability:', error);
    }
  };

  const getShiftForDayAndType = (day, shiftType) => {
    try {
      const dayIndex = daysOfWeek.indexOf(day);
      if (dayIndex === -1 || !weekDates[dayIndex]) return null;

      const dateString = formatDateString(weekDates[dayIndex]);
      if (!dateString) return null;

      return availableShifts.find(shift => {
        const shiftDate = formatDateString(shift.date);
        return shiftDate === dateString && shift.title === shiftType;
      });
    } catch (error) {
      console.error('Error in getShiftForDayAndType:', error);
      return null;
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[90rem] mx-auto bg-gray-50/30 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight">
          Set your Availability
        </h2>
        <div className="flex w-full sm:w-auto gap-2">
          <button
            onClick={() => setCurrentWeekStart(prev => new Date(prev.setDate(prev.getDate() - 7)))}
            className="px-4 py-2 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="hidden sm:inline">Previous</span> Week
          </button>
          <button
            onClick={() => setCurrentWeekStart(prev => new Date(prev.setDate(prev.getDate() + 7)))}
            className="px-4 py-2 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow"
          >
            <span className="hidden sm:inline">Next</span> Week
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse table-auto">
          <thead>
            <tr>
              <th className="bg-gray-50/50 p-4 border">Shift Type</th>
              {daysOfWeek.map((day, index) => (
                <th key={day} className="bg-gray-50/50 p-4 border">
                  {day} <br />
                  {weekDates[index].toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loadingShiftTypes ? (
              <tr><td colSpan={8} className="text-center py-4">Loading Shift Types...</td></tr>
            ) : errorShiftTypes ? (
              <tr><td colSpan={8} className="text-center py-4 text-red-500">{errorShiftTypes}</td></tr>
            ) : shiftTypes.length > 0 ? (
              shiftTypes.map(shiftType => (
                <tr key={shiftType}>
                  <td className="p-4 border font-medium">{shiftType}</td>
                  {daysOfWeek.map((day, index) => {
                    const shift = getShiftForDayAndType(day, shiftType);
                    return (
                      <td key={index} className="p-4 border text-center relative">
                        {shift && (
                          <div className="flex flex-col gap-2">
                            <div className="text-sm text-gray-600">
                              {shift.startTime} - {shift.endTime}
                            </div>
                            <button
                              onClick={(e) => handleAvailabilityToggle(shift._id, e)}
                              className={`
                                w-full px-3 py-2 rounded-lg text-sm font-medium
                                transition-all duration-200 
                                ${shift.employeesAvailable?.includes(user._id)
                                  ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }
                              `}
                            >
                              {shift.employeesAvailable?.includes(user._id) ? (
                                <span className="flex items-center justify-center gap-2">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                  Available
                                </span>
                              ) : (
                                'Mark Available'
                              )}
                            </button>
                          </div>
                        )}
                        {!shift && "-"}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr><td colSpan={8} className="text-center py-4">No Shifts Available</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SetAvailability;
