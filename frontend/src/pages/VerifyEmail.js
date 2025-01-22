import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import url from '../utils/appUrls';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verify = async () => {
      try {
        const token = searchParams.get('token');
        const res = await axios.get(`${url.student.verifyEmail}?token=${token}`);
        setMessage(res.data.message);
      } catch (error) {
        console.error('Error verifying email:', error);
        setMessage('Verification failed. Please try again.');
      }
    };

    verify();
  }, [searchParams]);

  return (
    <div className="verify-email">
      <h2>Email Verification</h2>
      <p>{message}</p>
    </div>
  );
};

export default VerifyEmail;
