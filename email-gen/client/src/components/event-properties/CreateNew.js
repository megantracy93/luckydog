import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import EmailPropertiesForm from '../email-properties/EmailPropertiesForm';
import * as actions from '../../actions';
import { SURVEY_FORM_NAME, EVENT_PROPERTIES } from '../email-properties/constants';
import './CreateNew.css';

class CreateNew extends React.Component {
  onClear = () => {
    const {onClearEventProps, onEventClear} = this.props;
    onClearEventProps();
    onEventClear();
  }
  onUpdate = () => {
    const {formValues, saveEventProperties} = this.props;
    saveEventProperties(formValues);
  }
  onSubmit = () => {
    const {onEventPropsSubmit} = this.props;
    onEventPropsSubmit();
  }
  render() {
    const {handleSubmit, selectedEvent} = this.props;
    return (
      <div className="top_div">
        <form className="form" onSubmit={handleSubmit(this.onSubmit)}>
          <div><EmailPropertiesForm properties={EVENT_PROPERTIES}/></div>
          <button className="grey btn-flat black-text left" onClick={this.onClear} type="button">
            Clear
          </button>
          <div className="right">
            <button className="grey btn-flat black-text button-margin" onClick={this.onUpdate} type="button">
              {selectedEvent ? 'Update' : 'Save'}
            </button>
            <button className="teal btn-flat white-text" type="submit">
              Continue
              <i className="material-icons right">arrow_forward</i>
            </button>
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    formValues: state.form[SURVEY_FORM_NAME] ? state.form[SURVEY_FORM_NAME].values : undefined
  };
}

function validate(values) {
  const errors = {};

  // _.each([...EVENT_PROPERTIES, ...DRIVER_PROPERTIES], ({name}) => {
  //   if (!values[name]) {
  //     errors[name] = 'You must provide a value';
  //   }
  // });

  return errors;
};

export default connect(mapStateToProps, actions)(
  withRouter(
    reduxForm({
      validate,
      form: SURVEY_FORM_NAME,
      destroyOnUnmount: false
    })(CreateNew)
  )
);