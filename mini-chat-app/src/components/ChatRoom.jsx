import React, { useEffect, useRef, useState } from "react";
import useMessages from "../Hooks/useMessage";


const ChatRoom = ({ room }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useMessages(room, (msg) =>
    setMessages((prev) => [...prev, { from: "Bot", text: msg }])
  );

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { from: "You", text: input }]);
    setInput("");
    setTyping(true);
    setTimeout(() => setTyping(false), 1000);
  };

  useEffect(() => {
    setMessages([]);
  }, [room]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div style={{ border: "1px solid #ccc", marginTop: 10, padding: 10 }}>
      <h2>Room: #{room}</h2>
      <div
        style={{
          height: 200,
          overflowY: "scroll",
          border: "1px solid gray",
          marginBottom: 10,
          padding: 5,
        }}
      >
        {messages.map((msg, idx) => (
          <div key={idx}>
            <strong>{msg.from}: </strong> {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      {typing && <em>Someone is typing...</em>}
      <br />
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type message"
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default ChatRoom;
