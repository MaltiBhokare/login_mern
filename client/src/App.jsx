

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Welcome from './welcome';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root URL to /Signup */}
        <Route path="/" element={<Navigate to="/Signup" />} />

        {/* Define other routes */}
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/welcome" element={<Welcome />} /> {/* Welcome route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
