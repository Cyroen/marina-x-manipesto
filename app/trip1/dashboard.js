'use client'

import { Fullscreen, OpenInFullSharp } from "@mui/icons-material";
import { Avatar, Box, Button, Chip, Container, IconButton, Stack, Tab, Table, TableCell, TableContainer, TableHead, TableRow, Tabs, Typography, TableBody, Divider, Tooltip, CircularProgress, LinearProgress } from "@mui/material";
import Image from "next/image";
import { Fragment, useState } from "react";
import { differenceInYears, format } from "date-fns";
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
            "name": "Farrell Dotson",
            "gender": "Male",
            "address": "652 Fillmore Place, Toftrees, Iowa, 5362",
            "boarded_on": new Date("Sat Feb 14 2026 22:36:12 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Tue Nov 02 1992 15:15:51 GMT+0800 (Singapore Standard Time)"),
            "designation": "Captain",
            "license": {
                "number": "101-00023",
                "issuedBy": "MROVI ",
                "issuedOn": new Date("Sat Mar 07 2026 00:01:04 GMT+0800 (Singapore Standard Time)"),
                "expiry": new Date("Mon Feb 23 2026 16:55:27 GMT+0800 (Singapore Standard Time)")
            }
        },
        {
            "name": "Marietta Santana",
            "gender": "Female",
            "address": "364 Seigel Street, Saticoy, Connecticut, 9262",
            "boarded_on": new Date("Wed Feb 25 2026 21:34:07 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Fri Sep 05 1999 01:31:13 GMT+0800 (Singapore Standard Time)"),
            "designation": "Engineer",
            "license": {
                "number": "101-00023",
                "issuedBy": "MROVI ",
                "issuedOn": new Date("Wed Feb 04 2026 12:16:26 GMT+0800 (Singapore Standard Time)"),
                "expiry": new Date("Sat Mar 07 2026 00:09:11 GMT+0800 (Singapore Standard Time)")
            }
        },
        {
            "name": "Bates Holden",
            "gender": "Male",
            "address": "989 Verona Place, Tyro, Delaware, 6125",
            "boarded_on": new Date("Tue Mar 17 2026 21:14:25 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Sat Aug 31 2000 12:25:53 GMT+0800 (Singapore Standard Time)"),
            "designation": "Crew",
            "license": {
                "number": "101-00023",
                "issuedBy": "MROVI ",
                "issuedOn": new Date("Wed Mar 25 2026 06:10:36 GMT+0800 (Singapore Standard Time)"),
                "expiry": new Date("Thu Mar 12 2026 08:34:32 GMT+0800 (Singapore Standard Time)")
            }
        },
        {
            "name": "Ruiz Harmon",
            "gender": "Male",
            "address": "891 Seagate Terrace, Lisco, Indiana, 3746",
            "boarded_on": new Date("Thu Feb 19 2026 04:08:52 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Wed Oct 17 1992 09:57:03 GMT+0800 (Singapore Standard Time)"),
            "designation": "Crew",
            "license": {
                "number": "101-00023",
                "issuedBy": "MROVI ",
                "issuedOn": new Date("Wed Feb 11 2026 16:06:47 GMT+0800 (Singapore Standard Time)"),
                "expiry": new Date("Wed Feb 25 2026 00:16:50 GMT+0800 (Singapore Standard Time)")
            }
        },
        {
            "name": "Grant Mcfadden",
            "gender": "Male",
            "address": "467 Glen Street, Needmore, Maryland, 386",
            "boarded_on": new Date("Tue Feb 17 2026 16:20:35 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Sun Aug 14 1980 21:17:38 GMT+0800 (Singapore Standard Time)"),
            "designation": "Crew",
            "license": {
                "number": "101-00023",
                "issuedBy": "MROVI ",
                "issuedOn": new Date("Tue Mar 10 2026 05:28:36 GMT+0800 (Singapore Standard Time)"),
                "expiry": new Date("Fri Feb 13 2026 18:56:19 GMT+0800 (Singapore Standard Time)")
            }
        },
        {
            "name": "Norman Long",
            "gender": "Male",
            "address": "562 Beverly Road, Ivanhoe, New Jersey, 1139",
            "boarded_on": new Date("Sat Jan 24 2026 11:04:12 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Mon Dec 19 2000 17:54:45 GMT+0800 (Singapore Standard Time)"),
            "designation": "Crew",
            "license": {
                "number": "101-00023",
                "issuedBy": "MROVI ",
                "issuedOn": new Date("Wed Feb 25 2026 13:53:04 GMT+0800 (Singapore Standard Time)"),
                "expiry": new Date("Wed Jan 07 2026 12:58:15 GMT+0800 (Singapore Standard Time)")
            }
        }
    ]

    const passengerList = [
        {
            "name": "Sofia Mcconnell",
            "gender": "Female",
            "address": "295 Schenck Avenue, Imperial, Florida, 3780",
            "boarded_on": new Date("Thu Apr 09 2026 09:15:15 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Tue Jul 08 2014 04:42:32 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Crosby Moreno",
                "photo": ""
            }
        },
        {
            "name": "Rebekah Molina",
            "gender": "Female",
            "address": "708 Campus Road, Mooresburg, North Carolina, 2774",
            "boarded_on": new Date("Mon Mar 16 2026 01:54:24 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Fri Nov 02 2001 18:01:29 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Figueroa Fitzpatrick",
                "photo": ""
            }
        },
        {
            "name": "Hattie Lawson",
            "gender": "Female",
            "address": "125 Dupont Street, Chilton, Northern Mariana Islands, 9281",
            "boarded_on": new Date("Tue Jan 06 2026 04:56:10 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Fri Apr 28 2000 20:42:01 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Holmes Foster",
                "photo": ""
            }
        },
        {
            "name": "Lori Burke",
            "gender": "Female",
            "address": "876 Clifton Place, Emory, West Virginia, 6484",
            "boarded_on": new Date("Sun Jan 18 2026 06:09:47 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Wed Feb 06 2010 01:09:18 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Genevieve Beach",
                "photo": ""
            }
        },
        {
            "name": "Lea Michael",
            "gender": "Female",
            "address": "475 Buffalo Avenue, Ventress, New Mexico, 4640",
            "boarded_on": new Date("Tue Mar 10 2026 15:17:51 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Sat Sep 05 2009 01:13:10 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Weiss Santana",
                "photo": ""
            }
        },
        {
            "name": "Crystal Sears",
            "gender": "Female",
            "address": "965 Wallabout Street, Wollochet, Mississippi, 5197",
            "boarded_on": new Date("Thu Feb 12 2026 10:46:54 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Wed Dec 19 2007 13:23:13 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Norman Ramsey",
                "photo": ""
            }
        },
        {
            "name": "Coleen Moran",
            "gender": "Female",
            "address": "122 Wyckoff Avenue, Boomer, California, 1715",
            "boarded_on": new Date("Wed Feb 11 2026 09:26:53 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Wed Aug 15 2001 00:45:38 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Daphne Grant",
                "photo": ""
            }
        },
        {
            "name": "Maxine Mathis",
            "gender": "Female",
            "address": "259 Hanover Place, Soham, Alaska, 9652",
            "boarded_on": new Date("Sat Jan 17 2026 21:10:33 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Fri Nov 20 2009 07:54:00 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Tommie Lindsey",
                "photo": ""
            }
        },
        {
            "name": "Dorothea Bryan",
            "gender": "Female",
            "address": "323 Ashland Place, Hannasville, Delaware, 7526",
            "boarded_on": new Date("Tue Mar 31 2026 09:21:30 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Fri Mar 05 1999 18:13:01 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Celia Contreras",
                "photo": ""
            }
        },
        {
            "name": "Betsy Mckenzie",
            "gender": "Female",
            "address": "250 Cove Lane, Crown, Arkansas, 2055",
            "boarded_on": new Date("Thu Feb 19 2026 11:40:57 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Tue Dec 12 2006 04:17:50 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Kinney Vincent",
                "photo": ""
            }
        },
        {
            "name": "Haley Wooten",
            "gender": "Female",
            "address": "650 Bristol Street, Falmouth, Utah, 8537",
            "boarded_on": new Date("Tue Mar 17 2026 15:07:23 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Sun Dec 19 2010 14:33:43 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Lauri Mills",
                "photo": ""
            }
        },
        {
            "name": "Erin Hammond",
            "gender": "Female",
            "address": "299 Miami Court, Devon, Connecticut, 7544",
            "boarded_on": new Date("Thu Mar 05 2026 23:47:31 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Tue Oct 15 2002 02:56:58 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Avery Velez",
                "photo": ""
            }
        },
        {
            "name": "Marilyn Puckett",
            "gender": "Female",
            "address": "601 Gotham Avenue, Cascades, Rhode Island, 8287",
            "boarded_on": new Date("Sun Feb 15 2026 10:04:11 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Mon May 16 2001 16:05:42 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Deidre Harrison",
                "photo": ""
            }
        },
        {
            "name": "Susana Cameron",
            "gender": "Female",
            "address": "476 Jay Street, Moscow, Montana, 385",
            "boarded_on": new Date("Sat Jan 10 2026 23:42:42 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Wed Feb 02 2001 00:11:02 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Conrad Farmer",
                "photo": ""
            }
        },
        {
            "name": "Suzette Pollard",
            "gender": "Female",
            "address": "989 Branton Street, Chloride, Federated States Of Micronesia, 9757",
            "boarded_on": new Date("Wed Mar 25 2026 00:58:54 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Tue Aug 24 2000 07:23:20 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Wood Wong",
                "photo": ""
            }
        },
        {
            "name": "Reynolds Hopper",
            "gender": "Male",
            "address": "888 Highland Place, Esmont, Texas, 2943",
            "boarded_on": new Date("Fri Mar 06 2026 22:42:35 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Wed Jan 03 2007 16:38:37 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Jenna Bird",
                "photo": ""
            }
        },
        {
            "name": "Moore Robbins",
            "gender": "Male",
            "address": "734 Manor Court, Needmore, Ohio, 5113",
            "boarded_on": new Date("Mon Mar 09 2026 15:37:02 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Sun Feb 27 1994 02:26:28 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Ladonna Levy",
                "photo": ""
            }
        },
        {
            "name": "Clark Bonner",
            "gender": "Male",
            "address": "806 Nolans Lane, Coloma, Palau, 9813",
            "boarded_on": new Date("Sat Mar 14 2026 06:32:16 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Thu Feb 15 1996 07:09:24 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Florine Greer",
                "photo": ""
            }
        },
        {
            "name": "Hays Villarreal",
            "gender": "Male",
            "address": "847 Matthews Place, Sidman, District Of Columbia, 1334",
            "boarded_on": new Date("Wed Jan 28 2026 00:54:58 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Thu Feb 25 1982 12:26:21 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Tamara Norris",
                "photo": ""
            }
        },
        {
            "name": "Farrell Horn",
            "gender": "Male",
            "address": "808 Stryker Court, Leland, Michigan, 524",
            "boarded_on": new Date("Wed Apr 08 2026 14:07:51 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Thu Nov 11 1993 07:08:30 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Bates Whitfield",
                "photo": ""
            }
        },
        {
            "name": "Short Mays",
            "gender": "Male",
            "address": "169 Windsor Place, Whitehaven, Virgin Islands, 8424",
            "boarded_on": new Date("Sat Jan 17 2026 09:21:45 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Mon Aug 20 1984 00:27:57 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Bianca Pena",
                "photo": ""
            }
        },
        {
            "name": "Gregory Hanson",
            "gender": "Male",
            "address": "539 Franklin Street, Statenville, Wyoming, 6630",
            "boarded_on": new Date("Thu Jan 29 2026 19:47:02 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Sat May 02 1987 12:23:45 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Alvarez Johns",
                "photo": ""
            }
        },
        {
            "name": "Floyd Shelton",
            "gender": "Male",
            "address": "910 Bank Street, Greensburg, Maine, 2828",
            "boarded_on": new Date("Sat Jan 24 2026 13:33:19 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Fri Jul 25 1986 01:57:43 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
            "   name": "Guy Shaw",
                "photo": ""
            }
        },
        {
            "name": "Black Sloan",
            "gender": "Male",
            "address": "168 Laurel Avenue, Linwood, South Dakota, 3095",
            "boarded_on": new Date("Wed Mar 11 2026 07:13:35 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Wed Nov 18 1981 20:12:28 GMT+0730 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Kara Klein",
                "photo": ""
            }
        },
        {
            "name": "Bryant Parks",
            "gender": "Male",
            "address": "146 Grimes Road, Comptche, Mississippi, 2446",
            "boarded_on": new Date("Thu Feb 12 2026 01:08:42 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Mon Apr 25 2005 00:35:45 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Holloway Keith",
                "photo": ""
            }
        },
        {
            "name": "Fry Downs",
            "gender": "Male",
            "address": "360 Seigel Court, Leola, North Carolina, 8313",
            "boarded_on": new Date("Sat Apr 04 2026 18:59:36 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Mon Jul 15 1996 21:03:56 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Brittany Oliver",
                "photo": ""
            }
        },
        {
            "name": "Joyner Miles",
            "gender": "Male",
            "address": "423 Lincoln Terrace, Broadlands, American Samoa, 9259",
            "boarded_on": new Date("Wed Feb 18 2026 01:16:36 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Tue Aug 08 1995 12:49:16 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Ollie Glover",
                "photo": ""
            }
        },
        {
            "name": "Sutton Meadows",
            "gender": "Male",
            "address": "971 Hutchinson Court, Vandiver, Maryland, 3352",
            "boarded_on": new Date("Sun Mar 08 2026 19:20:02 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Sat Nov 03 1984 20:34:54 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Wyatt Macdonald",
                "photo": ""
            }
        },
        {
            "name": "Osborne Berg",
            "gender": "Male",
            "address": "578 Brigham Street, Concho, New Jersey, 9561",
            "boarded_on": new Date("Mon Feb 09 2026 15:21:10 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Thu Mar 10 1994 23:21:35 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Higgins Bryant",
                "photo": ""
            }
        },
        {
            "name": "Sampson Solomon",
            "gender": "Male",
            "address": "543 Vandalia Avenue, Swartzville, Oklahoma, 9955",
            "boarded_on": new Date("Wed Mar 04 2026 17:23:45 GMT+0800 (Singapore Standard Time)"),
            "dob": new Date("Mon Aug 28 2000 14:23:34 GMT+0800 (Singapore Standard Time)"),
            "scanned_by": {
                "name": "Lorrie Bernard",
                "photo": ""
            }
        }
    ]

    const count_summary = {
        t: 30,
        m: 120,
        sx: [
            {
                l: "Male",
                c: 15,
                clr: '#8b77fd'
            },
            {
                l: "Female",
                c: 15,
                clr: '#75dbff'
            }
        ],
        ag: [
            {
                l: "Infants",
                c: 0,
                clr: '#8b77fd'
            },
            {
                l: "Children",
                c: 2,
                clr: '#75dbff'
            },
            {
                l: "Adults",
                c: 25,
                clr: '#ffbb25'
            },
            {
                l: "Seniors",
                c: 3,
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
                                                            <Typography variant="body1" fontWeight={800} gutterBottom={false}>Spencer Ortega</Typography>
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
                                                            <Typography variant="body1" fontWeight={800} gutterBottom={false}>Eduardo Tyler PO3</Typography>
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
                                                            <Typography variant="body1" fontWeight={800} gutterBottom={false}>Terence Mullins</Typography>
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
                                                            <Typography variant="body1" fontWeight={800} gutterBottom={false}>Clyde Watts</Typography>
                                                            <Typography variant="subtitle2" maxWidth={200}>April 09, 2026 11:39 AM</Typography>
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
                                                            <Typography variant="body1" fontWeight={800} gutterBottom={false}>Derek Weber</Typography>
                                                            <Typography variant="subtitle2" maxWidth={200}>April 09, 2026 9:39 AM</Typography>
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