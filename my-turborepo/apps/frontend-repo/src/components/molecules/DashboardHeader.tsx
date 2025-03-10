import { Box, Button, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

interface DashboardHeaderProps {
  onLogout: () => void;
  title?: string;
}

export default function DashboardHeader({ 
  onLogout, 
  title = 'Dashboard' 
}: DashboardHeaderProps) {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        p: 2,
        borderBottom: 1,
        borderColor: 'divider'
      }}
    >
      <Typography variant="h4" component="h1">
        {title}
      </Typography>
      
      <Button
        variant="outlined"
        color="primary"
        onClick={onLogout}
        startIcon={<LogoutIcon />}
      >
        Logout
      </Button>
    </Box>
  );
}