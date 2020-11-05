import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import history from "../../utils/history";
import { Link } from "react-router-dom";
import League from "../../assets/images/league-of-legends.png";
import League2 from "../../assets/images/league-of-legends2.png";
import LoR from "../../assets/images/runeterra.png";
import LoR2 from "../../assets/images/runeterra2.png";
import TFT from "../../assets/images/tft.webp";
import Spat from "../../assets/images/spat.jpg";
import Search from "../../assets/images/search.svg";
import Valorant from "../../assets/images/valorant.png";
import Radiant from "../../assets/images/radiant.webp";
import { connect } from "react-redux";
import { setTab } from "../../actions";

import {
  HOME_ROUTE,
  TFT_INSIGHTS_ROUTE,
  TFT_PROFILE_ROUTE,
  RIFT_INSIGHTS_ROUTE,
  RIFT_PROFILE_ROUTE,
  VALORANT_PROFILE_ROUTE,
  VALORANT_INSIGHTS_ROUTE,
  LOR_PROFILE_ROUTE,
  LOR_INSIGHTS_ROUTE,
} from "../../constants/routes";

interface NavProps {
  nav: { tab: number };
  setTab: (tab: number) => void;
}

function NavBar(props: NavProps) {
  const { tab } = props.nav;
  let value = 0;
  switch (history.location.pathname) {
    case LOR_INSIGHTS_ROUTE:
      value = 8;
      break;
    case LOR_PROFILE_ROUTE:
      value = 7;
      break;
    case VALORANT_INSIGHTS_ROUTE:
      value = 6;
      break;
    case VALORANT_PROFILE_ROUTE:
      value = 5;
      break;
    case TFT_INSIGHTS_ROUTE:
      value = 4;
      break;
    case TFT_PROFILE_ROUTE:
      value = 3;
      break;
    case RIFT_INSIGHTS_ROUTE:
      value = 2;
      break;
    case RIFT_PROFILE_ROUTE:
      value = 1;
      break;
    default:
  }

  //Component Did Mount
  React.useEffect(() => {
    if (value !== tab) {
      props.setTab(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleTabChange = (stuff: any, route: number) => {
    props.setTab(route);
  };

  const TabIcon = React.forwardRef((props: any, ref: any) => {
    return (
      <Link {...props} ref={ref}>
        <img src={props.image} alt={props.label} />
        {props.children}
      </Link>
    );
  });

  return (
    <nav className="nav">
      <Tabs
        variant="scrollable"
        value={tab}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab
          label="Search"
          to={HOME_ROUTE}
          image={Search}
          component={TabIcon}
          className="tab-icon-container"
        />
        <Tab
          label="Rift Profile"
          to={RIFT_PROFILE_ROUTE}
          image={League2}
          component={TabIcon}
          className="tab-icon-container"
        />
        <Tab
          label="Rift Insights"
          to={RIFT_INSIGHTS_ROUTE}
          image={League}
          component={TabIcon}
          className="tab-icon-container"
        />
        <Tab
          label="TFT Profile"
          to={TFT_PROFILE_ROUTE}
          image={TFT}
          component={TabIcon}
          className="tab-icon-container"
        />
        <Tab
          label="TFT Insights"
          to={TFT_INSIGHTS_ROUTE}
          image={Spat}
          component={TabIcon}
          className="tab-icon-container rounded-tab-icon"
        />
        <Tab
          label="Valorant Profile"
          to={VALORANT_PROFILE_ROUTE}
          image={Valorant}
          component={TabIcon}
          className="tab-icon-container"
        />
        <Tab
          label="Valorant Insights"
          to={VALORANT_INSIGHTS_ROUTE}
          image={Radiant}
          component={TabIcon}
          className="tab-icon-container rounded-tab-icon"
        />
        <Tab
          label="LoR Profile"
          to={LOR_PROFILE_ROUTE}
          image={LoR}
          component={TabIcon}
          className="tab-icon-container"
        />
        <Tab
          label="LoR Insights"
          to={LOR_INSIGHTS_ROUTE}
          image={LoR2}
          component={TabIcon}
          className="tab-icon-container rounded-tab-icon"
        />
      </Tabs>
    </nav>
  );
}

function mapStateToProps({ nav }: any) {
  return {
    nav,
  };
}

export default connect(mapStateToProps, { setTab })(NavBar);
