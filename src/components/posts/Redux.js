// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { setStoredValue } from '../../actions/postActions';

const Redux = () => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();
  const storedValue = useSelector((state) => state.postE.storedValue || {});
  const storedValueString = JSON.stringify(storedValue);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const isObjectEmpty = Object.keys(storedValue).length === 0;

  console.log(
    'Redux State:',
    useSelector((state) => state)
  );
  const handleSaveToStore = () => {
    dispatch(setStoredValue(inputValue));
  };

  useEffect(() => {
    // Dispatch an action to set the stored value (replace 'yourValue' with the actual value)
    dispatch({ type: 'SET_STORED_VALUE', payload: { v1: 'your data' } });
  }, [dispatch]);

  return (
    <div>
      <h1>Simple Component</h1>
      <label>
        Input Value:
        <input type="text" value={inputValue} onChange={handleInputChange} />
      </label>
      <button onClick={handleSaveToStore}>Save to Store</button>
      <div>
        <h1>Stored Value:</h1>
        <h1>{storedValue.v1}</h1>
        {Object.keys(storedValue).length === 0 ? <p>Stored value is empty</p> : <p>{JSON.stringify(storedValue)}</p>}
        {/* Other JSX for your component */}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    storedValue: state.postE.storedValue,
  };
};

export default connect(mapStateToProps)(Redux);
