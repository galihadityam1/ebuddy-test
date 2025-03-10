import { FC } from 'react';
import { useSelector } from 'react-redux';
import Button from '../atoms/Button';
import { RootState } from '../../store/store';
import { User } from '@/apis/user';

interface UpdateButtonProps {
  userId: string;
  userData: Partial<User>;
}

const UpdateButton: FC<UpdateButtonProps> = () => {
  const { loading } = useSelector((state: RootState) => state.users.updateStatus);
  return (
    <Button 
    //   onClick={handleUpdate}
      isLoading={loading}
      variant="primary"
    >
      Update User
    </Button>
  );
};

export default UpdateButton;