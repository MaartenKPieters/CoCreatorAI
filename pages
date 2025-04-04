import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: `Welcome to CoCreator AI. You'll learn how to create value with others through the 7 Principles of Complete Co-Creation. Let's begin with Principle 1: Awareness.`
    }
  ]);

  const suggestions = [
    'Give me a business example of Principle 1.',
    'How can I apply this in a leadership team?',
    'What if I face resistance to change?'
  ];

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: 'user', text: input }]);
    setInput('');

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    setMessages((prev) => [...prev, { sender: 'ai', text: data.reply }]);
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>CoCreator AI</h1>

      <div style={{ border: '1px solid #ddd', padding: 16, marginBottom: 16, minHeight: 200 }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ margin: '8px 0' }}>
            <strong>{msg.sender === 'ai' ? 'AI:' : 'You:'}</strong> {msg.text}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
        {suggestions.map((sug, idx) => (
          <button
            key={idx}
            onClick={() => setInput(sug)}
            style={{ border: '1px solid #ccc', padding: '6px 12px', cursor: 'pointer' }}
          >
            {sug}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <input
          style={{ flex: 1, padding: '8px', border: '1px solid #ccc' }}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
        />
        <button onClick={handleSend} style={{ padding: '8px 12px' }}>
          Send
        </button>
      </div>
    </div>
  );
}
