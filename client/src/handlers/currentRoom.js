import { createSlice } from "@reduxjs/toolkit";

export const currentRoomHandler = createSlice({
  name: "currentRoom",
  initialState: { currentRoom: "" },
  reducers: {
    setCurrentRoom: (state, action) => {
      state.currentRoom = action.payload;
    },
  },
});

export const { setCurrentRoom } = currentRoomHandler.actions;

export const selectCurrentRoom = (state) => state.currentRoom.currentRoom;

export default currentRoomHandler.reducer;
