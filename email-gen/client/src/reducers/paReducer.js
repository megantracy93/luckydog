import { FETCH_TRANSPORT_ANIMALS } from '../actions/types';

export default function (state = null, action) {
  switch (action.type) {
    case FETCH_TRANSPORT_ANIMALS:
      return action.payload;
    default:
      return state;
  }
}