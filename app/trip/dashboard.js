'use client'

import { Fullscreen, OpenInFullSharp } from "@mui/icons-material";
import { Avatar, Box, Button, Chip, Container, IconButton, Stack, Tab, Table, TableCell, TableContainer, TableHead, TableRow, Tabs, Typography, TableBody, Divider, Tooltip, CircularProgress, LinearProgress } from "@mui/material";
import { differenceInYears, format } from "date-fns";
import Image from "next/image";
import { Fragment, useState } from "react";
import PropTypes from "prop-types";

import '@/app/styles/trip.scss'
import '@/app/styles/global.scss'


function ListRow(props){
    const { name, gender, dob, address, designation, last_updated, license, photo } = props?.data;
    return (
        <Fragment key={`${last_updated}-${name}`}>
            <TableRow>
                <TableCell sx={{
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                    bgcolor: 'white',
                    textAlign: 'center', py: 0
                }} className="table_cell">
                    {props?.i}
                    <Divider flexItem orientation="vertical"></Divider>
                </TableCell>
                <TableCell className="table_cell" sx={{bgcolor: 'white', py: 1}}>{name ? name : 'No Name found'} <Divider flexItem orientation="vertical"></Divider></TableCell>
                <TableCell className="table_cell" sx={{bgcolor: 'white', py: 1}}>{gender ? gender : 'No Gender found'}</TableCell>
                <TableCell className="table_cell" sx={{bgcolor: 'white', py: 1}}>{dob ? differenceInYears(new Date(), new Date(dob)) : 'No Date of birth found'}</TableCell>
                <TableCell className="table_cell" sx={{bgcolor: 'white', py: 1}}>{address ? address : 'No Address found'}</TableCell>
                <TableCell className="table_cell" sx={{bgcolor: 'white', py: 1}}>
                    {designation ? <Chip variant='filled' sx={{bgcolor: 'primary.main', color: "#fff"}} label={designation}></Chip> : <Typography variant="body1" component={'span'}>Unidentified</Typography>}
                </TableCell>
                <TableCell className="table_cell" sx={{bgcolor: 'white', py: 1}}>{license ? `${license?.number} • ${license?.issuedBy} • ${license?.issuedOn} to ${license?.expiry}` : 'No update found'}</TableCell>
                <TableCell sx={{bgcolor: 'white', py: 1, borderTopRightRadius: 10, borderBottomRightRadius: 10}}>
                    <Box width={'100%'} display={'flex'}>
                        <IconButton sx={{mx: 'auto'}}>
                            <OpenInFullSharp></OpenInFullSharp>
                        </IconButton>
                    </Box>
                </TableCell>
            </TableRow>
        </Fragment>
    )
};

function PassengerRow(props){
    const { name, gender, dob, address, boarded_on, scanned_by } = props?.data;
    return (
        <Fragment key={`${boarded_on}-${name}`}>
            <TableRow>
                <TableCell sx={{
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                    bgcolor: 'white',
                    textAlign: 'center', py: 0
                }} className="table_cell">
                    {props?.i}
                    <Divider flexItem orientation="vertical"></Divider>
                </TableCell>
                <TableCell className="table_cell" sx={{bgcolor: 'white', py: 1}}>{name ? name : 'No Name found'} <Divider flexItem orientation="vertical"></Divider></TableCell>
                <TableCell className="table_cell" sx={{bgcolor: 'white', py: 1}}>{gender ? gender : 'No Gender found'}</TableCell>
                <TableCell className="table_cell" sx={{bgcolor: 'white', py: 1}}>{dob ? differenceInYears(new Date(), new Date(dob)) : 'No Date of birth found'}</TableCell>
                <TableCell className="table_cell" sx={{bgcolor: 'white', py: 1}}>{address ? address : 'No Address found'}</TableCell>
                <TableCell className="table_cell" sx={{bgcolor: 'white', py: 1}}>{boarded_on ? `${format(boarded_on, "HH:MM a")}` : 'Not boarded yet'}</TableCell>
                <TableCell sx={{bgcolor: 'white', py: 1, borderTopRightRadius: 10, borderBottomRightRadius: 10}}>
                    {scanned_by ? <Stack direction={'row'} alignItems="center" gap={1}>
                        <Avatar src={scanned_by?.photo && scanned_by?.photo} sx={{width: 30, height: 30}}></Avatar>
                        <Typography variant="body1" component={'p'}>{scanned_by?.name}</Typography>
                    </Stack> : 'Not Found'}
                </TableCell>
            </TableRow>
        </Fragment>
    )
};

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
                        mr: 1
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

