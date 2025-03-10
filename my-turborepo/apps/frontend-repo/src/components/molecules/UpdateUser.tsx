import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateUser } from '../../store/actions';
import { User } from '../../apis/user';
import Typography from '../atoms/Typography';
import Button from '../atoms/Button';
import { useUpdateUser } from '../../hooks/useUpdateUser';


interface UpdateUserProps {
  user: User;
  onSuccess?: () => void;
}

export default function UpdateUser({ user, onSuccess }: UpdateUserProps) {
  const dispatch = useAppDispatch();
  const { loading, success, error } = useAppSelector(
      (state) => state.users.updateStatus
    );

  const [userData, setUserData] = useState({
    email: user.email,
    // ... other fields
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(updateUser({ 
        userId: user.id, 
        userData 
      })).unwrap();
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  return (
    <div className="p-4 border rounded">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>

        {/* Add other fields as needed */}

        <Button
          type="submit"
          disabled={loading}
          variant="primary"
          className="w-full"
        >
          {loading ? 'Updating...' : 'Update User'}
        </Button>

        {success && (
          <Typography color="success">
            User updated successfully!
          </Typography>
        )}
        
        {error && (
          <Typography color="error">
            Error: {error}
          </Typography>
        )}
      </form>
    </div>
  );
}