import { ajax } from "rxjs/observable/dom/ajax";
import { of } from "rxjs";
import { map, mergeMap, catchError, withLatestFrom } from "rxjs/operators";
import { ofType } from "redux-observable";

const GET_FEEDS = "feeds/GET_FEEDS";
const GET_FEEDS_SUCCESS = "feeds/GET_FEEDS_SUCCESS";
const GET_FEEDS_FAILURE = "feeds/GET_FEEDS_FAILURE";

const CHANGE_PROFILE_TAB = "feeds/CHANGE_PROFILE_TAB";

export const getFeeds = () => ({
  type: GET_FEEDS
});

export const getFeedsSuccess = ({feeds}) => ({
  type: GET_FEEDS_SUCCESS,
  payload: {
    feeds
  }
});

export const getFeedsFailure = error => ({
  type: GET_FEEDS_FAILURE,
  payload: {
    error
  }
});

export const changeProfileTab =({menuNum}) => ({
  type: CHANGE_PROFILE_TAB,
  payload: {
    menuNum
  }
});

const getFeedsEpic = (action$, state$) => {
  return action$.pipe(
    ofType(GET_FEEDS),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      return ajax
        .get(`/api/feeds/`, {
          "Content-Type": "application/json",
          Authorization: `token ${userInfo.token}`
        })
        .pipe(
          map(response => {
            const feeds = response.response;
            return getFeedsSuccess({ feeds });
          }),
          catchError(error =>
            of({
              type: GET_FEEDS_FAILURE,
              payload: error,
              error: true
            })
          )
        );
    })
  );
};

const initialState = {
  feeds: [],
  menuNum: "0",
  error: {
    triggered: false,
    message: ""
  }
};

export const feeds = (state = initialState, action) => {
  switch (action.type) {
    case GET_FEEDS_SUCCESS:
      return {
        ...state,
        feeds: action.payload.feeds.results
      };
    case GET_FEEDS_FAILURE:
      return {
        ...state,
        error: {
          triggered: true,
          message: "Error! Please Try Again!"
        }
      };
    case CHANGE_PROFILE_TAB:
      return {
        ...state,
        menuNum: action.payload.menuNum
      };
    default:
      return state;
  }
};

export const feedsEpics = {
  getFeedsEpic,
};