import { StrictMode } from 'react'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from "./routeTree.gen"
import { createRoot } from 'react-dom/client'
import PageNotFound from './components/404'
import { ThemeProvider } from '@mui/material/styles'
import theme from "./utils/theme";
import { GlobalStyles } from '@mui/material'

const router = createRouter({ routeTree, defaultNotFoundComponent: PageNotFound, })

createRoot(document.getElementById('root')).render(
	<StrictMode>
    	<ThemeProvider theme={theme}>
			<GlobalStyles
				styles={(theme) => ({
					body: {
						backgroundColor: theme.palette.background.default,
						color: theme.palette.text.primary,
					},
				})}
			/>
			<RouterProvider router={router}/>
		</ThemeProvider>
	</StrictMode>,
)
