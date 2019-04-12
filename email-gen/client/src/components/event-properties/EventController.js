import React from 'react';
import AllEvents from './AllEvents';
import CreateNew from './CreateNew';
import EventEmailPreviewController from './EventEmailPreviewController';
class EventController extends React.Component {
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
    return this.state.showEventProps ? (<div className="top_div">
        <AllEvents onEventSelect={this.onEventSelect} selectedEvent={this.state.selectedEventId}/>
        <CreateNew onEventPropsSubmit={this.onContinue} onEventClear={this.onEventClear} selectedEvent={this.state.selectedEventId}/>
      </div>) : (<div>
        <EventEmailPreviewController onBack={this.onBack}/>
      </div>)
  }
}
export default EventController;