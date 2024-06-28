"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserTable from '../components/userTable';
import UserModal from '../components/userModal';
import ConfirmDialog from '../components/confirmDialog';
import { Button } from '@mui/material';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users', error);
    }
  };

  const handleCreateUser = async (user) => {
    try {
      await axios.post('/api/users/create', user);
      fetchUsers();
    } catch (error) {
      console.error('Error creating user', error);
    }
  };

  const handleUpdateUser = async (user) => {
    try {
      await axios.put('/api/users/update', { id: user.id, ...user });
      fetchUsers();
    } catch (error) {
      console.error('Error updating user', error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete('/api/users/delete', { data: { id: userToDelete } });
      fetchUsers();
      setConfirmOpen(false);
      setUserToDelete(null);
    } catch (error) {
      console.error('Error deleting user', error);
    }
  };

  const openModal = (user = null) => {
    setEditingUser(user);
    setModalOpen(true);
  };

  const openConfirmDialog = (userId) => {
    setUserToDelete(userId);
    setConfirmOpen(true);
  };

  return (
    <div>
      <h1>User Management</h1>
      <Button variant="contained" onClick={() => openModal()}>
        Add New User
      </Button>
      <UserTable users={users} onEdit={openModal} onDelete={openConfirmDialog} />
      <UserModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={editingUser ? handleUpdateUser : handleCreateUser}
        editingUser={editingUser}
      />
      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDeleteUser}
      />
    </div>
  );
};

export default UserManagement;
