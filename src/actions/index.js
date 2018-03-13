import { createAction } from 'redux-actions';


export const UPLOAD_RESUME = 'app/resume/upload';
export const UPLOAD_RESUME_SUCCESS = 'app/resume/upload/success';

export const GENERATE_EMAIL = 'app/generate/email';
export const GENERATE_EMAIL_SUCCESS = 'app/generate/email/success';

export const ERROR = 'app/error';


export const UploadResume = createAction(UPLOAD_RESUME, (data) => (data));
export const UploadResumeSuccess = createAction(UPLOAD_RESUME_SUCCESS, (data) => (data));

export const GenerateEmail = createAction(GENERATE_EMAIL, (data) => (data));
export const GenerateEmailSuccess = createAction(GENERATE_EMAIL_SUCCESS, (data) => (data));

export const Error = createAction(ERROR, (error) => (error));
