import { useEffect } from "react";

const botMessages = [
  "Hello there!",
  "How can I help?",
  "Nice to meet you!",
  "Do you like React?",
  "This is a test message.",
];

function getRandomMessage() {
  const index = Math.floor(Math.random() * botMessages.length);
  return botMessages[index];
}

const useMessages = (room, onMessage) => {
  useEffect(() => {
    const interval = setInterval(() => {
      const message = getRandomMessage();
      onMessage(`[${room}] ${message}`);
    }, 5000);

    return () => clearInterval(interval); 
  }, [room, onMessage]);
};

export default useMessages;
