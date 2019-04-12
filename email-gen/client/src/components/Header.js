import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {

  renderContent() {
    switch(this.props.auth) {
      case null:
        return 'Pending';
      case false:
        return <li><a href="/auth/google">Login with Google</a></li>;
      default:
        return <li key="logout"><a href="/api/logout">Logout</a></li>;
    }
  }
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to={'/'} className="left brand-logo">Email Gen</Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }

}

function mapStateToProps({ auth }) {
  return { auth };

}

export default connect(mapStateToProps)(Header);