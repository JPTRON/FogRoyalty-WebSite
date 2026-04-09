import { Box, Container, Typography } from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'
import Header from '../components/Header'

export const Route = createFileRoute('/Statistics')({
  component: Statistics,
})

function Statistics() {
	return (
	<>
		<Header/>
		<Container maxWidth="lg">
			<Box mt={5}>
				<Typography sx={{fontWeight: 600, fontSize: 50}}>Statistics</Typography>
			</Box>
		</Container>
	</>
	)
}