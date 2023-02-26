//development
export const BASE_URL = "http://localhost:5000/api";

//REGISTER
export const PATIENT_REGISTER = BASE_URL + "/patients/register";
export const NURSE_REGISTER = BASE_URL + "/nurses/register";
export const DOCTOR_REGISTER = BASE_URL + "/doctors/register";

//LOGIN
export const LOGIN = BASE_URL + "/user/login";

//PATIENT
export const PATIENT_PROFILE = BASE_URL + "/patients/profile";
export const CANCEL_APPOINTMENT = BASE_URL + "/patients/cancel-appointment";
export const PREVIOUS_APPOINTMENT = BASE_URL + "/patients/previous-assessments";
export const POST_ASSESSMENT = BASE_URL + "/patients/give-assessment";
export const UPDATE_PATIENT_PROFILE = BASE_URL + "/patients/profile";

//NURSE
export const NURSE_PROFILE = BASE_URL + "/nurses/profile";
export const REVIEW_ASSESSMENT = BASE_URL + "/nurses/assessments-for-review";
export const REVIEW_ASSESSMENT_BYID = BASE_URL + "/nurses/review-assessment";
export const SCHEDULE_APPOINTMENT = BASE_URL + "/nurses/schedule-appointment";
export const PATIENT_LIST = BASE_URL + "/nurses/patient-list";
export const UPDATE_NURSE_PROFILE = BASE_URL + "/nurses/profile";
export const APPOINTMENT_LIST = BASE_URL + "/nurses/appointment-list";
export const DOCTOR_LIST_N = BASE_URL + "/nurses/doctor-list";

//DOCTOR
export const FORWARDED_LIST = BASE_URL + "/doctors/forwarded-assessments";
export const REVIEW_ASSESSMENT_BYID_BYDR = BASE_URL + "/doctors/review-assessments";
export const SCHEDULE_APPOINTMENT_BYDR = BASE_URL + "/doctors/schedule-appointment";
export const PATIENT_LIST_DR = BASE_URL + "/doctors/patient-list";
export const UPDATE_DOCTOR_PROFILE = BASE_URL + "/doctors/profile";
export const APPOINTMENT_LIST_DR = BASE_URL + "/doctors/appointment-list";


//ADMIN
export const PATIENT_LIST_ADMIN = BASE_URL + "/admins/patient-list";
export const NURSE_LIST = BASE_URL + "/admins/nurse-list";
export const DOCTOR_LIST = BASE_URL + "/admins/doctor-list";
export const DELETE_USER = BASE_URL + "/admins/delete-user";
export const REPORT = BASE_URL + "/admins/report";
//deployment
