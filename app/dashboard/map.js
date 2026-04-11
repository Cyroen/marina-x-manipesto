'use client'

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import { Avatar, Box, Button, Chip, Divider, Drawer, IconButton, Stack, Tab, Tabs, Tooltip, Typography } from "@mui/material";
import { Fragment, useState } from "react";
import Image from "next/image";
import { LineChart } from "@mui/x-charts";
import { format } from "date-fns";
import { ChevronRight, DirectionsBoat, LocationOn, OpenInFull, Pages } from "@mui/icons-material";

import PropTypes from 'prop-types'
import Link from "next/link";
import { renderToString } from "react-dom/server";


function MarkerMap({data, onPortOpenClick, onPortCloseClick}){

    const [open, setOpen] = useState(false);

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
                style={{backgroundColor: "#f2f2f2", flex: 1}}
            >
                {value === index && <Box pb={4}>{children}</Box>}
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

    const muiIcon = L.divIcon({
        html: renderToString(<Image src={'/images/logos/marinamarker.png'} width={32} height={32} style={{transform: 'translate(-15px, -30px)'}}></Image>),
        className: 'custom-icon', // Use this to remove default Leaflet styles
        iconSize: [64, 64],
        iconAnchor: [0, 0],
    });


    return <Fragment>
        <Drawer sx={{zIndex: 1000}} onClose={()=> {setOpen(false); onPortCloseClick()}} open={open} slotProps={{
            paper: {
                sx: {
                    width: 400,
                    '&::-webkit-scrollbar': {
                        width: 0,
                        display: 'none',
                    }
                }
            }
        }} anchor='left' variant='temporary'>
            <Stack direction={'column'}>
                <Stack direction={'column'} gap={2}>
                    <Box width={'100%'} height={300} position={'relative'}>
                        <Image src="/images/placeholders/landscape.jpg" fill alt="Placeholder Image">
                        </Image>
                    </Box>
                    <Stack direction={'column'} p={3}>
                        <Typography variant="h6" component={'h1'}>
                        {data?.portName}
                        </Typography>
                        <Typography variant="body1" component={'p'}>
                            {data?.address}
                        </Typography>
                    </Stack>
                </Stack>
                <Tabs variant='scrollable' slotProps={{
                    root: {
                        sx: {
                            px: 2,
                        }
                    },
                }} value={tabVal} onChange={handleChange} aria-label="Tabs">
                    <Tab label="Overview" {...a11yProps(0)} />
                    <Tab label="Trip List" {...a11yProps(1)} />
                    <Tab label="Routes" {...a11yProps(2)} />
                    <Tab label="Operators" {...a11yProps(3)} />
                </Tabs>
                <Divider></Divider>

                {/* Overview */}
                <CustomTabPanel value={tabVal} index={0}>
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
                    <Stack mb={3} direction={'column'} gap={2}>
                        <Box className="info_box" gap={1} mx={2} p={3} sx={{borderRadius: 4, bgcolor: "white"}}>
                            <Typography variant="body1" className="label">Today's Traffic</Typography>
                            <Stack direction={'row'} gap={1}>
                                <Stack flex={1} direction={'column'} p={2} sx={{borderRadius: 4, bgcolor: 'primary.main'}}>
                                    <Typography variant="body1" color="white">Passengers</Typography>
                                    <Typography variant="h5" color="white" fontWeight={700}>{data?.traffic?.passengers}</Typography>
                                </Stack>
                                <Stack flex={1} direction={'column'} p={2} sx={{borderRadius: 4, bgcolor: 'primary.main'}}>
                                    <Typography variant="body1" color="white">Trips</Typography>
                                    <Typography variant="h5" color="white" fontWeight={700}>{data?.traffic?.trips}</Typography>
                                </Stack>
                            </Stack>
                            <Typography textAlign={'right'} variant="subtitle2">as of April 09, 2026 01:17 PM</Typography>
                        </Box>
                    </Stack>
                    <Stack direction={'column'} gap={3} pt={5} pb={2} px={3} className="info_box" sx={{borderRadius: 4, bgcolor: "white"}} mx={2}>
                        <Typography variant="body1" className="label">Recent Trips</Typography>
                        <Box className="info_box no_border" sx={{bgcolor: 'primary.main'}} p={2} borderRadius={2} gap={1}>
                            <Typography variant="body1" className="label">Arrival</Typography>
                            <Stack direction={'row'} gap={1} mt={1}>
                                <Stack direction={'row'} flexWrap={'wrap'}  width={'100%'} gap={1}>
                                    <Stack flex={5} direction={'column'}>
                                        <Typography color="white" variant="body1" sx={{wordBreak: 'break-word'}} component={'div'} fontWeight={800}>{data?.arrival?.vessel}</Typography>
                                        <Typography color="white" variant="body1" sx={{wordBreak: 'break-word'}}>{data?.arrival?.operator}</Typography>
                                    </Stack>
                                    <Chip label={`${data?.arrival?.totalPax} Pax`} sx={{flex: 1, fontWeight: 500, color: "primary.main", bgcolor: '#fff', ml: 'auto'}} variant="filled"></Chip>
                                </Stack>
                                
                            </Stack>
                            <Stack direction={'column'} gap={0} className="info_dot">
                                <Typography color="white" variant="body2">{data?.arrival?.origin}</Typography>
                            </Stack>
                            <Stack direction={'column'} gap={0} className="info_dot">
                                <Typography color="white" variant="body2">{data?.arrival?.arrival}</Typography>
                            </Stack>
                            <Divider flexItem></Divider>
                            <Box display="flex" alignItems="center">
                                <Typography color="white" variant="body2">
                                        Date: {data?.arrival?.date ? format(data?.arrival?.date, "MM/dd/yyyy") + ' at ' +  format(data?.arrival?.date, "hh:mm a") : 'Not found'}
                                </Typography>
                                <IconButton sx={{ml: 'auto'}}>
                                    <ChevronRight sx={{color: "white"}}></ChevronRight>
                                </IconButton>
                            </Box>
                        </Box>
                        <Box className="info_box no_border" sx={{bgcolor: 'primary.main'}} p={2} borderRadius={2} gap={1}>
                            <Typography variant="body1" className="label">Departure</Typography>
                            <Stack direction={'row'} gap={1} mt={1}>
                                <Stack direction={'row'} flexWrap={'wrap'}  width={'100%'} gap={1}>
                                    <Stack flex={5} direction={'column'}>
                                        <Typography color="white" variant="body1" sx={{wordBreak: 'break-word'}} component={'div'} fontWeight={800}>{data?.departure?.vessel}</Typography>
                                        <Typography color="white" variant="body1" sx={{wordBreak: 'break-word'}}>{data?.departure?.operator}</Typography>
                                    </Stack>
                                    <Chip label={`${data?.departure?.totalPax} Pax`} sx={{flex: 1, fontWeight: 500, color: "primary.main", bgcolor: '#fff', ml: 'auto'}} variant="filled"></Chip>
                                </Stack>
                                
                            </Stack>
                            <Stack  direction={'column'} gap={0} className="info_dot">
                                <Typography color="white" variant="body2">{data?.departure?.origin}</Typography>
                            </Stack>
                            <Stack direction={'column'} gap={0} className="info_dot">
                                <Typography color="white" variant="body2">{data?.departure?.arrival}</Typography>
                            </Stack>
                            <Divider flexItem></Divider>
                            <Box display="flex" alignItems="center" gap={1}>
                                <Typography color="white" variant="body2">
                                    Date: {data?.departure?.date ? format(data?.departure?.date, "MM/dd/yyyy") + ' at ' +  format(data?.departure?.date, "hh:mm a") : 'Not found'}
                                </Typography>
                                <IconButton sx={{ml: 'auto'}}>
                                    <ChevronRight sx={{color: "white"}}></ChevronRight>
                                </IconButton>
                            </Box>
                        </Box>
                        <Button sx={{mt: 2, ml: "auto", width: 'max-content'}} variant="text" endIcon={<ChevronRight></ChevronRight>}>See more</Button>
                    </Stack>
                </CustomTabPanel>
                
                {/* Trip List */}
                <CustomTabPanel value={tabVal} index={1}>
                    <Stack p={3} direction={'column'} gap={2}>
                        <Box p={2} sx={{borderRadius: 4, boxShadow: "1px 4px 9px 4px rgba(0, 0, 0, 0.1)", bgcolor: "white"}}>
                            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                                <Typography variant="body1" fontWeight={'bold'}>Vessel Name</Typography>
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
                                        <Typography variant="body1">Origin</Typography>
                                        <Typography variant="subtitle2" sx={{opacity: 0.6}}>Jordan Wharf</Typography>
                                    </Box>
                                </Stack>
                                <Stack className="info_dot" flex={1} direction={'row'} gap={1}>
                                    <Box flex={2}>
                                        <Typography variant="body1">06.05.2025</Typography>
                                        <Typography variant="subtitle2" sx={{opacity: 0.6}}>2:00 AM</Typography>
                                    </Box>
                                    <Box flex={3}>
                                        <Typography variant="body1">Origin</Typography>
                                        <Typography variant="subtitle2" sx={{opacity: 0.6}}>Rizal, Jordan, Guimaras</Typography>
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
                                    <IconButton variant="contained" href={'/trip'} LinkComponent={Link}>
                                        <OpenInFull></OpenInFull>
                                    </IconButton>
                                </Tooltip>
                            </Stack>
                        </Box>
                    </Stack>
                </CustomTabPanel>

                {/* Routes */}
                <CustomTabPanel value={tabVal} index={2}>
                    <Stack direction={'column'} gap={2} p={3}>
                        <Stack direction={'column'} gap={1} p={2} sx={{bgcolor: 'primary.main', borderRadius: 4}}>
                            <Stack direction={'column'} className=" white">
                                <Typography variant="body1" color="white">Parola Ferry Terminal</Typography>
                                <Typography variant="body2" color="white">Parola Ferry Terminal, Iloilo City</Typography>
                            </Stack>
                            <Stack direction={'column'} className="info_dot white">
                                <Typography variant="body1" color="white">Jordan Wharf</Typography>
                                <Typography variant="body2" color="white">Jordan Wharf, Jordan, Guimaras</Typography>
                            </Stack>
                        </Stack>
                        <Stack direction={'column'} gap={1} p={2} sx={{bgcolor: 'primary.main', borderRadius: 4}}>
                            <Stack direction={'column'} className="info_dot white">
                                <Typography variant="body1" color="white">Parola Ferry Terminal</Typography>
                                <Typography variant="body2" color="white">Parola Ferry Terminal, Iloilo City</Typography>
                            </Stack>
                            <Stack direction={'column'} className="info_dot white">
                                <Typography variant="body1" color="white">Jordan Wharf</Typography>
                                <Typography variant="body2" color="white">Jordan Wharf, Jordan, Guimaras</Typography>
                            </Stack>
                        </Stack>
                        <Stack direction={'column'} gap={1} p={2} sx={{bgcolor: 'primary.main', borderRadius: 4}}>
                            <Stack direction={'column'} className="info_dot white">
                                <Typography variant="body1" color="white">Parola Ferry Terminal</Typography>
                                <Typography variant="body2" color="white">Parola Ferry Terminal, Iloilo City</Typography>
                            </Stack>
                            <Stack direction={'column'} className="info_dot white">
                                <Typography variant="body1" color="white">Jordan Wharf</Typography>
                                <Typography variant="body2" color="white">Jordan Wharf, Jordan, Guimaras</Typography>
                            </Stack>
                        </Stack>
                        <Stack direction={'column'} gap={1} p={2} sx={{bgcolor: 'primary.main', borderRadius: 4}}>
                            <Stack direction={'column'} className="info_dot white">
                                <Typography variant="body1" color="white">Parola Ferry Terminal</Typography>
                                <Typography variant="body2" color="white">Parola Ferry Terminal, Iloilo City</Typography>
                            </Stack>
                            <Stack direction={'column'} className="info_dot white">
                                <Typography variant="body1" color="white">Jordan Wharf</Typography>
                                <Typography variant="body2" color="white">Jordan Wharf, Jordan, Guimaras</Typography>
                            </Stack>
                        </Stack>
                        <Stack direction={'column'} gap={1} p={2} sx={{bgcolor: 'primary.main', borderRadius: 4}}>
                            <Stack direction={'column'} className="info_dot white">
                                <Typography variant="body1" color="white">Parola Ferry Terminal</Typography>
                                <Typography variant="body2" color="white">Parola Ferry Terminal, Iloilo City</Typography>
                            </Stack>
                            <Stack direction={'column'} className="info_dot white">
                                <Typography variant="body1" color="white">Jordan Wharf</Typography>
                                <Typography variant="body2" color="white">Jordan Wharf, Jordan, Guimaras</Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                </CustomTabPanel>

                {/* Operators */}
                <CustomTabPanel value={tabVal} index={3}>
                    <Stack direction={'column'} gap={2} p={3}>
                        <Stack direction={'column'}>
                            <Box position={'relative'} overflow={'hidden'} sx={{borderRadius: 4, boxShadow: "1px 4px 9px 4px rgba(0, 0, 0, 0.1)"}}>
                                 <Stack p={2} direction={'column'} gap={2} position={'relative'} overflow={'hidden'}>
                                    <Stack direction={'row'}>
                                        <Stack position={'relative'} zIndex={10} flex={1} direction={'row'} alignItems={'center'} gap={1}>
                                            <Avatar></Avatar>
                                            <Stack direction={'column'}>
                                                <Typography variant="body1">Name Here</Typography>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                    <Stack direction={'row'} gap={1}>
                                        <Box flex={1} overflow={'hidden'} position={'relative'} height={50}>
                                            <Image style={{objectFit: 'cover'}} src="/images/placeholders/landscape.jpg" fill alt="Placeholder"></Image>
                                        </Box>
                                        <Box flex={1} overflow={'hidden'} position={'relative'} height={50}>
                                            <Image style={{objectFit: 'cover'}} src="/images/placeholders/landscape.jpg" fill alt="Placeholder"></Image>
                                        </Box>
                                        <Box flex={1} overflow={'hidden'} position={'relative'} height={50}>
                                            <Image style={{objectFit: 'cover'}} src="/images/placeholders/landscape.jpg" fill alt="Placeholder"></Image>
                                        </Box>
                                        <Box flex={1} overflow={'hidden'} position={'relative'} height={50}>
                                            <Image style={{objectFit: 'cover'}} src="/images/placeholders/landscape.jpg" fill alt="Placeholder"></Image>
                                        </Box>
                                        
                                    </Stack>
                                </Stack>
                                <Divider></Divider>
                                <Stack px={2} py={0} direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                                    <Chip size="small" label="000 Vessels" variant="contained" sx={{color: "white", bgcolor: 'primary.main'}}></Chip>
                                    <Tooltip title="Show Details">
                                        <IconButton>
                                            <ChevronRight/>
                                        </IconButton>
                                    </Tooltip>
                                </Stack>
                            </Box>
                        </Stack>
                        <Stack direction={'column'}>
                            <Box position={'relative'} overflow={'hidden'} sx={{borderRadius: 4, boxShadow: "1px 4px 9px 4px rgba(0, 0, 0, 0.1)"}}>
                                 <Stack p={2} direction={'column'} gap={2} position={'relative'} overflow={'hidden'}>
                                    <Stack direction={'row'}>
                                        <Stack position={'relative'} zIndex={10} flex={1} direction={'row'} alignItems={'center'} gap={1}>
                                            <Avatar></Avatar>
                                            <Stack direction={'column'}>
                                                <Typography variant="body1">Name Here</Typography>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                    <Stack direction={'row'} gap={1}>
                                        <Box flex={1} overflow={'hidden'} position={'relative'} height={50}>
                                            <Image style={{objectFit: 'cover'}} src="/images/placeholders/landscape.jpg" fill alt="Placeholder"></Image>
                                        </Box>
                                        <Box flex={1} overflow={'hidden'} position={'relative'} height={50}>
                                            <Image style={{objectFit: 'cover'}} src="/images/placeholders/landscape.jpg" fill alt="Placeholder"></Image>
                                        </Box>
                                        <Box flex={1} overflow={'hidden'} position={'relative'} height={50}>
                                            <Image style={{objectFit: 'cover'}} src="/images/placeholders/landscape.jpg" fill alt="Placeholder"></Image>
                                        </Box>
                                        <Box flex={1} overflow={'hidden'} position={'relative'} height={50}>
                                            <Image style={{objectFit: 'cover'}} src="/images/placeholders/landscape.jpg" fill alt="Placeholder"></Image>
                                        </Box>
                                        
                                    </Stack>
                                </Stack>
                                <Divider></Divider>
                                <Stack px={2} py={0} direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                                    <Chip size="small" label="000 Vessels" variant="contained" sx={{color: "white", bgcolor: 'primary.main'}}></Chip>
                                    <Tooltip title="Show Details">
                                        <IconButton>
                                            <ChevronRight/>
                                        </IconButton>
                                    </Tooltip>
                                </Stack>
                            </Box>
                        </Stack>
                        <Stack direction={'column'}>
                            <Box position={'relative'} overflow={'hidden'} sx={{borderRadius: 4, boxShadow: "1px 4px 9px 4px rgba(0, 0, 0, 0.1)"}}>
                                 <Stack p={2} direction={'column'} gap={2} position={'relative'} overflow={'hidden'}>
                                    <Stack direction={'row'}>
                                        <Stack position={'relative'} zIndex={10} flex={1} direction={'row'} alignItems={'center'} gap={1}>
                                            <Avatar></Avatar>
                                            <Stack direction={'column'}>
                                                <Typography variant="body1">Name Here</Typography>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                    <Stack direction={'row'} gap={1}>
                                        <Box flex={1} overflow={'hidden'} position={'relative'} height={50}>
                                            <Image style={{objectFit: 'cover'}} src="/images/placeholders/landscape.jpg" fill alt="Placeholder"></Image>
                                        </Box>
                                        <Box flex={1} overflow={'hidden'} position={'relative'} height={50}>
                                            <Image style={{objectFit: 'cover'}} src="/images/placeholders/landscape.jpg" fill alt="Placeholder"></Image>
                                        </Box>
                                        <Box flex={1} overflow={'hidden'} position={'relative'} height={50}>
                                            <Image style={{objectFit: 'cover'}} src="/images/placeholders/landscape.jpg" fill alt="Placeholder"></Image>
                                        </Box>
                                        <Box flex={1} overflow={'hidden'} position={'relative'} height={50}>
                                            <Image style={{objectFit: 'cover'}} src="/images/placeholders/landscape.jpg" fill alt="Placeholder"></Image>
                                        </Box>
                                        
                                    </Stack>
                                </Stack>
                                <Divider></Divider>
                                <Stack px={2} py={0} direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                                    <Chip size="small" label="000 Vessels" variant="contained" sx={{color: "white", bgcolor: 'primary.main'}}></Chip>
                                    <Tooltip title="Show Details">
                                        <IconButton>
                                            <ChevronRight/>
                                        </IconButton>
                                    </Tooltip>
                                </Stack>
                            </Box>
                        </Stack>
                        <Stack direction={'column'}>
                            <Box position={'relative'} overflow={'hidden'} sx={{borderRadius: 4, boxShadow: "1px 4px 9px 4px rgba(0, 0, 0, 0.1)"}}>
                                 <Stack p={2} direction={'column'} gap={2} position={'relative'} overflow={'hidden'}>
                                    <Stack direction={'row'}>
                                        <Stack position={'relative'} zIndex={10} flex={1} direction={'row'} alignItems={'center'} gap={1}>
                                            <Avatar></Avatar>
                                            <Stack direction={'column'}>
                                                <Typography variant="body1">Name Here</Typography>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                    <Stack direction={'row'} gap={1}>
                                        <Box flex={1} overflow={'hidden'} position={'relative'} height={50}>
                                            <Image style={{objectFit: 'cover'}} src="/images/placeholders/landscape.jpg" fill alt="Placeholder"></Image>
                                        </Box>
                                        <Box flex={1} overflow={'hidden'} position={'relative'} height={50}>
                                            <Image style={{objectFit: 'cover'}} src="/images/placeholders/landscape.jpg" fill alt="Placeholder"></Image>
                                        </Box>
                                        <Box flex={1} overflow={'hidden'} position={'relative'} height={50}>
                                            <Image style={{objectFit: 'cover'}} src="/images/placeholders/landscape.jpg" fill alt="Placeholder"></Image>
                                        </Box>
                                        <Box flex={1} overflow={'hidden'} position={'relative'} height={50}>
                                            <Image style={{objectFit: 'cover'}} src="/images/placeholders/landscape.jpg" fill alt="Placeholder"></Image>
                                        </Box>
                                        
                                    </Stack>
                                </Stack>
                                <Divider></Divider>
                                <Stack px={2} py={0} direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                                    <Chip size="small" label="000 Vessels" variant="contained" sx={{color: "white", bgcolor: 'primary.main'}}></Chip>
                                    <Tooltip title="Show Details">
                                        <IconButton>
                                            <ChevronRight/>
                                        </IconButton>
                                    </Tooltip>
                                </Stack>
                            </Box>
                        </Stack>
                        <Stack direction={'column'}>
                            <Box position={'relative'} overflow={'hidden'} sx={{borderRadius: 4, boxShadow: "1px 4px 9px 4px rgba(0, 0, 0, 0.1)"}}>
                                 <Stack p={2} direction={'column'} gap={2} position={'relative'} overflow={'hidden'}>
                                    <Stack direction={'row'}>
                                        <Stack position={'relative'} zIndex={10} flex={1} direction={'row'} alignItems={'center'} gap={1}>
                                            <Avatar></Avatar>
                                            <Stack direction={'column'}>
                                                <Typography variant="body1">Name Here</Typography>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                    <Stack direction={'row'} gap={1}>
                                        <Box flex={1} overflow={'hidden'} position={'relative'} height={50}>
                                            <Image style={{objectFit: 'cover'}} src="/images/placeholders/landscape.jpg" fill alt="Placeholder"></Image>
                                        </Box>
                                        <Box flex={1} overflow={'hidden'} position={'relative'} height={50}>
                                            <Image style={{objectFit: 'cover'}} src="/images/placeholders/landscape.jpg" fill alt="Placeholder"></Image>
                                        </Box>
                                        <Box flex={1} overflow={'hidden'} position={'relative'} height={50}>
                                            <Image style={{objectFit: 'cover'}} src="/images/placeholders/landscape.jpg" fill alt="Placeholder"></Image>
                                        </Box>
                                        <Box flex={1} overflow={'hidden'} position={'relative'} height={50}>
                                            <Image style={{objectFit: 'cover'}} src="/images/placeholders/landscape.jpg" fill alt="Placeholder"></Image>
                                        </Box>
                                        
                                    </Stack>
                                </Stack>
                                <Divider></Divider>
                                <Stack px={2} py={0} direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                                    <Chip size="small" label="000 Vessels" variant="contained" sx={{color: "white", bgcolor: 'primary.main'}}></Chip>
                                    <Tooltip title="Show Details">
                                        <IconButton>
                                            <ChevronRight/>
                                        </IconButton>
                                    </Tooltip>
                                </Stack>
                            </Box>
                        </Stack>
                        <Button variant="outlined">See More</Button>
                    </Stack>
                </CustomTabPanel>
            </Stack>
        </Drawer>
        <Marker eventHandlers={{
                click: (e) => {
                    setOpen(!open);
                    onPortOpenClick();
                }
            }} position={data?.markCoords} icon={muiIcon}>
                {/* <Popup>
                    {data?.address}
                </Popup> */}
            </Marker>
    </Fragment>
}

