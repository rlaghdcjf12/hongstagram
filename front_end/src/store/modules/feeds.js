import { ajax } from "rxjs/observable/dom/ajax";
import { of } from "rxjs";
import { map, mergeMap, catchError, withLatestFrom, delay } from "rxjs/operators";
import { ofType } from "redux-observable";

const GET_FEEDS = "feeds/GET_FEEDS";
const GET_FEEDS_SUCCESS = "feeds/GET_FEEDS_SUCCESS";
const GET_FEEDS_FAILURE = "feeds/GET_FEEDS_FAILURE";

const OPEN_FEED_MODAL = "feeds/OPEN_FEED_MODAL";
const CHANGE_PROFILE_TAB = "feeds/CHANGE_PROFILE_TAB";

const GET_MORE_FEEDS = "feeds/GET_MORE_FEEDS"
const GET_MORE_FEEDS_SUCCESS = "feeds/GET_MORE_FEEDS_SUCCESS"
const GET_MORE_FEEDS_FAILURE = "feeds/GET_MORE_FEEDS_FAILURE"

const GET_FEED_OWNER = "feeds/GET_FEED_OWNER"
const GET_FEED_OWNER_SUCCESS = "feeds/GET_FEED_OWNER_SUCCESS";
const GET_FEED_OWNER_FAILURE = "feeds/GET_FEED_OWNER_FAILURE";

const ADD_FEED = "feeds/ADD_FEED";
const ADD_FEED_SUCCESS = "feeds/ADD_FEED_SUCCESS";
const ADD_FEED_FAILURE = "feeds/ADD_FEED_FAILURE";

const IMAGE_PREVIEW = "feeds/IMAGE_PREVIEW";
const CHANGE_INPUT = "feeds/CHANGE_INPUT";
const OPEN_SUB_MENU = "feeds/OPEN_SUB_MENU";
const DELETE_POPUP = "feeds/DELETE_POPUP";

const DELETE_FEED = "feeds/DELETE_FEED";
const DELETE_FEED_SUCCESS = "feeds/DELETE_FEED_SUCCESS";
const DELETE_FEED_FAILURE = "feeds/DELETE_FEED_FAILURE";

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

export const openFeedModal = ({openFeedModalNum}) => ({
  type: OPEN_FEED_MODAL,
  payload: {
    openFeedModalNum
  }
});

export const changeProfileTab =({menuNum}) => ({
  type: CHANGE_PROFILE_TAB,
  payload: {
    menuNum
  }
});

export const getMoreFeeds = ({lastId}) => ({
  type: GET_MORE_FEEDS,
  payload: {
    lastId
  }
});

export const getMoreFeedsSuccess = ({ feeds, isLast }) => ({
  type: GET_MORE_FEEDS_SUCCESS,
  payload: {
    feeds,
    isLast
  }
});

