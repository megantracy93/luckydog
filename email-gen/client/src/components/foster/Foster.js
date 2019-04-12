import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import EmailPropertiesForm from '../email-properties/EmailPropertiesForm';
import FosterEmailPreview from './FosterEmailPreview';
import * as actions from '../../actions';
import { SURVEY_FORM_NAME, FOSTER_PROPERTIES } from '../email-properties/constants';

class Foster extends React.Component {
  render() {
    const {onBack, handleSubmit, formValues} = this.props;
    const preview = formValues ? <FosterEmailPreview {...formValues} /> : undefined;
    return (
      <div className="top_div row">
        <form className="form col s4" onSubmit={handleSubmit}>
          <div><EmailPropertiesForm properties={FOSTER_PROPERTIES} /></div>
          <button className="grey btn-flat black-text left" onClick={onBack}>
            Back
            <i className="material-icons right">arrow_back</i>
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
    formValues: state.form[SURVEY_FORM_NAME] ? state.form[SURVEY_FORM_NAME].values : undefined
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
    })(Foster)
  )
);