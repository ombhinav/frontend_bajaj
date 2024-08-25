import React, { useState, useEffect } from 'react';
import './App.css'; 

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState('');
  const API_URL = process.env.REACT_APP_API_URL || 'https://backend-bajaj-1umx.onrender.com/bfhl';
  const handleSubmit = async () => {
    try {
      setError('');
      const parsedInput = JSON.parse(jsonInput);
      const res = await fetch('https://backend-bajaj-1umx.onrender.com/bfhl', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: parsedInput.data })
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      setError('Invalid JSON or API error');
    }
  };

  const renderResponse = () => {
    if (!response) return null;
    const { numbers, alphabets, highest_lowercase_alphabet } = response;
    return (
      <div className="response">
        {selectedOptions.includes('Numbers') && (
          <div className="response-item">
            <h3>Numbers:</h3>
            <p>{numbers.join(', ')}</p>
          </div>
        )}
        {selectedOptions.includes('Alphabets') && (
          <div className="response-item">
            <h3>Alphabets:</h3>
            <p>{alphabets.join(', ')}</p>
          </div>
        )}
        {selectedOptions.includes('Highest lowercase alphabet') && (
          <div className="response-item">
            <h3>Highest Lowercase Alphabet:</h3>
            <p>{highest_lowercase_alphabet.join(', ')}</p>
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    document.title = "21BCE3310"; 
  }, []);

  return (
    <div className="container">
      <h1>BFHL Challenge</h1>
      <div className="input-section">
        <textarea
          value={jsonInput}
          onChange={e => setJsonInput(e.target.value)}
          placeholder="Enter JSON here (e.g., { &quot;data&quot;: [&quot;A&quot;, &quot;1&quot;, &quot;B&quot;, &quot;2&quot;, &quot;c&quot;] })"
          rows={5}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      {error && <div className="error">{error}</div>}
      <div className="select-section">
        <label>Select Data to Display:</label>
        <select
          multiple
          onChange={e => setSelectedOptions([...e.target.selectedOptions].map(o => o.value))}
          value={selectedOptions}
        >
          <option value="Numbers">Numbers</option>
          <option value="Alphabets">Alphabets</option>
          <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
        </select>
      </div>
      {renderResponse()}
    </div>
  );
}

export default App;
