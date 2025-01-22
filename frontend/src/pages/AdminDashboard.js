import React, { useEffect, useState } from 'react';
import axios from 'axios';
import url from '../utils/appUrls';
import { succesPopUp, errorPopUp } from '../utils/Toaster';

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get(url.admin.getAllStudents); 
        setStudents(res.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
    fetchStudents();
  }, []);

  const approveStudent = async (id) => {
    try {
      await axios.put(`${url.admin.approveStudent}/${id}`); 
      setStudents(students.map(s => s._id === id ? { ...s, isApproved: true } : s));
      succesPopUp('Student approved successfully');
    } catch (error) {
      console.error('Error approving student:', error);
      errorPopUp('Failed to approve student');
    }
  };

  const deleteStudent = async (id) => {
    try {
        await axios.put(`${url.admin.deleteStudent}/${id}`);  
        setStudents(students.filter(s => s._id !== id));      
        succesPopUp('Student deleted successfully');
    } catch (error) {
        console.error('Error deleting student:', error);
        errorPopUp('Failed to delete student');
    }
  };

  return (
    <div className="admin-dashboard">
      <h2 className="admin-dashboard-title">Admin Dashboard</h2>
      <table className="admin-dashboard-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student._id} className={student.isApproved ? 'approved-row' : 'pending-row'}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.course}</td>
              <td className={student.isApproved ? 'status-approved' : 'status-pending'}>
                {student.isApproved ? 'Approved' : 'Pending'}
              </td>
              <td>
                {!student.isApproved && (
                  <button className="approve-button" onClick={() => approveStudent(student._id)}>
                    Approve
                  </button>
                )}
                <button 
                  onClick={() => deleteStudent(student._id)} 
                  style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
