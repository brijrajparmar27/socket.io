import { useState } from "react";
import { io } from "socket.io-client";
import "./Home.css";

const socket = io("http://localhost:5000/");

const Home = () => {

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [room,setRoom] = useState("");

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat-send", message);
    setMessage("");
  };

  const changeRoom = (e) =>{
    e.preventDefault();
    room && socket.emit("change-room", room);
    console.log("room changed")
  }

  socket.on("chat-recieve", (payload) => {
    setChat([...chat, payload]);
  });

  return (
    <div className="home">
      <div className="chats">
        <div className="chats_contain">
          {
            chat && chat.map((each, index) => {
              return <p key={index}>{each}</p>
            })
          }
        </div>
      </div>
      <div className="inputs">
        <div className="input_contain">
          <form className="msg_form" onSubmit={sendChat}>
            <input
              type="text"
              className="msg input_tb"
              name="msg"
              placeholder="write message"
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <input type="submit" value="send" className="submit" />
          </form>
          {/* <form className="room_form" onSubmit={handleRoom}> */}
          <form className="room_form" onSubmit={changeRoom}>
            <input
              type="text"
              className="room  input_tb"
              name="room"
              placeholder="enter room id"
              onChange={(e)=>{setRoom(e.target.value)}}
            />
            <input type="submit" value="connect" className="submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
