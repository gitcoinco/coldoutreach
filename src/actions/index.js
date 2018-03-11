import { createAction } from 'redux-actions';


export const UPLOAD_RESUME = 'app/resume/upload';
export const UPLOAD_RESUME_SUCCESS = 'app/resume/upload/success';

export const ERROR = 'app/error';


export const UploadResume = createAction(UPLOAD_RESUME, (data) => (data));
export const UploadResumeSuccess = createAction(UPLOAD_RESUME_SUCCESS, (data) => (data));

export const Error = createAction(ERROR, (error) => (error));
