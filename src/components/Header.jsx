import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Map App</Link>
        <nav>
          {isLoggedIn ? (
            <>
              <Link to="/map" className="mr-4">Map</Link>
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4">Login</Link>
              <Link to="/register" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
