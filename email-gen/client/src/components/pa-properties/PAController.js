import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import EmailPropertiesForm from '../email-properties/EmailPropertiesForm';
import * as actions from '../../actions';
import { SURVEY_FORM_NAME, PA_PROPERTIES } from '../email-properties/constants';
import TransportEmailPreview from './TransportEmailPreview';

class PAController extends React.Component {
  state = {
    selectedEventId: null,
    showEventProps: true
  }
  onBack = () => {
    this.setState({
      showEventProps: true
    })
  }
  onContinue = () => {
    this.setState({
      showEventProps: false
    })
  }
  onEventSelect = (id) => {
    this.setState({
      selectedEventId: id
    });
  }
  onEventClear = () => {
    this.setState({
      selectedEventId: null
    });
  }
  render() {
    const {onBack, handleSubmit, formValues, transportAnimals, fetchTransportAnimals, history} = this.props;
    const preview = transportAnimals ? <TransportEmailPreview {...transportAnimals} /> : undefined;
    return (
      <div className="top_div row">
        <form className="form col s4" onSubmit={handleSubmit(() => fetchTransportAnimals(formValues, history))}>
          <div><EmailPropertiesForm properties={PA_PROPERTIES} /></div>
          <button className="grey btn-flat black-text left" onClick={onBack}>
            Back
            <i className="material-icons right">arrow_back</i>
          </button>
          <button className="teal btn-flat white-text right" type="submit">
            Generate
            <i className="material-icons right">flash_on</i>
          </button>
        </form>
        <div className="col s8">
          {preview}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    formValues: state.form[SURVEY_FORM_NAME] ? state.form[SURVEY_FORM_NAME].values : undefined,
    transportAnimals: state.transportAnimals
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
    })(PAController)
  )
);