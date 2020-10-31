import React from "react";
import "./assets/styles/main.scss";
import { ToastContainer } from "react-toastify";
import Summoners from "./components/summoners";
import TFTInsights from "./components/tftInsights";
import TFTProfile from "./components/tftProfile";
import RiftInsights from "./components/riftInsights";
import RiftProfile from "./components/riftProfile";
import ValorantProfile from "./components/valorantProfile";
import ValorantInsights from "./components/valorantInsights";
import LoRProfile from "./components/lorProfile";
import LoRInsights from "./components/lorInsights";
import NavBar from "./components/elements/navbar";
import { Router, RouteComponentProps } from "@reach/router";
import { Scrollbars } from "react-custom-scrollbars";
import "react-toastify/dist/ReactToastify.css";

import {
  HOME_ROUTE,
  TFT_INSIGHTS_ROUTE,
  TFT_PROFILE_ROUTE,
  RIFT_INSIGHTS_ROUTE,
  RIFT_PROFILE_ROUTE,
  VALORANT_PROFILE_ROUTE,
  VALORANT_INSIGHTS_ROUTE,
  LOR_INSIGHTS_ROUTE,
  LOR_PROFILE_ROUTE,
} from "./constants/routes";

const RouterPage = (
  props: { pageComponent: JSX.Element } & RouteComponentProps
) => {
  return props.pageComponent;
};
export default function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <NavBar />
      <div className="nav-spacer"><div/></div>
      <Scrollbars
        autoHide
        className="scrollbar"
        renderTrackHorizontal={(props) => (
          <div {...props} className="track-horizontal" />
        )}
        renderTrackVertical={(props) => (
          <div {...props} className="track-vertical" />
        )}
        renderThumbHorizontal={(props) => (
          <div {...props} className="thumb-horizontal" />
        )}
        renderThumbVertical={(props) => (
          <div {...props} className="thumb-vertical" />
        )}
      >
        <Router className="router-container">
          <RouterPage default path={HOME_ROUTE} pageComponent={<Summoners />} />
          <RouterPage
            path={TFT_INSIGHTS_ROUTE}
            pageComponent={<TFTInsights />}
          />
          <RouterPage path={TFT_PROFILE_ROUTE} pageComponent={<TFTProfile />} />
          <RouterPage
            path={RIFT_INSIGHTS_ROUTE}
            pageComponent={<RiftInsights />}
          />
          <RouterPage
            path={RIFT_PROFILE_ROUTE}
            pageComponent={<RiftProfile />}
          />
          <RouterPage
            path={VALORANT_PROFILE_ROUTE}
            pageComponent={<ValorantProfile />}
          />
          <RouterPage
            path={VALORANT_INSIGHTS_ROUTE}
            pageComponent={<ValorantInsights />}
          />
          <RouterPage path={LOR_PROFILE_ROUTE} pageComponent={<LoRProfile />} />
          <RouterPage
            path={LOR_INSIGHTS_ROUTE}
            pageComponent={<LoRInsights />}
          />
        </Router>
      </Scrollbars>
    </React.Fragment>
  );
}
