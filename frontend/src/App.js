import React, { useState } from "react";

const App = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      const jsonParsed = JSON.parse(jsonInput);
      const response = await fetch("https://your-backend.herokuapp.com/bfhl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jsonParsed),
      });
      const data = await response.json();
      setResponseData(data);
    } catch (error) {
      alert("Invalid JSON format!");
    }
  };

  return (
    <div>
      <h1>FastAPI Challenge</h1>
      <textarea
        rows="5"
        cols="50"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder='Enter JSON (e.g., {"data": ["A", "B", "1"]})'
      />
      <button onClick={handleSubmit}>Submit</button>
      {responseData && (
        <div>
          <h2>Response</h2>
          <select multiple onChange={(e) => setSelectedOptions([...e.target.selectedOptions].map(o => o.value))}>
            <option value="numbers">Numbers</option>
            <option value="alphabets">Alphabets</option>
            <option value="highest_alphabet">Highest Alphabet</option>
          </select>
          <pre>{JSON.stringify(
            Object.fromEntries(
              Object.entries(responseData).filter(([key]) => selectedOptions.includes(key))
            ),
            null,
            2
          )}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
