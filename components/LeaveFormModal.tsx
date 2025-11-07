import React, { useState } from 'react';
import { Employee, LeaveRequest, LeaveType } from '../types';

interface LeaveFormModalProps {
  employees: Employee[];
  leaveTypes: LeaveType[];
  onSave: (request: Omit<LeaveRequest, 'request_id' | 'status'>) => void;
  onClose: () => void;
}

const getTodayString = () => new Date().toISOString().split('T')[0];

const LeaveFormModal: React.FC<LeaveFormModalProps> = ({ employees, leaveTypes, onSave, onClose }) => {
  const [employeeId, setEmployeeId] = useState<string>('');
  const [leaveType, setLeaveType] = useState<LeaveType>('Vacation');
  const [startDate, setStartDate] = useState<string>(getTodayString());
  const [endDate, setEndDate] = useState<string>(getTodayString());
  const [reason, setReason] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!employeeId) {
      setError('Please select an employee.');
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
        setError('End date cannot be before start date.');
        return;
    }
    setError('');

    onSave({
      employee_id: Number(employeeId),
      leave_type: leaveType,
      start_date: startDate,
      end_date: endDate,
      reason,
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
      <div className="relative mx-auto p-5 border w-full max-w-lg shadow-lg rounded-md bg-white dark:bg-gray-800">
        <div className="text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">Apply for Leave</h3>
          <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-left px-4">
            <div>
              <label htmlFor="employee" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Employee</label>
              <select id="employee" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} required className="mt-1 block w-full input-style">
                <option value="">Select an employee...</option>
                {employees.map(emp => (
                  <option key={emp.employee_id} value={emp.employee_id}>{emp.first_name} {emp.last_name}</option>
                ))}
              </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="start_date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Start Date</label>
                    <input type="date" id="start_date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required className="mt-1 block w-full input-style" />
                </div>
                <div>
                    <label htmlFor="end_date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">End Date</label>
                    <input type="date" id="end_date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required className="mt-1 block w-full input-style" />
                </div>
            </div>

            <div>
              <label htmlFor="leave_type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Leave Type</label>
              <select id="leave_type" value={leaveType} onChange={(e) => setLeaveType(e.target.value as LeaveType)} required className="mt-1 block w-full input-style">
                {leaveTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="reason" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Reason</label>
              <textarea id="reason" value={reason} onChange={(e) => setReason(e.target.value)} rows={3} required className="mt-1 block w-full input-style" />
            </div>
            
            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="items-center px-4 py-3 sm:px-0 sm:flex sm:flex-row-reverse">
              <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">
                Submit Request
              </button>
              <button type="button" onClick={onClose} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
       <style>{`
          .input-style {
            shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
            focus:ring-indigo-500 focus:border-indigo-500
          }
      `}</style>
    </div>
  );
};

export default LeaveFormModal;
