import React, { Component } from "react";
import Profile from "./Profile";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;

    const firstName = profile.user.name.trim().split(" ")[0];

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">{firstName}</h3>
            <p className="lead">
              {isEmpty(profile.bio) ? (
                <span>
                  {firstName} does not have a bio :{"("}
                </span>
              ) : (
                <span>{profile.bio}</span>
              )}
            </p>
            
          </div>
        </div>
      </div>
    );
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
