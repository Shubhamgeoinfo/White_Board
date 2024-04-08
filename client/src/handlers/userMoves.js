import { createSlice, nanoid } from "@reduxjs/toolkit";

export const userMovesHandlers = createSlice({
  name: "userMoves",
  initialState: { userMoves: [], history: [] },
  reducers: {
    addMove: (state, action) => {
      const userMove = {
        id: nanoid(),
        move: action.payload,
      };
      state.userMoves.push(userMove);
    },
    undoMove: (state, action) => {
      const moveToUndo = state.userMoves.pop();
      state.history.push(moveToUndo);
    },
    redoMove: (state, action) => {
      const moveToRedo = state.history[0];
      state.userMoves.push(moveToRedo);
    },
  },
});

export const { addMove, undoMove, redoMove } = userMovesHandlers.actions;

export const selectUserMoves = (state) => state.userMoves.userMoves;

export default userMovesHandlers.reducer;
