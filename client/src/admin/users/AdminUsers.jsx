import React, { useEffect, useState } from 'react';
import './adminUsers.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios"; 
import { server } from '../../main';
import Layout from '../utlis/Layout';
import toast from 'react-hot-toast';

const AdminUsers = ({ user }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate('/');
    }
  }, [user, navigate]);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`${server}/api/users`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setUsers(data.users);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateRole = async(id) => {
    if(confirm("Are you sure you want to update this user role")){
      try {
        const {data} = await axios.put(`${server}/api/user/${id}`, {}, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        toast.success(data.message);
        fetchUsers();
      } catch (err) {
        toast.error(err.response.data.message);
      }
    }
  };

  return (
    <Layout>
      <div className="users">
        <h1>All Users</h1>
        <table border="1">
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Update Role</th>
            </tr>
          </thead>
          <tbody>
            {users && users.map((e, index) => (
              <tr key={e._id}>
                <td>{index + 1}</td>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>{e.role}</td>
                <td><button onClick={() => updateRole(e._id)}>Update Role</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default AdminUsers;
