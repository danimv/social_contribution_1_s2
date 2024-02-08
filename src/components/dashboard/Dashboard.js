import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import ProfileActions from './ProfileActions';
import Experience from './Experience';
import Education from './Education';

import Spinner from '../common/Spinner';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;
    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // check if logged in user has profile
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Hola{'    '}
              {user.name}
            </p>

            <ProfileActions />

            {/* <Experience experience={profile.experience} />
            <Education education={profile.education} /> */}

            <div style={{ marginBottom: '60px' }} />
            <button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger">
              Eliminar compte
            </button>
          </div>
        );
      } else {
        // user has no profile created
        dashboardContent = (
          <div>
            <p className="lead text-muted">Hola {user.name}</p>
            <p>Afegeix més informació al teu perfil</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Afegir
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{dashboardContent}</div>
            <div style={{ width: 360, height: 640, position: 'relative', background: 'white' }}>
              <div
                style={{
                  width: 143,
                  height: 144,
                  left: 109,
                  top: 192,
                  position: 'absolute',
                  background: '#D9D9D9',
                  borderRadius: 9999,
                }}
              />
              <div
                style={{
                  width: 76,
                  height: 76,
                  left: 33,
                  top: 171,
                  position: 'absolute',
                  background: '#D9D9D9',
                  borderRadius: 9999,
                }}
              />
              <div
                style={{
                  width: 76,
                  height: 76,
                  left: 33,
                  top: 291,
                  position: 'absolute',
                  background: '#D9D9D9',
                  borderRadius: 9999,
                }}
              />
              <div
                style={{
                  width: 76,
                  height: 76,
                  left: 142,
                  top: 349,
                  position: 'absolute',
                  background: '#D9D9D9',
                  borderRadius: 9999,
                }}
              />
              <div
                style={{
                  width: 76,
                  height: 76,
                  left: 251,
                  top: 291,
                  position: 'absolute',
                  background: '#D9D9D9',
                  borderRadius: 9999,
                }}
              />
              <div
                style={{
                  width: 76,
                  height: 76,
                  left: 251,
                  top: 171,
                  position: 'absolute',
                  background: '#D9D9D9',
                  borderRadius: 9999,
                }}
              />
              <div
                style={{
                  width: 76,
                  height: 76,
                  left: 142,
                  top: 103,
                  position: 'absolute',
                  background: '#D9D9D9',
                  borderRadius: 9999,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
