import React from 'react';
import { Employee, LeaveRequest, LeaveStatus } from '../types';
import { ApproveIcon, RejectIcon } from './Icons';

interface LeaveListProps {
  leaveRequests: LeaveRequest[];
  employees: Employee[];
  onUpdateStatus: (requestId: number, status: LeaveStatus) => void;
}

const statusColors: Record<LeaveStatus, string> = {
  Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-300',
  Approved: 'bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-300',
  Rejected: 'bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-300',
};

const EmployeeList: React.FC<LeaveListProps> = ({ leaveRequests, employees, onUpdateStatus }) => {
  const employeeMap = new Map(employees.map(emp => [emp.employee_id, emp]));

  return (
    <div className="overflow-x-auto">
      {leaveRequests.length > 0 ? (
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700/50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Employee</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Dates</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {leaveRequests.map((request) => {
              const employee = employeeMap.get(request.employee_id);
              return (
                <tr key={request.request_id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {employee ? (
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{employee.first_name} {employee.last_name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{employee.department}</div>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500">Unknown Employee</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    <div>{new Date(request.start_date).toLocaleDateString()} -</div>
                    <div>{new Date(request.end_date).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {request.leave_type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[request.status]}`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {request.status === 'Pending' && (
                      <div className="flex items-center justify-end space-x-4">
                        <button onClick={() => onUpdateStatus(request.request_id, 'Approved')} className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 transition-colors duration-150" aria-label="Approve">
                          <ApproveIcon />
                        </button>
                        <button onClick={() => onUpdateStatus(request.request_id, 'Rejected')} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-150" aria-label="Reject">
                          <RejectIcon />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="text-center py-16">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">No Leave Requests Found</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            There are no leave requests matching the current filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;