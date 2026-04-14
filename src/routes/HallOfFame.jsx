import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Box,
	Container,
	Typography,
	Chip,
	Link
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { createFileRoute } from '@tanstack/react-router'
import Header from '../components/Header'
import hallOfFame from "../utils/HallOfFame.json";
import Footer from '../components/Footer';

export const Route = createFileRoute('/HallOfFame')({
	component: HallOfFame,
})

function HallOfFame() {
	return (
		<Box sx={{
			minHeight: "100vh",
			display: "flex",
			flexDirection: "column"
		}}>
			<Header />
			<Container maxWidth="lg" sx={{ flex: 1 }}>
				<Box mt={5}>
					<Typography sx={{ fontWeight: 600, fontSize: 50 }}>
						Hall Of Fame
					</Typography>

					<Box mt={4}>
						{Object.entries(hallOfFame).map(([type, tournaments], index) => (
							<Box key={index} mb={5}>
								<Typography
									sx={{
										fontWeight: 700,
										fontSize: 30,
										color: "primary.main",
										mb: 2
									}}
								>
									{type}
								</Typography>

								{tournaments.map((tournament, id) => (
									<Accordion
										key={id}
										disableGutters
										elevation={0}
										sx={{
											background: "transparent",
											boxShadow: "none",
											mb: 2,
											"&:before": {
												display: "none",
											},
										}}
									>
										<AccordionSummary
											expandIcon={
												<ExpandMoreIcon
													sx={{
														color: "primary.main",
														fontSize: 28,
														transition: "0.25s ease"
													}}
												/>
											}
											sx={{
												px: 2,
												py: 1,
												borderRadius: 2,
												minHeight: "unset",
												transition: "all 0.25s ease",
												"& .MuiAccordionSummary-content": {
													margin: 0,
												},

												"&:hover": {
													backgroundColor: "primary.translucid",
													boxShadow: "0 0 12px #ea980014"
												}
											}}
										>
											<Typography
												sx={{
													fontWeight: 600,
													fontSize: 20,
													color: "white",
													transition: "0.25s ease",
												}}
											>
												{tournament.title}
											</Typography>
										</AccordionSummary>

										<AccordionDetails
											sx={{
												mt: 1,
												position: "relative",
												overflow: "hidden",
												borderRadius: 3,
												border: "1px solid rgba(234, 152, 0, 0.2)",
												backgroundColor: "#151112",
												p: 3,
											}}
										>
											<Box
												sx={{
													position: "absolute",
													top: 0,
													right: 0,
													width: "50%",
													height: "100%",
													backgroundImage: `url(${tournament.art.image})`,
													backgroundRepeat: "no-repeat",
													backgroundSize: "cover",
													backgroundPosition: "center",
													opacity: 0.55,
													maskImage: "linear-gradient(to left, black 40%, transparent 100%)",
													WebkitMaskImage: "linear-gradient(to left, black 40%, transparent 100%)",
													pointerEvents: "none",
												}}
											/>

											<Box sx={{ position: "relative", zIndex: 1 }}>
												<Typography><strong>Date:</strong> {tournament.date}</Typography>
												<Typography><strong>Prize Pool:</strong> {tournament.prizePool}</Typography>

												<Box mt={2}>
													<Typography fontWeight={600}>Winners</Typography>
													{tournament.winners.map((winner, i) => (
														<Chip key={i} label={winner} color="primary" sx={{ marginLeft: 1, minWidth: "3rem" }} />
													))}
												</Box>

												<Box mt={1}>
													<Typography fontWeight={600}>Casters</Typography>
													<Typography ml={0.5} fontSize={15}>{tournament.casters.join(", ")}</Typography>
												</Box>
												<Box mt={1}>
													<Typography fontWeight={600}>Art Credits</Typography>
													<Typography ml={0.5} fontSize={15}>{tournament.art.credits.join(", ")}</Typography>
												</Box>
												<Box mt={1}>
													<Link
														href={tournament.vod}
														target="_blank"
														rel="noopener noreferrer"
														underline="none"
														sx={{
															display: "inline-block",
															px: 1.5,
															py: 0.5,
															borderRadius: 2,
															backgroundColor: "primary.translucid",
															color: "primary.main",
															transition: "all 0.25s ease",
															"&:hover": {
																backgroundColor: "primary.main",
																color: "black",
																boxShadow: "0 0 12px #ea980014"
															},
														}}
													>
														<Typography fontWeight={500}>Watch VOD</Typography>
													</Link>
												</Box>
											</Box>
										</AccordionDetails>
									</Accordion>
								))}
							</Box>
						))}
					</Box>
				</Box>
			</Container>
			<Footer />
		</Box>
	)
}