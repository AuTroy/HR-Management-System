import React from 'react';
import { Employee, AttendanceRecord } from '../types';

interface AttendanceLogModalProps {
  employee: Employee;
  records: AttendanceRecord[];
  onClose: () => void;
}

const formatTime = (isoString: string | null) => {
  if (!isoString) return 'N/A';
  return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const calculateHours = (start: string, end: string | null) => {
    if (!end) return '-';
    const diff = new Date(end).getTime() - new Date(start).getTime();
    if (diff < 0) return 'Invalid';
    const hours = diff / (1000 * 60 * 60);
    return `${hours.toFixed(2)} hrs`;
}

const AttendanceLogModal: React.FC<AttendanceLogModalProps> = ({ employee, records, onClose }) => {
  const sortedRecords = [...records].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime() || new Date(b.check_in_time).getTime() - new Date(a.check_in_time).getTime());

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
      <div className="relative mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white dark:bg-gray-800">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
            Attendance Log for {employee.first_name} {employee.last_name}
          </h3>
          <div className="mt-4 px-2 py-3 max-h-[60vh] overflow-y-auto">
            {sortedRecords.length > 0 ? (
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700/50 sticky top-0">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Check In</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Check Out</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Total Hours</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {sortedRecords.map(record => (
                            <tr key={record.record_id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{new Date(record.date).toLocaleDateString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{formatTime(record.check_in_time)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{formatTime(record.check_out_time)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 font-medium">{calculateHours(record.check_in_time, record.check_out_time)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-gray-500 dark:text-gray-400 py-8">No attendance records found for this employee.</p>
            )}
          </div>
          <div className="items-center px-4 py-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-indigo-600 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceLogModal;
