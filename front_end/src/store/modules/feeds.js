import { ajax } from "rxjs/observable/dom/ajax";
import { of } from "rxjs";
import { map, mergeMap, catchError, withLatestFrom } from "rxjs/operators";
import { ofType } from "redux-observable";

const GET_FEEDS = "feeds/GET_FEEDS";
const GET_FEEDS_SUCCESS = "feeds/GET_FEEDS_SUCCESS";
const GET_FEEDS_FAILURE = "feeds/GET_FEEDS_FAILURE";
const OPEN_FEED_MODAL = "feeds/OPEN_FEED_MODAL";

const CHANGE_PROFILE_TAB = "feeds/CHANGE_PROFILE_TAB";

const GET_FEED_OWNER = "feeds/GET_FEED_OWNER"
const GET_FEED_OWNER_SUCCESS = "feeds/GET_FEED_OWNER_SUCCESS";
const GET_FEED_OWNER_FAILURE = "feeds/GET_FEED_OWNER_FAILURE";

const ADD_FEED = "feeds/ADD_FEED";
const ADD_FEED_SUCCESS = "feeds/ADD_FEED_SUCCESS";
const ADD_FEED_FAILURE = "feeds/ADD_FEED_FAILURE";

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

export const getFeedOwner = ({feedNum}) => ({
  type: GET_FEED_OWNER,
  payload: {
    feedNum
  }
});

export const getFeedOwnerSuccess = ({owner}) => ({
  type: GET_FEED_OWNER_SUCCESS,
  payload: {
    owner
  }
});

export const getFeedOwnerFailure = error => ({
  type: GET_FEED_OWNER_FAILURE,
  payload: {
    error
  }
});

export const addFeed = () => ({
  type: ADD_FEED
});

export const addFeedSuccess = feed => ({
  type: ADD_FEED_SUCCESS,
  payload: {
    feed
  }
});

export const addFeedFailure = error => ({
  type: ADD_FEED_FAILURE,
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

const getFeedOwnerEpic = (action$, state$) => {
  return action$.pipe(
    ofType(GET_FEED_OWNER),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      console.log("feedNum : ", action.payload.feedNum)
      return ajax
        .get(`/api/feeds/owner/${action.payload.feedNum}`,
        {
          "Content-Type": "application/json",
          Authorization: `token ${userInfo.token}`
        })
        .pipe(
          map(response => {
            const { owner } = response.response;
            return getFeedOwnerSuccess({ owner });
          }),
          catchError(error =>
            of({
              type: GET_FEED_OWNER_FAILURE,
              payload: error,
              error: true
            })
          )
        );
    })
  );
};

const addFeedEpic = (action$, state$) => {
  return action$.pipe(
    ofType(ADD_FEED),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const token = localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo")).token
        : null;
      return ajax
        .post(
          `/api/feeds/`,
          { 
            place: "사파리",
            owner: JSON.parse(localStorage.getItem("userInfo")).id,
            text: "add Feed Testing",
            image: "20200830_210957.jpg"
          },
          {
            "Content-Type": "application/json",
            Authorization: `token ${token}`
          }
        )
        .pipe(
          map(response => {
            const feed = response.response;
            return addFeedSuccess(feed);
          }),
          catchError(error =>
            of({
              type: ADD_FEED_FAILURE,
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
  owner: []
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
    case GET_FEED_OWNER_SUCCESS:
      return {
        ...state
      };
    case GET_FEED_OWNER_FAILURE:
      return {
        ...state,
        error: {
          triggered: true,
          message: "Error to get a feed details! Please Try Again!"
        }
      };
    case ADD_FEED_SUCCESS:
      const { feed } = action.payload;
      return {
        ...state,
        feed: [],
        error: {
          triggered: false,
          message: ""
        }
      };
    case ADD_FEED_FAILURE:
      return {
        ...state,
        error: {
          triggered: true,
          message: "Error! Please Try With Unempty Note"
        }
      };
    default:
      return state;
  }
};

export const feedsEpics = {
  getFeedsEpic,
  getFeedOwnerEpic,
  addFeedEpic,
};