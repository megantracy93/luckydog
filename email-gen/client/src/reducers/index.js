import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import emailReducer from './emailReducer';
import eventsReducer from './eventsReducer';
import paRecucer from './paReducer';

export default combineReducers({
  auth: authReducer,
  emailProps: emailReducer,
  transportAnimals: paRecucer,
  allEvents: eventsReducer,
  form: reduxForm
});