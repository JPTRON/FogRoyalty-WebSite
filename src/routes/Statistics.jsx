import { Autocomplete, Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'
import Header from '../components/Header'
import { useMemo, useState } from 'react';
import matches4v1 from "../utils/Matches4v1.json";
import matches1v1 from "../utils/Matches1v1.json";
import { DataGrid } from '@mui/x-data-grid';
import _ from "lodash";

export const Route = createFileRoute('/Statistics')({
	component: Statistics,
})

function Statistics() {
	const [statsFormat, setStatsFormat] = useState("4v1");
	const [selectedFilter, setSelectedFilter] = useState("killers");
	const [selectedKiller, setSelectedKiller] = useState("All Killers");
	const [selectedMap, setSelectedMap] = useState("All Maps");

	const allKillers = [...new Set((statsFormat === "4v1" ? matches4v1 : matches1v1).map(match => (match.killer)))];
	const allMaps = [...new Set((statsFormat === "4v1" ? matches4v1 : matches1v1).map(match => (match.map)))];

	const matchesArr = useMemo(() => {
		let arr = statsFormat === "4v1" ? matches4v1 : matches1v1;

		if (selectedKiller !== "All Killers") {
			arr = arr.filter(match => match.killer === selectedKiller);
		}

		if (selectedMap !== "All Maps") {
			arr = arr.filter(match => match.map === selectedMap);
		}

		return arr;
	}, [statsFormat, selectedKiller, selectedMap, selectedFilter])

	const killers = [...new Set((matchesArr).map(match => (match.killer)))];
	const maps = [...new Set((matchesArr).map(match => (match.map)))];

	const grouped = useMemo(() => {
		let key;

		if (selectedFilter === "killers") {
			setSelectedMap("All Maps")
			key = selectedKiller === "All Killers" ? "killer" : "map";
		}
		else {
			setSelectedKiller("All Killers");
			key = selectedMap === "All Maps" ? "map" : "killer";
		}

		return _.groupBy(matchesArr, match => match[key]);
	}, [matchesArr, selectedFilter, selectedKiller, selectedMap]);

	const formatTime = (seconds) => {
		const mins = Math.floor(seconds / 60);
		const secs = Math.round(seconds % 60);

		return `${mins}:${secs.toString().padStart(2, "0")}`;
	};

	const getRows = () => {
		if (selectedFilter === "killers") {
			if (selectedKiller !== "All Killers") {
				return maps.map(m => ({ id: m }));
			}

			return killers.map(k => ({ id: k }));
		}

		if (selectedMap !== "All Maps") {
			return killers.map(k => ({ id: k }));
		}

		return maps.map(m => ({ id: m }));
	};

	const get4v1Columns = () => {
		return [
			{
				field: "name",
				headerName:
					selectedFilter === "killers"
						? selectedKiller !== "All Killers"
							? "Map"
							: "Killer"
						: selectedMap !== "All Maps"
							? "Killer"
							: "Map",
				flex: 2,
				valueGetter: (value, row) => row.id
			},
			{
				field: "totalOfMatches",
				headerName: "Matches",
				flex: 2,
				align: "center",
				headerAlign: "center",
				valueGetter: (value, row) => {
					return grouped[row.id]?.length || 0;
				}
			},
			{
				field: "averageGensPerGame",
				headerName: "Gen/game",
				flex: 2,
				align: "center",
				headerAlign: "center",
				valueGetter: (value, row) => {
					const group = grouped[row.id] || [];

					if (group.length === 0) return 0;

					const total = _.sumBy(group, match => match.generators);
					return (total / group.length).toFixed(2).padEnd(2, "0");
				}
			},
			{
				field: "averageHooksPerGame",
				headerName: "Hook/game",
				flex: 2,
				align: "center",
				headerAlign: "center",
				valueGetter: (value, row) => {
					const group = grouped[row.id] || [];

					if (group.length === 0) return 0;

					const total = _.sumBy(group, match => match.totalHookStages);
					return (total / group.length).toFixed(2).padEnd(2, "0");
				}
			},
			{
				field: "averageFreshHooksPerGame",
				headerName: "Kill/game",
				flex: 2,
				align: "center",
				headerAlign: "center",
				valueGetter: (value, row) => {
					const group = grouped[row.id] || [];

					if (group.length === 0) return 0;

					const total = _.sumBy(group, match => match.freshHookStages);
					return (total / group.length).toFixed(2).padEnd(2, "0");
				}
			},
			{
				field: "1stDown",
				headerName: "1st Down",
				flex: 2,
				align: "center",
				headerAlign: "center",
				valueGetter: (value, row) => {
					const group = grouped[row.id] || [];

					if (!group.length) return "0:00";

					const avgSeconds = _.sumBy(group, match => match.firstDownTime) / group.length;
					return formatTime(avgSeconds);
				}
			}
		]
	}

	const get1v1Columns = () => {
		return [
			{
				field: "name",
				headerName:
					selectedFilter === "killers"
						? selectedKiller !== "All Killers"
							? "Map"
							: "Killer"
						: selectedMap !== "All Maps"
							? "Killer"
							: "Map",
				flex: 3,
				valueGetter: (value, row) => row.id
			},
			{
				field: "totalOfMatches",
				headerName: "Matches",
				flex: 3,
				align: "center",
				headerAlign: "center",
				valueGetter: (value, row) => {
					return grouped[row.id]?.length || 0;
				}
			},
			{
				field: "firstHitTime",
				headerName: "1st Hit",
				flex: 3,
				align: "center",
				headerAlign: "center",
				valueGetter: (value, row) => {
					const group = grouped[row.id] || [];

					if (!group.length) return "0:00";

					const avgSeconds = _.sumBy(group, match => match.firstHitTime) / group.length;
					return formatTime(avgSeconds);
				}
			},
			{
				field: "totalChaseTime",
				headerName: "Chase Time",
				flex: 3,
				align: "center",
				headerAlign: "center",
				valueGetter: (value, row) => {
					const group = grouped[row.id] || [];

					if (!group.length) return "0:00";

					const avgSeconds = _.sumBy(group, match => match.totalChaseTime) / group.length;
					return formatTime(avgSeconds);
				}
			}
		]
	}

	return (
		<>
			<Header />
			<Container maxWidth="lg">
				<Box mt={5}>
					<Typography sx={{ fontWeight: 600, fontSize: 50 }}>Statistics</Typography>
					<Box mt={4} sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
						<Button variant='contained' sx={{ marginRight: 2, fontWeight: 600 }} onClick={() => { setStatsFormat("4v1") }}>
							<Typography sx={{ fontWeight: 600, marginRight: 0.5 }}>STATS</Typography>
							<Typography sx={{ fontWeight: 300 }}>4v1</Typography>
						</Button>
						<Button variant='contained' sx={{ marginRight: 2, fontWeight: 600 }} onClick={() => { setStatsFormat("1v1") }}>
							<Typography sx={{ fontWeight: 600, marginRight: 0.5 }}>STATS</Typography>
							<Typography sx={{ fontWeight: 300 }}>1v1</Typography>
						</Button>
					</Box>
					<Box mt={4} sx={{ display: 'flex', flexDirection: "column", alignItems: "center" }}>
						<Typography sx={{ fontWeight: 600, textTransform: "uppercase" }}>{statsFormat} Statistics</Typography>
						<Box mt={2} mb={2} sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
							<Button variant='contained' sx={{ marginRight: 2, fontWeight: 600 }} onClick={() => { setSelectedFilter("killers") }}>
								<Typography sx={{ fontWeight: 600, marginRight: 0.5 }}>STATS</Typography>
								<Typography sx={{ fontWeight: 300 }}>per Killer</Typography>
							</Button>
							<Button variant='contained' sx={{ marginRight: 2, fontWeight: 600 }} onClick={() => { setSelectedFilter("maps") }}>
								<Typography sx={{ fontWeight: 600, marginRight: 0.5 }}>STATS</Typography>
								<Typography sx={{ fontWeight: 300 }}>per Map</Typography>
							</Button>
						</Box>
						{selectedFilter === "killers" ?
							<>
								<Typography mb={2} sx={{ fontWeight: 600, textTransform: "uppercase" }}>{selectedKiller} Statistics</Typography>
								<Autocomplete
									value={selectedKiller}
									options={["All Killers", ...allKillers]}
									sx={{ width: 300 }}
									onChange={(e, v) => { setSelectedKiller(v ?? "All Killers") }}
									renderInput={(params) => <TextField {...params} label="Killer" />}
									clearIcon={<></>}
								/>
							</>
							:
							<>
								<Typography mb={2} sx={{ fontWeight: 600, textTransform: "uppercase" }}>{selectedMap} Statistics</Typography>
								<Autocomplete
									value={selectedMap}
									options={["All Maps", ...allMaps]}
									sx={{ width: 300 }}
									onChange={(e, v) => { setSelectedMap(v ?? "All Maps") }}
									renderInput={(params) => <TextField {...params} label="Map" />}
									clearIcon={<></>}
								/>
							</>
						}
						<Box mt={2} width={"100%"} sx={{ minWidth: 0 }}>
							<DataGrid
								key={`${statsFormat}-${selectedFilter}`}
								rows={getRows()}
								columns={statsFormat === "4v1" ? get4v1Columns() : get1v1Columns()}
								disableRowSelectionOnClick
								autoHeight
								autoPageSize
								disableColumnFilter
								disableColumnMenu
								disableColumnResize
								disableColumnSelector
								hideFooter
								getRowClassName={(params) =>
									params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
								}
								sx={{
									'& .MuiDataGrid-columnHeaderTitle': {
										color: 'primary.main',
										fontWeight: 700,
									},
									'& .even': {
										backgroundColor: '#ffc35527',
									},
								}}
							/>
						</Box>
					</Box>
				</Box>
			</Container>
		</>
	)
}