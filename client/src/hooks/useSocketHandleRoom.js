import { useEffect } from "react";
import { useSocket } from "./useSocket";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentRoom } from "../handlers/currentRoom";
import {
  addUser,
  initializeUsers,
  removeUser,
  selectUsers,
} from "../handlers/users";
import { addOtherMove, initializeOtherMoves } from "../handlers/otherMoves";
import { selectCurrentUser } from "../handlers/currentUser";
import { removeUserPos } from "../handlers/mousePos";

export const useSocketHandleRoom = (roomId) => {
  const socket = useSocket();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const users = useSelector(selectUsers);

  useEffect(() => {
    socket.on("created", (roomIdFromServer) => {
      dispatch(setCurrentRoom(roomIdFromServer));
      navigate(`/${roomIdFromServer}`);
      toast("Your room is created.", {
        position: "top-center",
        theme: "colored",
        autoClose: 2000,
      });
      dispatch(addUser({ socketId: socket.id, user: currentUser }));
    });

    socket.on("room_exists", (exists) => {
      if (!exists) {
        toast(`This room does not exist`, {
          position: "top-center",
          theme: "colored",
          autoClose: 2000,
        });
        navigate("/");
      }
    });

    const handleJoinedRoom = (roomIdFromServer, failed) => {
      if (!failed) {
        dispatch(setCurrentRoom(roomIdFromServer));
        navigate(`/${roomIdFromServer}`);
        toast(`You have joined room ${roomId}`, {
          position: "top-center",
          theme: "colored",
          autoClose: 2000,
        });
        socket.emit("joined_room");
      }
      // } else {
      //   openModal(<NotFoundModal id={roomId} />);
      // }
    };

    socket.on("joined", handleJoinedRoom);

    socket.on("new_user", (socketId, user) => {
      toast(`${user} has joined the room`, {
        position: "top-center",
        theme: "colored",
        autoClose: 2000,
      });
      dispatch(addUser({ socketId, user }));
    });

    socket.on("room", (roomIdFromServer, otherUserMoves, otherUsers) => {
      dispatch(setCurrentRoom(roomIdFromServer));
      dispatch(
        initializeOtherMoves(Object.fromEntries(JSON.parse(otherUserMoves)))
      );
      dispatch(initializeUsers(Object.fromEntries(JSON.parse(otherUsers))));
    });

    const handleUserDisconnection = (socketId) => {
      const user = users[socketId];
      toast(`${user} has left the room`, {
        position: "top-center",
        theme: "colored",
        autoClose: 2000,
      });
      dispatch(removeUser(socketId));
      dispatch(removeUserPos(socketId));
    };

    socket.on("user_disconnected", handleUserDisconnection);

    return () => {
      socket.off("room_exists");
      socket.off("created");
      socket.off("joined", handleJoinedRoom);
      socket.off("user_disconnected", handleUserDisconnection);
    };
  }, [roomId]);
};
