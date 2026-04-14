'use client'

import { Avatar, Box, Button, Chip, Container, IconButton, Stack, Tab, Table, TableCell, TableContainer, TableHead, TableRow, Tabs, Typography, TableBody, Divider, Tooltip, CircularProgress, LinearProgress, TextField } from "@mui/material";

import '@/app/styles/trip.scss'
import '@/app/styles/global.scss'
import Link from "next/link";
import { ChevronRight, FilterAlt, Fullscreen, OpenInFull, Search } from "@mui/icons-material";
import Image from "next/image";
import { LineChart } from "@mui/x-charts";
import { Fragment, useState } from "react";
import PropTypes from "prop-types";

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

function ProgressChart(props){
    const {value} = props;
    let sum = value.reduce((a, b) => a + b?.c, 0); // Calculate total sum: 150
    let normalized = value.map(n => (n?.c / sum) * 100);

    return <Stack my={3} width={'100%'}>
        <Stack flexDirection={'row'} width={'100%'} height={15} position={'relative'} sx={{ borderRadius: 20, overflow: 'hidden'}}> 
            {normalized && normalized.map((a, i) => (
                <Box flex={a} key={i} sx={{height: 15, bgcolor: `${value[i]?.clr}`}}></Box>
            ))}
        </Stack>
        <Stack direction={'row'} gap={3} flexWrap={'wrap'} justifyContent={'center'} mt={2}>
            {value && value.map((a, i) => (
                <Box key={i} sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    '&::before': {
                        content: "''",
                        display: 'block',
                        width: 10,
                        height: 10,
                        bgcolor: `${a?.clr}`,
                        borderRadius: "50%",
                        mr: 1,
                        mt: '6px'
                    }
                }}>
                    <Stack direction={'column'}>
                        <Typography variant="body1" component={'div'} color={`${a?.clr}`}>{a?.l}</Typography>
                        <Typography variant="h6" component={'div'}>{a?.c}</Typography>
                    </Stack>
                </Box>
            ))}
        </Stack>
    </Stack>
}

function CircularChart(props){

    const {value} = props;

    return <Fragment>
        <CircularProgress value={(value?.t*100)/value?.m} enableTrackSlot variant='determinate' size={'100%'}></CircularProgress>
        <Box sx={{position: 'absolute', inset: 0, margin: 'auto', width: 'max-content', height: 'max-content'}}>
            <Typography textAlign={'center'} variant="h5" fontWeight={'bold'} component={'div'}>{value?.t}</Typography>
            <Typography textAlign={'center'} variant="body1" component={'div'}>out of {value?.m} pax</Typography>
        </Box>
    </Fragment>
}

