// ollama-proxy.cjs
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const OLLAMA_HOST = 'http://localhost:11434';

app.post('/api/chat', async (req, res) => {
  try {
    const { messages, model = 'llama3' } = req.body;
    
    // Chuyển đổi format messages thành prompt
    const prompt = messages.map(m => `${m.role}: ${m.content}`).join('\n');
    
    const response = await fetch(`${OLLAMA_HOST}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: model,
        prompt: prompt,
        stream: false
      })
    });
    
    const data = await response.json();
    res.json({ text: data.response });
  } catch (error) {
    res.status(500).json({ error: 'Ollama error', detail: error.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Ollama proxy running at http://localhost:${PORT}`);
});