import { Fragment } from "react";
import NavBar from "../comps/navbar";
import { Box } from "@mui/material";
import DashboardTripList from "./dashboard";

export default function Home() {
  return (
    <Fragment>
        <NavBar return_link="/" title="[DEMO] List of Trips"></NavBar>
        <Box my={15}>
          <DashboardTripList></DashboardTripList>
        </Box>
    </Fragment>
  );
}
