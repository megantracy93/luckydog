import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Driver from '../driver/Driver';
import Foster from '../foster/Foster';
import GroupDriver from '../group-driver/GroupDriver';
import MasterHandler from '../masterhandler/MasterHandler';
import AllVolunteer from '../all-volunteer/AllVolunteer';
import * as actions from '../../actions';
import { SURVEY_FORM_NAME } from '../email-properties/constants';
import './EventEmailPreviewController.css';

const PAGES = [
  { label: 'Boarding Driver', component: Driver },
  { label: 'Foster Driver', component: Foster },
  { label: 'Group Driver', component: GroupDriver },
  { label: 'Master Handler', component: MasterHandler },
  { label: 'All Volunteer', component: AllVolunteer }
];

class EventEmailPreviewController extends React.Component {
  state = {
    pageIndex: 0
  }
  showPreviewFn = (index) => {
    return () =>  {
      this.setState({
        pageIndex: index
      });
    }
  }
  renderHeader = () => {
    const tabs = PAGES.map((page, index) => {
      const id = this.state.pageIndex === index ? `event_page_selected` : `event_page_${index}`;
      return (<li id={id} className="tab" ><a onClick={this.showPreviewFn(index)}>{page.label}</a></li>);
    });
    return (
      <div className="row tab_row">
        <div className="col s12">
          <ul className="tabs">
            {tabs}
            <li class="indicator"></li>
          </ul>
        </div>
      </div>
    )
  }
  renderPreview = () => {
    const PreviewComponent = PAGES[this.state.pageIndex].component;
    return <PreviewComponent onBack={this.props.onBack}/>;
  }
  render() {
    return <div>
      {this.renderHeader()}
      {this.renderPreview()}
    </div>;
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
    })(EventEmailPreviewController)
  )
);