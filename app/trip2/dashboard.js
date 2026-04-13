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
                <TableCell className="table_cell" sx={{bgcolor: 'white', py: 1}}>{license ? `${license?.number} • ${license?.issuedBy} • ${format(license?.issuedOn, 'MM/dd/yyyy')} to ${format(license?.expiry, 'MM/dd/yyyy')}` : 'No update found'}</TableCell>
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
                <TableCell className="table_cell" sx={{bgcolor: 'white', py: 1}}>{boarded_on ? `${format(boarded_on, "HH:mm a")}` : 'Not boarded yet'}</TableCell>
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
            "name": "Clay Tate",
            "gender": "Male",
            "address": "961 Quentin Street, Montura, Oregon, 4684",
            "boarded_on": new Date("Fri Jan 30 2026 13:13:17 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Sun Sep 11 2005 16:39:45 GMT+0800 (Singapore Standard Time)"),
            "designation": "Captain",
            "license": {
                "number": "101-00023",
                "issuedBy": "MROVI ",
                "issuedOn": new Date("Sun Feb 22 2026 02:38:56 GMT+0800 (Singapore Standard Time)"),
                "expiry": new Date("Thu Apr 09 2026 06:03:14 GMT+0800 (Singapore Standard Time)"),
            }
        },
        {
            "name": "Miriam Lynn",
            "gender": "Female",
            "address": "519 Kathleen Court, Blackgum, Georgia, 9225",
            "boarded_on": new Date("Thu Feb 19 2026 10:55:25 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Wed May 30 2018 02:35:50 GMT+0800 (Singapore Standard Time)"),
            "designation": "Engineer",
            "license": {
                "number": "101-00023",
                "issuedBy": "MROVI ",
                "issuedOn": new Date("Thu Apr 02 2026 10:48:22 GMT+0800 (Singapore Standard Time)"),
                "expiry": new Date("Wed Mar 18 2026 04:54:52 GMT+0800 (Singapore Standard Time)")
            }
        },
        {
            "name": "Josephine Garner",
            "gender": "Female",
            "address": "942 Navy Walk, Ilchester, Puerto Rico, 2613",
            "boarded_on": new Date("Tue Apr 07 2026 23:12:46 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Thu Feb 08 2024 14:49:47 GMT+0800 (Singapore Standard Time)"),
            "designation": "Crew",
            "license": {
                "number": "101-00023",
                "issuedBy": "MROVI ",
                "issuedOn": new Date("Wed Mar 11 2026 14:18:56 GMT+0800 (Singapore Standard Time)"),
                "expiry": new Date("Thu Apr 09 2026 06:03:14 GMT+0800 (Singapore Standard Time)")
            }
        },
        {
            "name": "Suzette Oneal",
            "gender": "Female",
            "address": "312 Halleck Street, Smock, Wisconsin, 9786",
            "boarded_on": new Date("Thu Feb 05 2026 04:21:28 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Sun Feb 22 2026 22:07:04 GMT+0800 (Singapore Standard Time)"),
            "designation": "Crew",
            "license": {
                "number": "101-00023",
                "issuedBy": "MROVI ",
                "issuedOn": new Date("Mon Feb 23 2026 17:34:25 GMT+0800 (Singapore Standard Time)"),
                "expiry": new Date("Thu Apr 09 2026 06:03:14 GMT+0800 (Singapore Standard Time)")
            }
        }
        ]

    const passengerList = [
        {
            "name": "Berry Wilder",
            "gender": "Male",
            "address": "391 Baughman Place, Rossmore, Wisconsin, 5769",
            "boarded_on": new Date("Mon Mar 09 2026 19:57:08 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Tue Feb 25 2000 14:44:07 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Rosa Lynn",
                "photo": ""
            }
        },
        {
            "name": "Jenkins Barry",
            "gender": "Male",
            "address": "186 Rutledge Street, Sunriver, Arkansas, 263",
            "boarded_on": new Date("Thu Jan 08 2026 02:11:06 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Sun Oct 26 2008 04:18:40 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Hughes Espinoza",
                "photo": ""
            }
        },
        {
            "name": "Witt Avila",
            "gender": "Male",
            "address": "473 Lincoln Place, Helen, Iowa, 979",
            "boarded_on": new Date("Mon Mar 16 2026 04:13:30 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Sat Jul 22 2025 00:24:44 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Parker Petersen",
                "photo": ""
            }
        },
        {
            "name": "Case Donaldson",
            "gender": "Male",
            "address": "711 Hoyts Lane, Grenelefe, Oregon, 852",
            "boarded_on": new Date("Sat Jan 31 2026 01:50:04 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Tue Aug 23 2022 05:39:47 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Jeannine Hull",
                "photo": ""
            }
        },
        {
            "name": "Fletcher Michael",
            "gender": "Male",
            "address": "554 Visitation Place, Thatcher, Missouri, 5401",
            "boarded_on": new Date("Thu Jan 29 2026 02:34:26 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Mon Jun 21 2002 17:08:03 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Williams Rivers",
                "photo": ""
            }
        },
        {
            "name": "Keith Scott",
            "gender": "Male",
            "address": "799 Cambridge Place, Coinjock, New York, 6304",
            "boarded_on": new Date("Fri Mar 20 2026 20:43:13 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Sat Jan 07 2006 07:44:08 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Pat Mcneil",
                "photo": ""
            }
        },
        {
            "name": "Moore Hurley",
            "gender": "Male",
            "address": "183 Rodney Street, Cumberland, Massachusetts, 9348",
            "boarded_on": new Date("Sat Mar 14 2026 06:45:26 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Sun Nov 14 2003 08:13:43 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Noelle Hoffman",
                "photo": ""
            }
        },
        {
            "name": "Sears Hicks",
            "gender": "Male",
            "address": "668 Main Street, Urie, Colorado, 8481",
            "boarded_on": new Date("Thu Jan 22 2026 14:49:43 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Sat Nov 24 2007 18:10:18 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Christina Fleming",
                "photo": ""
            }
        },
        {
            "name": "Stewart Conner",
            "gender": "Male",
            "address": "683 Newkirk Avenue, Harold, Virgin Islands, 622",
            "boarded_on": new Date("Sat Apr 04 2026 04:53:09 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Tue Jan 11 2000 22:17:50 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Schroeder Andrews",
                "photo": ""
            }
        },
        {
            "name": "Snyder Green",
            "gender": "Male",
            "address": "455 Doscher Street, Kiskimere, Pennsylvania, 2344",
            "boarded_on": new Date("Wed Mar 25 2026 23:43:58 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Tue Feb 25 2001 20:05:16 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Kendra Murphy",
                "photo": ""
            }
        },
        {
            "name": "Bird Wynn",
            "gender": "Male",
            "address": "392 Cortelyou Road, Barronett, Illinois, 6266",
            "boarded_on": new Date("Wed Mar 04 2026 12:04:01 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Sun Jul 16 2006 20:10:27 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Staci Woods",
                "photo": ""
            }
        },
        {
            "name": "Poole Pierce",
            "gender": "Male",
            "address": "485 Empire Boulevard, Darlington, Vermont, 1192",
            "boarded_on": new Date("Sat Mar 28 2026 12:04:12 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Sat May 25 2002 20:54:01 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Sofia Shaffer",
                "photo": ""
            }
        },
        {
            "name": "Sanders Leach",
            "gender": "Male",
            "address": "184 Melba Court, Lacomb, District Of Columbia, 248",
            "boarded_on": new Date("Thu Mar 12 2026 15:17:18 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Tue Nov 15 2005 04:09:01 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Mejia Hopper",
                "photo": ""
            }
        },
        {
            "name": "Randall Roth",
            "gender": "Male",
            "address": "545 Boynton Place, Floriston, Utah, 3962",
            "boarded_on": new Date("Fri Feb 27 2026 01:59:07 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Mon Oct 08 2000 06:20:40 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Addie Davenport",
                "photo": ""
            }
        },
        {
            "name": "Kerr Hinton",
            "gender": "Male",
            "address": "529 Polar Street, Boykin, Alabama, 6635",
            "boarded_on": new Date("Sat Jan 31 2026 23:02:10 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Tue Sep 29 1999 07:39:09 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Gloria Ortega",
                "photo": ""
            }
        },
        {
            "name": "Church Irwin",
            "gender": "Male",
            "address": "419 Denton Place, Saranap, Mississippi, 8992",
            "boarded_on": new Date("Sun Jan 18 2026 22:35:57 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Tue Mar 18 2023 15:57:05 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Robinson Hobbs",
                "photo": ""
            }
        },
        {
            "name": "Holden Blackburn",
            "gender": "Male",
            "address": "584 Frost Street, Glenville, New Mexico, 4623",
            "boarded_on": new Date("Mon Mar 02 2026 11:19:39 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Mon Dec 29 2013 20:14:05 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Elise Phelps",
                "photo": ""
            }
        },
        {
            "name": "Blevins Reeves",
            "gender": "Male",
            "address": "966 Paerdegat Avenue, Valle, Delaware, 1031",
            "boarded_on": new Date("Sat Jan 24 2026 15:08:05 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Tue Jan 24 2004 10:16:46 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Lora Aguirre",
                "photo": ""
            }
        },
        {
            "name": "Lane Graham",
            "gender": "Male",
            "address": "992 Seigel Street, Vienna, Minnesota, 7813",
            "boarded_on": new Date("Tue Apr 07 2026 07:55:35 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Tue Nov 07 2000 08:42:50 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Anderson Workman",
                "photo": ""
            }
        },
        {
            "name": "Ferguson Ferrell",
            "gender": "Male",
            "address": "455 Mermaid Avenue, Saddlebrooke, Maine, 8829",
            "boarded_on": new Date("Sun Feb 22 2026 16:21:56 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Fri Aug 06 2004 18:32:02 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Millie Reyes",
                "photo": ""
            }
        },
        {
            "name": "Shelia Cardenas",
            "gender": "Female",
            "address": "403 Bassett Avenue, Freelandville, Kansas, 4586",
            "boarded_on": new Date("Wed Feb 18 2026 13:54:43 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Wed Dec 20 2001 09:50:24 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Joyce Hayden",
                "photo": ""
            }
        },
        {
            "name": "Candy Delaney",
            "gender": "Female",
            "address": "302 Bijou Avenue, Marienthal, Washington, 5096",
            "boarded_on": new Date("Sat Feb 21 2026 05:52:12 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Sat Mar 03 2002 18:49:24 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Alston Kaufman",
                "photo": ""
            }
        },
        {
            "name": "Lillian Sullivan",
            "gender": "Female",
            "address": "367 Lewis Place, Watchtower, Mississippi, 495",
            "boarded_on": new Date("Sun Feb 22 2026 15:24:03 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Sat May 01 2000 20:44:12 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Turner Battle",
                "photo": ""
            }
        },
        {
            "name": "Cathryn Bush",
            "gender": "Female",
            "address": "163 Nolans Lane, Caroline, New Jersey, 710",
            "boarded_on": new Date("Wed Jan 14 2026 15:01:51 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Sun Jun 25 2000 12:29:43 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Dotson Sharpe",
                "photo": ""
            }
        },
        {
            "name": "Audra Olsen",
            "gender": "Female",
            "address": "322 Hunterfly Place, Brownlee, Nevada, 9917",
            "boarded_on": new Date("Sat Feb 21 2026 08:35:52 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Thu Mar 10 2011 04:16:56 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Willie Hodges",
                "photo": ""
            }
        },
        {
            "name": "Louise Mccall",
            "gender": "Female",
            "address": "204 Cherry Street, Yettem, Arizona, 9992",
            "boarded_on": new Date("Fri Mar 06 2026 12:09:24 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Sat Aug 29 2009 21:43:05 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Elsa Sexton",
                "photo": ""
            }
        },
        {
            "name": "Sybil Clark",
            "gender": "Female",
            "address": "648 Irwin Street, Urbana, Oklahoma, 6823",
            "boarded_on": new Date("Wed Feb 18 2026 17:41:15 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Wed Oct 18 2000 17:11:15 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Nona Duncan",
                "photo": ""
            }
        },
        {
            "name": "Lelia Nunez",
            "gender": "Female",
            "address": "660 Seaview Court, Hegins, Michigan, 8433",
            "boarded_on": new Date("Sat Jan 17 2026 03:50:06 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Thu Nov 19 2000 11:48:40 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Leon Baldwin",
                "photo": ""
            }
        },
        {
            "name": "Marjorie Dixon",
            "gender": "Female",
            "address": "145 Gerald Court, Nettie, Maryland, 7958",
            "boarded_on": new Date("Mon Feb 23 2026 06:43:20 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Sat Mar 17 2007 11:17:49 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Fischer Anthony",
                "photo": ""
            }
        },
        {
            "name": "Johanna Adkins",
            "gender": "Female",
            "address": "760 Bokee Court, Driftwood, Georgia, 3812",
            "boarded_on": new Date("Fri Feb 27 2026 12:43:37 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Sun Oct 14 2007 22:49:34 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Terrell Burgess",
                "photo": ""
            }
        },
        {
            "name": "Lilia Macias",
            "gender": "Female",
            "address": "496 Lawrence Street, Cressey, Indiana, 6003",
            "boarded_on": new Date("Fri Apr 03 2026 12:35:48 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Wed Feb 21 2007 13:29:43 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Marian Clayton",
                "photo": ""
            }
        },
        {
            "name": "Tina Turner",
            "gender": "Female",
            "address": "346 Bay Avenue, Walland, Idaho, 2594",
            "boarded_on": new Date("Thu Feb 19 2026 21:06:29 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Fri Feb 13 2009 10:08:08 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Morales Page",
                "photo": ""
            }
        },
        {
            "name": "Molly Abbott",
            "gender": "Female",
            "address": "915 Townsend Street, Glenshaw, Iowa, 8791",
            "boarded_on": new Date("Thu Feb 05 2026 07:49:23 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Thu Oct 23 2008 01:47:29 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Bernadine Schwartz",
                "photo": ""
            }
        },
        {
            "name": "Juliana Walls",
            "gender": "Female",
            "address": "410 Throop Avenue, Harleigh, Tennessee, 1954",
            "boarded_on": new Date("Sat Apr 11 2026 03:43:24 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Sun Jul 29 2002 16:04:44 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Adriana Shaffer",
                "photo": ""
            }
        },
        {
            "name": "Elvia Beasley",
            "gender": "Female",
            "address": "437 Union Street, Linganore, New Mexico, 7881",
            "boarded_on": new Date("Thu Feb 19 2026 01:51:54 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Fri Dec 15 2000 01:52:50 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Small Fischer",
                "photo": ""
            }
        },
        {
            "name": "Francesca Thomas",
            "gender": "Female",
            "address": "962 Gerry Street, Goldfield, Illinois, 8478",
            "boarded_on": new Date("Tue Mar 31 2026 11:15:11 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Thu Mar 29 2011 06:38:13 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Romero Baird",
                "photo": ""
            }
        },
        {
            "name": "Herminia Stanton",
            "gender": "Female",
            "address": "734 Moore Street, Franklin, Utah, 2091",
            "boarded_on": new Date("Wed Feb 18 2026 02:19:22 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Mon Mar 11 2001 22:54:34 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Madge Rich",
                "photo": ""
            }
        },
        {
            "name": "Lindsey Orr",
            "gender": "Female",
            "address": "220 Woodside Avenue, Enetai, Arkansas, 1169",
            "boarded_on": new Date("Fri Mar 27 2026 20:13:49 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Fri Nov 11 2005 00:51:51 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Ratliff Ayala",
                "photo": ""
            }
        },
        {
            "name": "Darlene Nelson",
            "gender": "Female",
            "address": "990 Veranda Place, Crumpler, Alaska, 5667",
            "boarded_on": new Date("Tue Jan 13 2026 06:17:50 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Sun Dec 17 2011 11:14:26 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Janie Briggs",
                "photo": ""
            }
        },
        {
            "name": "Sondra Gomez",
            "gender": "Female",
            "address": "592 Schweikerts Walk, Winchester, Colorado, 7176",
            "boarded_on": new Date("Wed Feb 04 2026 12:37:52 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Thu May 28 2011 18:30:53 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Elizabeth Decker",
                "photo": ""
            }
        }
    ]

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
                                            <Box py={2} px={4} borderRadius={4} sx={{ bgcolor: 'background.main', position: 'relative'}}>
                                                <Stack direction={'row'} alignItems={'center'}>
                                                    <Stack direction={'row'} alignItems={'flex-start'} gap={2} flexWrap="wrap">
                                                        <Avatar sx={{width: 50, height: 50}}></Avatar>
                                                        <Box>
                                                            <Typography variant="body1" fontWeight={800} gutterBottom={false}>Edmund Stewart PO2</Typography>
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
                                                            <Typography variant="body1" fontWeight={800} gutterBottom={false}>Jerrold Matthews</Typography>
                                                            <Typography variant="subtitle2" maxWidth={200}>April 09, 2026 10:39 PM</Typography>
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
                                                            <Typography variant="body1" fontWeight={800} gutterBottom={false}>Terence Mullins</Typography>
                                                            <Typography variant="subtitle2" maxWidth={200}>April 09, 2026 1:39 PM</Typography>
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
                                                            <Typography variant="body1" fontWeight={800} gutterBottom={false}>Brandon Michael</Typography>
                                                            <Typography variant="subtitle2" maxWidth={200}>April 09, 2026 11:39 AM</Typography>
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