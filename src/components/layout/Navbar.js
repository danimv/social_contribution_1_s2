import React, { Component } from 'react';
import { Link, NavLink} from 'react-router-dom';
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
          <NavLink className="nav-link nav_link" to="/feed" style={{ color: 'white' }}>
            Publicacions
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link nav_link" to="/dashboard" style={{ color: 'white' }}>
            Perfil
          </NavLink>
        </li>
        <li className="nav-item nav_link">
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
          <NavLink className="nav-link nav_link" to="/register" style={{ color: 'white' }}>
            Registra't
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link nav_link" to="/login" style={{ color: 'white' }}>
            Entra
          </NavLink>
        </li>
      </ul>
    );
    return (
      <nav className="navbar navbar-expand-sm mb-4" style={{ backgroundColor: '#17A2B8', fontSize: '120%' }}>
        <div className="container">
          <NavLink className="nav-link nav_link" to="/" style={{ color: 'white' }}>
            GR8
          </NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mobile-nav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink className="nav-link nav_link" to="/profiles" style={{ color: 'white' }} >
                  {' '}
                  Usuaris
                </NavLink>
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
