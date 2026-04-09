import { Box, Container, Typography } from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'
import Header from '../components/Header'

export const Route = createFileRoute('/About')({
  component: About,
})

function About() {
	return (
	<>
		<Header/>
		<Container maxWidth="lg">
			<Box mt={5}>
				<Typography sx={{fontWeight: 600, fontSize: 50}}>About</Typography>
			</Box>
		</Container>
	</>
	)
}