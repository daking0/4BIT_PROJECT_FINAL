import { getActionTypes } from 'redux-axios-middleware';
import { SigninActions } from '../Actions/SigninActions';

const onError = ({ action, next, error }, options) => {
  let errorObject;
  if (!error.response) {
    errorObject = {
      data: error.message,
      status: 0
    };
    if (process.env.NODE_ENV !== 'production') {
      console.log('HTTP Failure in Axios', error);
    }
  } else {
    errorObject = error;
  }
  const nextAction = {
    type: getActionTypes(action, options)[2],
    error: errorObject,
    meta: {
      previousAction: action
    }
  };

  next(nextAction);
  return nextAction;
};

const onErrorHandler = ({ action, next, error, getState, dispatch }, options) => {
  console.log('onErrorHandler', error);
  if (error.response === undefined || error.response.status === 401) {
    const { auth } = getState();
    const { retryCount, token } = auth;

    if (retryCount === 3 || token === undefined || token === null) {
      return dispatch(SigninActions.logout());
    } else {
      return dispatch(SigninActions.refreshToken(token.refresh_token))
        .then(response => dispatch(action));
    }
  }
  return onError({ action, next, error }, options);
}

export default onErrorHandler;
