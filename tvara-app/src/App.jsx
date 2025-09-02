import "./App.css";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      {/* <Route path="/blog" element={<div>Blog Page</div>} />
      <Route path="/docs" element={<div>Docs Page</div>} /> */}
    </Routes>
  );
}

export default App;
