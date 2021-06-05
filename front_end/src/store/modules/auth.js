import { ajax } from "rxjs/observable/dom/ajax";
import { of } from "rxjs";
import { map, mergeMap, catchError, withLatestFrom } from "rxjs/operators";
import { ofType } from "redux-observable";

const INITIALIZE_INPUT = "auth/INITIALIZE_INPUT";
const INITIALIZE_ERROR = "auth/INITIALIZE_ERROR";

const CHANGE_INPUT = "auth/CHANGE_INPUT";

const REGISTER = "auth/REGISTER";
const REGISTER_SUCCESS = "auth/REGISTER_SUCCESS";
const REGISTER_FAILURE = "auth/REGISTER_FAILURE";

const LOGIN = "auth/LOGIN";
const LOGIN_SUCCESS = "auth/LOGIN_SUCCESS";
const LOGIN_FAILURE = "auth/LOGIN_FAILURE";

const LOGOUT = "auth/LOGOUT";
const LOGOUT_SUCCESS = "auth/LOGOUT_SUCCESS";
const LOGOUT_FAILURE = "auth/LOGOUT_FAILURE";

const CHECK_USER = "auth/CHECK_USER";
const CHECK_USER_SUCCESS = "auth/CHECK_USER_SUCCESS";
const CHECK_USER_FAILURE = "auth/CHECK_USER_FAILURE";

const SET_USER_TEMP = "auth/SET_USER_TEMP";

const GET_MY_INFO = "auth/GET_MY_INFO";
const GET_MY_INFO_SUCCESS = "auth/GET_MY_INFO_SUCCESS";
const GET_MY_INFO_FAILURE = "auth/GET_MY_INFO_FAILURE";

const PROFILE_DROPDOWN = "auth/PROFILE_DROPDOWN"; 

export const initializeInput = () => ({
  type: INITIALIZE_INPUT
});

export const initializeError = () => ({
  type: INITIALIZE_ERROR
});

export const changeInput = ({ name, value }) => ({
  type: CHANGE_INPUT,
  payload: {
    name,
    value
  }
});

export const register = () => ({
  type: REGISTER
});

export const registerSuccess = ({ user, token }) => ({
  type: REGISTER_SUCCESS,
  payload: {
    user,
    token
  }
});

export const registerFailure = error => ({
  type: REGISTER_FAILURE,
  payload: {
    error
  }
});

export const login = () => ({
  type: LOGIN
});

export const loginSuccess = ({ user, token }) => ({
  type: LOGIN_SUCCESS,
  payload: {
    user,
    token
  }
});

export const loginFailure = error => ({
  type: LOGIN_FAILURE,
  payload: {
    error
  }
});

export const logout = () => ({
  type: LOGOUT
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS
});

export const logoutFailure = () => ({
  type: LOGOUT_FAILURE
});

export const checkUser = () => ({
  type: CHECK_USER
});

export const checkUserSuccess = () => ({
  type: CHECK_USER_SUCCESS
});

export const checkUserFailure = error => ({
  type: CHECK_USER_FAILURE,
  payload: {
    error
  }
});

export const setUserTemp = ({ id, username, token }) => ({
  type: SET_USER_TEMP,
  payload: {
    id,
    username,
    token
  }
});

export const getMyInfo = () => ({
  type: GET_MY_INFO
});

export const getMyInfoSuccess = ({myInfo}) => ({
  type: GET_MY_INFO_SUCCESS,
  payload: {
    myInfo
  }
});

export const getMyInfoFailure = error => ({
  type: GET_MY_INFO_FAILURE,
  payload: {
    error
  }
});

export const profileDropdown = ({dropDownFlag}) => ({
  type: PROFILE_DROPDOWN,
  payload: {
    dropDownFlag
  }
});

const registerEpic = (action$, state$) => {
  return action$.pipe(
    ofType(REGISTER),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const { nickname, email, username, password } = state.auth.form;
      return ajax.post(`/api/auth/register/`, { nickname, email, username, password }).pipe(
        map(response => {
          const { user, token } = response.response;
          return registerSuccess({ user, token });
        }),
        catchError(error =>
          of({
            type: REGISTER_FAILURE,
            payload: error,
            error: true
          })
        )
      );
    })
  );
};

const loginEpic = (action$, state$) => {
  return action$.pipe(
    ofType(LOGIN),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const { username, password } = state.auth.form;
      return ajax.post(`/api/auth/login/`, { username, password }).pipe(
        map(response => {
          const { user, token } = response.response;
          return loginSuccess({ user, token });
        }),
        catchError(error =>
          of({
            type: LOGIN_FAILURE,
            payload: error,
            error: true
          })
        )
      );
    })
  );
};

const logoutEpic = (action$, state$) => {
  return action$.pipe(
    ofType(LOGOUT),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      return ajax
        .post(
          `/api/auth/logout/`,
          // post의 body를 비워놓는다.
          {},
          {
            "Content-Type": "application/json",
            Authorization: `token ${userInfo.token}`
          }
        )
        .pipe(
          map(response => {
            // success시 localStorage에서 userInfo 삭제.
            localStorage.removeItem("userInfo");
            return logoutSuccess();
          }),
          catchError(error => {
            of({
              type: LOGIN_FAILURE,
              payload: error,
              error: true
            });
          })
        );
    })
  );
};

