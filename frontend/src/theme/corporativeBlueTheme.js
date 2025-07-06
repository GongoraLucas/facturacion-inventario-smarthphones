import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

export const coporativeBlueTheme = createTheme({
  palette: {
    primary: {
      main: '#1976D2',
    },
    secondary: {
      main: '#455A64',
    },
    error: {
      main: red.A400,
    },
  },
  typografy: {
    fontSize: 14,
  },
});
