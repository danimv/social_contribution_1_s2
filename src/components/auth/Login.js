import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData);
  }
  render() {
    const { errors } = this.state;

    return (
      <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Entra</h1>
            <p className="lead text-center">Accedeix a la teva compte</p>
            <form onSubmit={this.onSubmit}>
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
    
              <div className="text-center">
                  <button type="submit" className="btn btn-info btn-lg btn-block mt-4">
                    Entrar
                  </button>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
