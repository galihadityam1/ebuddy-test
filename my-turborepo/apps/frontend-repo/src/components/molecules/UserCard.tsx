// components/molecules/UserCard.tsx
import { useState } from 'react';
import { User } from '../../apis/user';
import UpdateUserForm from './UpdateUserForm';
import Typography from '../atoms/Typography';
import Button from '../atoms/Button';

interface UserCardProps {
  user: User;
  onUpdate?: () => void;
}

export default function UserCard({ user, onUpdate }: UserCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdateSuccess = () => {
    setIsEditing(false);
    if (onUpdate) {
      onUpdate();
    }
  };

  return (
    <div className="border rounded-lg p-4 space-y-4">
      {!isEditing ? (
        <>
          <div className="space-y-2">
            <Typography variant="h3">{user.name}</Typography>
            <Typography>{user.email}</Typography>
          </div>
          <Button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Edit User
          </Button>
        </>
      ) : (
        <>
          <UpdateUserForm 
            user={user} 
            onSuccess={handleUpdateSuccess} 
          />
          <Button
            onClick={() => setIsEditing(false)}
            variant="secondary"
            className="mt-2"
          >
            Cancel
          </Button>
        </>
      )}
    </div>
  );
}