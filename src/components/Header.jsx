import {
	AppBar,
	Avatar,
	Box,
	Button,
	Container,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
	styled,
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "@tanstack/react-router";
import logo from "../assets/FogRoyaltyLogo.webp";
import { useState } from "react";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const StyledLink = styled(Link)`
	color: white;
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

const AppBarButton = styled(Button)`
	transition: all 0.1s ease;
	
	&:hover {
		box-shadow: 0 0px 0px rgba(0, 0, 0, 0.3);
		opacity: 1;
		filter: brightness(1);
		color: #ffbb00;
	}
`;

export default function Header() {
	const [anchorEl, setAnchorEl] = useState(null);

	const handleOpenMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleCloseMenu = () => {
		setAnchorEl(null);
	};

	const handleToggleMenu = (event) => {
	if (anchorEl) {
		setAnchorEl(null);
	} else {
		setAnchorEl(event.currentTarget);
	}
};

	return (
		<AppBar position="sticky" sx={{ backgroundImage: "linear-gradient(to bottom, #0d0d0d, #0b0809)", boxShadow: "0px 0px 7px #e19e07"}}>
			<Container maxWidth={"lg"} mx={"auto"}>
				<Toolbar sx={{ justifyContent: "space-between" }} disableGutters>
					<Link to="/">
						<Avatar
							src={logo}
							sx={{
								my: 1,
								transition: "all 0.1s ease",
								filter: "drop-shadow(0 0 0.30rem white)",
								width: 60,
								height: "auto",
								"&:hover": { transform: "scale(1.05)" }
							}}
						/>
					</Link>

					<Box sx={{ display: { xs: "none", md: "flex" } }}>
						<StyledLink to="/statistics">
							<AppBarButton sx={{ color: "white" }}>
								<Typography sx={{ fontWeight: "600" }}>Statistics</Typography>
							</AppBarButton>
						</StyledLink>

						<StyledLink to="/halloffame">
							<AppBarButton sx={{ color: "white" }}>
								<Typography sx={{ fontWeight: "600" }}>Hall of Fame</Typography>
							</AppBarButton>
						</StyledLink>

						<StyledLink to="https://streamelements.com/fogroyalty/tip" target="_blank" rel="noreferrer">
							<AppBarButton sx={{ color: "white" }}>
								<Typography sx={{ fontWeight: "600" }}>Support us</Typography> <OpenInNewIcon sx={{ paddingBottom: 0.2, marginLeft: 0.5, fontSize: "1.1rem"}}/>
							</AppBarButton>
						</StyledLink>
					</Box>

					<Box sx={{ display: { xs: "flex", md: "none" } }}>
						<IconButton onClick={handleOpenMenu} sx={{ color: "white" }}>
							<MenuIcon />
						</IconButton>

						<Menu
							anchorEl={anchorEl}
							open={Boolean(anchorEl)}
							onClose={handleToggleMenu}
							slotProps={{
								paper: {
									sx: {
										backgroundColor: "#111",
										color: "white",
										mt: 1.5,
										borderRadius: 2,
										boxShadow: "0px 0px 10px black",
									}
								}
							}}
						>
							<MenuItem onClick={handleCloseMenu}>
								<StyledLink to="/statistics"><Typography sx={{ fontWeight: "600" }}>Statistics</Typography></StyledLink>
							</MenuItem>

							<MenuItem onClick={handleCloseMenu}>
								<StyledLink to="/halloffame"><Typography sx={{ fontWeight: "600" }}>Hall of Fame</Typography></StyledLink>
							</MenuItem>

							<MenuItem onClick={handleCloseMenu}>
								<StyledLink to="https://streamelements.com/fogroyalty/tip" target="_blank" rel="noreferrer"><Typography sx={{ fontWeight: "600" }}>Support us</Typography> <OpenInNewIcon sx={{ fontSize: "1.1rem"}}/></StyledLink>
							</MenuItem>
						</Menu>
					</Box>

				</Toolbar>
			</Container>
		</AppBar>
	);
}
