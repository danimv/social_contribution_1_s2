import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { getProfileByHandle } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import ProfileHeader from './ProfileHeader';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';
import ProfileAbout from './ProfileAbout';

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getProfileByHandle(this.props.match.params.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { profile, loading } = nextProps.profile;

    if (profile === null && loading) {
      this.props.history.push('/not-found');
    }
  }
  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Endarrere
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
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
          <ProfileHeader profile={profile} />
          {/* <ProfileAbout profile={profile} /> */}
          {/* <ProfileCreds
            experience={profile.experience}
            education={profile.education}
          /> */}
          {profile.githubusername ? <ProfileGithub username={profile.githubusername} /> : null}
        </div>
      );
    }
    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileByHandle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, { getProfileByHandle })(Profile);
