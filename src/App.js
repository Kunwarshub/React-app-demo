import React, { useState } from "react";
import axios from "axios";

function App() {
  const [inputData, setInputData] = useState("");
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataArray = inputData.split(",").map((item) => item.trim());

    try {
      const res = await axios.post("http://127.0.0.1:8000/bfhl", { data: dataArray });
      setResponse(res.data);
    } catch (error) {
      console.error("Error sending request:", error);
      setResponse({ error: "Something went wrong" });
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto", textAlign: "center" }}>
      <h2>FastAPI + React Demo</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter values (e.g., A, b, 1, 2, D)"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          style={{ width: "80%", padding: "8px", marginBottom: "10px" }}
        />
        <button type="submit" style={{ padding: "8px 12px", cursor: "pointer" }}>Submit</button>
      </form>

      {response && (
        <div style={{ marginTop: "20px", textAlign: "left" }}>
          <h3>Response:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
