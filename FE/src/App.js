import { useState } from 'react';
import axios from 'axios';

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { data } = await axios.post('/chat', { prompt });

    setResponse(data.message);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      <div>{response}</div>
    </div>
  );
}

export default App;