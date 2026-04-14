'use client'

import { Avatar, Box, Button, Chip, Container, IconButton, Stack, Tab, Table, TableCell, TableContainer, TableHead, TableRow, Tabs, Typography, TableBody, Divider, Tooltip, CircularProgress, LinearProgress, TextField } from "@mui/material";

import '@/app/styles/trip.scss'
import '@/app/styles/global.scss'
import Link from "next/link";
import { FilterAlt, Fullscreen, OpenInFull, Search } from "@mui/icons-material";
import Image from "next/image";
import { LineChart } from "@mui/x-charts";

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
                    <Box flex={1} sx={{borderRadius: 4}}>
                        <Stack  direction={'column'} gap={2} sx={{borderRadius: 4, height: '100%'}}>
                            <Box className="search_nav" py={4} px={6} gap={2}>
                                <TextField variant='outlined' label="Search for trip" placeholder="Search for trips..." slotProps={{
                                    input: {
                                        sx: {
                                            borderRadius: 10,
                                            background: "#fff",
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
                                        width: 'min-content',
                                        background: "#fff",
                                        p: 2
                                    }}>
                                    <FilterAlt></FilterAlt>
                                </IconButton>
                            </Box>
                            <Stack sx={{overflow: 'auto', position: 'relative', '&::-webkit-scrollbar': {width: 0}, maxHeight: 1000}} flex={1} gap={2} px={6} pb={6}>
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
                        <Stack borderRadius={4} gap={4}>
                            <Typography variant="h4" component={'h1'} fontWeight={'bold'} color="white">Most Recent Trip</Typography>
                            <Stack mt={2} flexWrap={'wrap'} direction={'row'} position={'relative'} height={{xs: 'auto', lg: 200}} gap={1}>
                                <Box sx={{position: 'relative', flex: 2, borderRadius: 4, overflow: 'hidden', minWidth: 200, width: '100%', height: {xs: 200, lg: 'auto'}}}>
                                    <Image style={{objectFit: 'cover'}} src="/images/placeholders/landscape.jpg" alt="Placeholder" fill></Image>
                                </Box>
                                <Stack p={2} flex={2} direction={'column'} sx={{bgcolor: "#fff", borderRadius: 4}}>
                                    <Stack direction={'column'}>
                                        <Typography variant="h4">Vessel Name</Typography>
                                        <Typography variant="body1">ID: Vessel ID</Typography>
                                    </Stack>
                                    <Stack mt={'auto'} direction={'row'} gap={1} sx={{bgcolor: "white", px: 1, py: .5, borderRadius: 10, position: 'relative', zIndex: 100, width: 'max-content'}}>
                                        <Avatar sx={{width: 30, height: 30, my: 'auto'}}></Avatar>
                                        <Typography my="auto" variant="body1">SG8 Maritime, Inc</Typography>
                                        <IconButton sx={{ml: 2}}>
                                            <Fullscreen></Fullscreen>
                                        </IconButton>
                                    </Stack>
                                </Stack>
                            </Stack>
                            <Box className="info_box white" p={2} borderRadius={4} sx={{boxShadow: "1px 4px 9px 4px rgba(0, 0, 0, 0.05)"}}>
                                <Typography variant="body1" className="label">Route</Typography>
                                <Box p={2} sx={{borderRadius: 4, bgcolor: 'primary.main'}}>
                                    <Stack direction={'column'} gap={1}>
                                        <Stack className="info_dot white" flex={1} direction={'row'} gap={1}>
                                            <Box flex={2}>
                                                <Typography color="white" variant="body1">06.05.2025</Typography>
                                                <Typography color="white" variant="subtitle2" sx={{opacity: 0.6}}>7:20 AM • ETA</Typography>
                                            </Box>
                                            <Box flex={3}>
                                                <Typography color="white" variant="body1">Arrival</Typography>
                                                <Typography color="white" variant="subtitle2" sx={{opacity: 0.6}}>Parola Ferry Terminal</Typography>
                                            </Box>
                                        </Stack>
                                        <Stack className="info_dot white" flex={1} direction={'row'} gap={1}>
                                            <Box flex={2}>
                                                <Typography color="white" variant="body1">06.05.2025</Typography>
                                                <Typography color="white" variant="subtitle2" sx={{opacity: 0.6}}>7:00 AM • ATD</Typography>
                                            </Box>
                                            <Box flex={3}>
                                                <Typography color="white" variant="body1">Origin</Typography>
                                                <Typography color="white" variant="subtitle2" sx={{opacity: 0.6}}>Jordan Wharf, Jordan, Guimaras</Typography>
                                            </Box>
                                        </Stack>
                                    </Stack>
                                </Box>
                            </Box>
                            <Box py={2} px={4} borderRadius={4} sx={{ bgcolor: 'background.main', position: 'relative'}}>
                                <Stack mb={2} direction={'row'} alignItems={'center'}>
                                    <Stack direction={'row'} alignItems={'center'} gap={2} flexWrap={'wrap'}>
                                        <Avatar sx={{width: 50, height: 50}}></Avatar>
                                        <Box>
                                            <Typography variant="body1" fontWeight={800} gutterBottom={false}>Velazquez Olson</Typography>
                                            <Typography variant="subtitle2">0999271531</Typography>
                                        </Box>
                                    </Stack>
                                    <Chip className="chip_anchor-top-left" variant="filled" label="Master" size="large" sx={{color: "white", bgcolor: "primary.main", ml: 'auto', mb: 'auto'}}></Chip>
                                </Stack>
                                <Box sx={{display: 'grid', gridTemplateColumns: {xs: '1fr', md: '1fr 1fr'}, gridTemplateRows: {xs: '1fr', md: '1fr 1fr'}, gap: 2}}>
                                    <Box flex={1} minWidth={'max-content'}>
                                        <Typography variant="subtitle2">License No.</Typography>
                                        <Typography variant="h6" fontWeight={800}>101-05223</Typography>
                                    </Box>
                                    <Box flex={1} minWidth={'max-content'}>
                                        <Typography variant="subtitle2">Issued By</Typography>
                                        <Typography variant="h6" fontWeight={800}>MROVI</Typography>
                                    </Box>
                                    <Box flex={1} minWidth={'max-content'}>
                                        <Typography variant="subtitle2">Issued On</Typography>
                                        <Typography variant="h6" fontWeight={800}>1/12/1999</Typography>
                                    </Box>
                                    <Box flex={1} minWidth={'max-content'}>
                                        <Typography variant="subtitle2">Expiry</Typography>
                                        <Typography variant="h6" fontWeight={800}>1/12/2026</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Stack>
                    </Box>
                    <Stack flex={1} direction={'column'} gap={2} sx={{bgcolor: "white", borderRadius: 4, overflow: 'auto', position: 'relative'}}>
                        <Box mx={2} my={3} className="info_box" sx={{borderRadius: 4, bgcolor: "white"}}>
                            <Typography variant="body1" className="label">Passenger Traffic</Typography>
                            <Box pt={4} pb={2}>
                                <LineChart
                                    grid={{horizontal: true, vertical: true}}
                                    xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                                    series={[
                                        {
                                            data: [2, 5.5, 2, 8.5, 1.5, 5],
                                            label: 'Passenger Traffic'
                                        },
                                        {
                                            data: [5, 1.5, 4, 2.5, 5.5, 101],
                                            label: 'Trip Traffic'
                                        },
                                    ]}
                                    height={200}
                                />
                            </Box>
                        </Box>
                    </Stack>
                </Stack>
            </Stack>
        </Container>
    );
}