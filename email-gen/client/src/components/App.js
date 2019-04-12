import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Header from './Header';
import Landing from './Landing';
import { connect } from 'react-redux';
import * as actions from '../actions';
class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        this.props.auth
          ? <Component {...props} />
          : <Redirect to='/' />
      )} />
    );
    return (
      <div>
        <BrowserRouter>
          <div className="container">
            <Header />
            <Route exact path="/" component={Landing} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
};


function mapStateToProps({ auth }) {
  return { auth };

}

export default connect(mapStateToProps, actions)(App);