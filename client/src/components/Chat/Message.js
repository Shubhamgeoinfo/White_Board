import { useSocket } from "../../hooks/useSocket";
import "./Chat.css";

const Message = ({ userId, msg, user }) => {
  const socket = useSocket();
  const me = socket.id === userId;

  return (
    <div className={`message-container-${me ? "right" : "left"}`}>
      <p style={{ wordBreak: "break-all" }}>
        {!me && <b>{user}: </b>}
        {msg}
      </p>
    </div>
  );
};

export default Message;
