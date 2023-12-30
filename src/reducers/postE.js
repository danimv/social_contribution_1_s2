import { SET_STORED_VALUE } from '../actions/postActions';

const initialState = {
  storedValue: '', // Initial value
};

const postE = (state = initialState, action) => {
  console.log(action.payload);
  switch (action.type) {
    case SET_STORED_VALUE:
      return {
        ...state,
        storedValue: action.payload,
      };
    default:
      return state;
  }
};

export default postE;
