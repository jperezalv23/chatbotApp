import React, {useEffect, useState, useRef} from "react";
import axios from "axios";


interface Message {
    id_message?: number;
    content: string;
    sender: 'user' | 'bot';
    timestamps?: string;
  }

const Chat: React.FC = () => {

    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const bottomRef = useRef<HTMLDivElement | null>(null);


    const fetchMessages = async () => {
        const res = await axios.get("http://localhost:3000/api/messages");
        setMessages(res.data);
    };

    

    const sendMessage = async () => {
        if (!input.trim()) return;

        setMessages(prev => [
        ...prev,
        { content: input, sender: 'user', timestamps: new Date().toISOString() }
      ]);
      
        setInput('');
        await axios.post("http://localhost:3000/api/messages", {content: input});
        fetchMessages();
    }

    const deleteMessages = async () => {

      await axios.delete("http://localhost:3000/api/messages");
      fetchMessages();
    }

    useEffect(() => {
      fetchMessages();
    }, [])

    useEffect(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (

        <div>
            <h2> Chatbot App</h2>
            <div style={{
                maxWidth: "600px",
                margin: "40px auto",
                padding: "24px",
                border: "1px solid #333",
                borderRadius: "12px",
                backgroundColor: "#1e1e1e",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                overflowY: "auto",
                minHeight: "300px",
                maxHeight: "500px",
                transition: "height 0.3s ease"

            }}>

{messages.map((msg, idx) => (
  
  <div
    key={idx}
    style={{
      display: 'flex',
      flexDirection: "column",
      alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
      marginBottom: '10px',
    }}
  >
    

    <p style={{
  fontSize: "0.75rem",
  color: "#aaa",
  textAlign: "center",
  marginBottom: "5px",
  }}>
    {msg.timestamps ? new Date(msg.timestamps).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}
  </p>
    
    <div
      style={{
        backgroundColor: msg.sender === 'user' ? '#4CAF50' : '#333',
        color: '#fff',
        padding: '10px 15px',
        borderRadius: msg.sender === 'user' ? '15px 15px 0 15px' : '15px 15px 15px 0',
        textAlign: 'left',
        maxWidth: '75%',
        fontSize: "0.95rem",
        lineHeight: "1.4",
      }}
    >
      <p style={{ margin: 0 }}>
        <strong>{msg.sender}:</strong> {msg.content}
      </p>
    </div>
  </div>
))}


<div ref={bottomRef}/>
                    
            </div>
  
  <div style={{ display: 'flex',
  gap: '10px',
  maxWidth: '600px',
  margin: '20px auto',}}>
  <input
    type="text"
    value={input}
    onChange={(e) => setInput(e.target.value)}
    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
    style={{
      flex: 1,
      padding: '12px',
      border: '1px solid #444',
      borderRadius: '8px',
      backgroundColor: '#1e1e1e',
      color: '#fff',
      outline: 'none',
    }}
  />

<button
    onClick={deleteMessages}
    style={{
      padding: '12px 16px',
    backgroundColor: '#007BFF',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
    }}
  >
    Borrar mensajes
  </button>


  <button
    onClick={sendMessage}
    style={{
      padding: '12px 16px',
      backgroundColor: '#007BFF',
      border: 'none',
      borderRadius: '8px',
      color: '#fff',
      fontWeight: 'bold',
      cursor: 'pointer',
    }}
  >
    Enviar
  </button>
</div>


        </div>


    );
    
};

export default Chat;