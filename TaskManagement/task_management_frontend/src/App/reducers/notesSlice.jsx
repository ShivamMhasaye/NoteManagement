import { createSlice } from "@reduxjs/toolkit";

const notesSlice = createSlice({
  name: "notes",
  initialState: {
    content: "",
    title: "",
  },
  reducers: {
    updateNotes: (state, action) => {
      return (state = {
        title: action.payload.title,
        content: action.payload.content,
      });
    },
  },
});

export const { updateNotes } = notesSlice.actions;

export default notesSlice.reducer;

