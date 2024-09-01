export type AuthorizeDoctorPayload = {
  patientId: string;
  doctorIdToBeAuthorized: string;
};

export type AuthorizeInsurancePayload = {
  patientId: string;
  insuranceCompanyIdToBeAuthorized: string;
};
