import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import _ from 'lodash';
import './AllEvents.css';

class AllEvents extends React.Component {
  componentDidMount() {
    this.props.getAllEvents();
  }
  getOnClickHandler = (event) => (e) => {
    const eventPropsToSave = _.pick(
      _.assign(event, { ecName: event.lastEC, eventId: event._id }),
      ['locationName', 'locationLink', 'locationAddress', 'dayOfWeek', 'ecName', 'eventId']
    );
    this.props.setEventProps(eventPropsToSave);
    this.props.onEventSelect(event._id);
  }
  getIcon = (isSelected) => {
    return <i className="material-icons right icon">{isSelected ? "check_box" : "check_box_outline_blank"}</i>
  }
  renderEvents(allEvents) {
    return _.map(allEvents, event => {
      const isSelected = event._id === this.props.selectedEvent;
      return <div key={event._id} className={`row grid-container ${isSelected && "selected"}`} onClick={this.getOnClickHandler(event)}>
        <div className="col s1 icon">{this.getIcon(isSelected)}</div>
        <div className="col s4 grid-text">{event.locationName}</div>
        <div className="col s5 grid-text">{event.locationAddress}</div>
        <div className="col s1 grid-text">{event.dayOfWeek}</div>
        <div className="col s1 grid-text">{event.lastEC}</div>
      </div>
    })
  }
  render() {
    const { allEvents } = this.props;
    return allEvents ? <div className="events-container">{this.renderEvents(allEvents)}</div> : null;
  }
}

function mapStateToProps({ allEvents }) {
  return { allEvents };
}

export default connect(mapStateToProps, actions)(AllEvents);