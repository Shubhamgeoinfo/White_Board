import React from "react";
import "./Header.css";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../handlers/currentUser";

export const Header = () => {
  const currentUser = useSelector(selectCurrentUser);
  return (
    <div className="header-container">
      <h1>Board.IO</h1>
      <h3>Real-time whiteboard</h3>
      <h5>Hi {currentUser}, welcome to Board.IO</h5>
    </div>
  );
};
