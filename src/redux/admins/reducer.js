import {
  START_FETCHING_ADMINS,
  SUCCESS_FETCHING_ADMINS,
  ERROR_FETCHING_ADMINS,
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
  admins: '',
  status: statuslist.idle,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START_FETCHING_ADMINS:
      return { ...state, status: statuslist.process };

    case ERROR_FETCHING_ADMINS:
      return { ...state, status: statuslist.error };

    case SUCCESS_FETCHING_ADMINS:
      return {
        ...state,
        status: statuslist.success,
        data: action.admins,
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
