import {
	Avatar,
	Box,
	Container,
	Grid,
	Paper,
	Typography,
	CircularProgress,
} from "@mui/material"
import GroupsIcon from "@mui/icons-material/Groups"
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"
import PaidIcon from "@mui/icons-material/Paid"
import HistoryEduIcon from "@mui/icons-material/HistoryEdu"
import { createFileRoute } from "@tanstack/react-router"
import { useQuery } from "@tanstack/react-query"
import Header from "../components/Header"
import Footer from "../components/Footer"
import logo from "../assets/FogRoyaltyLogo.webp"
import hallOfFame from "../utils/HallOfFame.json";

export const Route = createFileRoute("/")({
	component: Home,
})

function Home() {
	const cards = [
		{
			title: "Founded",
			value: "03 December 2025",
			description: "Fog Royalty was founded in 2025 as an invite-only Dead by Daylight community.",
			icon: <HistoryEduIcon sx={{ fontSize: 28 }} />,
		},
		{
			title: "Community Funded",
			value: "100%",
			description: "Prize pools are funded through personal contributions and donations.",
			icon: <PaidIcon sx={{ fontSize: 28 }} />,
		},
		{
			title: "Community Size",
			value: "90+ Members",
			description: "Members across Steam and Discord.",
			subText: "(Last updated 10 May 2026)",
			icon: <GroupsIcon sx={{ fontSize: 28 }} />,
		},
		{
			title: "Tournament Stats",
			value: `${Object.values(hallOfFame).flat().length} Hosted / ${Object.values(hallOfFame).flat().reduce((a, b) => a += Number(b.prizePool ? b.prizePool : 0), 0)} €`,
			description: "Invitational tournaments and total prize money awarded.",
			icon: <EmojiEventsIcon sx={{ fontSize: 28 }} />,
		},
	]

	return (
		<Box
			sx={{
				minHeight: "100vh",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<Header />
			<Container maxWidth="lg" sx={{ flex: 1 }}>
				<Box
					sx={{
						minHeight: "50vh",
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						textAlign: "center",
					}}
				>
					<Avatar
						src={logo}
						sx={{
							width: 200,
							height: 200,
							mb: 3,
							filter: "drop-shadow(0 0 18px #ffffff59)",
						}}
					/>

					<Typography
						sx={{
							fontWeight: 800,
							fontSize: { xs: 42, md: 64 },
							letterSpacing: 2,
						}}
					>
						Fog Royalty
					</Typography>

					<Typography
						sx={{
							mt: 2,
							maxWidth: 700,
							fontSize: 18,
							lineHeight: 1.8,
							color: "#ffffffbf",
						}}
					>
						An invite-only Dead by Daylight group of friends who play together and host exclusive tournaments and events.
					</Typography>
				</Box>

				<Grid container spacing={3}>
					{cards.map((card, index) => (
						<Grid size={{ xs: 12, sm: 6 }} key={index} mb={6}>
							<Paper
								elevation={0}
								sx={(theme) => ({
									p: 3,
									height: "100%",
									background: "linear-gradient(145deg, #151112, #0f0c0d)",
									border: `1px solid ${theme.palette.primary.lightTranslucid}`,
									borderRadius: 3,
									boxShadow: `0 0 10px ${theme.palette.primary.translucid}`,
								})}
							>
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
										gap: 1.5,
										mb: 1,
										color: "primary.main",
									}}
								>
									{card.icon}

									<Typography
										sx={{
											fontSize: 25,
											fontWeight: 800,
											textTransform: "uppercase",
											letterSpacing: 1.5,
										}}
									>
										{card.title}
									</Typography>
								</Box>

								<Typography
									sx={{
										fontSize: 20,
										fontWeight: 800,
										mb: 1,
										display: "flex",
										alignItems: "center",
										overflowWrap: "anywhere",
										gap: 1,
									}}
								>
									{card.value}
								</Typography>

								<Typography
									sx={{
										color: "#ffffffa6",
										lineHeight: 1.7,
									}}
								>
									{card.description}
								</Typography>

								<Typography
									sx={{
										color: "#ffffffa6",
										lineHeight: 1.7,
										fontSize: "0.8rem"
									}}
								>
									{card.subText}
								</Typography>

							</Paper>
						</Grid>
					))}
				</Grid>
			</Container>
			<Footer />
		</Box>
	)
}