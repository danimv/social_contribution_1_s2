// Import necessary dependencies
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const Redux = () => {
    const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();
  const storedValue = useSelector((state) => state.storedValue);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleSaveToStore = () => {
    dispatch(setStoredValue(inputValue));
  };

  return (
    <div>
      <h1>Simple Component</h1>
      <label>
        Input Value:
        <input type="text" value={inputValue} onChange={handleInputChange} />
      </label>
      <button onClick={handleSaveToStore}>Save to Store</button>
      <div>
        <h2>Stored Value in Redux Store:</h2>
        <p>{storedValue}</p>
      </div>
    </div>
  );
};


Redux.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  inputValues: state.inputValues,
});

export default connect(mapStateToProps)(Redux);

