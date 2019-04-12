import React from 'react';
import { connect } from 'react-redux';
import './Landing.css';
import EventController from './event-properties/EventController';
import PAController from './pa-properties/PAController';

const TABS = [
  { label: 'Events', component: EventController },
  { label: 'PA', component: PAController }
];

class Landing extends React.Component {
  state = {
    tabIndex: 0
  }
  navigateToTab = (index) => {
    return () => this.setState({
      tabIndex: index
    });
  }
  renderEmailGeneratorLinks = () => {
    const tabs = TABS.map((tab, index) => {
      const id = this.state.tabIndex === index ? `tab_selected` : `tab_${index}`;
      return (<li id={id} className="tab"><a onClick={this.navigateToTab(index)}>{tab.label}</a></li>)
    })
    return (
      <div className="row tab_row">
        <div className="col s12">
          <ul className="tabs">
            {tabs}
          </ul>
        </div>
      </div>
    );
  }
  renderTabSection = () => {
    const ControllerComponent = TABS[this.state.tabIndex].component;
    return (
      <div className="row">
        <ControllerComponent />
      </div>
    );
  }
  renderLoginPage = () => {
    return (
      <h5 className="center">Please login to access email generators</h5>
    );
  }
  render() {
    const contents = this.props.auth ? [
      this.renderEmailGeneratorLinks(),
      this.renderTabSection()
    ] : this.renderLoginPage();
    return (
      <div className="landing_content">
        {contents}
      </div>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth };

}

export default connect(mapStateToProps)(Landing);