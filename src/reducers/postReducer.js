import { ADD_POST, GET_POSTS, GET_POST, DELETE_POST, POST_LOADING, SET_STORED_VALUE } from '../actions/types';

const initialState = {
  posts: [],
  post: [],
  loading: false,
  storedValue: '', 
};

export default function (state = initialState, action) {
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false,
      };
    case GET_POSTS:
      console.log('doing action', action.payload);
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case SET_STORED_VALUE:
      return {
        ...state,
        storedValue: action.payload,
      };
    default:
      return state;
  }
}
