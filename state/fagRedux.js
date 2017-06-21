export const types = {
  LOGIN: 'login',
  CREATE_ACCOUNT: 'create_account',
};

export const actionCreator = {
  login: (email, password) => {
    return { type: types.LOGIN,
             payload: {email, password}
    }
  },
  create_account: (email, password) => {
    return { type: types.CREATE_ACCOUNT,
             payload: {email, password}
    }
  },
}

const initialState = {
  user: null,
  //other state attributes
}

export const reducer = (state = initialState, action) => {
  return state;
}
