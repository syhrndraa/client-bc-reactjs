import {
  START_FETCHING_ORGANIZERS,
  SUCCESS_FETCHING_ORGANIZERS,
  ERROR_FETCHING_ORGANIZERS,
  SET_KEYWORD,
  // SET_CATEGORY,
  // SET_TALENT,
} from './constants';

import { getData } from '../../utils/fetch';
import debounce from 'debounce-promise';
import { clearNotif } from '../notif/actions';

let debouncedFetchOrganizers = debounce(getData, 1000);

export const startFetchingOrganizers = () => {
  return {
    type: START_FETCHING_ORGANIZERS,
  };
};

export const successFetchingOrganizers = ({ organizers }) => {
  return {
    type: SUCCESS_FETCHING_ORGANIZERS,
    organizers,
  };
};

export const errorFetchingOrganizers = () => {
  return {
    type: ERROR_FETCHING_ORGANIZERS,
  };
};

export const fetchOrganizers = () => {
  return async (dispatch, getState) => {
    dispatch(startFetchingOrganizers());

    try {
      setTimeout(() => {
        dispatch(clearNotif());
      }, 5000);

      let params = {
        keyword: getState().organizers.keyword,
      };

      //   let res = await debouncedFetchAdmins('/cms/users', params);
      let res = await debouncedFetchOrganizers('/cms/users', params);

      //   res.data.data.forEach((res) => {
      //     res.categoryName = res?.category?.name ?? '';
      //     res.adminName = res?.users?.name ?? '-';
      //   });

      console.log('res');
      console.log(res.data.data.role);
      dispatch(
        successFetchingOrganizers({
          organizers: res.data.data,
        })
      );
    } catch (error) {
      dispatch(errorFetchingOrganizers());
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
