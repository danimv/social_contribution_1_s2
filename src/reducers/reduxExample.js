// Action Types
export const SET_VALUE = 'SET_VALUE';

// Action Creators
export const setValue = (value) => ({
  type: SET_VALUE,
  payload: value,
});

// Reducer (assuming you have a reducer to handle SET_VALUE)
const initialState = {
  storedValue: '', // Initial value can be an empty string or any default value
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_VALUE:
      return {
        ...state,
        storedValue: action.payload,
      };
    // Add more cases for other actions if needed
    default:
      return state;
  }
};

export default reducer;
