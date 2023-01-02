import React from "react";
import { user } from "../Join/Join";
import socketIo from "socket.io-client";
import { useEffect } from "react";
import "./Chat.css";
import send from "../../images/send.png";
import close from "../../images/closeIcon.png";
import { useState } from "react";
import Message from "../Message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";

let socket;
const ENDPOINT = "https://chat-server-abid.vercel.app/";

const Chat = () => {
  const [id, setId] = useState("");
  const [messages, setMessages] = useState([]);

  const sendFn = () => {
    const message = document.getElementById("chatIn").value;
    socket.emit("message", { id, message });
    document.getElementById("chatIn").value = "";
  };

  useEffect(() => {
    socket = socketIo(ENDPOINT, {
      transports: ["websocket", "polling"],
      path: "/socket.io",
      upgrade: true,
      withCredentials: false,
    });
    console.log(socket);
    socket.on("connect", () => {
      console.log("Connected");
      setId(socket.id);
    });

    socket.emit("joined", { user });

    socket.on("welcome", (data) => {
      setMessages([...messages, data]);
    });

    socket.on("userJoined", (data) => {
      setMessages([...messages, data]);
    });

    socket.on("leave", (data) => {
      setMessages([...messages, data]);
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setMessages([...messages, data]);
    });

    return () => {
      socket.off();
    };
  }, [messages]);

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="chatHeader">
          <h1>Chat</h1>
          <a href="/">
            <img src={close} alt="close" />
          </a>
        </div>
        <ReactScrollToBottom className="chatBox">
          {messages.map((m, i) => (
            <Message
              key={i}
              user={m.id === id ? null : m.user}
              message={m.message}
              classs={m.id === id ? "right" : "left"}
            />
          ))}
        </ReactScrollToBottom>
        <div className="chatInput">
          <input
            onKeyUp={(e) => (e.key === "Enter" ? sendFn() : null)}
            type="text"
            id="chatIn"
          />
          <button onClick={sendFn} className="sendBtn">
            <img src={send} alt="send" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
