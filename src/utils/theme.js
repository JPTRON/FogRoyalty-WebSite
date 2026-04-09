import { createTheme } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';

const theme = createTheme({
  palette: {
	mode: "dark",
    primary: {
      main: "#ffa600",
    },
	background: {
      default: "#0b0809",
    },
  },
});

export default theme;