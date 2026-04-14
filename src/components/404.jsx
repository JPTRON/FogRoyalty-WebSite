import Header from '../components/Header'
import { Box, Typography } from '@mui/material'
import Footer from './Footer'

export default function PageNotFound() {
	return (
		<Box sx={{
			minHeight: "100vh",
			display: "flex",
			flexDirection: "column"
		}}>
			<Header />
			<Box sx={{ flex: 1, alignContent: "center", alignSelf: "center" }}>
				<Typography fontSize={50} fontWeight={600}>404 | This page does not exist</Typography>
			</Box>
			<Footer />
		</Box>
	)
}