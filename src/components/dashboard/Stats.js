import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { getStats } from '../../actions/statsActions';
import Plug from '../../../public/uploads/plug.svg';
import Reciclar from '../../../public/uploads/recycle.svg';
import Aigua from '../../../public/uploads/droplet.svg';
import Transport from '../../../public/uploads/car-front-fill.svg';
import Map from '../../../public/uploads/geo-alt.svg';
import profileReducer from '../../reducers/profileReducer';
import Table from '../layout/Table';

class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: '',
      user: '',
      stats: '',
    };
  }
  componentDidMount() {
    const stats = this.props.getStats();
    this.setState({ stats: stats });
    console.log(stats);
  }

  iconSelection(tipus) {
    const iconMap = {
      Electricitat: <img src={Plug} alt="Electricitat Icon" style={{ width: '30px' }} />,
      Transport: <img src={Transport} alt="Transport Icon" style={{ width: '30px' }} />,
      Reciclar: <img src={Reciclar} alt="Reciclar Icon" style={{ width: '30px' }} />,
      Aigua: <img src={Aigua} alt="Aigua Icon" style={{ width: '30px' }} />,
    };
    return iconMap[tipus] || iconMap['Default'];
  }

  render() {
    return (
      <div className="col-md-12 mt-3 mb-4 content">
        <p> {this.state.stats && this.state.stats}</p>
      </div>
    );
  }
}

Stats.propTypes = {
  stats: PropTypes.object.isRequired,
  getStats: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  stats: state.stats,
});
export default connect(mapStateToProps, {getStats})(Stats);
