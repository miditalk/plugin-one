'use client';

import { PluginName, CompanyName, CompanyWebsite } from '@/src/define';

import * as Juce from 'juce-framework-frontend';

import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { useAboutStore } from '@/src/store/AboutStore';

const visitWebsite = Juce.getNativeFunction('visitWebsite');

export default function App() {
  const { setOpen } = useAboutStore();

  return (
    <AppBar
      color="info"
      sx={{
        position: 'static',
        px: 2,
        py: 1,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          minHeight: 'var(--Header-minHeight)'
        }}
      >
        <Button
          onClick={() => setOpen(true)}
          variant="text"
          sx={{
            px: 0,
            color: 'var(--mui-palette-white)',
            fontWeight: 'var(--mui-fontWeight-xl)',
          }}
        >
          {PluginName}
        </Button>

        <Button
          onClick={() => visitWebsite(CompanyWebsite)}
          variant="text"
          sx={{
            px: 0,
            color: 'var(--mui-palette-white)',
            fontWeight: 'var(--mui-fontWeight-xl)',
          }}
        >
          {CompanyName}
        </Button>
      </Stack>
    </AppBar>
  );
}
