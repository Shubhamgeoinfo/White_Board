import { useEffect } from "react";
import { useSocket } from "./useSocket";
import { useDispatch } from "react-redux";
import { updateMousePos } from "../handlers/mousePos";

export const useSocketMousePos = () => {
  const dispatch = useDispatch();
  const socket = useSocket();

  useEffect(() => {
    socket.on("mouse_moved", (xPos, yPos, userId) => {
      dispatch(updateMousePos({ xPos, yPos, userId }));
    });
    return () => {
      socket.off("mouse_moved");
    };
  }, [updateMousePos]);
};
