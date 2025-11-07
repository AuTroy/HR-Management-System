import React, { useState, useMemo } from 'react';
import { Employee, AttendanceRecord, ClockStatus } from '../types';
import { ClockIcon, HistoryIcon } from './Icons';

interface AttendanceViewProps {
  employees: Employee[];
  attendanceRecords: AttendanceRecord[];
  onCheckIn: (employeeId: number) => void;
  onCheckOut: (employeeId: number) => void;
  onViewLog: (employee: Employee) => void;
}

const AttendanceView: React.FC<AttendanceViewProps> = ({ employees, attendanceRecords, onCheckIn, onCheckOut, onViewLog }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const employeeStatusMap = useMemo(() => {
    const statusMap = new Map<number, ClockStatus>();
    employees.forEach(emp => {
      const latestRecord = [...attendanceRecords]
        .filter(rec => rec.employee_id === emp.employee_id)
        .sort((a, b) => new Date(b.check_in_time).getTime() - new Date(a.check_in_time).getTime())[0];
      
      if (latestRecord && latestRecord.check_out_time === null) {
        statusMap.set(emp.employee_id, 'Checked In');
      } else {
        statusMap.set(emp.employee_id, 'Checked Out');
      }
    });
    return statusMap;
  }, [employees, attendanceRecords]);
  
  const filteredEmployees = useMemo(() => {
    return employees.filter(employee => {
      const fullName = `${employee.first_name} ${employee.last_name}`.toLowerCase();
      return fullName.includes(searchTerm.toLowerCase());
    });
  }, [employees, searchTerm]);


  return (
    <div>
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-100">Attendance Status</h2>
        <p className="mt-1 text-gray-500 dark:text-gray-400">Track employee check-in and check-out status in real-time.</p>
      </div>

      <div className="p-6 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-md">
          <label htmlFor="search-attendance" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Search Employee
          </label>
          <input
            type="text"
            id="search-attendance"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="Enter name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700/50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Employee</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
              <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredEmployees.map((employee) => {
              const status = employeeStatusMap.get(employee.employee_id) || 'Checked Out';
              return (
                <tr key={employee.employee_id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{employee.first_name} {employee.last_name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{employee.department}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className={`h-2.5 w-2.5 rounded-full mr-2 ${status === 'Checked In' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                      <span className={`text-sm ${status === 'Checked In' ? 'text-green-800 dark:text-green-300' : 'text-gray-600 dark:text-gray-400'}`}>{status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-3">
                      <button 
                        onClick={() => onViewLog(employee)}
                        className="flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        aria-label={`View log for ${employee.first_name}`}
                      >
                         <HistoryIcon />
                         <span className="ml-2 hidden sm:inline">View Log</span>
                      </button>
                      {status === 'Checked Out' ? (
                        <button 
                          onClick={() => onCheckIn(employee.employee_id)}
                          className="flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          aria-label={`Check in ${employee.first_name}`}
                        >
                          <ClockIcon />
                          <span className="ml-2">Check In</span>
                        </button>
                      ) : (
                        <button 
                          onClick={() => onCheckOut(employee.employee_id)}
                          className="flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                           aria-label={`Check out ${employee.first_name}`}
                        >
                          <ClockIcon />
                          <span className="ml-2">Check Out</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceView;