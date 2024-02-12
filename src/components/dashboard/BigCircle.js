import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import ProfileActions from './ProfileActions';
import Experience from './Experience';
import Education from './Education';

import Spinner from '../common/Spinner';

class CircularMenu extends Component {
  render() {
    const bigCircleWidth = 300;
    const bigCircleHeight = 300;
    const numCircles = 6; // Number of smaller circles

    // Calculate dimensions of smaller circles relative to the larger circle
    const smallCircleRatio = 0.5; // Adjust this ratio to change the size of the smaller circles
    const smallCircleWidth = bigCircleWidth * smallCircleRatio;
    const smallCircleHeight = bigCircleHeight * smallCircleRatio;

    const calculatePosition = (index) => {
      const angle = (360 / numCircles) * index; // Calculate angle for each smaller circle
      const radius = bigCircleWidth / 2; // Assuming the larger circle is a perfect circle

      // Calculate Cartesian coordinates (x, y) using trigonometry
      const x = radius + radius * Math.cos(angle * (Math.PI / 180));
      const y = radius + radius * Math.sin(angle * (Math.PI / 180));

      // Adjust positions based on circle dimensions
      const offsetX = smallCircleWidth / 2;
      const offsetY = smallCircleHeight / 2;

      // Return left and top positions for the smaller circle
      return {
        left: x - offsetX,
        top: y - offsetY,
      };
    };

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div style={{ height: bigCircleHeight, position: 'relative', background: 'white' }}>
              <button
                style={{
                  width: bigCircleWidth,
                  height: bigCircleHeight,
                  left: 0,
                  top: 0,
                  position: 'absolute',
                  background: '#D9D9D9',
                  borderRadius: '50%',
                  borderWidth: 0,
                }}
              />
              {Array.from({ length: numCircles }).map((_, index) => (
                <button
                  key={index}
                  style={{
                    width: smallCircleWidth,
                    height: smallCircleHeight,
                    position: 'absolute',
                    background: '#D9D9D9',
                    borderRadius: '50%',
                    borderWidth: 0,
                    ...calculatePosition(index),
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default CircularMenu;
