
import React, { useState, useEffect } from 'react';
import { Employee } from '../types';

interface EmployeeFormModalProps {
  employeeToEdit: Employee | null;
  onSave: (employee: Employee) => void;
  onClose: () => void;
  departments: string[];
}

const emptyEmployee: Omit<Employee, 'employee_id'> = {
  first_name: '',
  last_name: '',
  email: '',
  department: '',
  position: '',
  salary: 0,
  date_of_joining: '',
  date_of_birth: '',
  contact_number: '',
  emergency_contact: '',
  address: '',
};

const EmployeeFormModal: React.FC<EmployeeFormModalProps> = ({ employeeToEdit, onSave, onClose, departments }) => {
  const [formData, setFormData] = useState<Omit<Employee, 'employee_id'>>(emptyEmployee);

  useEffect(() => {
    if (employeeToEdit) {
      setFormData(employeeToEdit);
    } else {
      setFormData(emptyEmployee);
    }
  }, [employeeToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'salary' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (employeeToEdit) {
      onSave({ ...formData, employee_id: employeeToEdit.employee_id });
    } else {
      // The actual employee_id will be set in the parent `onSave` handler
      onSave(formData as Employee);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full z-50 flex items-center justify-center" id="my-modal">
      <div className="relative mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white dark:bg-gray-800">
        <div className="text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">{employeeToEdit ? 'Edit Employee' : 'Add New Employee'}</h3>
          <div className="mt-2 px-7 py-3">
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="First Name" name="first_name" value={formData.first_name} onChange={handleChange} required />
                <InputField label="Last Name" name="last_name" value={formData.last_name} onChange={handleChange} required />
                <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                <InputField label="Contact Number" name="contact_number" type="tel" value={formData.contact_number} onChange={handleChange} required />
                <SelectField label="Department" name="department" value={formData.department} onChange={handleChange} options={departments} required />
                <InputField label="Position" name="position" value={formData.position} onChange={handleChange} required />
                <InputField label="Salary" name="salary" type="number" value={formData.salary.toString()} onChange={handleChange} required />
                <InputField label="Date of Joining" name="date_of_joining" type="date" value={formData.date_of_joining} onChange={handleChange} required />
                <InputField label="Date of Birth" name="date_of_birth" type="date" value={formData.date_of_birth} onChange={handleChange} required />
                <InputField label="Emergency Contact" name="emergency_contact" value={formData.emergency_contact} onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
                <textarea
                  id="address"
                  name="address"
                  rows={3}
                  value={formData.address}
                  onChange={handleChange}
                  className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div className="items-center px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">
                  Save
                </button>
                <button type="button" onClick={onClose} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const InputField = ({ label, name, type = 'text', value, onChange, required = false }: { label: string, name: string, type?: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, required?: boolean }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
    />
  </div>
);

const SelectField = ({ label, name, value, onChange, options, required = false }: { label: string, name: string, value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, options: string[], required?: boolean }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
    >
      <option value="">Select a department</option>
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

export default EmployeeFormModal;
