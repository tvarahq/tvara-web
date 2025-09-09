import "./App.css";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Docs from "./pages/Docs";
import Blog from "./pages/Blog";
import Integrations from "./pages/Integrations";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/docs" element={<Docs />} />
      <Route path="/integrations" element={<Integrations />} />
    </Routes>
  );
}

export default App;
