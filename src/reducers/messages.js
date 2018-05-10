import {
  CREATE_MESSAGE_INITIAL,
  CREATE_MESSAGE_REQUEST,
  CREATE_MESSAGE_SUCCESS,
  CREATE_MESSAGE_FAILURE,
  FETCH_MESSAGES_REQUEST,
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES_FAILURE,
} from '../actions/messages';

export default function messages(
  state = {
    isFetching: false,
  },
  action,
) {
  switch (action.type) {
    case CREATE_MESSAGE_INITIAL:
      return Object.assign({}, state, {
        isFetching: false,
        message: null,
      });
    case CREATE_MESSAGE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case CREATE_MESSAGE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        message: 'Message created successfully',
      });
    case CREATE_MESSAGE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        message:
          'Due to security reasons messages creation is closed in demo version. Please setup locally to test',
      });
    case FETCH_MESSAGES_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case FETCH_MESSAGES_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        messages: action.messages,
      });
    case FETCH_MESSAGES_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        message: 'Something wrong happened. Please come back later',
      });
    default:
      return state;
  }
}
