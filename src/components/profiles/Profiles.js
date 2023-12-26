import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import ProfileItems from './ProfileItems';
import { getProfiles } from '../../actions/profileActions';

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }
  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;

    if (profiles === null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map((profile) => <ProfileItems key={profile.id} profile={profile} />);
      } else {
        profileItems = <h4>No hi ha usuaris</h4>;
      }
    }
    return (
      <div className="profiles">
        <div className="container">
          <div className="mb-4">
            <h1 className="text-center">Usuaris</h1>
          </div>
          <div className="row row-cols-md-4 g-5">{profileItems}</div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
