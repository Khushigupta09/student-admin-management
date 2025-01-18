import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const Nav = () => {
  const studentAuth = localStorage.getItem('studentToken');
  const adminAuth = localStorage.getItem('adminToken');
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/login'); // Redirect to login after logout
  };

  const adminLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login'); // Redirect to admin login after logout
  };

  return (
    <div>
      <ul className="nav-ul">
        

        {/* Student Links */}
        {studentAuth && (
          <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link onClick={logout} to="/login">Logout</Link></li>
          </>
        )}

        {/* Admin Links */}
        {adminAuth && (
          <>
            <li><Link to="/admin/dashboard">Admin Dashboard</Link></li>
            <li><Link onClick={adminLogout} to="/admin/login">Logout</Link></li>
          </>
        )}

        {/* If no one is logged in */}
        {!studentAuth && !adminAuth && (
          <>
            <li><Link to="/signup">SignUp</Link></li>
            <li><Link to="/login">Student Login</Link></li>
            <li><Link to="/admin/login">Admin Login</Link></li>
          </>
        )}
      </ul>
      <Outlet/>
    </div>
  );
};

export default Nav;
