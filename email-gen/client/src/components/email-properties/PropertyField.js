import React from 'react';
import './PropertyField.css';
import _ from 'lodash';

class PropertyField extends React.Component {
  renderDropdownOptions(choices) {
    return _.map(choices, ({label, key}) => {
      return <option key={key} value={key}>{label}</option>;
    });
  }
  render() {
    const {input, label, type, meta: {touched, error}} = this.props;
    const inputField = type && type === 'dropdown' ? (
      <select {...input} className="browser-default input_field dropdown">
        <option value="" disabled defaultValue>Choose an option</option>
        {this.renderDropdownOptions(this.props.choices)}
      </select>
    ) : <input {...input} type="text" className="input_field"/>;
    return (
      <div>
      <label>{label}</label>
      {inputField}
      <div className="red-text validation_text">
        {touched && error}
      </div>
      </div>
    )
  }
};

export default PropertyField;