import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import MapPage from './components/MapPage';
import VerifyEmail from './components/VerifyEmail';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify/:token" element={<VerifyEmail />} />
            <Route 
              path="/map" 
              element={<PrivateRoute />} 
            >
              <Route path="" element={<MapPage />} />
            </Route>
            <Route path="/" element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
