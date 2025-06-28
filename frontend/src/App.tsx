import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "@/components/Form.tsx";
import Dashboard from "@/pages/dashboard.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </Router>
  );
}

export default App;