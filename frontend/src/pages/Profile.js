import React, { useEffect, useState } from 'react';
import axios from 'axios';
import url from '../utils/appUrls';
import { useNavigate } from 'react-router-dom';
import { errorPopUp, succesPopUp } from '../utils/Toaster';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('studentToken');

      if (!token) {
        errorPopUp('Please log in to access your profile.');
        navigate('/login');
        return;
      }

      try {
        const res = await axios.get(url.student.profile, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        if (error.response && error.response.status === 401) {
          errorPopUp('Session expired. Please log in again.');
          localStorage.removeItem('studentToken');
          navigate('/login');
        } else {
          errorPopUp('Failed to load profile. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const deleteProfile = async () => {
    const token = localStorage.getItem('studentToken');

    if (window.confirm('Are you sure you want to delete your profile?')) {
      try {
        await axios.put(url.student.deleteProfile, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });

        succesPopUp('Profile deleted successfully.');
        localStorage.removeItem('studentToken');
        localStorage.removeItem('student');
        navigate('/signup');
      } catch (error) {
        console.error('Error deleting profile:', error);
        errorPopUp('Failed to delete profile. Please try again later.');
      }
    }
  };

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (!profile) {
    return <p>Profile not found.</p>;
  }

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Course:</strong> {profile.course}</p>
      <p><strong>Phone Number:</strong> {profile.phone}</p>
      <p><strong>Status:</strong> {profile.status}</p>

      <button 
        onClick={deleteProfile}
        style={{
          backgroundColor: 'red',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '10px'
        }}
      >
        Delete Profile
      </button>
    </div>
  );
};

export default Profile;
