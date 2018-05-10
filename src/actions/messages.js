export const CREATE_MESSAGE_INITIAL = 'CREATE_MESSAGE_INITIAL';
export const CREATE_MESSAGE_REQUEST = 'CREATE_MESSAGE_REQUEST';
export const CREATE_MESSAGE_SUCCESS = 'CREATE_MESSAGE_SUCCESS';
export const CREATE_MESSAGE_FAILURE = 'CREATE_MESSAGE_FAILURE';
export const FETCH_MESSAGES_REQUEST = 'FETCH_MESSAGES_REQUEST';
export const FETCH_MESSAGES_SUCCESS = 'FETCH_MESSAGES_SUCCESS';
export const FETCH_MESSAGES_FAILURE = 'FETCH_MESSAGES_FAILURE';

function createMessageInitial() {
  return {
    type: CREATE_MESSAGE_INITIAL,
    isFetching: false,
  };
}

function requestCreateMessage(message) {
  return {
    type: CREATE_MESSAGE_REQUEST,
    isFetching: true,
    message,
  };
}

function createMessageSuccess(message) {
  return {
    type: CREATE_MESSAGE_SUCCESS,
    isFetching: false,
    message,
  };
}

function createMessageError(message) {
  return {
    type: CREATE_MESSAGE_FAILURE,
    isFetching: false,
    message,
  };
}

function requestFetchMessages() {
  return {
    type: FETCH_MESSAGES_REQUEST,
    isFetching: true,
  };
}

function fetchMessagesSuccess(messages) {
  return {
    type: FETCH_MESSAGES_SUCCESS,
    isFetching: false,
    messages,
  };
}

function fetchMessagesError(message) {
  return {
    type: FETCH_MESSAGES_FAILURE,
    isFetching: false,
    message,
  };
}

export function createMessage(messageData) {
  const config = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `mutation {
                addMessage(title: "${messageData.title}", content: "${
        messageData.content
        }"){
                  id,
                  title,
                  content
                }
              }`,
    }),
    credentials: 'include',
  };

  return dispatch => {
    // We dispatch requestCreatePost to kickoff the call to the API
    dispatch(requestCreateMessage(messageData));

    return fetch('/graphql', config)
      .then(response => response.json().then(message => ({ message, response })))
      .then(({ message, response }) => {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(createMessageError(message.message));
          return Promise.reject(message);
        }
        // Dispatch the success action
        dispatch(createMessageSuccess(message));
        setTimeout(() => {
          dispatch(createMessageInitial());
        }, 5000);
        return Promise.resolve(message);
      })
      .catch(err => console.error('Error: ', err));
  };
}

export function fetchMessages() {
  const config = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: '{messages{id,title,content,updatedAt}}',
    }),
    credentials: 'include',
  };

  return dispatch => {
    dispatch(requestFetchMessages());

    return fetch('/graphql', config)
      .then(response =>
        response.json().then(responseJson => ({
          messages: responseJson.data.messages,
          responseJson,
        })),
      )
      .then(({ messages, responseJson }) => {
        if (!responseJson.data.messages) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(fetchMessagesError(messages.message));
          return Promise.reject(messages);
        }
        // Dispatch the success action
        dispatch(fetchMessagesSuccess(messages));
        return Promise.resolve(messages);
      })
      .catch(err => console.error('Error: ', err));
  };
}
