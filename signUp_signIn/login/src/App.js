import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import React from "react"
import { BrowserRouter , Route ,Routes} from 'react-router-dom';
import Auth from "./Auth";
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/auth" element={<Auth />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
