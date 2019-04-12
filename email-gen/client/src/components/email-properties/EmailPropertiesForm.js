import React from 'react';
import { reduxForm, Field } from 'redux-form';
import _ from 'lodash';
import PropertyField from './PropertyField';
import { SURVEY_FORM_NAME } from './constants';
import './EmailPropertiesForm.css';

class EmailPropertiesForm extends React.Component {
  renderFields() {
    return _.map(this.props.properties, ({name, label, type, choices}) => {
      return <Field key={name} component={PropertyField} label={label} name={name} type={type} choices={choices}/>;
    });
  }
  render() {
    return (
      <div>
        <div className="fields_div">
          {this.renderFields()}
        </div>
      </div>
    );
  }
};

export default reduxForm({
  form: SURVEY_FORM_NAME,
  destroyOnUnmount: false
})(EmailPropertiesForm);