export default function DashboardTripList() {

    const [tabVal, setTabVal] = useState(0);
        
    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    function CustomTabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
                style={{width: '100%'}}
            >
                {value === index && <Box width="100%" mt={3}>{children}</Box>}
            </div>
        );
    }

    CustomTabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

    const handleChange = (event, newValue) => {
        setTabVal(newValue);
    };

    const count_summary = {
        t: 40,
        m: 150,
        sx: [
            {
                l: "Male",
                c: 20,
                clr: '#8b77fd'
            },
            {
                l: "Female",
                c: 20,
                clr: '#75dbff'
            }
        ],
        ag: [
            {
                l: "Infants",
                c: 1,
                clr: '#8b77fd'
            },
            {
                l: "Children",
                c: 4,
                clr: '#75dbff'
            },
            {
                l: "Adults",
                c: 30,
                clr: '#ffbb25'
            },
            {
                l: "Seniors",
                c: 5,
                clr: '#98c85a'
            },
        ]
    }

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
                            <Stack sx={{overflow: 'auto', position: 'relative', '&::-webkit-scrollbar': {width: 0}, maxHeight: 1000}} flex={1} gap={2} px={6} pb={2}>
                                <TripBox link="/trip1"></TripBox>
                                <TripBox link="/trip1"></TripBox>
                                <TripBox link="/trip1"></TripBox>
                                <TripBox link="/trip1"></TripBox>
                            </Stack>
                            <Box px={6}>
                                <Button fullWidth variant="contained">See more</Button>
                            </Box>
                        </Stack>
                    </Box>
                </Stack>
                <Stack flex={2} direction={'column'} gap={2} maxWidth={{xs: 'none', lg: '55%'}} width={'100%'}>
                    <Box flex={1} p={4} sx={{bgcolor: "primary.main", borderRadius: 4}}>
                        <Stack borderRadius={4} gap={4}>
                            <Stack gap={2} direction={'row'} alignItems={'center'} flex={1}>
                                <Typography variant="h4" component={'h1'} fontWeight={'bold'} color="white">Most Recent Trip</Typography>
                                <Button LinkComponent={Link} href="/trip1?v=Jordan-Wharf" variant="text" sx={{color: "#fff", ml: 'auto'}} color="#fff" endIcon={<ChevronRight></ChevronRight>}>More Details</Button>
                            </Stack>
                            <Stack direction={'row'} flex={1} gap={2}>
                                <Stack flex={1} flexWrap={'wrap'} direction={'row'} position={'relative'} height={{xs: 'auto', lg: 200}} gap={1}>
                                    <Box p={3} sx={{position: 'relative', flex: 2, borderRadius: 4, overflow: 'hidden', minWidth: 200, width: '100%', height: {xs: 200, lg: 'auto'}, display: 'flex'}}>
                                        <Image style={{objectFit: 'cover'}} src="/images/placeholders/landscape.jpg" alt="Placeholder" fill></Image>
                                        <Stack mt={'auto'} zIndex={100} position={'relative'} direction={'column'}>
                                            <Typography variant="h5" fontWeight={'bold'}>Vessel Name</Typography>
                                            <Typography variant="body1">SG8 Maritime, Inc.</Typography>
                                        </Stack>
                                    </Box>
                                </Stack>
                                <Box flex={1} className="info_box white" p={2} borderRadius={4} sx={{boxShadow: "1px 4px 9px 4px rgba(0, 0, 0, 0.05)"}}>
                                    <Typography variant="body1" className="label">Route</Typography>
                                    <Box p={2} sx={{borderRadius: 4, bgcolor: 'primary.main'}}>
                                        <Stack direction={'column'} gap={1}>
                                            <Stack className="info_dot white" flex={1} direction={'row'} gap={1}>
                                                <Box flex={2}>
                                                    <Typography color="white" variant="body1">06.05.2025</Typography>
                                                    <Typography color="white" variant="subtitle2" sx={{opacity: 0.6}}>7:20 AM</Typography>
                                                </Box>
                                                <Box flex={3}>
                                                    <Typography color="white" variant="body1">Arrival</Typography>
                                                    <Typography color="white" variant="subtitle2" sx={{opacity: 0.6}}>Parola Ferry Terminal</Typography>
                                                </Box>
                                            </Stack>
                                            <Stack className="info_dot white" flex={1} direction={'row'} gap={1}>
                                                <Box flex={2}>
                                                    <Typography color="white" variant="body1">06.05.2025</Typography>
                                                    <Typography color="white" variant="subtitle2" sx={{opacity: 0.6}}>7:00 AM</Typography>
                                                </Box>
                                                <Box flex={3}>
                                                    <Typography color="white" variant="body1">Origin</Typography>
                                                    <Typography color="white" variant="subtitle2" sx={{opacity: 0.6}}>Jordan Wharf, Jordan, Guimaras</Typography>
                                                </Box>
                                            </Stack>
                                        </Stack>
                                    </Box>
                                </Box>
                            </Stack>
                            <Box py={2} px={4} borderRadius={4} sx={{ bgcolor: '#fff', position: 'relative'}}>
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
                            <Stack sx={{bgcolor: "white", p: 3, borderRadius: 4}} direction={'column'} gap={1} alignItems={'center'}>
                                <Box sx={{position: 'relative', width: 200}}>
                                    <CircularChart value={count_summary}></CircularChart>
                                </Box>
                                <ProgressChart value={count_summary?.sx}></ProgressChart>
                                <ProgressChart value={count_summary?.ag}></ProgressChart>
                            </Stack>
                        </Stack>
                    </Box>
                    <Stack flex={1} direction={'column'} gap={2} p={4} sx={{bgcolor: "white", borderRadius: 4, overflow: 'auto', position: 'relative'}}>
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