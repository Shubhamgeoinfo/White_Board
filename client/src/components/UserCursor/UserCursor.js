import React from "react";
import { GrCursor } from "react-icons/gr";

export const UserCursor = ({ xPos, yPos, user }) => {
  return (
    <div style={{ position: "absolute", zIndex: 50, top: yPos, left: xPos }}>
      <GrCursor />
      <div>
        {user}
        <p>
          {xPos}|{yPos}
        </p>
      </div>
    </div>
  );
};
