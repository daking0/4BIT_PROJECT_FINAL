const initialAuth = {
  token: null,
  userDetails: null
};

function authReducer(state = initialAuth, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default authReducer;
