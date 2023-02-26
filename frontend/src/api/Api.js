import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
  getRequestWithHeader,
  postRequestWithHeader,
} from "./RequestExecutor";
import {
  PATIENT_REGISTER,
  NURSE_REGISTER,
  LOGIN,
  PATIENT_PROFILE,
  REVIEW_ASSESSMENT,
  REVIEW_ASSESSMENT_BYID,
  DOCTOR_REGISTER,
  SCHEDULE_APPOINTMENT,
  POST_ASSESSMENT,
  PREVIOUS_APPOINTMENT,
  CANCEL_APPOINTMENT,
  PATIENT_LIST,
  FORWARDED_LIST,
  REVIEW_ASSESSMENT_BYID_BYDR,
  SCHEDULE_APPOINTMENT_BYDR,
  PATIENT_LIST_DR,
  UPDATE_PATIENT_PROFILE,
  UPDATE_DOCTOR_PROFILE,
  UPDATE_NURSE_PROFILE,
  PATIENT_LIST_ADMIN,
  NURSE_LIST,
  DOCTOR_LIST,
  DELETE_USER,
  APPOINTMENT_LIST,
  APPOINTMENT_LIST_DR,
  DOCTOR_LIST_N,
  REPORT,
} from "./Url";

let token = null;

//------------------------------------------PATIENT------------------------------------------------------------------------------------
export async function registerPatient(email, firstName, lastName, password, dateOfBirth, phone, address, fromUser) {
  let responseData;
  let newEmail = email.toLowerCase();
  let data = {
    email: newEmail,
    firstName,
    lastName,
    password,
    dateOfBirth,
    phone,
    address,
  };
  responseData = await postRequest(PATIENT_REGISTER, data);
  if (fromUser) {
    token = await responseData.token;
    // alert("t change");
  }
  return responseData;
}

export async function updatePatient(email, firstName, lastName, dateOfBirth, phone, address) {
  let responseData;
  let data = {
    email,
    firstName,
    lastName,
    dateOfBirth,
    phone,
    address,
  };
  responseData = await putRequest(UPDATE_PATIENT_PROFILE, data, token);
  token = await responseData.token;
  return responseData;
}

export async function getAssessmentData() {
  let responseData = await getRequestWithHeader(PATIENT_PROFILE, token);
  return responseData;
}

export async function getPreviousAssessmentData() {
  let responseData = await getRequestWithHeader(PREVIOUS_APPOINTMENT, token);
  return responseData;
}

export async function cancelAppointment(id) {
  let responseData = await deleteRequest(CANCEL_APPOINTMENT + "/" + id, token);
  return responseData;
}

export async function postAssessment(
  closeContact,
  tested,
  travelHistory,
  difficultyBreathing,
  age,
  symptomsSet1,
  symptomsSet2
) {
  let data = {
    closeContact,
    tested,
    travelHistory,
    difficultyBreathing,
    age,
    symptomsSet1,
    symptomsSet2,
  };
  let responseData = await postRequestWithHeader(POST_ASSESSMENT, data, token);
  return responseData;
}

//------------------------------------------NURSE------------------------------------------------------------------------------------

export async function getListForReview() {
  let responseData = await getRequestWithHeader(REVIEW_ASSESSMENT, token);
  return responseData;
}

export async function getPatientList() {
  let responseData = await getRequestWithHeader(PATIENT_LIST, token);
  return responseData;
}
export async function getDoctorList() {
  let responseData = await getRequestWithHeader(DOCTOR_LIST_N, token);
  return responseData;
}
export async function getAppointmentList() {
  let responseData = await getRequestWithHeader(APPOINTMENT_LIST, token);
  return responseData;
}

export async function postReviewAssessment(isForwarded, isRejected, isReviewed, doctor, id) {
  let data = {
    isForwarded,
    isRejected,
    isReviewed,
    doctor,
  };
  let responseData = await postRequestWithHeader(REVIEW_ASSESSMENT_BYID + "/" + id, data, token);
  return responseData;
}

export async function postScheduleAppointment(date, id) {
  let data = {
    date,
  };
  let responseData = await postRequestWithHeader(SCHEDULE_APPOINTMENT + "/" + id, data, token);
  return responseData;
}

