import React from "react";

interface Message {
  id_message?: number;
  content: string;
  sender: "user" | "bot";
  timestamps?: string;
}

interface MessageProps {
  message: Message;
}

const MessageBubble: React.FC<MessageProps> = ({ message }) => {
  const { sender, content, timestamps } = message;


  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: sender === "user" ? "flex-end" : "flex-start",
        marginBottom: "10px",
      }}
    >
      <p style={{ fontSize: "0.75rem", color: "#aaa", marginBottom: "5px" }}>
        {timestamps ? new Date(timestamps).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : ""}
      </p>
      <div
        style={{
          backgroundColor: sender === "user" ? "#4CAF50" : "#333",
          color: "#fff",
          padding: "10px 15px",
          borderRadius: sender === "user" ? "15px 15px 0 15px" : "15px 15px 15px 0",
          maxWidth: "75%",
          fontSize: "0.95rem",
          textAlign: "left"
        }}
      >
        <strong>{sender}:</strong> {content}
      </div>
    </div>
  );
};

export default MessageBubble;
