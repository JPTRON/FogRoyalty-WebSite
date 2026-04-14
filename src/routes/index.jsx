import { Box, Container, Typography } from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'
import Header from '../components/Header'
import Footer from '../components/Footer'

export const Route = createFileRoute('/')({
	component: Home,
})

function Home() {
	return (
		<Box sx={{
			minHeight: "100vh",
			display: "flex",
			flexDirection: "column"
		}}>
			<Header />
			<Container maxWidth="lg" sx={{ flex: 1 }}>
				<Box mt={5}>
					<Typography sx={{ fontWeight: 600, fontSize: 50 }}>Fog Royalty</Typography>
				</Box>
			</Container>
			<Footer />
		</Box>
	)
}