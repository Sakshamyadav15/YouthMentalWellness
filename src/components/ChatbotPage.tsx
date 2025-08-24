import { useState } from 'react';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'; // Example endpoint
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || '';

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    { role: 'system', content: 'You are a helpful mental wellness assistant.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError(null);
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    try {
      if (!GROQ_API_KEY) throw new Error('Groq API key missing. Set VITE_GROQ_API_KEY in your .env file.');
      const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-4-scout-17b-16e-instruct',
          messages: newMessages,
        }),
      });
      let errorText = '';
      if (!response.ok) {
        try {
          errorText = await response.text();
        } catch {}
        throw new Error(`API error: ${response.status} ${errorText}`);
      }
      const data = await response.json();
      const aiReply = data.choices?.[0]?.message?.content || 'No response.';
      setMessages([...newMessages, { role: 'assistant', content: aiReply }]);
    } catch (err: any) {
      setError(err.message || 'Failed to get response from Groq API.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-br from-blue-100 via-purple-50 to-pink-50">
      <div className="max-w-xl w-full bg-white/80 rounded-2xl shadow-xl p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">AI Chatbot</h1>
        <div className="flex-1 overflow-y-auto mb-4">
          {messages.filter(m => m.role !== 'system').map((msg, idx) => (
            <div key={idx} className={`mb-2 text-sm ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
              <span className={`inline-block px-3 py-2 rounded-xl ${msg.role === 'user' ? 'bg-blue-200 text-blue-800' : 'bg-purple-200 text-purple-800'}`}>{msg.content}</span>
            </div>
          ))}
        </div>
        {error && <div className="mb-2 text-red-600 text-center">{error}</div>}
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={loading}
            onKeyDown={e => { if (e.key === 'Enter') sendMessage(); }}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="px-4 py-2 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            {loading ? '...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
