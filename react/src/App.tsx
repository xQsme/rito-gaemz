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
import { Router, Route, Switch } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import "react-toastify/dist/ReactToastify.css";
import history from "./utils/history";

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

export default function App() {
  return (

      <Router history={history}>
      <ToastContainer />
        <NavBar />
        <div className="nav-spacer">
          <div />
        </div>
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
            <Route exact path={HOME_ROUTE} component={Summoners} />
            <Route exact path={TFT_INSIGHTS_ROUTE} component={TFTInsights} />
            <Route exact path={TFT_PROFILE_ROUTE} component={TFTProfile} />
            <Route exact path={RIFT_INSIGHTS_ROUTE} component={RiftInsights} />
            <Route exact path={RIFT_PROFILE_ROUTE} component={RiftProfile} />
            <Route exact path={VALORANT_PROFILE_ROUTE} component={ValorantProfile} />
            <Route
              exact path={VALORANT_INSIGHTS_ROUTE}
              component={ValorantInsights}
            />
            <Route exact path={LOR_PROFILE_ROUTE} component={LoRProfile} />
            <Route exact path={LOR_INSIGHTS_ROUTE} component={LoRInsights} />
        </Scrollbars>
      </Router>
  );
}
