import React from 'react';
import { View } from '../App';

interface HeaderProps {
  currentView: View;
  onAddEmployee: () => void;
  onApplyLeave: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onAddEmployee, onApplyLeave }) => {
  
  const actionButtonConfig = {
    employees: { label: 'Add Employee', handler: onAddEmployee },
    leave: { label: 'Apply for Leave', handler: onApplyLeave },
    attendance: null,
  };

  const currentAction = actionButtonConfig[currentView];

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              HR Management System
            </h1>
          </div>
          <div className="flex-shrink-0">
            {currentAction && (
              <button
                onClick={currentAction.handler}
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-2 -ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                {currentAction.label}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
