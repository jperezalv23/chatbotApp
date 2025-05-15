import React, { useEffect, useState, useRef } from "react";
import { fetchMessages, postMessage, deleteMessages } from "../services/chatApi";
import MessageBubble from "./MessageBubble";
import './chat.css';


interface Message {
  id_message?: number;
  content: string;
  sender: "user" | "bot";
  timestamps?: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const loadMessages = async () => {
    try {
      const data = await fetchMessages();
      setMessages(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMsg: Message = {
      content: input,
      sender: "user",
      timestamps: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    await postMessage(input);
    await loadMessages();
  };

  const handleDelete = async () => {
    await deleteMessages();
    await loadMessages();
  };

  useEffect(() => {
    loadMessages();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-wrapper">
      <h2>Chatbot App</h2>


    
      <div className="chat-container">
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} message={msg} />
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="input-row">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="chat-input"
          placeholder="¡Envía un mensaje!"
        />
        <button onClick={handleDelete} className="chat-button">Borrar mensajes</button>
        <button onClick={handleSend} className="chat-button">Enviar</button>
      </div>
    </div>
  );
};

export default Chat;
