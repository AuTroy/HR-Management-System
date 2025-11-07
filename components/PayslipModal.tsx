
import React from 'react';
import { Employee, PayrollRecord } from '../types';

interface PayslipModalProps {
  employee: Employee;
  record: PayrollRecord;
  onClose: () => void;
}

const PayslipModal: React.FC<PayslipModalProps> = ({ employee, record, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
      <div className="relative mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white dark:bg-gray-800">
        <div className="text-center">
          <h3 className="text-xl leading-6 font-bold text-gray-900 dark:text-gray-100">
            Payslip
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Pay Period: {new Date(record.pay_period_start).toLocaleDateString()} - {new Date(record.pay_period_end).toLocaleDateString()}</p>
        </div>
        <div className="mt-6 px-4 py-3 text-left">
          <div className="grid grid-cols-2 gap-4 border-b pb-4 border-gray-200 dark:border-gray-700">
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-gray-200">{employee.first_name} {employee.last_name}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">{employee.position}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{employee.department}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400">Employee ID: {employee.employee_id}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Date of Joining: {new Date(employee.date_of_joining).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-x-8">
            <div>
              <h5 className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-2">Earnings</h5>
              <div className="flex justify-between py-1">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Gross Salary</span>
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">${record.gross_salary.toLocaleString()}</span>
              </div>
            </div>
            <div>
              <h5 className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-2">Deductions</h5>
              <div className="flex justify-between py-1">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Taxes & Others</span>
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">${record.deductions.toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 border-t pt-4 border-gray-200 dark:border-gray-700">
             <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900 dark:text-gray-100">Net Salary</span>
                <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">${record.net_salary.toLocaleString()}</span>
             </div>
          </div>
        </div>
        <div className="items-center px-4 py-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PayslipModal;
