import { io } from "socket.io-client";
import { Home } from "./pages/Home/Home";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Board } from "./pages/Board/Board";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import SocketContext from "./contexts/SocketContext";

function App() {
  const socket = io("http://localhost:8000");
  return (
    <>
      <SocketContext.Provider value={socket}>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:roomId" element={<Board />} />
        </Routes>
      </SocketContext.Provider>
    </>
  );
}

export default App;
