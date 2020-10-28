import React from 'react'
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import history from "../../utils/history";
import { Link } from '@reach/router';

import {
    HOME_ROUTE,
    TFT_INSIGHTS_ROUTE,
    TFT_PROFILE_ROUTE,
    RIFT_INSIGHTS_ROUTE,
    RIFT_PROFILE_ROUTE,
  } from "../../constants/routes";

export default function NavBar() {
    let value = 0;
    switch(history.location.pathname) {
        case TFT_INSIGHTS_ROUTE:
            value = 1;
            break;
        case TFT_PROFILE_ROUTE:
            value = 2;
            break;
        case RIFT_INSIGHTS_ROUTE:
            value = 3;
            break;
        case RIFT_PROFILE_ROUTE:
            value = 4;
            break;
        default:
    }
  
    const [page, setPage] = React.useState(value);
  
    const handleTabChange = (stuff, route) => {
      setPage(route);
    };

    return (
        <Tabs
            value={page}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            centered
        >
            <Tab label="Home" component={Link} to={HOME_ROUTE}/>
            <Tab label="TFT Insights" component={Link} to={TFT_INSIGHTS_ROUTE}/>
            <Tab label="TFT Profile" component={Link} to={TFT_PROFILE_ROUTE}/>
            <Tab label="Rift Insights" component={Link} to={RIFT_INSIGHTS_ROUTE}/>
            <Tab label="Rift Profile" component={Link} to={RIFT_PROFILE_ROUTE}/>
        </Tabs>
    )
}
