import { combineReducers } from "@reduxjs/toolkit";
import themeReducer from "./reducers/themeSlice";
import notesReducer from "./reducers/notesSlice";
import notesIdReducer from "./reducers/notesIdSlice";
import usernameReducer from "./reducers/usernameSlice";

const rootReducer = combineReducers({
  theme: themeReducer,
  notes: notesReducer,
  notesId: notesIdReducer,
  username: usernameReducer,
});

export default rootReducer;