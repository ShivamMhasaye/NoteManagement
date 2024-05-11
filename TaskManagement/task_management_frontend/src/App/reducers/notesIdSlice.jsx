import { createSlice } from "@reduxjs/toolkit";

const notesIdSlice = createSlice({
  name: "notesId",
  initialState: {
    value: "",
  },
  reducers: {
    updateNotesId: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateNotesId } = notesIdSlice.actions;
export default notesIdSlice.reducer;
