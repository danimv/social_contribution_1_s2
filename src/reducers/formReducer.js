import { SET_INPUT_VALUE } from '../actions/types';

const initialState = {
  inputValues: {
    name: '',
    text: '',
    user: '',
    quantitat: '',
    tipus: '',
    unitat: '',
    image: null, // File object or URL, depending on your implementation
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INPUT_VALUE:
      return {
        ...state,
        inputValues: {
          ...state.inputValues,
          [action.payload.fieldName]: action.payload.value,
        },
      };
    default:
      return state;
  }
};

export default reducer;
