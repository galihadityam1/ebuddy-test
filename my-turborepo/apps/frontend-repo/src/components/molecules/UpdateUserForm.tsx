import React, { useState } from 'react';
import { useUpdateUser } from '../../hooks/useUpdateUser';
import { User, UpdateUserData } from '../../apis/user';
import { 
    Box, 
    TextField, 
    Button, 
    Typography, 
    CircularProgress 
  } from '@mui/material';

interface UpdateUserFormProps {
  user: User;
  onSuccess?: () => void;
}

export default function UpdateUserForm({ user, onSuccess }: UpdateUserFormProps) {
  const { updateUser, loading, success, error } = useUpdateUser();
  const [formData, setFormData] = useState<UpdateUserData>({
    email: user.email,
    name: user.name,
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updateData: UpdateUserData = Object.entries(formData)
      .reduce((acc, [key, value]) => {
        if (value !== '') {
          acc[key as keyof UpdateUserData] = value;
        }
        return acc;
      }, {} as UpdateUserData);

    try {
      await updateUser(user.id, updateData);
      if (onSuccess) {
        onSuccess();
      }

      setFormData(prev => ({ ...prev, password: '' }));
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        fullWidth
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        margin="normal"
      />

      <TextField
        fullWidth
        type="password"
        label="New Password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        margin="normal"
      />

      <Button
        fullWidth
        type="submit"
        variant="contained"
        disabled={loading}
        sx={{ mt: 2 }}
      >
        {loading ? <CircularProgress size={24} /> : 'Update User'}
      </Button>

      {success && (
        <Typography color="success.main" sx={{ mt: 2 }}>
          User updated successfully!
        </Typography>
      )}

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          Error: {error}
        </Typography>
      )}
    </Box>
  );
}