import { createTheme } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';

const theme = createTheme({
  palette: {
	mode: "dark",
    primary: {
      main: "#ea9800",
	  light: "#ffb12b",
	  translucid: "#ffc35527",
	  lightTranslucid: "#ea980033"
    },
	hallOfFame: {
		first: "#ea9800",
		second: "#7a7a7a",
		third: "#8f4000"
	},
	background: {
      default: "#0b0809",
    },
  },
});

export default theme;