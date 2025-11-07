import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import FilterControls from './components/FilterControls';
import EmployeeList from './components/EmployeeList';
import EmployeeFormModal from './components/EmployeeFormModal';
import LeaveManagementView from './components/LeaveManagementView';
import LeaveFormModal from './components/LeaveFormModal';
import AttendanceView from './components/AttendanceView';
import AttendanceLogModal from './components/AttendanceLogModal';
import ConfirmationModal from './components/ConfirmationModal';
import { Employee, LeaveRequest, LeaveStatus, AttendanceRecord } from './types';
import { INITIAL_EMPLOYEES, INITIAL_LEAVE_REQUESTS, DEPARTMENTS, LEAVE_TYPES, INITIAL_ATTENDANCE_RECORDS } from './constants';

export type View = 'employees' | 'leave' | 'attendance';

const App: React.FC = () => {
  // State Management
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(INITIAL_LEAVE_REQUESTS);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE_RECORDS);
  
  // UI State
  const [currentView, setCurrentView] = useState<View>('employees');
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [isAttendanceLogModalOpen, setIsAttendanceLogModalOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState<Employee | null>(null);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);
  const [selectedEmployeeForLog, setSelectedEmployeeForLog] = useState<Employee | null>(null);
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Derived State
  const filteredEmployees = useMemo(() => {
    return employees
      .filter(emp => filterDepartment === 'all' || emp.department === filterDepartment)
      .filter(emp => {
        const lowerSearch = searchTerm.toLowerCase();
        return (
          emp.first_name.toLowerCase().includes(lowerSearch) ||
          emp.last_name.toLowerCase().includes(lowerSearch) ||
          emp.email.toLowerCase().includes(lowerSearch) ||
          emp.position.toLowerCase().includes(lowerSearch)
        );
      });
  }, [employees, filterDepartment, searchTerm]);

  // Handlers for Employees
  const handleAddEmployeeClick = () => {
    setEmployeeToEdit(null);
    setIsEmployeeModalOpen(true);
  };

  const handleEditEmployee = (employee: Employee) => {
    setEmployeeToEdit(employee);
    setIsEmployeeModalOpen(true);
  };

  const handleDeleteClick = (employee: Employee) => {
    setEmployeeToDelete(employee);
  };

  const handleConfirmDelete = () => {
    if (!employeeToDelete) return;
    const employeeId = employeeToDelete.employee_id;

    setEmployees(prev => prev.filter(emp => emp.employee_id !== employeeId));
    setLeaveRequests(prev => prev.filter(req => req.employee_id !== employeeId));
    setAttendanceRecords(prev => prev.filter(rec => rec.employee_id !== employeeId));
    
    setEmployeeToDelete(null);
  };

  const handleSaveEmployee = (employeeData: Employee) => {
    if (employeeToEdit) {
      setEmployees(employees.map(emp => emp.employee_id === employeeData.employee_id ? employeeData : emp));
    } else {
      const newEmployee: Employee = {
        ...employeeData,
        employee_id: Math.max(0, ...employees.map(e => e.employee_id)) + 1,
      };
      setEmployees([...employees, newEmployee]);
    }
    setIsEmployeeModalOpen(false);
    setEmployeeToEdit(null);
  };

  // Handlers for Leave
  const handleLeaveStatusUpdate = (requestId: number, status: LeaveStatus) => {
    setLeaveRequests(
      leaveRequests.map(req =>
        req.request_id === requestId ? { ...req, status } : req
      )
    );
  };

  const handleSaveLeaveRequest = (request: Omit<LeaveRequest, 'request_id' | 'status'>) => {
    const newRequest: LeaveRequest = {
        ...request,
        request_id: Math.max(0, ...leaveRequests.map(r => r.request_id)) + 1,
        status: 'Pending',
    };
    setLeaveRequests([...leaveRequests, newRequest]);
    setIsLeaveModalOpen(false);
  };

  // Handlers for Attendance
  const handleCheckIn = (employeeId: number) => {
    const newRecord: AttendanceRecord = {
      record_id: Math.max(0, ...attendanceRecords.map(r => r.record_id)) + 1,
      employee_id: employeeId,
      date: new Date().toISOString().split('T')[0],
      check_in_time: new Date().toISOString(),
      check_out_time: null,
    };
    setAttendanceRecords([...attendanceRecords, newRecord]);
  };
  
  const handleCheckOut = (employeeId: number) => {
    const latestRecord = [...attendanceRecords]
        .filter(rec => rec.employee_id === employeeId && rec.check_out_time === null)
        .sort((a,b) => new Date(b.check_in_time).getTime() - new Date(a.check_in_time).getTime())[0];
    
    if (latestRecord) {
      setAttendanceRecords(
        attendanceRecords.map(rec =>
          rec.record_id === latestRecord.record_id
            ? { ...rec, check_out_time: new Date().toISOString() }
            : rec
        )
      );
    }
  };

  const handleViewLog = (employee: Employee) => {
    setSelectedEmployeeForLog(employee);
    setIsAttendanceLogModalOpen(true);
  };

  const renderView = () => {
    switch (currentView) {
      case 'employees':
        return (
          <>
            <FilterControls
              departments={DEPARTMENTS}
              filterDepartment={filterDepartment}
              setFilterDepartment={setFilterDepartment}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
            <EmployeeList
              employees={filteredEmployees}
              onEdit={handleEditEmployee}
              onDelete={handleDeleteClick}
            />
          </>
        );
      case 'leave':
        return <LeaveManagementView 
            leaveRequests={leaveRequests} 
            employees={employees}
            onUpdateStatus={handleLeaveStatusUpdate}
        />;
      case 'attendance':
        return <AttendanceView 
            employees={employees}
            attendanceRecords={attendanceRecords}
            onCheckIn={handleCheckIn}
            onCheckOut={handleCheckOut}
            onViewLog={handleViewLog}
        />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      <Header 
        currentView={currentView}
        onAddEmployee={handleAddEmployeeClick}
        onApplyLeave={() => setIsLeaveModalOpen(true)}
      />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                {(['employees', 'leave', 'attendance'] as View[]).map(view => (
                    <button
                        key={view}
                        onClick={() => setCurrentView(view)}
                        className={`${
                            currentView === view
                            ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-600'
                        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors duration-200`}
                    >
                        {view}
                    </button>
                ))}
            </nav>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden">
          {renderView()}
        </div>
      </main>

      {isEmployeeModalOpen && (
        <EmployeeFormModal
          employeeToEdit={employeeToEdit}
          onSave={handleSaveEmployee}
          onClose={() => setIsEmployeeModalOpen(false)}
          departments={DEPARTMENTS}
        />
      )}

      {isLeaveModalOpen && (
        <LeaveFormModal
          employees={employees}
          leaveTypes={LEAVE_TYPES}
          onSave={handleSaveLeaveRequest}
          onClose={() => setIsLeaveModalOpen(false)}
        />
      )}

      {isAttendanceLogModalOpen && selectedEmployeeForLog && (
        <AttendanceLogModal
            employee={selectedEmployeeForLog}
            records={attendanceRecords.filter(r => r.employee_id === selectedEmployeeForLog.employee_id)}
            onClose={() => setIsAttendanceLogModalOpen(false)}
        />
      )}

      {employeeToDelete && (
        <ConfirmationModal
            employee={employeeToDelete}
            onConfirm={handleConfirmDelete}
            onCancel={() => setEmployeeToDelete(null)}
        />
      )}
    </div>
  );
};

export default App;
