import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Canvas } from "../../components/Canvas/Canvas";
import { Chat } from "../../components/Chat/Chat";
import { useSelector } from "react-redux";
import "./Board.css";
import { useViewportSize } from "../../hooks/useViewportSize";
import { selectMousePos } from "../../handlers/mousePos";
import { selectUsers } from "../../handlers/users";
import { UserCursor } from "../../components/UserCursor/UserCursor";
import { useSocket } from "../../hooks/useSocket";
import { useSocketHandleRoom } from "../../hooks/useSocketHandleRoom";

export const Board = () => {
  const { roomId } = useParams();
  useSocketHandleRoom();
  const socket = useSocket();
  useEffect(() => {
    socket.emit("check_room", roomId);
  }, [roomId]);
  const userPos = useSelector(selectMousePos);
  const users = useSelector(selectUsers);
  const { width, height } = useViewportSize();
  return (
    <div className="board-wrapper" style={{ width, height }}>
      <Canvas />
      <Chat />
      <div>
        {Object.keys(userPos).map((userId) => (
          <UserCursor
            key={userId}
            user={users[userId]}
            xPos={userPos[userId].xPos}
            yPos={userPos[userId].yPos}
          />
        ))}
      </div>
    </div>
  );
};
