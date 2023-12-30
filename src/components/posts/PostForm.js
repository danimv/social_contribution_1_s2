import React, { useState, useEffect, useCallback, Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { addPost } from '../../actions/postActions';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { api } from '../../actions/api';
import { bindActionCreators } from 'redux';
import { setInputValue } from '../../actions/postActions';

class PostForm extends Component {
  constructor(props) {
    super(props);
    const { auth, errors, addPost } = this.props;
    this.state = {
      tipus: '',
      quantitat: '',
      unitat: '',
      name: '',
      dadesRebudes: '',
      data: '',
      hora: '',
      description: '',
      image: '',
      submissionMessage: '',
      isContentVisible: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.getTypes();
  }

  getTypes() {
    api.get('/api/posts/contribtypes').then((res) => {
      this.setState({ dadesRebudes: res.data }, () => {
        console.log('data', this.state.dadesRebudes);
      });
    });
  }

  toggleContentVisibility = () => {
    this.setState((prevState) => ({
      isContentVisible: !prevState.isContentVisible,
    }));
  };

  resetForm() {
    // Loop through state keys and set them to empty strings
    Object.keys(this.state).forEach((key) => {
      this.setState({ [key]: '' });
    });
    this.getTypes();
  }

  onChange(t, e) {
    this.setState({ [t]: e });
    if (t == 'tipus') {
      const selectedTypeObject = this.state.dadesRebudes.find((type) => type.name === e);
      const selectedTypeUnit = selectedTypeObject ? selectedTypeObject.unit : '';
      this.setState({ unitat: selectedTypeUnit });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('tipus', this.state.tipus);
    formData.append('quantitat', this.state.quantitat);
    formData.append('unitat', this.state.unitat);
    formData.append('name', this.state.name);
    formData.append('data', this.state.data);
    formData.append('hora', this.state.hora);
    formData.append('description', this.state.description);
    formData.append('lloc', this.state.lloc);
    formData.append('image', this.state.image);
    const { addPost } = this.props;

    addPost(formData);
    console.log('Form Data:', formData);
    this.resetForm();
    this.setState({ submissionMessage: 'Enviat correctament!' });
    setTimeout(() => {
      this.setState({ submissionMessage: '' });
    }, 3000); //
  };

  render() {
    return (
      <div className="container mt-4 no-gutters">
        <div className="row no-gutters">
        {!this.state.isContentVisible && (
          <p><button style={{background: 'var(--color_3)', color: 'white', border: 0, fontSize:'120%'}} onClick={this.toggleContentVisibility}>
            {this.state.isContentVisible ? '<' : 'Publica +'}
          </button></p>)}
          {this.state.submissionMessage && (
            <div className="alert alert-success" role="alert">
              {this.state.submissionMessage}
            </div>
          )}
          
          {this.state.isContentVisible && (
            <div className='formContrib no-gutters'>
              <p>Publica la teva</p>
              <form enctype="multipart/form-data" className="p-2 bg-light border rounded" onSubmit={this.onSubmit}>
                <div className="row g-2">
                  <div className="col-md">
                    <div className="form-floating mb-3">
                      <select
                        className="form-control custom-select-lg"
                        id="tipus"
                        name="tipus"
                        value={this.state.tipus}
                        onChange={(e) => this.onChange('tipus', e.target.value)}>
                        <option value=""></option>
                        {this.state.dadesRebudes &&
                          this.state.dadesRebudes.map((option) => (
                            <option key={option.name} value={option.name}>
                              {option.name}
                            </option>
                          ))}
                      </select>
                      <label htmlFor="tipus" className="form-label">
                        Tipus d'acció
                      </label>
                    </div>
                  </div>
                  <div className="col-md">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="quantitat"
                        name="quantitat"
                        value={this.state.quantitat}
                        onChange={(e) => this.onChange('quantitat', e.target.value)}
                      />
                      <input
                        type="hidden"
                        className="form-control"
                        id="unitat"
                        name="unitat"
                        value={this.state.unitat}
                      />
                      <label className="form-label" htmlFor="quantitat" id="unitats" name="unitats">
                        Indica els <span id="unitatLabel">{this.state.unitat}</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row g-2">
                  <div className="col-md">
                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        type="text"
                        name="name"
                        id="name"
                        onChange={(e) => this.onChange('name', e.target.value)}
                      />
                      <label htmlFor="name" className="form-label">
                        Posa-hi un nom
                      </label>
                    </div>
                  </div>
                  <div className="col-md">
                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        type="text"
                        name="description"
                        id="description"
                        onChange={(e) => this.onChange('description', e.target.value)}
                      />
                      <label htmlFor="description" className="form-label">
                        Descripció breu
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row g-2">
                  <div className="col-md">
                    <div className="form-floating mb-3">
                      <input
                        type="date"
                        className="form-control"
                        id="dateInput"
                        name="dateInput"
                        onChange={(e) => this.onChange('data', e.target.value)}
                      />
                      <label htmlFor="dateInput">Data</label>
                    </div>
                  </div>
                  <div className="col-md">
                    <div className="form-floating mb-3">
                      <input
                        type="time"
                        className="form-control"
                        id="timeInput"
                        name="timeInput"
                        onChange={(e) => this.onChange('hora', e.target.value)}
                      />
                      <label htmlFor="timeInput">Hora</label>
                    </div>
                  </div>
                </div>
                <div className="row g-2">
                  <div className="col-md">
                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        type="text"
                        name="lloc"
                        id="lloc"
                        onChange={(e) => this.onChange('lloc', e.target.value)}
                      />
                      <label htmlFor="lloc" className="form-label">
                        Lloc
                      </label>
                    </div>
                  </div>
                </div>
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    type="file"
                    name="image"
                    id="image"
                    accept="image/*"
                    onChange={(e) => this.onChange('image', e.target.files[0])}
                  />
                  <label htmlFor="image" className="form-label">
                    Imatge
                  </label>
                </div>
                <div className="form-floating mb-3">
                  <button type="submit" className="btn btn-success">
                    Envia
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    );
  }
}

// export default connect(mapStateToProps, { addPost })(PostForm);

PostForm.propTypes = {
  setInputValue: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  inputValues: PropTypes.string.isRequired,
  addPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  inputValues: state.post.inputValues,
});

const mapDispatchToProps = (dispatch) => ({
  setInputValue: (fieldName, value) => dispatch(setInputValue(fieldName, value)),
  addPost: (postData) => dispatch(addPost(postData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PostForm));
