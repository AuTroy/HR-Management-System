import React, { useState, useMemo } from 'react';
// FIX: import PerformanceReview type.
import { Employee, PerformanceReview } from '../types';
// FIX: import ClipboardListIcon component.
import { ClipboardListIcon } from './Icons';

interface PerformanceViewProps {
  reviews: PerformanceReview[];
  employees: Employee[];
  onViewReview: (review: PerformanceReview) => void;
}

const PerformanceView: React.FC<PerformanceViewProps> = ({ reviews, employees, onViewReview }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const employeeMap = useMemo(() => new Map(employees.map(emp => [emp.employee_id, emp])), [employees]);

  const filteredReviews = useMemo(() => {
    return reviews.filter(review => {
      const employee = employeeMap.get(review.employee_id);
      const reviewer = employeeMap.get(review.reviewer_id);
      const lowerSearch = searchTerm.toLowerCase();

      const employeeMatch = employee ? `${employee.first_name} ${employee.last_name}`.toLowerCase().includes(lowerSearch) : false;
      const reviewerMatch = reviewer ? `${reviewer.first_name} ${reviewer.last_name}`.toLowerCase().includes(lowerSearch) : false;

      return employeeMatch || reviewerMatch;
    });
  }, [reviews, searchTerm, employeeMap]);

  return (
    <div>
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-100">Performance Reviews</h2>
            <p className="mt-1 text-gray-500 dark:text-gray-400">Track and manage employee performance evaluations.</p>
        </div>
        <div className="p-6 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-md">
                <label htmlFor="search-performance" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Search by Employee or Reviewer</label>
                <input
                    type="text"
                    id="search-performance"
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
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Reviewer</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Review Date</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Overall Score</th>
                        <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredReviews.map((review) => {
                        const employee = employeeMap.get(review.employee_id);
                        const reviewer = employeeMap.get(review.reviewer_id);
                        return (
                            <tr key={review.review_id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{employee ? `${employee.first_name} ${employee.last_name}` : 'Unknown'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{reviewer ? `${reviewer.first_name} ${reviewer.last_name}` : 'Unknown'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{new Date(review.review_date).toLocaleDateString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-gray-100">{review.overall_score.toFixed(2)} / 5.00</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => onViewReview(review)} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300" aria-label="View Review">
                                        <ClipboardListIcon />
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

export default PerformanceView;