export const getMoreFeedsFailure = error => ({
  type: GET_MORE_FEEDS_FAILURE,
  payload: {
    error
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

export const imagePreview = ({addFeed_file, addFeed_previewURL}) => ({
  type: IMAGE_PREVIEW,
  payload: {
    addFeed_file,
    addFeed_previewURL
  }
});

export const ChangeInput = ({name, value}) => ({
  type: CHANGE_INPUT,
  payload: {
    name,
    value
  }
});

export const openSubMenu = ({openFlag}) => ({
  type: OPEN_SUB_MENU,
  payload: {
    openFlag
  }
});

export const DeletePopup = ({deletePopupFlag}) => ({
  type: DELETE_POPUP,
  payload: {
    deletePopupFlag
  }
});

export const DeleteFeed = ({id}) => ({
  type: DELETE_FEED,
  payload: {
    id
  }
});

export const deleteFeedSuccess = ({deleted_id}) => ({
  type: DELETE_FEED_SUCCESS,
  payload: {
    deleted_id
  }
});

export const deleteFeedFailure = error => ({
  type: DELETE_FEED_FAILURE,
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

const getMoreFeedsEpic = (action$, state$) => {
  return action$.pipe(
    ofType(GET_MORE_FEEDS),
    delay(1500),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const { lastId } = action.payload;
      return ajax
        .get(`/api/feeds/next/${lastId}/`, {
          "Content-Type": "application/json",
          Authorization: `token ${userInfo.token}`
        })
        .pipe(
          map(response => {
            const { feeds, isLast } = response.response;
            return getMoreFeedsSuccess({ feeds, isLast });
          }),
          catchError(error =>
            of({
              type: GET_MORE_FEEDS_FAILURE,
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
      return ajax
        .get(`/api/feeds/owner/${action.payload.feedNum}`,
        {
          "Content-Type": "application/json",
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
      const formData = new FormData();
      formData.append('csrfmiddlewaretoken', token)
      formData.append('image', state.feeds.addFeedModal.addFeed_file);
      formData.append('owner', JSON.parse(localStorage.getItem("userInfo")).id);
      formData.append('place', state.feeds.addFeedModal.addFeed_place);
      formData.append('text', state.feeds.addFeedModal.addFeed_description);
      const config = {
        headers: {
          "content-type": 'multipart/form-data',
        }
      }
      return ajax
        .post(`/api/feeds/add/`, formData, config)
        .pipe(
          map(response => {
            const feed = response.response.feed;
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

const deleteFeedEpic = (action$, state$) => {
  return action$.pipe(
    ofType(DELETE_FEED),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const token = localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo")).token
        : null;
      return ajax
      .delete(`/api/feeds/${action.payload.id}/`, {
        "Content-Type": "application/json",
        Authorization: `token ${token}`
      })
      .pipe(
        map(response => {
          return deleteFeedSuccess({deleted_id: action.payload.id});
        }),
        catchError(error =>
          of({
            type: DELETE_FEED_FAILURE,
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
  isLoading: false,
  error: {
    triggered: false,
    message: ""
  },
  currentFocus: {
    owner: [],
    menuNum: "0",
    openFeedModalNum : "0",
    SubMenuOpenFlag : "close",
    deletePopupFlag : "no"
  },
  addFeedModal: {
    addFeed_place: "",
    addFeed_description: "",
    addFeed_file: "",
    addFeed_previewURL : ""
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
    case OPEN_FEED_MODAL:
      return {
        ...state,
        currentFocus:{
          ...state.currentFocus,
          openFeedModalNum: action.payload.openFeedModalNum
        }
      };
    case CHANGE_PROFILE_TAB:
      return {
        ...state,
        currentFocus:{
          ...state.currentFocus,
          menuNum: action.payload.menuNum
        }
      };
    case GET_MORE_FEEDS:
      return {
        ...state,
        isLoading: true
      };
    case GET_MORE_FEEDS_SUCCESS:
      return {
        ...state,
        feeds: state.feeds.concat(action.payload.feeds),
        isLast: action.payload.isLast,
        isLoading: false
      };
    case GET_MORE_FEEDS_FAILURE:
      return {
        ...state,
        error: {
          triggered: true,
          message: "ERROR WHILE LOAD MORE, TRY AGAIN"
        }
      };
    case GET_FEED_OWNER_SUCCESS:
      return {
        ...state,
        currentFocus:{
          ...state.currentFocus,
          owner: action.payload.owner[0]
        }
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
      let newFeed = [];
      newFeed = newFeed.concat(action.payload.feed);
      newFeed = newFeed.concat(state.feeds);
      return {
        ...state,
        feeds: newFeed,
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
    case IMAGE_PREVIEW:
      return {
        ...state,
        addFeedModal: {
          ...state.addFeedModal,
          addFeed_file: action.payload.addFeed_file,
          addFeed_previewURL: action.payload.addFeed_previewURL,
        }
      };
    case CHANGE_INPUT:
      return {
        ...state,
        addFeedModal:{
          ...state.addFeedModal,
          [action.payload.name] : action.payload.value
        }
      };
    case OPEN_SUB_MENU:
      return {
        ...state,
        currentFocus:{
          ...state.currentFocus,
          SubMenuOpenFlag: action.payload.openFlag
        }
      };
    case DELETE_POPUP:
      return {
        ...state,
        currentFocus:{
          ...state.currentFocus,
          deletePopupFlag: action.payload.deletePopupFlag
        }
      };
    case DELETE_FEED_SUCCESS:
      return {
        ...state,
        feeds: state.feeds.filter(feed => feed.id !== action.payload.deleted_id),
        error: {
          triggered: false,
          message: ""
        }
      };
    case DELETE_FEED_FAILURE:
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
  getMoreFeedsEpic,
  getFeedOwnerEpic,
  addFeedEpic,
  deleteFeedEpic,
};