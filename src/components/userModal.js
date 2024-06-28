import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const UserModal = ({ open, onClose, onSave, editingUser }) => {
  const [user, setUser] = useState({ name: '', email: '' });

  useEffect(() => {
    if (editingUser) {
      setUser(editingUser);
    } else {
      setUser({ name: '', email: '' });
    }
  }, [editingUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = () => {
    onSave(user);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <h2>{editingUser ? 'Edit User' : 'Add New User'}</h2>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={user.name}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={user.email}
          onChange={handleChange}
          margin="normal"
        />
        <Button onClick={handleSubmit} variant="contained" sx={{ mt: 2 }}>
          {editingUser ? 'Update' : 'Add'}
        </Button>
      </Box>
    </Modal>
  );
};

export default UserModal;
