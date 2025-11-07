
export interface Employee {
  employee_id: number;
  first_name: string;
  last_name: string;
  email: string;
  department: string;
  position: string;
  salary: number;
  date_of_joining: string;
  date_of_birth: string;
  contact_number: string;
  emergency_contact: string;
  address: string;
}

export type LeaveType = 'Sick' | 'Vacation' | 'Personal';

export type LeaveStatus = 'Pending' | 'Approved' | 'Rejected';

export interface LeaveRequest {
  request_id: number;
  employee_id: number;
  start_date: string;
  end_date: string;
  leave_type: LeaveType;
  status: LeaveStatus;
  reason: string;
}

export type ClockStatus = 'Checked In' | 'Checked Out';

export interface AttendanceRecord {
  record_id: number;
  employee_id: number;
  date: string;
  check_in_time: string;
  check_out_time: string | null;
}

// FIX: Add PayrollRecord type for payroll components.
export interface PayrollRecord {
  payroll_id: number;
  employee_id: number;
  pay_period_start: string;
  pay_period_end: string;
  gross_salary: number;
  deductions: number;
  net_salary: number;
  status: 'Paid' | 'Pending';
}

// FIX: Add PerformanceRatingMetrics and PerformanceReview types for performance components.
export type PerformanceRatingMetrics = {
  quality: number;
  communication: number;
  punctuality: number;
  teamwork: number;
};

export interface PerformanceReview {
  review_id: number;
  employee_id: number;
  reviewer_id: number;
  review_date: string;
  goals: string;
  ratings: PerformanceRatingMetrics;
  comments: string;
  overall_score: number;
}
