
import { Employee, LeaveRequest, LeaveType, AttendanceRecord, PerformanceRatingMetrics } from './types';

export const DEPARTMENTS = [
  "Engineering",
  "Human Resources",
  "Marketing",
  "Sales",
  "Finance",
  "Product Management"
];

export const LEAVE_TYPES: LeaveType[] = ['Sick', 'Vacation', 'Personal'];

// FIX: Add PERFORMANCE_METRICS constant for performance review form.
export const PERFORMANCE_METRICS: Record<keyof PerformanceRatingMetrics, string> = {
  quality: "Quality of Work",
  communication: "Communication",
  punctuality: "Punctuality & Attendance",
  teamwork: "Teamwork & Collaboration",
};

export const INITIAL_EMPLOYEES: Employee[] = [
  {
    employee_id: 101,
    first_name: "Jane",
    last_name: "Doe",
    email: "jane.doe@example.com",
    department: "Engineering",
    position: "Senior Software Engineer",
    salary: 120000,
    date_of_joining: "2021-06-15",
    date_of_birth: "1990-05-20",
    contact_number: "123-456-7890",
    emergency_contact: "John Doe (Spouse) - 098-765-4321",
    address: "123 Main St, Anytown, USA",
  },
  {
    employee_id: 102,
    first_name: "John",
    last_name: "Smith",
    email: "john.smith@example.com",
    department: "Marketing",
    position: "Marketing Manager",
    salary: 95000,
    date_of_joining: "2020-02-10",
    date_of_birth: "1988-11-30",
    contact_number: "234-567-8901",
    emergency_contact: "Mary Smith (Sister) - 109-876-5432",
    address: "456 Oak Ave, Anytown, USA",
  },
  {
    employee_id: 103,
    first_name: "Emily",
    last_name: "Jones",
    email: "emily.jones@example.com",
    department: "Human Resources",
    position: "HR Specialist",
    salary: 75000,
    date_of_joining: "2022-09-01",
    date_of_birth: "1995-03-12",
    contact_number: "345-678-9012",
    emergency_contact: "David Jones (Father) - 210-987-6543",
    address: "789 Pine Ln, Anytown, USA",
  },
  {
    employee_id: 104,
    first_name: "Michael",
    last_name: "Brown",
    email: "michael.brown@example.com",
    department: "Sales",
    position: "Sales Representative",
    salary: 80000,
    date_of_joining: "2023-01-20",
    date_of_birth: "1992-08-25",
    contact_number: "456-789-0123",
    emergency_contact: "Sarah Brown (Wife) - 321-098-7654",
    address: "101 Maple Dr, Anytown, USA",
  },
    {
    employee_id: 105,
    first_name: "Chris",
    last_name: "Lee",
    email: "chris.lee@example.com",
    department: "Engineering",
    position: "DevOps Engineer",
    salary: 110000,
    date_of_joining: "2022-03-18",
    date_of_birth: "1991-07-07",
    contact_number: "567-890-1234",
    emergency_contact: "Patricia Lee (Mother) - 432-109-8765",
    address: "212 Birch Rd, Anytown, USA",
  }
];

export const INITIAL_LEAVE_REQUESTS: LeaveRequest[] = [
  {
    request_id: 1,
    employee_id: 101,
    start_date: "2024-08-05",
    end_date: "2024-08-07",
    leave_type: "Vacation",
    status: "Approved",
    reason: "Family trip.",
  },
  {
    request_id: 2,
    employee_id: 102,
    start_date: "2024-07-29",
    end_date: "2024-07-29",
    leave_type: "Sick",
    status: "Approved",
    reason: "Doctor's appointment.",
  },
  {
    request_id: 3,
    employee_id: 105,
    start_date: "2024-08-12",
    end_date: "2024-08-16",
    leave_type: "Vacation",
    status: "Pending",
    reason: "Going to the beach.",
  },
  {
    request_id: 4,
    employee_id: 104,
    start_date: "2024-08-01",
    end_date: "2024-08-02",
    leave_type: "Personal",
    status: "Rejected",
    reason: "Attending a friend's wedding.",
  },
  {
    request_id: 5,
    employee_id: 101,
    start_date: "2024-09-02",
    end_date: "2024-09-02",
    leave_type: "Sick",
    status: "Pending",
    reason: "Feeling unwell.",
  },
];


const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
const yesterdayString = yesterday.toISOString().split('T')[0];

export const INITIAL_ATTENDANCE_RECORDS: AttendanceRecord[] = [
    {
        record_id: 1,
        employee_id: 101,
        date: yesterdayString,
        check_in_time: new Date(yesterday.setHours(9, 2, 15)).toISOString(),
        check_out_time: new Date(yesterday.setHours(17, 5, 22)).toISOString(),
    },
    {
        record_id: 2,
        employee_id: 102,
        date: yesterdayString,
        check_in_time: new Date(yesterday.setHours(8, 55, 41)).toISOString(),
        check_out_time: new Date(yesterday.setHours(17, 3, 11)).toISOString(),
    },
    {
        record_id: 3,
        employee_id: 103,
        date: yesterdayString,
        check_in_time: new Date(yesterday.setHours(9, 15, 0)).toISOString(),
        check_out_time: null, // Still checked in from yesterday for demo
    },
    {
        record_id: 4,
        employee_id: 104,
        date: yesterdayString,
        check_in_time: new Date(yesterday.setHours(9, 0, 5)).toISOString(),
        check_out_time: new Date(yesterday.setHours(17, 30, 8)).toISOString(),
    },
     {
        record_id: 5,
        employee_id: 101,
        date: new Date().toISOString().split('T')[0],
        check_in_time: new Date(new Date().setHours(9, 0, 10)).toISOString(),
        check_out_time: null,
    },
];