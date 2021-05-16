import { ajax } from "rxjs/observable/dom/ajax";
import { of } from "rxjs";
import { map, mergeMap, catchError, withLatestFrom } from "rxjs/operators";
import { ofType } from "redux-observable";

const GET_FEEDS = "feeds/GET_FEEDS";
const GET_FEEDS_SUCCESS = "feeds/GET_FEEDS_SUCCESS";
const GET_FEEDS_FAILURE = "feeds/GET_FEEDS_FAILURE";
const OPEN_FEED_MODAL = "feeds/OPEN_FEED_MODAL";

const CHANGE_PROFILE_TAB = "feeds/CHANGE_PROFILE_TAB";

const GET_FEED_DETAIL = "feeds/GET_FEED_DETAIL"
const GET_FEED_DETAIL_SUCCESS = "feeds/GET_FEED_DETAIL_SUCCESS";
const GET_FEED_DETAIL_FAILURE = "feeds/GET_FEED_DETAIL_FAILURE"

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

export const openFeedModal = ({openFeedModalNum}) => ({
  type: OPEN_FEED_MODAL,
  payload: {
    openFeedModalNum
  }
});

export const getFeedDetail = ({feedNum}) => ({
  type: GET_FEED_DETAIL,
  payload: {
    feedNum
  }
});

export const getFeedDetailSuccess = ({feedDetail}) => ({
  type: GET_FEED_DETAIL_SUCCESS,
  payload: {
    feedDetail
  }
});

export const getFeedDetailFailure = error => ({
  type: GET_FEED_DETAIL_FAILURE,
  payload: {
    error
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

const getFeedDetailEpic = (action$, state$) => {
  return action$.pipe(
    ofType(GET_FEED_DETAIL),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      return ajax
        .get(`/api/profile/feeds/${action.payload.feedNum}/`,
        {
          "Content-Type": "application/json",
          Authorization: `token ${userInfo.token}`
        })
        .pipe(
          map(response => {
            const feedDetail = response.response;
            return getFeedDetailSuccess({ feedDetail });
          }),
          catchError(error =>
            of({
              type: GET_FEED_DETAIL_FAILURE,
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
  openFeedModalNum : "0",
  error: {
    triggered: false,
    message: ""
  },
  feedDetail: [],
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
    case OPEN_FEED_MODAL:
      return {
        ...state,
        openFeedModalNum: action.payload.openFeedModalNum
      };
    case GET_FEED_DETAIL_SUCCESS:
      return {
        ...state,
        feedDetail: {
          feed: action.payload.feedDetail
        }
      };
    case GET_FEED_DETAIL_FAILURE:
      return {
        ...state,
        error: {
          triggered: true,
          message: "Error to get a feed details! Please Try Again!"
        }
      };
    default:
      return state;
  }
};

export const feedsEpics = {
  getFeedsEpic,
  getFeedDetailEpic,
};