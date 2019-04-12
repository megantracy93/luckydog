import axios from 'axios';
import { change } from 'redux-form';
import { SURVEY_FORM_NAME, EVENT_PROPERTIES } from '../components/email-properties/constants';
import { FETCH_USER,
  FETCH_BOARDING_DRIVER_EMAIL_PROPS,
  FETCH_MASTER_HANDLER_EMAIL_PROPS,
  FETCH_ALL_VOLUNTEER_EMAIL_PROPS,
  FETCH_TRANSPORT_ANIMALS,
  GET_ALL_EVENTS,
  SAVE_EVENT_PROPS
} from './types';
import _ from 'lodash';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchDriverProps = (values) => async dispatch => {
  const res = await axios.post('/api/driver', values);
  dispatch({ type: FETCH_BOARDING_DRIVER_EMAIL_PROPS, payload: res.data });
}

export const fetchMHProps = (values) => async dispatch => {
  const res = await axios.post('/api/mh', values);
  dispatch({ type: FETCH_MASTER_HANDLER_EMAIL_PROPS, payload: res.data });
}

export const fetchAllVolunteerProps = (values) => async dispatch => {
  const res = await axios.post('/api/allvolunteer', values);
  dispatch({ type: FETCH_ALL_VOLUNTEER_EMAIL_PROPS, payload: res.data });
}

export const fetchTransportAnimals = (values) => async dispatch => {
  const res = await axios.post('/api/transport', values);
  console.log('transport response', res);
  dispatch({ type: FETCH_TRANSPORT_ANIMALS, payload: res.data });
}

export const getAllEvents = () => async dispatch => {
  const res = await axios.get('/api/events');
  dispatch({ type: GET_ALL_EVENTS, payload: res.data });
};

export const setEventProps = (props) => async dispatch => {
  _.map(props, (value, key) => {
    dispatch(change(SURVEY_FORM_NAME, key, value));
  });
}

export const onClearEventProps = () => async dispatch => {
  _.map([...EVENT_PROPERTIES, {name: 'eventId'}], (prop, i) => {
    dispatch(change(SURVEY_FORM_NAME, prop.name, null));
  });
}

export const saveEventProperties = (values) => async dispatch => {
  const res = await axios.post('/api/event', values);
  dispatch({ type: SAVE_EVENT_PROPS, payload: res.data });
}