export async function updateNurse(email, firstName, lastName, dateOfBirth, phone, address) {
  let responseData;
  let data = {
    email,
    firstName,
    lastName,
    dateOfBirth,
    phone,
    address,
  };
  responseData = await putRequest(UPDATE_NURSE_PROFILE, data, token);
  token = await responseData.token;
  return responseData;
}

export async function registerNurse(
  email,
  firstName,
  lastName,
  password,
  dateOfBirth,
  phone,
  address,
  registrationNum,
  fromUser
) {
  let newEmail = email.toLowerCase();
  let responseData;
  let data = {
    email: newEmail,
    firstName,
    lastName,
    password,
    dateOfBirth,
    phone,
    address,
    registrationNum,
  };
  responseData = await postRequest(NURSE_REGISTER, data);
  if (fromUser) token = await responseData.token;
  return responseData;
}

//------------------------------------------DOCTOR------------------------------------------------------------------------------------
export async function registerDoctor(
  email,
  firstName,
  lastName,
  password,
  dateOfBirth,
  phone,
  address,
  registrationNum,
  fromUser
) {
  let newEmail = email.toLowerCase();
  let responseData;
  let data = {
    email: newEmail,
    firstName,
    lastName,
    password,
    dateOfBirth,
    phone,
    address,
    registrationNum,
  };
  responseData = await postRequest(DOCTOR_REGISTER, data);
  if (fromUser) token = await responseData.token;
  return responseData;
}
export async function updateDoctor(email, firstName, lastName, dateOfBirth, phone, address) {
  let responseData;
  let data = {
    email,
    firstName,
    lastName,
    dateOfBirth,
    phone,
    address,
  };
  responseData = await putRequest(UPDATE_DOCTOR_PROFILE, data, token);
  token = await responseData.token;
  return responseData;
}
export async function getForwardedAssessmentData() {
  let responseData = await getRequestWithHeader(FORWARDED_LIST, token);
  return responseData;
}
export async function getPatientListForDr() {
  let responseData = await getRequestWithHeader(PATIENT_LIST_DR, token);
  return responseData;
}
export async function getReport(from, to) {
  let data = {
    from,
    to,
  };
  let responseData = await getRequestWithHeader(REPORT + "?from=" + from + "&to=" + to, token);
  return responseData;
}
export async function getAppointmentListDr() {
  let responseData = await getRequestWithHeader(APPOINTMENT_LIST_DR, token);
  return responseData;
}

export async function postReviewAssessmentByDr(isRejected, isReviewed, id) {
  let data = {
    isRejected,
    isReviewed,
  };
  let responseData = await postRequestWithHeader(REVIEW_ASSESSMENT_BYID_BYDR + "/" + id, data, token);
  return responseData;
}

export async function postScheduleAppointmentByDr(date, id) {
  let data = {
    date,
  };
  let responseData = await postRequestWithHeader(SCHEDULE_APPOINTMENT_BYDR + "/" + id, data, token);
  return responseData;
}

//------------------------------------------------ADMIN------------------------------------------------------------------------------------
export async function getPatientListAdmin() {
  let responseData = await getRequestWithHeader(PATIENT_LIST_ADMIN, token);
  return responseData;
}
export async function getNurseListAdmin() {
  let responseData = await getRequestWithHeader(NURSE_LIST, token);
  return responseData;
}
export async function getDoctorListAdmin() {
  let responseData = await getRequestWithHeader(DOCTOR_LIST, token);
  return responseData;
}
export async function deleteUser(id) {
  let responseData = await deleteRequest(DELETE_USER + "/" + id, token);
  return responseData;
  // let respone = {
  //   success: true,
  // };
  // return respone;
}

//------------------------------------------------ALL USERS---------------------------------------------------------------------------------
export function checkIfLogin() {
  return token !== null;
}

export function logout() {
  token = null;
}

export async function loginPatient(email, password) {
  let responseData;
  let newEmail = email.toLowerCase();
  let data = {
    email: newEmail,
    password,
  };
  responseData = await postRequest(LOGIN, data);

  token = await responseData.token;
  return responseData;
}