export default function MapMain(props) {
    const { position, zoom, onPortOpenClick, onPortCloseClick } = props;

    const markersData = [
        {
            portName: "Port Name",
            portImage: "Port Image",
            address: "Jordan Wharf, Jordan, Guimaras",
            markCoords: [10.66711787840169, 122.58935371527645],
            traffic: {
                passengers: '150,321',
                trips: 120
            },
            departure: {
                vessel: "M/V Margaux I",
                operator: 'SG8 Maritime, Inc.',
                origin: "Buenavista Wharf",
                arrival: "Parola Ferry Terminal",
                totalPax: '132',
                date: new Date()
            },
            arrival: {
                vessel: "M/V Margaux I",
                operator: 'SG8 Maritime, Inc.',
                origin: "Jordan Wharf, Jordan, Guimaras",
                arrival: "Parola Ferry Terminal, Iloilo City",
                totalPax: '132',
                date: new Date()
            },
            routes: [
                {
                    arrival: {
                        address: "Parola Ferry Terminal, Iloilo City",
                        label: "Parola Ferry Terminal"
                    },
                    origin: {
                        address: "Jordan Wharf, Jordan, Guimaras",
                        label: "Jordan Wharf"
                    }
                }
            ],
        }
    ]

    return (
        <div>
            <MapContainer className="map_main" center={[10.66711787840169, 122.58935371527645]} zoom={13}>
                 <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {markersData?.map((a, i) => {
                    return (
                        <MarkerMap data={a} key={i} onPortOpenClick={onPortOpenClick} onPortCloseClick={onPortCloseClick}></MarkerMap>
                    )
                })}
            </MapContainer>
        </div>
    );
}