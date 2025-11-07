import React, { useState, useEffect, useMemo } from 'react';
// FIX: import PerformanceReview type.
import { Employee, PerformanceReview } from '../types';
// FIX: import PERFORMANCE_METRICS constant.
import { PERFORMANCE_METRICS } from '../constants';

interface PerformanceReviewModalProps {
  review: PerformanceReview | null;
  employees: Employee[];
  onSave: (review: PerformanceReview) => void;
  onClose: () => void;
}

const emptyReview: Omit<PerformanceReview, 'review_id'> = {
  employee_id: 0,
  reviewer_id: 0,
  review_date: new Date().toISOString().split('T')[0],
  goals: '',
  ratings: {
    quality: 3,
    communication: 3,
    punctuality: 3,
    teamwork: 3,
  },
  comments: '',
  overall_score: 3,
};

const PerformanceReviewModal: React.FC<PerformanceReviewModalProps> = ({ review, employees, onSave, onClose }) => {
  const [formData, setFormData] = useState<Omit<PerformanceReview, 'review_id'>>(emptyReview);

  useEffect(() => {
    if (review) {
      setFormData(review);
    } else {
      setFormData(emptyReview);
    }
  }, [review]);

  const overallScore = useMemo(() => {
    const ratings = Object.values(formData.ratings);
    if (ratings.length === 0) return 0;
    // FIX: Add explicit types to reduce function to prevent type errors.
    const sum = ratings.reduce((acc: number, curr: number) => acc + curr, 0);
    return sum / ratings.length;
  }, [formData.ratings]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: (name === 'employee_id' || name === 'reviewer_id') ? Number(value) : value,
    }));
  };
  
  const handleRatingChange = (metric: keyof PerformanceReview['ratings'], value: number) => {
    setFormData(prev => ({
        ...prev,
        ratings: {
            ...prev.ratings,
            [metric]: value
        }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalData = {
        ...formData,
        overall_score: overallScore,
    };
    if (review) {
        onSave({ ...finalData, review_id: review.review_id });
    } else {
        onSave(finalData as PerformanceReview);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
      <div className="relative mx-auto p-5 border w-full max-w-3xl shadow-lg rounded-md bg-white dark:bg-gray-800">
        <div className="text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">{review ? 'View Performance Review' : 'Schedule New Review'}</h3>
          <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-left px-4 max-h-[80vh] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SelectField label="Employee" name="employee_id" value={formData.employee_id.toString()} onChange={handleChange} options={employees.map(e => ({ value: e.employee_id, label: `${e.first_name} ${e.last_name}`}))} required />
                <SelectField label="Reviewer" name="reviewer_id" value={formData.reviewer_id.toString()} onChange={handleChange} options={employees.map(e => ({ value: e.employee_id, label: `${e.first_name} ${e.last_name}`}))} required />
            </div>
             <div>
                <label htmlFor="review_date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Review Date</label>
                <input type="date" id="review_date" name="review_date" value={formData.review_date} onChange={handleChange} required className="mt-1 block w-full input-style" />
            </div>
            <div>
                <label htmlFor="goals" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Goals</label>
                <textarea id="goals" name="goals" value={formData.goals} onChange={handleChange} rows={3} className="mt-1 block w-full input-style" />
            </div>

            <div className="my-4">
                <h4 className="text-md font-medium text-gray-900 dark:text-gray-100 mb-2">Performance Ratings</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-md border-gray-200 dark:border-gray-700">
                    {/* FIX: Iterate over keys in a type-safe way to avoid type errors. */}
                    {(Object.keys(PERFORMANCE_METRICS) as Array<keyof typeof PERFORMANCE_METRICS>).map((key) => (
                        <div key={key} className="flex items-center justify-between">
                            <label htmlFor={`rating-${key}`} className="text-sm font-medium text-gray-700 dark:text-gray-300">{PERFORMANCE_METRICS[key]}</label>
                            <select 
                                id={`rating-${key}`}
                                value={formData.ratings[key]}
                                onChange={(e) => handleRatingChange(key, Number(e.target.value))}
                                className="w-20 input-style"
                            >
                                {[1,2,3,4,5].map(v => <option key={v} value={v}>{v}</option>)}
                            </select>
                        </div>
                    ))}
                    <div className="md:col-span-2 flex items-center justify-end mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                        <span className="text-sm font-bold text-gray-800 dark:text-gray-200">Overall Score:</span>
                        <span className="ml-2 text-lg font-extrabold text-indigo-600 dark:text-indigo-400">{overallScore.toFixed(2)} / 5.00</span>
                    </div>
                </div>
            </div>

            <div>
                <label htmlFor="comments" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Comments / Feedback</label>
                <textarea id="comments" name="comments" value={formData.comments} onChange={handleChange} rows={4} className="mt-1 block w-full input-style" />
            </div>

            <div className="items-center px-4 py-3 sm:px-0 sm:flex sm:flex-row-reverse">
              <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">
                Save Review
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

const SelectField = ({ label, name, value, onChange, options, required = false }: { label: string, name: string, value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, options: {value: number, label: string}[], required?: boolean }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="mt-1 block w-full pl-3 pr-10 py-2 text-base input-style"
    >
      <option value="">Select...</option>
      {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
    </select>
  </div>
);

export default PerformanceReviewModal;
