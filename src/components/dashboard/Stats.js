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
import ProgressChart from './ProgressChart';

class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: '',
      user: '',
    };
  }
  async componentDidMount() {
    try {
      const stats = await this.props.getStats();
      console.log(stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
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
    const { stats } = this.props.stats;
    return (
      <div className="col-md-12 mt-3 mb-4">
       <div className="row">
       <div className="col-md-6 mb-3">
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Post</th>
                  <th>Número</th>
                  <th>Regeneració</th>
                </tr>
              </thead>
              <tbody>
                {stats &&
                  stats.map((item, index) => (
                    <tr key={index}>
                      <td>{item.tipus}</td>
                      <td>{item.count}</td>
                      <td>{item.count}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="col-md-6 mb-3 mx-auto text-center">
            <p>Regeneració personal</p>
            <div className="mx-auto text-center" style={{ width: '35%' }}>
            {ProgressChart ? <ProgressChart progress={0.73} /> : null}
            </div>
          </div>
        </div>
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
export default connect(mapStateToProps, { getStats })(Stats);
