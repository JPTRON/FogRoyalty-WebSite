import { Box } from '@mui/material'
import { Outlet, Link, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
	component: RootComponent,
})

function RootComponent() {
	return (
		<Box sx={{m: -1}}>
			<Outlet />
		</Box>
	)
}