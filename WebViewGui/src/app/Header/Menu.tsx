'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import MenuIcon from '@mui/icons-material/Menu';

export default function Page() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <IconButton
        onClick={handleClick}
        sx={{
          color: 'var(--mui-palette-white)',
        }}
        disableRipple
      >
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            sx: {
              py: 0,
              backgroundColor: 'var(--mui-palette-primary-darken)',
              color: 'var(--mui-palette-white)',
              '& .MuiMenuItem-root': {
                py: 0,
                minHeight: '2.4em',
                fontSize: 'var(--mui-fontSize-sm)',
              },
              '& .MuiMenuItem-root:hover': {
                backgroundColor: 'var(--mui-palette-primary-dark)',
              },
              '& .MuiDivider-root': {
                borderColor: 'var(--mui-palette-primary-main)',
              },
            }
          }
        }}
      >
        <MenuItem onClick={handleClose}>Open Manual</MenuItem>
        <MenuItem onClick={handleClose}>About</MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>System Infomation</MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>Deactivate</MenuItem>
      </Menu>
    </Box>
  );
}
