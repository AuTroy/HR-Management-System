
import React, { useState, useMemo } from 'react';
import { Employee, PayrollRecord } from '../types';
import { ViewPayslipIcon } from './Icons';

interface PayrollViewProps {
  employees: Employee[];
  payrollRecords: PayrollRecord[];
  onViewPayslip: (employee: Employee, record: PayrollRecord) => void;
}

const PayrollView: React.FC<PayrollViewProps> = ({ employees, payrollRecords, onViewPayslip }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const employeeMap = useMemo(() => new Map(employees.map(emp => [emp.employee_id, emp])), [employees]);

  const filteredRecords = useMemo(() => {
    return payrollRecords.filter(record => {
      const employee = employeeMap.get(record.employee_id);
      if (!employee) return false;
      const fullName = `${employee.first_name} ${employee.last_name}`.toLowerCase();
      return fullName.includes(searchTerm.toLowerCase());
    });
  }, [payrollRecords, searchTerm, employeeMap]);
  
  return (
    <div>
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-100">Payroll Processing</h2>
            <p className="mt-1 text-gray-500 dark:text-gray-400">View and manage employee payroll records.</p>
        </div>
        <div className="p-6 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-md">
            <label htmlFor="search-payroll" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Search Employee
            </label>
            <input
              type="text"
              id="search-payroll"
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
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Pay Period</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Net Salary</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
              <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredRecords.map((record) => {
              const employee = employeeMap.get(record.employee_id);
              if (!employee) return null;
              return (
                <tr key={record.payroll_id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full" src={`https://i.pravatar.cc/150?u=${employee.email}`} alt="" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{employee.first_name} {employee.last_name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{employee.position}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(record.pay_period_start).toLocaleDateString()} - {new Date(record.pay_period_end).toLocaleDateString()}
                  </td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 font-medium">
                    ${record.net_salary.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      record.status === 'Paid' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-300' 
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-300'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => onViewPayslip(employee, record)}
                      className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-150"
                      aria-label="View Payslip"
                    >
                      <ViewPayslipIcon />
                    </button>
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

export default PayrollView;
