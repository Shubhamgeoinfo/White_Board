import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { BsFillChatFill } from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa";
import { AiOutlineSend } from "react-icons/ai";
import { useSelector } from "react-redux";
import { selectUsers } from "../../handlers/users";
import { useSocket } from "../../hooks/useSocket";
import Message from "./Message";
import "./Chat.css";

export const Chat = () => {
  const socket = useSocket();
  const [msgs, setMsgs] = useState([]);
  const [newMsg, setNewMsg] = useState({});
  const [opened, setOpened] = useState(false);
  const [msgToSend, setMsgToSend] = useState("");
  const users = useSelector(selectUsers);
  const msgList = useRef();

  useEffect(() => {
    const handleNewMsg = (userId, msg) => {
      const user = users[userId];

      setMsgs([...msgs, { userId, msg, user, id: msgs.length + 1 }]);

      msgList.current?.scroll({ top: msgList.current?.scrollHeight });
      if (!opened) setNewMsg(true);
    };

    socket.on("new_msg", handleNewMsg);

    return () => {
      socket.off("new_msg", handleNewMsg);
    };
  }, [msgs, opened, users]);

  const handleSubmit = (e) => {
    e.preventDefault();

    socket.emit("send_msg", msgToSend);

    setMsgToSend("");
  };
  return (
    <motion.div className="chat-wrapper">
      <button
        onClick={() => {
          setOpened((prev) => !prev);
          setNewMsg(false);
        }}
        className="chat-button"
      >
        <div className="chat-header">
          <BsFillChatFill />
          Chat
          {newMsg && <span>New!</span>}
        </div>
        <motion.div
          animate={{ rotate: opened ? 0 : 180 }}
          transition={{ duration: 0.2 }}
        >
          <FaChevronDown />
        </motion.div>
      </button>
      {opened && (
        <div className="chat-content-wrapper">
          <div ref={msgList} className="chat-content">
            {msgs.map((msg) => (
              <Message key={msg.id} {...msg} />
            ))}
          </div>
          <form onSubmit={handleSubmit} className="chat-input">
            <input
              value={msgToSend}
              onChange={(e) => setMsgToSend(e.target.value)}
              className="chat-input-text"
            />
            <button type="submit" className="chat-input-button">
              <AiOutlineSend />
            </button>
          </form>
        </div>
      )}
    </motion.div>
  );
};
