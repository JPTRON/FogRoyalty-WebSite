import { Box, Container, IconButton, Link, Typography, styled } from "@mui/material";
import SteamIcon from "../assets/steam-icon.svg?react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SocialButton = styled(IconButton)`
	color: white;
	transition: all 0.2s ease;

	&:hover {
		color: #ea9800;
		transform: translateY(-2px);
		filter: drop-shadow(0 0 6px rgba(234, 152, 0, 0.5));
	}
`;

export default function Footer() {
	return (
		<Box
			component="footer"
			sx={{
				mt: 10,
				backgroundImage: "linear-gradient(to top, #0b0809, #0d0d0d)",
				borderTop: "1px solid rgba(234, 152, 0, 0.15)",
				boxShadow: "0px 0px 12px rgba(234, 152, 0, 0.15)",
				py: 4,
			}}
		>
			<Container maxWidth="lg">
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						flexWrap: "wrap",
						gap: 2,
					}}
				>
					<Typography sx={{ fontWeight: 750, color: "white", fontSize: 17 }}>
						Check Us
					</Typography>
						
					<Link
						href={"https://steamcommunity.com/groups/FogRoyalty"}
						target="_blank"
						rel="noopener noreferrer"
						underline="none"
						sx={{
							display: "flex",
							filter: "drop-shadow(0 0 0.30rem #ffb12b)",
							width: "1.3rem",
							height: "1.3rem",
							marginLeft: -1,
							paddingLeft: "1px", 
							transition: "all 0.25s ease",
							"&:hover": {
								transform: "scale(1.05)"
							},
						}}
					>
						<SteamIcon fill={"none"} stroke={"#ea9800"} width={"100%"} height={"100%"}/>
					</Link>
				</Box>

				<Box
					sx={{
						height: "1px",
						backgroundColor: "rgba(255, 255, 255, 0.08)",
						my: 3,
					}}
				/>

				<Typography
					sx={{
						fontSize: 13,
						color: "rgba(255,255,255,0.5)",
					}}
				>
					© {new Date().getFullYear()} Fog Royalty all rights reserved
				</Typography>
			</Container>
		</Box>
	);
}