const checkUserEpic = (action$, state$) => {
  return action$.pipe(
    ofType(CHECK_USER),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      return ajax
        .get(`/api/auth/user/`, {
          "Content-Type": "application/json",
          Authorization: `token ${userInfo.token}`
        })
        .pipe(
          map(response => {
            return checkUserSuccess();
          }),
          catchError(error =>
            of({
              type: CHECK_USER_FAILURE,
              payload: error,
              error: true
            })
          )
        );
    })
  );
};

const getMyInfoEpic = (action$, state$) => {
  return action$.pipe(
    ofType(GET_MY_INFO),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const url = "/api/myInfo/" + userInfo.id;
      return ajax
        .get(url, {
          "Content-Type": "application/json",
          Authorization: `token ${userInfo.token}`
        })
        .pipe(
          map(response => {
            const myInfo = response.response;
            return getMyInfoSuccess({ myInfo });
          }),
          catchError(error =>
            of({
              type: GET_MY_INFO_FAILURE,
              payload: error,
              error: true
            })
          )
        );
    })
  );
};

const initialState = {
  form: {
    username: "",
    password: "",
    nickname: "",
    email: "",
  },
  error: {
    triggered: false,
    message: ""
  },
  logged: false,
  userInfo: {
    id: null,
    username: "",
    token: null
  },
  myInfo: {
    username: "",
    nickname: "",
    profileImage: "",
    introduce: "",
  },
  featureFlag: {
    dropDownFlag: "closed"
  }
};
  
export const auth = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_INPUT:
      return {
        ...state,
        form: {
          nickname: "",
          email: "",
          username: "",
          password: "",
        }
      };
    case INITIALIZE_ERROR:
      return {
        ...state,
        error: {
          triggered: false,
          message: ""
        }
      };
    case CHANGE_INPUT:
      let newForm = state.form;
      newForm[action.payload.name] = action.payload.value;
      return {
        ...state,
        form: newForm
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        logged: true,
        userInfo: {
          id: action.payload.user.id,
          username: action.payload.user.username,
          token: action.payload.token
        }
      };
    case REGISTER_FAILURE:
      switch (action.payload.status) {
        case 400:
          return {
            ...state,
            error: {
              triggered: true,
              message: "입력하신 정보가 잘못되었습니다."
            }
          };
        default:
          return {
            ...state
          };
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        logged: true,
        userInfo: {
          id: action.payload.user.id,
          username: action.payload.user.username,
          token: action.payload.token
        },
        error: {
          triggered: false,
          message: ""
        }
      };
    case LOGIN_FAILURE:
      switch (action.payload.status) {
        case 400:
          return {
            ...state,
            error: {
              triggered: true,
              message: "잘못된 정보가 입력되었습니다. 다시 확인해주세요."
            }
          };
        case 500:
          return {
            ...state,
            error: {
              triggered: true,
              message: "다시 입력바랍니다."
            }
          };
        default:
          return {
            ...state
          };
      }
      case LOGOUT_SUCCESS:
        return {
          ...state,
          logged: false,
          userInfo: {
            id: null,
            message: "",
            token: null
          }
        };
      case LOGOUT_FAILURE:
        return {
          ...state,
          error: {
            triggered: true,
            message: "로그아웃이 실패했습니다. 다시 로그아웃해주세요."
          }
        };
      case CHECK_USER_SUCCESS:
        return {
          ...state
        };
      case CHECK_USER_FAILURE:
        switch (action.payload.status) {
          case 401:
            return {
              ...state,
              error: {
                triggered: true,
                message: "세션이 만료되었습니다."
              }
            };
          default:
            return {
              ...state,
              logged: false,
              userInfo: {
                id: null,
                username: "",
                token: null
              }
            };
          }
      case SET_USER_TEMP:
        return {
          ...state,
          logged: true,
          userInfo: {
            id: action.payload.id,
            username: action.payload.username,
            token: action.payload.token
          }
        };
      case GET_MY_INFO_SUCCESS:
        return {
          ...state,
          logged: true,
          myInfo: {
            username: action.payload.myInfo.username,
            nickname: action.payload.myInfo.nickname,
            profileImage: action.payload.myInfo.profileImage,
            introduce: action.payload.myInfo.introduce,
          },
          error: {
            triggered: false,
            message: ""
          }
        };
      case GET_MY_INFO_FAILURE:
        return {
          ...state,
          error: {
            triggered: true,
            message: "Error! Please try Again get my info!"
          }
        };
      case PROFILE_DROPDOWN:
        return {
          ...state,
          featureFlag: {
            dropDownFlag: action.payload.dropDownFlag
          }
        };
    default:
      return state;
  }
};

export const authEpics = { 
  registerEpic, 
  loginEpic, 
  checkUserEpic,
  logoutEpic,
  getMyInfoEpic,
};