import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';
import { PROFILE_LOADING } from '../../actions/types';

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto"> 
        <li className="nav-item">
          <Link className="nav-link" to="/feed" style={{ color: 'white' }}>
            Escriu
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard" style={{ color: 'white' }}>
            Perfil
          </Link>
        </li>
        <li className="nav-item">
          <a href="" onClick={this.onLogoutClick.bind(this)} className="nav-link">
            <span
              style={{
                color: 'black',
                fontWeight: 'bold',
                backgroundColor: 'white',
                padding: 7,
              }}>
              Sortir
            </span>
          </a>
        </li>
      </ul>
    );
    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register" style={{ color: 'white' }}>
            Registra't
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login" style={{ color: 'white' }}>
            Entra
          </Link>
        </li>
      </ul>
    );
    return (
      <nav className="navbar navbar-expand-sm mb-4" style={{ backgroundColor: '#17A2B8' }}>
        <div className="container">
          <Link className="navbar-brand" to="/" style={{ color: 'white' }}>
            GR8
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mobile-nav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles" style={{ color: 'white' }}>
                  {' '}
                  Usuaris
                </Link>
                <Link className="nav-link" to="/redux" style={{ color: 'white' }}>
                  {' '}
                  Redux
                </Link>
              </li>
            </ul>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(Navbar);
