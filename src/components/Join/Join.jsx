import React from "react";
import "./Join.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";

let user;

const sendUser = () => {
  user = document.getElementById("joinInput").value;
  document.getElementById("joinInput").value = "";
};
const Join = () => {
  const [name, setName] = useState("");
  console.log(name);

  return (
    <div className="JoinPage">
      <div className="Join_Container">
        <img src={logo} alt="" />
        <h1>Join</h1>
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          id="joinInput"
          placeholder="Name"
        />
        <Link onClick={(e) => (!name ? e.preventDefault() : null)} to="/chat">
          <button onClick={sendUser} className="joinBtn">
            Join
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
export { user };
