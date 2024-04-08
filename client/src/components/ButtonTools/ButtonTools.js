import React, { useState } from "react";

import { BiRectangle } from "react-icons/bi";
import { BsCircle } from "react-icons/bs";
import { BiText } from "react-icons/bi";
import { BiSolidEditAlt } from "react-icons/bi";
import { BiEditAlt } from "react-icons/bi";
import { BiReset } from "react-icons/bi";
import { BiUndo } from "react-icons/bi";
import { BiRedo } from "react-icons/bi";
import { BiSortUp } from "react-icons/bi";
import { HiOutlineMinus } from "react-icons/hi";
import { BiColorFill } from "react-icons/bi";
import { BiDownload } from "react-icons/bi";
import { BiExit } from "react-icons/bi";
import { HiTrash } from "react-icons/hi";
import "./ButtonTools.css";
import { useSocket } from "../../hooks/useSocket";
import { useNavigate } from "react-router-dom";

export const ButtonTools = ({
  onAddLine,
  onAddCircle,
  onAddRectangle,
  toggleDraw,
  clear,
  undo,
  redo,
  toggleSize,
  removeSelectedObject,
  handleColorChange,
  addText,
  downloadCanvasImage,
}) => {
  const [drawing, setDrawing] = useState(false);
  const socket = useSocket();
  const navigate = useNavigate();

  const exitRoom = () => {
    socket.emit("leave_room");
    navigate("/");
  };

  return (
    <>
      <div className="button-wrapper">
        <button onClick={onAddLine} className="icon-button">
          <HiOutlineMinus />
        </button>
        <button onClick={onAddCircle} className="icon-button">
          <BsCircle />
        </button>
        <button onClick={onAddRectangle} className="icon-button">
          <BiRectangle />
        </button>
        <button onClick={addText} className="icon-button">
          <BiText />
        </button>
        <button
          onClick={() => {
            toggleDraw();
            setDrawing(!drawing);
          }}
          className="icon-button"
        >
          {drawing ? <BiSolidEditAlt /> : <BiEditAlt />}
        </button>
        <button onClick={clear} className="icon-button">
          <BiReset />
        </button>
        <button onClick={undo} className="icon-button">
          <BiUndo />
        </button>
        <button onClick={redo} className="icon-button">
          <BiRedo />
        </button>
        <button onClick={toggleSize} className="icon-button">
          <BiSortUp />
        </button>
        <button onClick={removeSelectedObject} className="icon-button">
          <HiTrash />
        </button>
        <input
          className="color-input"
          type="color"
          onChange={(e) => handleColorChange(e.target.value)}
        />
        <button onClick={downloadCanvasImage} className="icon-button">
          <BiDownload />
        </button>
        <button onClick={exitRoom} className="icon-button">
          <BiExit />
        </button>
      </div>
    </>
  );
};
