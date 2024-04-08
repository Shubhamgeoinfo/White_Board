import { createSlice } from "@reduxjs/toolkit";

export const otherMovesHandlers = createSlice({
  name: "otherMoves",
  initialState: { otherMoves: {} },
  reducers: {
    addOtherMove: (state, action) => {
      const { userId, move } = action.payload;
      console.log({ currentUserMoves: state.otherMoves[userId], userId, move });
      if (state.otherMoves[userId]) {
        state.otherMoves[userId].push(move);
      } else {
        state.otherMoves[userId] = [move];
      }
    },
    removeOtherMove: (state, action) => {
      const userId = action.payload;
      state.otherMoves[userId].pop();
    },
    initializeOtherMoves: (state, action) => {
      state.otherMoves = action.payload;
    },
  },
});

export const { addOtherMove, removeOtherMove, initializeOtherMoves } =
  otherMovesHandlers.actions;

export const selectOtherMoves = (state) => state.otherMoves.otherMoves;

export default otherMovesHandlers.reducer;
