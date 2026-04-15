import { StrictMode } from 'react'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from "./routeTree.gen"
import { createRoot } from 'react-dom/client'
import PageNotFound from './components/404'
import { ThemeProvider } from '@mui/material/styles'
import theme from "./utils/theme";
import { GlobalStyles } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const router = createRouter({ routeTree, defaultNotFoundComponent: PageNotFound, })
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme}>
				<GlobalStyles
					styles={(theme) => ({
						html: {
							scrollbarWidth: "thin",
							scrollbarColor: "#ea9800 #0b0809",
						},
						body: {
							backgroundColor: theme.palette.background.default,
							color: theme.palette.text.primary,
							scrollbarWidth: "thin",
							scrollbarColor: "#ea9800 #0b0809",
						},
						"::-webkit-scrollbar": {
							width: "6px",
						},

						"::-webkit-scrollbar-track": {
							background: theme.palette.background.default,
						},

						"::-webkit-scrollbar-thumb": {
							backgroundColor: theme.palette.text.primary.main,
							borderRadius: "999px",
							transition: "background-color 0.2s ease",
						},

						"::-webkit-scrollbar-thumb:hover": {
							backgroundColor: theme.palette.text.primary.light,
						},
					})}
				/>
				<RouterProvider router={router} />
			</ThemeProvider>
		</QueryClientProvider>
	</StrictMode>,
)
