import React, { useEffect, useState } from 'react';
import useAvailabilityStore from '../../../Store/AvailabilityStore';
import useAuthStore from '../../../Store/AuthStore';

const SetAvailability = () => {
  const { availableShifts, loading, error, fetchAvailableShifts, markAvailability } = useAvailabilityStore();
  const { user } = useAuthStore();
  const [currentWeekStart, setCurrentWeekStart] = useState(getStartOfWeek(new Date()));

  useEffect(() => {
    fetchAvailableShifts();
  }, [fetchAvailableShifts]);

  // Helper function to get start of week
  function getStartOfWeek(date) {
    const newDate = new Date(date);
    const day = newDate.getDay();
    const diff = newDate.getDate() - day;
    return new Date(newDate.setDate(diff));
  }

  // Get dates for the week
  const weekDates = [...Array(7)].map((_, index) => {
    const date = new Date(currentWeekStart);
    date.setDate(date.getDate() + index);
    return date;
  });

  // Group shifts by date
  const shiftsByDate = weekDates.map(date => {
    const dateString = date.toISOString().split('T')[0];
    return {
      date,
      shifts: availableShifts.filter(shift => 
        new Date(shift.date).toISOString().split('T')[0] === dateString
      )
    };
  });

  const handleAvailabilityToggle = async (shiftId) => {
    const shift = availableShifts.find(s => s._id === shiftId);
    const isCurrentlyAvailable = shift.employeesAvailable.includes(user._id);
    await markAvailability(shiftId, !isCurrentlyAvailable);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[90rem] mx-auto bg-gray-50/30 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight">
          Set your Availability
        </h2>
        <div className="flex w-full sm:w-auto gap-2">
          <button
            onClick={() => {
              const newDate = new Date(currentWeekStart);
              newDate.setDate(newDate.getDate() - 7);
              setCurrentWeekStart(newDate);
            }}
            className="flex-1 sm:flex-initial px-4 py-2.5 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="hidden sm:inline">Previous</span> Week
          </button>
          <button
            onClick={() => {
              const newDate = new Date(currentWeekStart);
              newDate.setDate(newDate.getDate() + 7);
              setCurrentWeekStart(newDate);
            }}
            className="flex-1 sm:flex-initial px-4 py-2.5 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow"
          >
            <span className="hidden sm:inline">Next</span> Week
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 lg:gap-5">
        {shiftsByDate.map(({ date, shifts }) => (
          <div 
            key={date.toISOString()} 
            className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100/50 overflow-hidden hover:shadow-md transition-shadow duration-200"
          >
            <div className="bg-gray-50/50 p-4 border-b border-gray-100/50">
              <div className="font-semibold text-gray-900">
                {date.toLocaleDateString('en-US', { weekday: 'short' })}
              </div>
              <div className="text-sm text-gray-500">
                {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </div>
            </div>
            <div className="p-4 space-y-3">
              {shifts.map(shift => (
                <div
                  key={shift._id}
                  className="bg-gray-50/50 rounded-xl p-4 transition-all duration-200 hover:shadow-md group"
                >
                  <div className="font-medium text-gray-800 mb-1">{shift.title}</div>
                  <div className="text-sm text-gray-500 mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                      />
                    </svg>
                    {shift.startTime} - {shift.endTime}
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault(); // Prevent page reload
                      handleAvailabilityToggle(shift._id);
                    }}
                    className={`w-full px-4 py-2.5 rounded-xl transition-all duration-200 ${
                      shift.employeesAvailable.includes(user._id)
                        ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-100/50 shadow-lg group-hover:shadow-xl'
                        : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                    }`}
                  >
                    {shift.employeesAvailable.includes(user._id) ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M5 13l4 4L19 7" 
                          />
                        </svg>
                        Available
                      </span>
                    ) : (
                      'Mark Available'
                    )}
                  </button>
                </div>
              ))}
              {shifts.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <svg className="w-8 h-8 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                      d="M6 18L18 6M6 6l12 12" 
                    />
                  </svg>
                  <span className="text-sm">No shifts available</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-50 text-red-500 p-4 rounded-xl border border-red-100 shadow-lg animate-slide-up">
        {error}
      </div>
      )}
    </div>
  );
};

export default SetAvailability;