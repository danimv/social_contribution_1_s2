import { GET_STATS } from '../actions/types';

const initialState = {
  stats: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_STATS:
      console.log("saving stats....",action.payload );
      return {
        ...state,
        stats: action.payload,
      };
    default:
      return state;
  }
}
