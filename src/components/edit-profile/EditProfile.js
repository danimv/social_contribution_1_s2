import React, { Component } from "react";
import isEmpty from "../../validation/is-empty";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import PropTypes from "prop-types";

import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";

import { createProfile, getCurrentProfile } from "../../actions/profileActions";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,      
      imgUrl: '',     
      provincia: '',      
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: '',
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      // turn skills array back to CSV
      const skillsCSV = profile.skills.join(",");

      // check if profile field is empty, if true turn to string
      profile.company = !isEmpty(profile.company) ? profile.company : "";
      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.githubusername = !isEmpty(profile.githubusername)
        ? profile.githubusername
        : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : "";
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : "";
      profile.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : "";
      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : "";
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : "";

      // set component fields state
      this.setState({
        handle: profile.handle,
        imgUrl: profile.imgUrl,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.handle,
        skills: skillsCSV,
        githubusername: profile.githubusername,
        bio: profile.bio,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        instagram: profile.instagram,
        youtube: profile.youtube
      });
    }
  }
  onSubmit(e) {
    e.preventDefault();

    const profileData = {      
      imgUrl: this.state.imgUrl,      
      provincia: this.state.provincia,     
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram,
    };
    this.props.createProfile(profileData, this.props.history);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { errors, displaySocialInputs } = this.state;

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            errors={errors.twitter}
          />
          <InputGroup
            placeholder="LinkedIn Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            errors={errors.linkedin}
          />
          <InputGroup
            placeholder="Facebook Profile URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            errors={errors.facebook}
          />
          <InputGroup
            placeholder="YouTube Channel URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            errors={errors.youtube}
          />
          <InputGroup
            placeholder="Instagram Handle"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            errors={errors.instagram}
          />
        </div>
      );
    }

    const options = [
      {
        label: '* Selecciona la teva provincia',
        value: 0,
      },
      { label: 'Barcelona', value: 'Barcelona' },
      { label: 'Girona', value: 'Girona' },
      { label: 'Lleida', value: 'Lleida' },
      { label: 'Tarragona', value: 'Tarragona' },
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edita el perfil</h1>
              <small className="d-block pb-3">* = necessaris</small>
              <form onSubmit={this.onSubmit}>
                <div class="form-group mb-3">
                  <SelectListGroup
                    placeholder="Provincia"
                    name="provincia"
                    value={this.state.status}
                    onChange={this.onChange}
                    options={options}
                    error={errors.status}
                  />
                </div>
                <div class="form-group mb-3">
                  <TextFieldGroup
                    placeholder="Foto de perfil"
                    name="imgUrl"
                    value={this.state.imgUrl}
                    onChange={this.onChange}
                    error={errors.imgUrl}
                  />
                </div>
                <div class="form-group mb-3">
                  <TextAreaFieldGroup
                    placeholder="Descriu-te una mica"
                    name="bio"
                    value={this.state.bio}
                    onChange={this.onChange}
                    error={errors.bio}
                  />
                </div>
                <div class="form-group mb-3">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => {
                      this.setState((prevState) => ({
                        displaySocialInputs: !prevState.displaySocialInputs,
                      }));
                    }}>
                    Adjunta les teves xarxes socials
                  </button>
                  <span className="text-muted">Opcional</span>
                </div>
                {socialInputs}
                <div className="text-center">
                  <input type="submit" value="Envia" className="btn btn-info btn-lg btn-block mt-4" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(EditProfile));
