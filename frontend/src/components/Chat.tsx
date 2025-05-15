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

        setMessages(prev => [...prev, { content: input, sender: 'user' }]);
        setInput('');
        const res = await axios.post("http://localhost:3000/api/messages", {content: input});
        fetchMessages();
    }

    const deleteMessages = async () => {

      const res = await axios.delete("http://localhost:3000/api/messages");
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
                margin: "50px auto",
                padding: "20px",
                border: "1px solid #ccc",
                borderRadius: "10px",
                backgroundColor: "#242424",
                overflowY: "auto",
                minHeight: "50px",
                maxHeight: "400px",
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
    

    <p style={{textAlign:"center", width:"100%"}}> {new Date(msg.timestamps).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
    
    <div
      style={{
        backgroundColor: msg.sender === 'user' ? '#2E7D32' : '#E6E6E6',
        color: msg.sender === 'user' ? 'white' : 'black',
        padding: '10px 15px',
        borderRadius: '15px',
        maxWidth: '70%',
        wordWrap: 'break-word',
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
  
  <div style={{ display: 'flex', gap: "10px"}}>
  <input
    type="text"
    value={input}
    onChange={(e) => setInput(e.target.value)}
    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
    style={{
      flex: 1,
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      marginRight: '10px'
    }}
  />

<button
    onClick={deleteMessages}
    style={{
      padding: '10px 20px',
      backgroundColor: '#007BFF',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer'
    }}
  >
    Borrar mensajes
  </button>


  <button
    onClick={sendMessage}
    style={{
      padding: '10px 20px',
      backgroundColor: '#007BFF',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer'
    }}
  >
    Enviar
  </button>
</div>


        </div>


    );
    
};

export default Chat;