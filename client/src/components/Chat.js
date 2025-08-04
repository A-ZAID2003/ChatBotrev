import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // or your deployed backend URL

const Chat = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    socket.on('botReply', (botMsg) => {
      setChatHistory((prev) => [...prev, { sender: 'bot', text: botMsg }]);
    });

    return () => {
      socket.off('botReply'); // cleanup
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() === '') return;

    setChatHistory((prev) => [...prev, { sender: 'user', text: message }]);
    socket.emit('userMessage', message);
    setMessage('');
  };

  return (
    <div style={styles.container}>
      <h2>💬 Chat with Bot</h2>
      <div style={styles.chatBox}>
        {chatHistory.map((msg, idx) => (
          <div
            key={idx}
            style={{
              textAlign: msg.sender === 'user' ? 'right' : 'left',
              margin: '5px 0',
            }}
          >
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div style={styles.inputBox}>
        <input
          type="text"
          value={message}
          placeholder="Type your message..."
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.button}>Send</button>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '20px', maxWidth: '500px', margin: 'auto' },
  chatBox: {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px',
    height: '300px',
    overflowY: 'auto',
    marginBottom: '10px',
  },
  inputBox: { display: 'flex', gap: '10px' },
  input: { flex: 1, padding: '8px' },
  button: { padding: '8px 12px' },
};

export default Chat;
