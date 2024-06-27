import {
  START_FETCHING_ORGANIZERS,
  SUCCESS_FETCHING_ORGANIZERS,
  ERROR_FETCHING_ORGANIZERS,
  SET_KEYWORD,
  //   SET_CATEGORY,
  //   SET_TALENT,
} from './constants';

const statuslist = {
  idle: 'idle',
  process: 'process',
  success: 'success',
  error: 'error',
};

const initialState = {
  data: [],
  keyword: '',
  organizers: '',
  status: statuslist.idle,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START_FETCHING_ORGANIZERS:
      return { ...state, status: statuslist.process };

    case ERROR_FETCHING_ORGANIZERS:
      return { ...state, status: statuslist.error };

    case SUCCESS_FETCHING_ORGANIZERS:
      return {
        ...state,
        status: statuslist.success,
        data: action.organizers,
      };

    case SET_KEYWORD:
      return {
        ...state,
        keyword: action.keyword,
      };

    //   case SET_CATEGORY:
    //     return {
    //       ...state,
    //       category: action.category,
    //     };

    //   case SET_TALENT:
    //     return {
    //       ...state,
    //       talent: action.talent,
    //     };

    default:
      return state;
  }
}
