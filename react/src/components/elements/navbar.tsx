import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import history from "../../utils/history";
import { Link } from "@reach/router";
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
  RIFT_CHAMPIONS_ROUTE,
  RIFT_INSIGHTS_ROUTE,
  RIFT_PROFILE_ROUTE,
  VALORANT_PROFILE_ROUTE,
  VALORANT_INSIGHTS_ROUTE,
  LOR_PROFILE_ROUTE,
  LOR_INSIGHTS_ROUTE,
  HOME_TAB,
  TFT_INSIGHTS_TAB,
  TFT_PROFILE_TAB,
  RIFT_CHAMPIONS_TAB,
  RIFT_INSIGHTS_TAB,
  RIFT_PROFILE_TAB,
  VALORANT_PROFILE_TAB,
  VALORANT_INSIGHTS_TAB,
  LOR_PROFILE_TAB,
  LOR_INSIGHTS_TAB,
} from "../../constants/routes";

interface NavProps {
  nav: { tab: number };
  setTab: (tab: number) => void;
}

function NavBar(props: NavProps) {
  const { tab } = props.nav;
  let value = 0;
  switch (history.location.pathname) {
    case RIFT_CHAMPIONS_ROUTE:
      value = RIFT_CHAMPIONS_TAB;
      break;
    case LOR_INSIGHTS_ROUTE:
      value = LOR_INSIGHTS_TAB;
      break;
    case LOR_PROFILE_ROUTE:
      value = LOR_PROFILE_TAB;
      break;
    case VALORANT_INSIGHTS_ROUTE:
      value = VALORANT_INSIGHTS_TAB;
      break;
    case VALORANT_PROFILE_ROUTE:
      value = VALORANT_PROFILE_TAB;
      break;
    case TFT_INSIGHTS_ROUTE:
      value = TFT_INSIGHTS_TAB;
      break;
    case TFT_PROFILE_ROUTE:
      value = TFT_PROFILE_TAB;
      break;
    case RIFT_INSIGHTS_ROUTE:
      value = RIFT_INSIGHTS_TAB;
      break;
    case RIFT_PROFILE_ROUTE:
      value = RIFT_PROFILE_TAB;
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
          label="Rift Champions"
          to={RIFT_CHAMPIONS_ROUTE}
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