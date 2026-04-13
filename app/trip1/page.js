'use client'

import { Fragment, Suspense } from "react";
import DashboardTrip from "./dashboard";
import NavBar from "../comps/navbar";
import { Box } from "@mui/material";
import { useSearchParams } from "next/navigation";

export default function Home() {

  const searchParams = useSearchParams()
 
  const search = searchParams.get('v')

  return (
    <Suspense fallback={<div>Loading...</div>}>
        <NavBar return_link="/" title={`[DEMO] Full Trip Preview - ${search.replace("-", " ")}`}></NavBar>
        <Box mt={15}>
            <DashboardTrip></DashboardTrip>
        </Box>
    </Suspense>
  );
}
