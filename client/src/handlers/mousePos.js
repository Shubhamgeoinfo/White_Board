import { createSlice } from "@reduxjs/toolkit";

export const mousePosHandler = createSlice({
  name: "mousePos",
  initialState: { mousePos: {} },
  reducers: {
    updateMousePos: (state, action) => {
      const { xPos, yPos, userId } = action.payload;
      state.mousePos[userId] = { xPos, yPos };
    },
    removeUserPos: (state, action) => {
      delete state.mousePos[action.payload];
    },
  },
});

export const { updateMousePos, removeUserPos } = mousePosHandler.actions;

export const selectMousePos = (state) => state.mousePos.mousePos;

export default mousePosHandler.reducer;
