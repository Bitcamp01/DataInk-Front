import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { over } from '@stomp/stompjs';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const Chat = ({ roomId }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    const socket = new SockJS(`${API_BASE_URL}/ws`);
    const stompClient = over(socket);

    stompClient.connect({}, () => {
      stompClient.subscribe(`/topic/${roomId}`, (payload) => {
        const newMessage = JSON.parse(payload.body);
        setMessages((prev) => [...prev, newMessage]);
      });
    });

    setStompClient(stompClient);
    return () => stompClient.disconnect();
  }, [roomId]);

  const sendMessage = () => {
    if (stompClient && message) {
      const chatMessage = { content: message, roomId: roomId };
      stompClient.send('/app/chat.sendMessage', {}, JSON.stringify(chatMessage));
      setMessage("");
    }
  };

  return (
    <div>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index}>{msg.senderId}: {msg.content}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
