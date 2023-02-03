import { useState } from "react";
import { io } from "socket.io-client";
import "./Home.css";
const Home = () => {
  const [msg, setMsg] = useState([]);
  const sendMessage = (newText) => {
    socket.emit("send", newText);
    setMsg((prev) => [...prev, newText]);
  };
  const handleMsg = (e) => {
    e.preventDefault();
    sendMessage(e.target.msg.value.trim());
    e.target.reset();
  };
  const handleRoom = (e) => {
    e.preventDefault();
    console.log(e.target.room.value.trim());
    e.target.reset();
  };
  const socket = io("http://localhost:3000/");
  socket.on("connect", () => {
    sendMessage("connected");
  });
  return (
    <div className="home">
      <div className="chats">
        <div className="chats_contain"></div>
      </div>
      <div className="inputs">
        <div className="input_contain">
          <form className="msg_form" onSubmit={handleMsg}>
            <input
              type="text"
              className="msg input_tb"
              name="msg"
              placeholder="write message"
            />
            <input type="submit" value="send" className="submit" />
          </form>
          <form className="room_form" onSubmit={handleRoom}>
            <input
              type="text"
              className="room  input_tb"
              name="room"
              placeholder="enter room id"
            />
            <input type="submit" value="connect" className="submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
