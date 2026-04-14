import React, { useState } from "react";
import "./Chatbot.css";

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);

  const handleSend = () => {
    if (!msg.trim()) return;

    let reply = "📚 Explore our collection!";

    if (msg.toLowerCase().includes("teen")) {
      reply = "👉 Try Ikigai or Atomic Habits";
    } else if (msg.toLowerCase().includes("inspirational")) {
      reply = "👉 Rich Dad Poor Dad is great!";
    } else if (msg.toLowerCase().includes("story")) {
      reply = "👉 You can read novels like Alchemist!";
    }

    setChat([...chat, { user: msg, bot: reply }]);
    setMsg("");
  };

  return (
    <>
      {/* 💬 Floating Button */}
      <div className="chat-icon" onClick={() => setOpen(!open)}>
        💬
      </div>

      {/* 📦 Chat Box */}
      {open && (
        <div className="chat-box">

          {/* Header */}
          <div className="chat-header">
            🤖 Book Assistant
            <span className="chat-close" onClick={() => setOpen(false)}>
              ✖
            </span>
          </div>

          {/* Messages */}
          <div className="chat-body">
            {chat.length === 0 && (
              <p style={{ opacity: 0.6 }}>Ask me anything about books 📚</p>
            )}

            {chat.map((c, i) => (
              <div key={i}>
                <div className="user">{c.user}</div>
                <div className="bot">{c.bot}</div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="chat-input">
            <input
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="Ask about books..."
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>➤</button>
          </div>

        </div>
      )}
    </>
  );
}

export default Chatbot;