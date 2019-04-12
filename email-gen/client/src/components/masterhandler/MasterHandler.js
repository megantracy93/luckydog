import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import EmailPropertiesForm from '../email-properties/EmailPropertiesForm';
import MasterHandlerPreview from './MasterHandlerPreview';
import * as actions from '../../actions';
import { SURVEY_FORM_NAME, MH_PROPERTIES } from '../email-properties/constants';

class MasterHandler extends React.Component {
  render() {
    const {onBack, handleSubmit, fetchMHProps, emailProps, formValues} = this.props;
    const preview = emailProps && emailProps.mh ? <MasterHandlerPreview {...emailProps.mh} /> : undefined;
    return (
      <div className="top_div row">
        <form className="form col s4" onSubmit={handleSubmit(() => fetchMHProps(formValues))}>
          <div><EmailPropertiesForm properties={MH_PROPERTIES} /></div>
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
    )
  }
}

function mapStateToProps(state) {
  return {
    formValues: state.form[SURVEY_FORM_NAME] ? state.form[SURVEY_FORM_NAME].values : undefined,
    emailProps: state.emailProps
  };
}

function validate(values) {
  const errors = {};

  // _.each([...EVENT_PROPERTIES, ...FOSTER_PROPERTIES], ({name}) => {
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
    })(MasterHandler)
  )
);