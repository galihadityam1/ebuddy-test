// hooks/useUpdateUser.ts
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { updateUser } from '../store/actions';
import { User } from '../apis/user';
import { useEffect } from 'react';
import { clearUpdateStatus } from '../store/reducers';

export const useUpdateUser = () => {
  const dispatch = useAppDispatch();
  const updateStatus = useAppSelector((state) => state.users.updateStatus);

  useEffect(() => {
    return () => {
      dispatch(clearUpdateStatus());
    };
  }, [dispatch]);

  const handleUpdate = async (userId: string, userData: Partial<User>) => {
    try {
      await dispatch(updateUser({ userId, userData })).unwrap();
      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    updateUser: handleUpdate,
    ...updateStatus,
  };
};