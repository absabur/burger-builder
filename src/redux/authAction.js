import axios from "axios";
import * as constance from "./constance";

export const authentication = (email, password, mode) => (dispatch) => {
    dispatch(authLoading(true));
  const authData = {
    email: email,
    password: password,
    returnSecureToken: true,
  };
  let url = null;
  if (mode === "sign-up") {
    url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
  } else {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
  }
  const API_KEY = "AIzaSyDZLmvdDAGTOqTuQdy8gEKLjKvMmkBQntQ";
  axios
    .post(url + API_KEY, authData)
    .then((response) => {
        dispatch(authLoading(false));
        const expires = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        localStorage.setItem('token-burger', response.data.idToken)
        localStorage.setItem('userId-burger', response.data.localId)
        localStorage.setItem('expires-burger', JSON.stringify(expires))
        dispatch(isauthenticated(response.data.idToken, response.data.localId))
    })
    .catch((error) => {
        dispatch(authLoading(false));
        dispatch(authError(error.response.data.error.message))
    });
};

export const isauthenticated = (token, userId) => {
  return {
    type: constance.AUTHSUCCESS,
    payload: {
      token: token,
      userId: userId,
    },
  };
};


export const authCheck = () => dispatch => {
    const token = localStorage.getItem('token-burger')
    if (!token) {
        dispatch(logout())
    }else {
        const expires = JSON.parse(localStorage.getItem('expires-burger'))
        if (new Date(expires) <= new Date()) {
            dispatch(logout())
        }else {
            const userId = localStorage.getItem('userId-burger')
            dispatch(isauthenticated(token, userId))
        }
    }
}

export const logout = () => {
    localStorage.removeItem('token-burger')
    localStorage.removeItem('userId-burger')
    localStorage.removeItem('expires-burger')
    return {
        type: constance.AUTHLOGOUT
    }
}

export const authLoading = (isLoading) => {
    return {
        type: constance.AUTHLOADING,
        payload: isLoading,
    }
}

export const authError = (msg) => {
    return {
        type: constance.AUTHFAIELD,
        payload: msg,
    }
}
