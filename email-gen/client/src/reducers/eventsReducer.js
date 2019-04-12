import { GET_ALL_EVENTS } from '../actions/types';

export default function (state = null, action) {
  switch (action.type) {
    case GET_ALL_EVENTS:
      return action.payload;
    default:
      return state;
  }
}