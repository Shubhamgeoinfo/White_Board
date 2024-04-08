import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { Header } from "../../components/Header/Header";
import { selectCurrentUser } from "../../handlers/currentUser";
import { useSocket } from "../../hooks/useSocket";
import { useSocketHandleRoom } from "../../hooks/useSocketHandleRoom";
import "./Home.css";

export const Home = () => {
  const socket = useSocket();
  const username = useSelector(selectCurrentUser);
  const [roomId, setRoomId] = useState("");
  useSocketHandleRoom(roomId);

  useEffect(() => {
    if (!roomId) return;
    socket.emit("check_room", roomId);
  }, [roomId]);

  const handleCreateRoom = (e) => {
    e.preventDefault();
    socket.emit("create_room", username);
  };

  const handleJoinRoom = (e) => {
    e.preventDefault();
    if (roomId) socket.emit("join_room", roomId, username);
  };

  return (
    <>
      <Header />
      <div className="home-wrapper">
        <Button onClick={handleCreateRoom}>Create room</Button>
        <Form.Group className="mb-3">
          <Form.Label>Enter room id..</Form.Label>
          <Form.Control
            type="text"
            placeholder="Room id..."
            onChange={(e) => setRoomId(e.target.value)}
          />
        </Form.Group>
        <Button onClick={handleJoinRoom}>Join room</Button>
      </div>
    </>
  );
};
