import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';

class ProfileItems extends Component {
  render() {
    const { profile } = this.props;
    return (
      <div className="col">
        <div className="card card-body bg-light mb-3">
          <div className="col-md-12">
            {profile && isEmpty(profile.imgUrl) ? (
              <img
                className="rounded-circle"
                src="https://icon-library.net/images/default-profile-icon/default-profile-icon-24.jpg"
                alt=""
              />
            ) : (
              <img className="rounded-circle" src={profile.imgUrl} alt="" />
            )}
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{profile.user && profile.user.name}</h3>            
            <p>{isEmpty(profile.location) ? null : <span>{profile.location}</span>}</p>
            <Link to={`/profile/${profile._id}`} className="btn btn-info">
              Veure perfil
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

ProfileItems.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItems;
