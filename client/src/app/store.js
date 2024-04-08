import { configureStore } from "@reduxjs/toolkit";
import userMoves from "../handlers/userMoves";
import users from "../handlers/users";
import otherMoves from "../handlers/otherMoves";
import currentRoom from "../handlers/currentRoom";
import currentUser from "../handlers/currentUser";
import mousePos from "../handlers/mousePos";

export const store = configureStore({
  reducer: {
    userMoves,
    users,
    otherMoves,
    currentRoom,
    currentUser,
    mousePos,
  },
});
