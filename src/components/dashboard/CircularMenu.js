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
    const numCircles = 6; // Number of smaller circles
    const smallCircleRatio = 0.8; // Adjust this ratio to change the size of the smaller circles

    const bigCircleSize = 350; // Size of the big circle
    const centerX = bigCircleSize / 2; // X coordinate of the center of the big circle
    const centerY = bigCircleSize / 2; // Y coordinate of the center of the big circle
    const originalBigCircleRadius = bigCircleSize / 2;
    const bigCircleRadius = originalBigCircleRadius * 0.5; // Adjust the radius to make the big circle smaller

    const spaceBetween = -20;
    const texts = ['Casa', 'Persona', 'Mobilitat', 'Territori', 'Personal', 'Social'];
    const colors = ['#c8d5ff', '#8bb1b3', '#8c9eb3', '#107d81', '#8bb38d', '#8ffbff'];

    return (
      <div
        style={{
          height: '100vh',
          marginTop: '-11%',
          marginBottom: '-10%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}>
        <div
          style={{
            position: 'relative',
            width: '80vw', // Adjust the width of the big circle container
            height: '80vw', // Adjust the height of the big circle container
            maxWidth: bigCircleSize + 'px', // Set maximum width
            maxHeight: bigCircleSize + 'px', // Set maximum height
            background: '#17A2B8',
            borderRadius: '50%',
            borderWidth: '0px',
          }}>
          {Array.from({ length: numCircles }).map((_, index) => {
            const angle = (360 / numCircles) * index;
            const x = centerX + originalBigCircleRadius * Math.cos(angle * (Math.PI / 180));
            const y = centerY + originalBigCircleRadius * Math.sin(angle * (Math.PI / 180));
            const smallCircleX = x + (bigCircleRadius + spaceBetween) * Math.cos(angle * (Math.PI / 180));
            const smallCircleY = y + (bigCircleRadius + spaceBetween) * Math.sin(angle * (Math.PI / 180));

            return (
              <button
                key={index}
                style={{
                  position: 'absolute',
                  color: 'white',
                  fontSize: '130%',
                  background: colors[index],
                  borderRadius: '50%',
                  left: `${smallCircleX}px`,
                  top: `${smallCircleY}px`,
                  transform: 'translate(-50%, -50%)',
                  width: smallCircleRatio * bigCircleRadius * 2 + 'px',
                  height: smallCircleRatio * bigCircleRadius * 2 + 'px',
                  maxWidth: '200px',
                  maxHeight: '200px',
                  borderWidth: '0px',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translate(-50%, -50%) scale(1.2)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translate(-50%, -50%) scale(1)';
                }}>
                {texts[index]}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
}
export default CircularMenu;
