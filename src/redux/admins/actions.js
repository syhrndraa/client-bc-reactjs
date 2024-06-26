import {
  START_FETCHING_ADMINS,
  SUCCESS_FETCHING_ADMINS,
  ERROR_FETCHING_ADMINS,
  SET_KEYWORD,
  // SET_CATEGORY,
  // SET_TALENT,
} from './constants';

import { getData } from '../../utils/fetch';
import debounce from 'debounce-promise';
import { clearNotif } from '../notif/actions';

let debouncedFetchAdmins = debounce(getData, 1000);

export const startFetchingAdmins = () => {
  return {
    type: START_FETCHING_ADMINS,
  };
};

export const successFetchingAdmins = ({ admins }) => {
  return {
    type: SUCCESS_FETCHING_ADMINS,
    admins,
  };
};

export const errorFetchingAdmins = () => {
  return {
    type: ERROR_FETCHING_ADMINS,
  };
};

export const fetchAdmins = () => {
  return async (dispatch, getState) => {
    dispatch(startFetchingAdmins());

    try {
      setTimeout(() => {
        dispatch(clearNotif());
      }, 5000);

      let params = {
        keyword: getState().admins.keyword,
      };

      //   let res = await debouncedFetchAdmins('/cms/users', params);
      let res = await debouncedFetchAdmins('/cms/admins', params);

      //   res.data.data.forEach((res) => {
      //     res.categoryName = res?.category?.name ?? '';
      //     res.adminName = res?.users?.name ?? '-';
      //   });

      console.log('res');
      console.log(res.data.data.role);
      dispatch(
        successFetchingAdmins({
          admins: res.data.data,
        })
      );
    } catch (error) {
      dispatch(errorFetchingAdmins());
    }
  };
};

export const setKeyword = (keyword) => {
  return {
    type: SET_KEYWORD,
    keyword,
  };
};

//   export const setCategory = (category) => {
//     return {
//       type: SET_CATEGORY,
//       category,
//     };
//   };

//   export const setTalent = (talent) => {
//     return {
//       type: SET_TALENT,
//       talent,
//     };
//   };
