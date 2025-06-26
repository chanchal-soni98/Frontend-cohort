import React, { useState } from "react";
import ChatRoom from "./components/ChatRoom";


const App = () => {
  const [room, setRoom] = useState("general");

  return (
    <div style={{ padding: 20 }}>
      <h1>Chat App</h1>
      <div>
        <button onClick={() => setRoom("general")}>#general</button>
        <button onClick={() => setRoom("random")}>#random</button>
      </div>
      <ChatRoom room={room} />
    </div>
  );
};

export default App;
