import {   FETCH_BOARDING_DRIVER_EMAIL_PROPS,
  FETCH_MASTER_HANDLER_EMAIL_PROPS,
  FETCH_ALL_VOLUNTEER_EMAIL_PROPS
 } from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_BOARDING_DRIVER_EMAIL_PROPS:
      return { driver: action.payload };
    case FETCH_MASTER_HANDLER_EMAIL_PROPS:
      return { mh: action.payload };
    case FETCH_ALL_VOLUNTEER_EMAIL_PROPS:
      return { all: action.payload };
    default:
      return state;
  }
}