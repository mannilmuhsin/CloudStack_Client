import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';

function VerifyEmail() {
  const [message, setMessage] = useState('');
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await api.verifyEmail(token);
        setMessage(response.data.message);
        setTimeout(() => navigate('/login'), 3000);
      } catch (error) {
        setMessage('Verification failed. Please try again.');
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Email Verification</h2>
      <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3">
        {message}
      </div>
    </div>
  );
}

export default VerifyEmail;
