'use client'

import { Avatar, Box, Button, Chip, Container, IconButton, Stack, Tab, Table, TableCell, TableContainer, TableHead, TableRow, Tabs, Typography, TableBody, Divider, Tooltip, CircularProgress, LinearProgress, TextField } from "@mui/material";

import '@/app/styles/trip.scss'
import '@/app/styles/global.scss'
import Link from "next/link";
import { FilterAlt, OpenInFull, Search } from "@mui/icons-material";

function TripBox({link}){

    const data = {
                vessel: "Vessel Name",
                pax: 100,
                masterName: "Juan Dela Cruz",
                photo: "",
                origin: {
                    port: 'MacArthurs Wharf Ferry Terminal',
                    address: "MacArthurs Wharf Ferry Terminal, Sto. Rosario, Buenavista",
                    date: new Date()
                },
                arrival: {
                    port: 'Parola Ferry Terminal',
                    address: "Parola Ferry Terminal, Iloilo City",
                    date: new Date()
                },
            }

    return <Box p={2} sx={{borderRadius: 4, boxShadow: "1px 4px 9px 4px rgba(0, 0, 0, 0.1)", bgcolor: "white"}}>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                <Box>
                    <Typography variant="body1" fontWeight={'bold'}>Vessel Name</Typography>
                    <Typography variant="body2">SG8 Maritime, inc.</Typography>
                </Box>
                <Chip size="medium" label="100 pax" variant="contained" sx={{color: "white", bgcolor: 'primary.main'}}></Chip>
            </Stack>
            <Divider sx={{my: 2}}></Divider>
            <Stack direction={'column'} gap={1}>
                <Stack className="info_dot" flex={1} direction={'row'} gap={1}>
                    <Box flex={2}>
                        <Typography variant="body1">06.05.2025</Typography>
                        <Typography variant="subtitle2" sx={{opacity: 0.6}}>2:00 AM</Typography>
                    </Box>
                    <Box flex={3}>
                        <Typography variant="body1">{data?.arrival?.port}</Typography>
                        <Typography variant="subtitle2" sx={{opacity: 0.6}}>{data?.arrival?.address}</Typography>
                    </Box>
                </Stack>
                <Stack className="info_dot" flex={1} direction={'row'} gap={1}>
                    <Box flex={2}>
                        <Typography variant="body1">06.05.2025</Typography>
                        <Typography variant="subtitle2" sx={{opacity: 0.6}}>2:00 AM</Typography>
                    </Box>
                    <Box flex={3}>
                        <Typography variant="body1">{data?.origin?.port}</Typography>
                        <Typography variant="subtitle2" sx={{opacity: 0.6}}>{data?.origin?.address}</Typography>
                    </Box>
                </Stack>
            </Stack>
            <Divider sx={{my: 2}}></Divider>
            <Stack direction={'row'} gap={1}>
                <Stack direction={'row'} gap={1}>
                    <Avatar></Avatar>
                    <Box>
                        <Typography variant="body1">Name Here</Typography>
                        <Typography variant="body2">Master</Typography>
                    </Box>
                </Stack>
                <Tooltip title="Expand" sx={{ml: 'auto'}}>
                    <IconButton variant="contained" href={link} LinkComponent={Link}>
                        <OpenInFull></OpenInFull>
                    </IconButton>
                </Tooltip>
            </Stack>
        </Box>
}

export default function DashboardTripList() {
    return (
        <Container maxWidth="xl">
            <Stack direction={'row'} gap={2} flexWrap={'wrap'}>
                <Stack flex={1} direction={'column'} gap={2}>
                    <Box flex={1} sx={{borderRadius: 4, overflow: 'auto', position: 'relative', '&::-webkit-scrollbar': {width: 0}}} maxHeight={600}>
                        <Stack direction={'column'} gap={2} sx={{borderRadius: 4}}>
                            <Box className="search_nav" py={4} px={6} gap={2}>
                                <TextField variant='outlined' label="Search for trip" placeholder="Search for trips..." slotProps={{
                                    input: {
                                        sx: {
                                            borderRadius: 10,
                                            px: 3
                                        },
                                        startAdornment: (
                                            <Search></Search>
                                        ),
                                        inputProps: {
                                            style: {
                                                paddingLeft: '5px',
                                            }
                                        }
                                    },
                                }} sx={{
                                    "& fieldset > legend": { ml: 2 },
                                    "& label.Mui-focused": { ml: 2 },
                                    "& label": { ml: 2 },
                                    flex: 1
                                }}></TextField>
                                <IconButton sx={{
                                        m: 'auto',
                                        width: 'min-content'
                                    }}>
                                    <FilterAlt></FilterAlt>
                                </IconButton>
                            </Box>
                            <Stack gap={2} px={6} pb={6}>
                                <TripBox link="/trip1"></TripBox>
                                <TripBox link="/trip1"></TripBox>
                                <TripBox link="/trip1"></TripBox>
                                <TripBox link="/trip1"></TripBox>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
                <Stack flex={2} direction={'column'} gap={2} maxWidth={{xs: 'none', lg: '50%'}} width={'100%'}>
                    <Box flex={1} p={4} sx={{bgcolor: "primary.main", borderRadius: 4}}>
                        <Box borderRadius={4}>
                            <Typography variant="h4" component={'h1'} fontWeight={'bold'} color="white">Most Recent Trip</Typography>
                        </Box>
                    </Box>
                    <Stack flex={1} direction={'column'} gap={2} sx={{bgcolor: "white", borderRadius: 4, overflow: 'auto', position: 'relative'}}>
                    </Stack>
                </Stack>
            </Stack>
        </Container>
    );
}