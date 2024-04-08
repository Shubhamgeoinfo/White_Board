import { createSlice, nanoid } from "@reduxjs/toolkit";

export const usersHandlers = createSlice({
  name: "users",
  initialState: { users: {} },
  reducers: {
    addUser: (state, action) => {
      const { socketId, user } = action.payload;
      state.users[socketId] = user;
    },
    removeUser: (state, action) => {
      delete state.users[action.payload];
    },
    initializeUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { addUser, removeUser, initializeUsers } = usersHandlers.actions;

export const selectUsers = (state) => state.users.users;

export default usersHandlers.reducer;
