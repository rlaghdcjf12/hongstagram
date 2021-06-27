import { notes, notesEpics } from "./notes";
import { auth, authEpics } from "./auth";
import { feeds, feedsEpics } from "./feeds";
import { combineReducers } from "redux";
import { combineEpics } from "redux-observable";

export const rootReducers = combineReducers({ notes, auth, feeds });
export const rootEpics = combineEpics(
  notesEpics.addNoteEpic,
  notesEpics.getNotesEpic,
  notesEpics.updateNoteEpic,
  notesEpics.deleteNoteEpic,
  notesEpics.getMoreNotesEpic,
  authEpics.loginEpic,
  authEpics.registerEpic,
  authEpics.checkUserEpic,
  authEpics.logoutEpic,
  authEpics.getMyInfoEpic,
  feedsEpics.getFeedsEpic,
  feedsEpics.getFeedPageEpic,
  feedsEpics.getMoreFeedsEpic,
  feedsEpics.getFeedOwnerEpic,
  feedsEpics.addFeedEpic,
  feedsEpics.deleteFeedEpic,
);