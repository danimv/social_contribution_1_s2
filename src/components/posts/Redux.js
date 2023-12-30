import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { setStoredValue } from '../../actions/postActions';

class Redux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
    this.props.setStoredValue('sample@email.com');
    console.log('Stored Value from Redux Store:', this.props.storedValue);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };

    // this.props.registerUser(newUser);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Registra't</h1>
              <p className="lead text-center">Crea una compte al GR8</p>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    className={`form-control form-control-lg ${errors.name ? 'is-invalid' : ''}`}
                    placeholder="Nom"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
                    placeholder="Correu electrònic"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className={`form-control form-control-lg ${errors.password ? 'is-invalid' : ''}`}
                    placeholder="Contrasenya"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className={`form-control form-control-lg ${errors.password2 ? 'is-invalid' : ''}`}
                    placeholder="Repeteix la contrasenya"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.onChange}
                  />
                  {errors.password2 && <div className="invalid-feedback">{errors.password2}</div>}
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-info btn-lg btn-block mt-4">
                    Registrar
                  </button>
                  <p>{this.state.password2}</p>
                  <p>Stored Value: {this.props.storedValue}</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Redux.propTypes = {
  setStoredValue: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  storedValue: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  storedValue: state.post.storedValue,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ setStoredValue }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Redux));
