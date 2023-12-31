import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';
import { PROFILE_LOADING } from '../../actions/types';

class Test extends Component {
  render() {
    return (
      <div>
        <div>Pàgina test</div>
        <div>Retorna a la pàgina inicial</div>
      </div>
    );
  }
}

export default Test;
