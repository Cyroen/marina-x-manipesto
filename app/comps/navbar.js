'use client'

import '@/app/styles/global.scss'
import { Anchor, Apartment, ChevronLeft, DirectionsBoat, Home, Logout, Map, Person, Sailing } from '@mui/icons-material';

import { Avatar, Box, Button, Chip, Container, Divider, Drawer, IconButton, Stack, Typography } from "@mui/material";
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';


export default function NavBar({title, return_link, sidebarOpen}) {

    const [open, setOpen] = useState(false)

    return (
        <Box className={`${sidebarOpen ? 'open' : 'closed'} navbar_main`}>
            <Container maxWidth="xl">
                <Stack direction={'row'} py={3}>
                    <Stack  flex={1} direction={'row'} gap={2}>
                        {return_link ? <Box sx={{
                            bgcolor: 'white',
                            borderRadius: '40px',
                            height: 'max-content',
                            my: 'auto',
                        }}>
                            <IconButton href={return_link} LinkComponent={Link}>
                                <ChevronLeft></ChevronLeft>
                            </IconButton>
                        </Box> : <Box sx={{
                            bgcolor: 'white',
                            borderRadius: 30,
                            height: 'max-content',
                            my: 'auto',
                            height: 40,
                            px: 2,
                            py: .5,
                            display: 'flex'
                        }}>
                            <Image style={{width: '80%', height: "80%", margin: "auto", objectFit: 'contain'}} width={50} height={50} src={'/images/logos/manipesto.webp'} alt="manipesto logo"></Image>
                            <Typography my="auto" ml={1} variant='body1' fontWeight={800}>manipesto</Typography>
                        </Box>}
                    </Stack>
                    <Box flex={1} sx={{display: {xs: 'none', md: 'block'}}}>
                        <Box sx={{
                            bgcolor: 'white',
                            borderRadius: 30,
                            height: 'max-content',
                            width: "max-content",
                            my: 'auto',
                            height: 40,
                            px: 2,
                            py: .5,
                            display: 'flex',
                            mx: 'auto'
                        }}>
                            <Image style={{width: 32, height: 32, margin: "auto", objectFit: 'contain'}} width={50} height={50} src={'/images/logos/marina.webp'} alt="marina logo"></Image>
                            <Typography my="auto" flex={1} ml={1} variant='h6' fontWeight={'bold'} component={'h1'}>{title}</Typography>
                        </Box>
                    </Box>
                    <Box flex={1}>
                        <Box width="max-content" ml="auto" p={1} className="nav_account" onClick={()=>{setOpen(!open)}}>
                            <Avatar></Avatar>
                            <Typography className='account_name' variant='body1'>Account Name</Typography>
                        </Box>
                    </Box>
                </Stack>
            </Container>

            <Drawer sx={{zIndex: 100000}} slotProps={{
                paper: {
                    sx: {
                        width: '100%',
                        maxWidth: 300
                    }
                }
            }} anchor='right' open={open} onClose={()=>{setOpen(false)}}>
                <Stack height="100%" py={2} gap={1}>
                    <Stack height="100%" direction={'column'} gap={1} alignItems={'center'}>
                        <Box mb={2}>
                            <Avatar sx={{width: 100, height: 100, mx: 'auto', mb: 1}}></Avatar>
                            <Typography variant='h5' textAlign={'center'} fontWeight={800}>Display Name</Typography>
                        </Box>
                        <Box sx={{
                            mx: 'auto',
                            py: 2,
                            bgcolor: "primary.main",
                            width: '100%',
                            borderTop: '1px solid #000',
                            borderBottom: '1px solid #000'
                        }}><Typography textAlign={'center'} variant='h6' color="white">Central Office</Typography></Box>
                        <Divider flexItem></Divider>
                        <Box sx={{
                            mx: 'auto',
                            py: .5,
                            px: 2,
                            bgcolor: "primary.main",
                            borderTop: '1px solid #000',
                            borderBottom: '1px solid #000',
                            borderRadius: 10
                        }}><Typography textAlign={'center'} variant='h6' color="white">Central Office</Typography></Box>
                        <Divider flexItem></Divider>
                        <Stack width={'100%'} flex={1} direction={'column'}>
                            <Stack pl={4} direction={'row'} gap={1} alignItems={'center'} py={2} className='link_nav' href="/" component={Link}>
                                <Home sx={{width: 26, height: 26}}></Home>
                                <Typography gutterBottom={false} variant='body1' component={'div'}>Home</Typography>
                            </Stack>
                            <Stack pl={4} direction={'row'} gap={1} alignItems={'center'} py={2} className='link_nav' href="/trips" component={Link}>
                                <Sailing sx={{width: 26, height: 26}}></Sailing>
                                <Typography gutterBottom={false} variant='body1' component={'div'}>Trips</Typography>
                            </Stack>
                            <Stack pl={4} direction={'row'} gap={1} alignItems={'center'} py={2} className='link_nav' href="/" component={Link}>
                                <Apartment sx={{width: 26, height: 26}}></Apartment>
                                <Typography gutterBottom={false} variant='body1' component={'div'}>Regional Offices</Typography>
                            </Stack>
                            <Stack pl={4} direction={'row'} gap={1} alignItems={'center'} py={2} className='link_nav' href="/" component={Link}>
                                <DirectionsBoat sx={{width: 26, height: 26}}></DirectionsBoat>
                                <Typography gutterBottom={false} variant='body1' component={'div'}>Operators</Typography>
                            </Stack>
                            <Stack pl={4} direction={'row'} gap={1} alignItems={'center'} py={2} className='link_nav' href="/" component={Link}>
                                <Anchor sx={{width: 26, height: 26}}></Anchor>
                                <Typography gutterBottom={false} variant='body1' component={'div'}>Ports</Typography>
                            </Stack>
                            <Stack pl={4} direction={'row'} gap={1} alignItems={'center'} py={2} className='link_nav' href="/" component={Link}>
                                <Map sx={{width: 26, height: 26}}></Map>
                                <Typography gutterBottom={false} variant='body1' component={'div'}>Routes</Typography>
                            </Stack>
                        </Stack>
                        <Divider flexItem orientation='horizontal' sx={{my: 1}}></Divider>
                        <Button mt="auto" variant='outlined' endIcon={<Logout></Logout>}>Logout</Button>
                    </Stack>
                </Stack>
            </Drawer>
        </Box>
    );
}