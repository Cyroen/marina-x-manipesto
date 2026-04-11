import { Fragment } from "react";
import DashboardTrip from "./dashboard";
import NavBar from "../comps/navbar";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <Fragment>
        <NavBar return_link="/" title="Full Trip Preview"></NavBar>
        <Box mt={15}>
            <DashboardTrip></DashboardTrip>
        </Box>
    </Fragment>
  );
}
