import React, { useState, useMemo } from 'react';
import { Employee, LeaveRequest, LeaveStatus } from '../types';
import LeaveList from './LeaveList';

interface LeaveManagementViewProps {
  leaveRequests: LeaveRequest[];
  employees: Employee[];
  onUpdateStatus: (requestId: number, status: LeaveStatus) => void;
}

const LeaveManagementView: React.FC<LeaveManagementViewProps> = ({ leaveRequests, employees, onUpdateStatus }) => {
  const [filterStatus, setFilterStatus] = useState<LeaveStatus | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const employeeMap = useMemo(() => new Map(employees.map(emp => [emp.employee_id, emp])), [employees]);

  const filteredLeaveRequests = useMemo(() => {
    return leaveRequests
      .filter(request => {
        if (filterStatus === 'all') return true;
        return request.status === filterStatus;
      })
      .filter(request => {
        const employee = employeeMap.get(request.employee_id);
        if (!employee) return false;
        const fullName = `${employee.first_name} ${employee.last_name}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase());
      });
  }, [leaveRequests, filterStatus, searchTerm, employeeMap]);

  return (
    <div>
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-100">Leave Requests</h2>
            <p className="mt-1 text-gray-500 dark:text-gray-400">Review and manage employee leave applications.</p>
        </div>
        <div className="p-6 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="search-leave" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Search by Employee</label>
                    <input
                        type="text"
                        id="search-leave"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        placeholder="Enter employee name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Filter by Status</label>
                    <select
                        id="status-filter"
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value as LeaveStatus | 'all')}
                    >
                        <option value="all">All Statuses</option>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
            </div>
        </div>
      <LeaveList
        leaveRequests={filteredLeaveRequests}
        employees={employees}
        onUpdateStatus={onUpdateStatus}
      />
    </div>
  );
};

export default LeaveManagementView;