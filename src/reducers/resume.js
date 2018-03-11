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
      console.log(action.payload);
      return {
        ...state,
        error: null,
        loading: true,
      };

    case Actions.UPLOAD_RESUME_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        candidate_json: action.payload.candidate_json,
        generated_text: action.payload.generated_text,
        loading: false,
        recruiter_json: action.payload.recruiter_json,
      };

    case Actions.ERROR:
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
