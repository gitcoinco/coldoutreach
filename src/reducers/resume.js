import * as Actions from '../actions';


export default function reducer(
  state = {
    candidate_json: {},
    generated_text: '',
    error: null,
    loading: false,
    recruiter_json: {},
  },
  action,
) {

  switch (action.type) {
    case Actions.UPLOAD_RESUME:
    case Actions.GENERATE_EMAIL:
      return {
        ...state,
        error: null,
        loading: true,
      };


    case Actions.UPLOAD_RESUME_SUCCESS:
      return {
        candidate_json: JSON.parse(action.payload.candidate_json),
        generated_text: action.payload.generated_text,
        error: null,
        loading: false,
        recruiter_json: JSON.parse(action.payload.recruiter_json),
      };


    case Actions.GENERATE_EMAIL_SUCCESS:
      return {
        ...state,
        error: null,
        generated_text: action.payload,
        loading: false,
      };


    case Actions.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
