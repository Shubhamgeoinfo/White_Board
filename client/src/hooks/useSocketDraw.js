import { useEffect } from "react";
import { useSocket } from "./useSocket";
import { addOtherMove, removeOtherMove } from "../handlers/otherMoves";
import { useDispatch } from "react-redux";
import { fabric } from "fabric";

export const useSocketDraw = (drawing, editor) => {
  const dispatch = useDispatch();
  const socket = useSocket();

  useEffect(() => {
    let moveToDrawLater;
    let userIdLater = "";

    const handleUserDraw = (move, userId) => {
      let fabricObject;
      if (!drawing) {
        const { type } = move;

        console.log({ move });

        switch (type) {
          case "rect":
            fabricObject = new fabric.Rect(move);
            break;
          case "line":
            fabricObject = new fabric.Line(move);
            break;
          case "circle":
            fabricObject = new fabric.Circle(move);
            break;
          case "text":
            fabricObject = new fabric.Text(move);
            break;
          case "path":
            fabricObject = new fabric.Path(move);
            break;
          default:
            fabricObject = null;
            break;
        }
        if (!fabricObject) return;
        dispatch(addOtherMove({ userId, move }));
        editor.canvas._objects.push(fabricObject);
        editor.canvas.renderAll();
      } else {
        moveToDrawLater = fabricObject;
        userIdLater = userId;
      }
    };

    socket.on("user_draw", handleUserDraw);

    return () => {
      socket.off("user_draw", handleUserDraw);

      if (moveToDrawLater && userIdLater) {
        dispatch(addOtherMove({ userId: userIdLater, move: moveToDrawLater }));
        editor.canvas._objects.push(moveToDrawLater);
        editor.canvas.renderAll();
      }
    };
  }, [drawing, addOtherMove, editor]);

  useEffect(() => {
    socket.on("user_undo", (userId) => {
      dispatch(removeOtherMove(userId));
    });

    return () => {
      socket.off("user_undo");
    };
  }, [removeOtherMove]);
};
