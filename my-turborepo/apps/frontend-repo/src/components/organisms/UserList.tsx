import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchUsers } from '../../store/actions';
import UserCard from '../molecules/UserCard';
import Typography from '../atoms/Typography';

export default function UserList() {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleUserUpdate = () => {
    dispatch(fetchUsers());
  };

  if (loading) {
    return <Typography>Loading users...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <UserCard 
          key={user.id} 
          user={user} 
          onUpdate={handleUserUpdate}
        />
      ))}
    </div>
  );
}