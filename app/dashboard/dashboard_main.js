'use client'

import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';

import "@/app/styles/dashboard.scss"
import { Box, Button, CircularProgress, Container, Divider, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import NavBar from '../comps/navbar';

export default function DashboardMain() {

    const Map = useMemo(() => dynamic(
        () => import('@/app/dashboard/map'),
        { 
            loading: () => <p>A map is loading</p>,
            ssr: false
        }
    ), [])

    const [portDetailOpen, setPortDetailOpen] = useState(false);

    const [data_source, setDataSource] = useState('');

    const handleDataChange = (event) => {
        setDataSource(event.target.value);
    };

    return (
        <div>
            <NavBar title="MARINA Realtime Monitoring Dashboard" sidebarOpen={portDetailOpen}></NavBar>
            <Map onPortOpenClick={(e)=> {
                setPortDetailOpen(true)
            }} onPortCloseClick={(e)=> {
                setPortDetailOpen(false)
            }}></Map>
            <Box className={`outer_chart_container ${portDetailOpen ? 'open' : 'close'}`}>
                <Container className={`chart-outer_container`}>
                    <Stack sx={{bgcolor: 'background.main', p: 2, borderRadius: 5}} className='chart-outer_flex' mx={3} direction={'row'} flexWrap={'wrap'} gap={2}>
                        <Box display={'flex'} flex={2} p={2}>
                            <Box sx={{
                                height: 200,
                                borderRadius: '50%',
                                m: 'auto',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1
                            }}>
                                <Box width={'100%'} height="max-content" m="auto">
                                    <Typography textAlign={'left'} variant='subtitle2'>Total Passengers</Typography>
                                    <Typography textAlign={'left'} variant='h3' fontWeight={800} component={'p'}>1,000,000</Typography>
                                </Box>
                                <Box width={'100%'} height="max-content" m="auto">
                                    <Typography textAlign={'left'} variant='subtitle2'>Total Trips</Typography>
                                    <Typography textAlign={'left'} variant='h4' fontWeight={800} component={'p'}>1234</Typography>
                                </Box>
                                <Typography textAlign={'left'} variant='subtitle2' sx={{opacity: .5}}>*as of April 09, 2026 11:55 AM</Typography>
                            </Box>
                        </Box>
                        <Stack direction={'column'} gap={1} flex={5}>
                            <Stack direction={'row'} mx={{xs: 0, lg: 3}} flexWrap={'wrap'} gap={2} justifyContent={'flex-start'}>
                                <Box sx={{ minWidth: 160, position: 'relative', zIndex: 1000 }}>
                                    <FormControl size='small' fullWidth>
                                        <InputLabel id="demo-simple-select-label">Select Data</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={data_source}
                                            label="Data Source"
                                            onChange={handleDataChange}
                                        >
                                            <MenuItem value={10}>Region I</MenuItem>
                                            <MenuItem value={20}>Region II</MenuItem>
                                            <MenuItem value={30}>Region III</MenuItem>
                                            <MenuItem value={30}>Region IV</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Stack ml={{xs: 0, lg: 'auto'}} direction={'row'} alignItems={'center'} gap={1}>
                                    <Typography height="max-content" variant='body1' component={Button} size='small'>Hourly</Typography>
                                    <Divider orientation='vertical' flexItem></Divider>
                                    <Typography height="max-content" variant='body1' component={Button} size='small'>Daily</Typography>
                                    <Divider orientation='vertical' flexItem></Divider>
                                    <Typography height="max-content" variant='body1' component={Button} size='small'>Monthly</Typography>
                                    <Divider orientation='vertical' flexItem></Divider>
                                    <Typography height="max-content" variant='body1' component={Button} size='small'>Yearly</Typography>
                                </Stack>
                            </Stack>
                                <LineChart
                                xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                                series={[
                                    {
                                        data: [2, 5.5, 2, 8.5, 1.5, 5],
                                        label: 'Passenger Traffic'
                                    },
                                    {
                                        data: [5, 1.5, 4, 2.5, 5.5, 1],
                                        label: 'Trip Traffic'
                                    },
                                ]}
                                height={150}
                                />
                        </Stack>
                    </Stack>
                </Container>
            </Box>
        </div>
    );
}