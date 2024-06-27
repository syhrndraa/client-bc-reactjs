import {
  START_FETCHING_EVENTS_OWNER,
  SUCCESS_FETCHING_EVENTS_OWNER,
  ERROR_FETCHING_EVENTS_OWNER,
  SET_KEYWORD,
  SET_CATEGORY,
  SET_TALENT,
} from './constants';

import { getData } from '../../utils/fetch';
import debounce from 'debounce-promise';
import { clearNotif } from '../notif/actions';

let debouncedFetchEvents = debounce(getData, 1000);

export const startFetchingEvents = () => {
  return {
    type: START_FETCHING_EVENTS_OWNER,
  };
};

export const successFetchingEvents = ({ eventsbyowner }) => {
  return {
    type: SUCCESS_FETCHING_EVENTS_OWNER,
    eventsbyowner,
  };
};

export const errorFetchingEvents = () => {
  return {
    type: ERROR_FETCHING_EVENTS_OWNER,
  };
};

export const fetchEventsOwner = () => {
  return async (dispatch, getState) => {
    dispatch(startFetchingEvents());

    try {
      setTimeout(() => {
        dispatch(clearNotif());
      }, 5000);

      let params = {
        keyword: getState().eventsByOwner.keyword,
        category: getState().eventsByOwner?.category?.value || '',
        talent: getState().eventsByOwner?.talent?.value || '',
      };

      let res = await debouncedFetchEvents('/cms/eventsbyowner', params);

      res.data.data.forEach((res) => {
        res.categoryName = res?.category?.name ?? '';
        res.talentName = res?.talent?.name ?? '-';
      });

      dispatch(
        successFetchingEvents({
          eventsbyowner: res.data.data,
        })
      );
    } catch (error) {
      console.log('error');
      console.log(error);
      dispatch(errorFetchingEvents());
    }
  };
};

export const setKeywordOwner = (keyword) => {
  return {
    type: SET_KEYWORD,
    keyword,
  };
};

export const setCategoryOwner = (category) => {
  return {
    type: SET_CATEGORY,
    category,
  };
};

export const setTalentOwner = (talent) => {
  return {
    type: SET_TALENT,
    talent,
  };
};