export default function DashboardTrip() {

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
                {value === index && <Box width="100%" mt={3} overflow={'auto'} maxHeight={'500px'}>{children}</Box>}
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

    const data = [
        {
            name: 'Juan Dela Cruz',
            gender: 'Male',
            dob: new Date('1/30/2000'),
            address: 'Sta. Teresa, Jordan, Guimaras',
            designation: 'manipesto.ph',
            status: 'Verified',
            license: {
                number: '101-00023',
                issuedBy: "MROVI ",
                issuedOn: "12/12/2000",
                expiry: "1/1/2025"
            }
        },
        {
            name: 'Juan Dela Cruz',
            gender: 'Male',
            dob: new Date('1/30/2000'),
            address: 'Sta. Teresa, Jordan, Guimaras',
            designation: 'manipesto.ph',
            status: 'Verified',
            license: {
                number: '101-00023',
                issuedBy: "MROVI ",
                issuedOn: "12/12/2000",
                expiry: "1/1/2025"
            }
        },
        {
            name: 'Juan Dela Cruz',
            gender: 'Male',
            dob: new Date('1/30/2000'),
            address: 'Sta. Teresa, Jordan, Guimaras',
            designation: 'manipesto.ph',
            status: 'Verified',
            license: {
                number: '101-00023',
                issuedBy: "MROVI ",
                issuedOn: "12/12/2000",
                expiry: "1/1/2025"
            }
        },
        {
            name: 'Juan Dela Cruz',
            gender: 'Male',
            dob: new Date('1/30/2000'),
            address: 'Sta. Teresa, Jordan, Guimaras',
            designation: 'manipesto.ph',
            status: 'Verified',
            license: {
                number: '101-00023',
                issuedBy: "MROVI ",
                issuedOn: "12/12/2000",
                expiry: "1/1/2025"
            }
        },
        {
            name: 'Juan Dela Cruz',
            gender: 'Male',
            dob: new Date('1/30/2000'),
            address: 'Sta. Teresa, Jordan, Guimaras',
            designation: 'manipesto.ph',
            status: 'Verified',
            license: {
                number: '101-00023',
                issuedBy: "MROVI ",
                issuedOn: "12/12/2000",
                expiry: "1/1/2025"
            }
        }
    ]

    const passengerList = [
        {
            name: 'Juan Dela Cruz',
            gender: 'Male',
            dob: new Date('1/30/2000'),
            address: 'Sta. Teresa, Jordan, Guimaras',
            boarded_on: new Date('1/30/2000'),
            scanned_by: {
                name: "Juanita Dela Cruzita",
                photo: ""
            }
        },
        {
            name: 'Juan Dela Cruz',
            gender: 'Male',
            dob: new Date('1/30/2000'),
            address: 'Sta. Teresa, Jordan, Guimaras',
            boarded_on: new Date('1/30/2000'),
            scanned_by: {
                name: "Juanita Dela Cruzita",
                photo: ""
            }
        },
        {
            name: 'Juan Dela Cruz',
            gender: 'Male',
            dob: new Date('1/30/2000'),
            address: 'Sta. Teresa, Jordan, Guimaras',
            boarded_on: new Date('1/30/2000'),
            scanned_by: {
                name: "Juanita Dela Cruzita",
                photo: ""
            }
        },
        {
            name: 'Juan Dela Cruz',
            gender: 'Male',
            dob: new Date('1/30/2000'),
            address: 'Sta. Teresa, Jordan, Guimaras',
            boarded_on: new Date('1/30/2000'),
            scanned_by: {
                name: "Juanita Dela Cruzita",
                photo: ""
            }
        },
    ]

    const count_summary = {
        t: 100,
        m: 120,
        sx: [
            {
                l: "Male",
                c: 19,
                clr: '#8b77fd'
            },
            {
                l: "Female",
                c: 66,
                clr: '#75dbff'
            }
        ],
        ag: [
            {
                l: "Infants",
                c: 3,
                clr: '#8b77fd'
            },
            {
                l: "Children",
                c: 7,
                clr: '#75dbff'
            },
            {
                l: "Adults",
                c: 70,
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
                <Stack flex={2} direction={'column'} gap={2} maxWidth={{xs: 'none', lg: '60%'}} width={'100%'}>
                    <Stack p={2} direction={'column'} gap={1} sx={{bgcolor: 'white', borderRadius: 4}}>
                        <Stack flexWrap={'wrap'} direction={'row'} position={'relative'} height={{xs: 'auto', lg: 200}} gap={1}>
                            <Box sx={{position: 'relative', flex: 3, borderRadius: 4, overflow: 'hidden', minWidth: 200, width: '100%', height: {xs: 200, lg: 'auto'}}}>
                                <Image style={{objectFit: 'cover'}} src="/images/placeholders/landscape.jpg" alt="Placeholder" fill></Image>
                            </Box>
                            <Stack p={2} flex={2} direction={'column'} sx={{bgcolor: "background.main", borderRadius: 4}}>
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
                    </Stack>
                <Box p={3} borderRadius={4} sx={{bgcolor: 'white'}}>
                    <Tabs variant="scrollable" slotProps={{
                        root: {
                            sx: {
                                px: 2,
                            }
                        },
                    }} value={tabVal} onChange={handleChange} aria-label="Tabs">
                        <Tab label="Crew List" {...a11yProps(0)} />
                        <Tab label="Passenger List" {...a11yProps(1)} />
                    </Tabs>
                    
                    {/* Crew */}
                    <CustomTabPanel index={0} value={tabVal} >
                        <TableContainer sx={{
                            borderRadius: 4,
                            whiteSpace: 'nowrap',
                            overflow: 'auto',
                            width: '100%',
                            maxHeight: 300,
                        }}>
                            <Table sx={{
                                minWidth: 1200,
                                borderSpacing: '0 10px',
                                borderCollapse: 'separate',
                            }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell className="table_cell" sx={{
                                            borderTopLeftRadius: 10,
                                            borderBottomLeftRadius: 10,
                                            bgcolor: 'white'
                                        }}></TableCell>
                                        <TableCell className="table_cell" sx={{bgcolor: 'white'}}>Name</TableCell>
                                        <TableCell className="table_cell" sx={{bgcolor: 'white'}}>Sex</TableCell>
                                        <TableCell className="table_cell" sx={{bgcolor: 'white'}}>Age</TableCell>
                                        <TableCell className="table_cell" sx={{bgcolor: 'white'}}>Address</TableCell>
                                        <TableCell className="table_cell" sx={{bgcolor: 'white'}}>Designation</TableCell>
                                        <TableCell className="table_cell" sx={{bgcolor: 'white'}}>License</TableCell>
                                        <TableCell sx={{bgcolor: 'white', borderTopRightRadius: 10, borderBottomRightRadius: 10}}></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data ? data.map((a, i) => {
                                        return (
                                            <ListRow data={a} key={i} i={i}></ListRow>
                                        )
                                    }) : <div></div>}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CustomTabPanel>

                    {/* Passenger */}
                    <CustomTabPanel index={1} value={tabVal}>
                        <TableContainer sx={{
                            borderRadius: 4,
                            width: '100%',
                            whiteSpace: 'nowrap',
                            overflow: 'auto',
                            maxHeight: 300
                        }}>
                        <Table sx={{
                            minWidth: 1200,
                            borderSpacing: '0 10px',
                            borderCollapse: 'separate',
                        }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell className="table_cell" sx={{
                                        borderTopLeftRadius: 10,
                                        borderBottomLeftRadius: 10,
                                        bgcolor: 'white'
                                    }}></TableCell>
                                    <TableCell className="table_cell" sx={{bgcolor: 'white'}}>Name</TableCell>
                                    <TableCell className="table_cell" sx={{bgcolor: 'white'}}>Sex</TableCell>
                                    <TableCell className="table_cell" sx={{bgcolor: 'white'}}>Age</TableCell>
                                    <TableCell className="table_cell" sx={{bgcolor: 'white'}}>Address</TableCell>
                                    <TableCell className="table_cell" sx={{bgcolor: 'white'}}>Boarded on</TableCell>
                                    <TableCell className="table_cell" sx={{bgcolor: 'white', borderTopRightRadius: 10, borderBottomRightRadius: 10}}>Scanned By</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {passengerList ? passengerList.map((a, i) => {
                                    return (
                                        <PassengerRow data={a} key={i} i={i}></PassengerRow>
                                    )
                                }) : <div></div>}
                            </TableBody>
                        </Table>
                        </TableContainer>
                    </CustomTabPanel>
                </Box>
                </Stack>
                <Stack flex={1} direction={'column'} gap={2}>
                    <Box flex={1} className="tab_container" sx={{bgcolor: "white", mt: 3, borderRadius: 4}}>
                        <Box flex={1} sx={{bgcolor: "white", borderRadius: 4}} p={2}>
                            <Typography px={3} variant="h5" component={'h3'}>Summary</Typography>
                            <Box maxHeight={500} mt={3} pb={4} overflow={'auto'}>
                                <Stack py={3} direction={'column'} gap={4}>
                                    
                                    {/* Route */}
                                    <Box className="info_box white" p={2} mx={{xs: 0, md: 3}} borderRadius={4} sx={{boxShadow: "1px 4px 9px 4px rgba(0, 0, 0, 0.05)"}}>
                                        <Typography variant="body1" className="label">Route</Typography>
                                        <Box p={2} sx={{borderRadius: 4, bgcolor: 'primary.main'}}>
                                            <Stack direction={'column'} gap={1}>
                                                <Stack className="info_dot white" flex={1} direction={'row'} gap={1}>
                                                    <Box flex={2}>
                                                        <Typography color="white" variant="body1">06.05.2025</Typography>
                                                        <Typography color="white" variant="subtitle2" sx={{opacity: 0.6}}>2:00 AM • ETA</Typography>
                                                    </Box>
                                                    <Box flex={3}>
                                                        <Typography color="white" variant="body1">Origin</Typography>
                                                        <Typography color="white" variant="subtitle2" sx={{opacity: 0.6}}>Jordan Wharf</Typography>
                                                    </Box>
                                                </Stack>
                                                <Stack className="info_dot white" flex={1} direction={'row'} gap={1}>
                                                    <Box flex={2}>
                                                        <Typography color="white" variant="body1">06.05.2025</Typography>
                                                        <Typography color="white" variant="subtitle2" sx={{opacity: 0.6}}>2:00 AM • ATA</Typography>
                                                    </Box>
                                                    <Box flex={3}>
                                                        <Typography color="white" variant="body1">Origin</Typography>
                                                        <Typography color="white" variant="subtitle2" sx={{opacity: 0.6}}>Rizal, Jordan, Guimaras</Typography>
                                                    </Box>
                                                </Stack>
                                            </Stack>
                                        </Box>
                                    </Box>

                                    {/* Chart */}
                                    <Stack mx={3} direction={'column'} gap={1} alignItems={'center'}>
                                        <Box sx={{position: 'relative', width: 200}}>
                                            <CircularChart value={count_summary}></CircularChart>
                                        </Box>
                                        <ProgressChart value={count_summary?.sx}></ProgressChart>
                                        <ProgressChart value={count_summary?.ag}></ProgressChart>
                                    </Stack>

                                    {/* Signatories */}
                                    <Box className="info_box" p={3} mx={{xs: 0, md: 3}} borderRadius={4} sx={{boxShadow: "1px 4px 9px 4px rgba(0, 0, 0, 0.05)"}}>
                                        <Typography variant="body1" className="label">Signatories</Typography>
                                        <Stack gap={4} direction={'column'}>
                                            <Box py={2} px={4} borderRadius={4} sx={{ bgcolor: 'background.main', position: 'relative'}}>
                                                <Stack mb={2} direction={'row'} alignItems={'center'}>
                                                    <Stack direction={'row'} alignItems={'center'} gap={2} flexWrap={'wrap'}>
                                                        <Avatar sx={{width: 50, height: 50}}></Avatar>
                                                        <Box>
                                                            <Typography variant="body1" fontWeight={800} gutterBottom={false}>Juan Dela Cruz</Typography>
                                                            <Typography variant="subtitle2">0999782331</Typography>
                                                        </Box>
                                                    </Stack>
                                                    <Chip className="chip_anchor-top-left" variant="filled" label="Master" size="large" sx={{color: "white", bgcolor: "primary.main", ml: 'auto', mb: 'auto'}}></Chip>
                                                </Stack>
                                                <Box sx={{display: 'grid', gridTemplateColumns: {xs: '1fr', md: '1fr 1fr'}, gridTemplateRows: {xs: '1fr', md: '1fr 1fr'}, gap: 2}}>
                                                    <Box flex={1} minWidth={'max-content'}>
                                                        <Typography variant="subtitle2">License No.</Typography>
                                                        <Typography variant="h6" fontWeight={800}>101-00023</Typography>
                                                    </Box>
                                                    <Box flex={1} minWidth={'max-content'}>
                                                        <Typography variant="subtitle2">Issued By</Typography>
                                                        <Typography variant="h6" fontWeight={800}>MROVI</Typography>
                                                    </Box>
                                                    <Box flex={1} minWidth={'max-content'}>
                                                        <Typography variant="subtitle2">Issued On</Typography>
                                                        <Typography variant="h6" fontWeight={800}>12/12/2000</Typography>
                                                    </Box>
                                                    <Box flex={1} minWidth={'max-content'}>
                                                        <Typography variant="subtitle2">Expiry</Typography>
                                                        <Typography variant="h6" fontWeight={800}>12/12/2020</Typography>
                                                    </Box>
                                                </Box>
                                            </Box>
                                            <Box py={2} px={4} borderRadius={4} sx={{ bgcolor: 'background.main', position: 'relative'}}>
                                                <Stack direction={'row'} alignItems={'center'}>
                                                    <Stack direction={'row'} alignItems={'flex-start'} gap={2} flexWrap="wrap">
                                                        <Avatar sx={{width: 50, height: 50}}></Avatar>
                                                        <Box>
                                                            <Typography variant="body1" fontWeight={800} gutterBottom={false}>Juan Dela Cruz PO3</Typography>
                                                            <Typography variant="subtitle2" maxWidth={200}>Coast Guard Sub-Station Jordan</Typography>
                                                        </Box>
                                                    </Stack>
                                                    <Chip className="chip_anchor-top-left" variant="filled" label="PCG PDI" size="large" sx={{color: "white", bgcolor: "primary.main", ml: 'auto', mb: 'auto'}}></Chip>
                                                </Stack>
                                            </Box>
                                        </Stack>
                                    </Box>

                                    {/* Record Activities */}
                                    <Box className="info_box" p={3} mx={{xs: 0, md: 3}} borderRadius={4} sx={{boxShadow: "1px 4px 9px 4px rgba(0, 0, 0, 0.05)"}}>
                                        <Typography variant="body1" className="label">Record Activities</Typography>
                                        <Stack direction={'column'} gap={2}>
                                            <Box py={2} px={4} borderRadius={4} sx={{ bgcolor: 'background.main', position: 'relative'}}>
                                                <Stack direction={'row'} alignItems={'center'}>
                                                    <Stack direction={'row'} alignItems={'flex-start'} gap={2} flexWrap="wrap">
                                                        <Avatar sx={{width: 50, height: 50}}></Avatar>
                                                        <Box>
                                                            <Typography variant="body1" fontWeight={800} gutterBottom={false}>Juan Dela Cruz</Typography>
                                                            <Typography variant="subtitle2" maxWidth={200}>April 09, 2026 11:39 PM</Typography>
                                                        </Box>
                                                    </Stack>
                                                    <Chip className="chip_anchor-top-left" variant="filled" label="Uploaded" size="large" sx={{bgcolor: 'primary.main', color: "background.main", ml: 'auto', mb: 'auto'}}></Chip>
                                                </Stack>
                                            </Box>

                                            <Box py={2} px={4} borderRadius={4} sx={{ bgcolor: 'background.main', position: 'relative'}}>
                                                <Stack direction={'row'} alignItems={'center'}>
                                                    <Stack direction={'row'} alignItems={'flex-start'} gap={2} flexWrap="wrap">
                                                        <Avatar sx={{width: 50, height: 50}}></Avatar>
                                                        <Box>
                                                            <Typography variant="body1" fontWeight={800} gutterBottom={false}>Juan Dela Cruz</Typography>
                                                            <Typography variant="subtitle2" maxWidth={200}>April 09, 2026 11:39 PM</Typography>
                                                        </Box>
                                                    </Stack>
                                                    <Chip className="chip_anchor-top-left" variant="filled" label="Cleared" size="large" sx={{bgcolor: 'primary.main', color: "background.main", ml: 'auto', mb: 'auto'}}></Chip>
                                                </Stack>
                                            </Box>
                                            
                                            <Box py={2} px={4} borderRadius={4} sx={{ bgcolor: 'background.main', position: 'relative'}}>
                                                <Stack direction={'row'} alignItems={'center'}>
                                                    <Stack direction={'row'} alignItems={'flex-start'} gap={2} flexWrap="wrap">
                                                        <Avatar sx={{width: 50, height: 50}}></Avatar>
                                                        <Box>
                                                            <Typography variant="body1" fontWeight={800} gutterBottom={false}>Juan Dela Cruz</Typography>
                                                            <Typography variant="subtitle2" maxWidth={200}>April 09, 2026 11:39 PM</Typography>
                                                        </Box>
                                                    </Stack>
                                                    <Chip className="chip_anchor-top-left" variant="filled" label="Arrival" size="large" sx={{bgcolor: 'primary.main', color: "background.main", ml: 'auto', mb: 'auto'}}></Chip>
                                                </Stack>
                                            </Box>
                                        </Stack>
                                    </Box>
                                </Stack>
                            </Box>
                        </Box>
                    </Box>
                </Stack>
            </Stack>
        </Container>
    );
}