'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchUsers } from '../../store/actions';
import Typography from '../../components/atoms/Typography';
import UserList from '@/components/organisms/UserList';
import { useAuth } from '@/hooks/userAuth';
import DashboardHeader from '@/components/molecules/DashboardHeader';


export default function DashboardPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { isAunthenticated, logout } = useAuth()
  const { loading, error, updateStatus } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    if (isAunthenticated) {
      dispatch(fetchUsers());
    }
  }, [dispatch, isAunthenticated]);

  const handleFetchUsers = async () => {
    await dispatch(fetchUsers());
  };


  return (
    <div className="container mx-auto p-4">
      <DashboardHeader onLogout={logout} />

      <button
        onClick={handleFetchUsers}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Fetch Users
      </button>

      {loading && <Typography>Loading users...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      {updateStatus.loading && <Typography>Updating user...</Typography>}
      {updateStatus.success && (
        <Typography color="success">User updated successfully!</Typography>
      )}
      {updateStatus.error && (
        <Typography color="error">{updateStatus.error}</Typography>
      )}

      <UserList />
    </div>
  );
}