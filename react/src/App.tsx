import React from "react";
import "./assets/styles/main.scss";
import { ToastContainer } from "react-toastify";
import Summoners from "./components/summoners";
import TFTInsights from "./components/tftInsights";
import TFTProfile from "./components/tftProfile";
import RiftInsights from "./components/riftInsights";
import RiftProfile from "./components/riftProfile";
import RiftChampions from "./components/riftChampions";
import RiftChampion from "./components/riftChampion";
import ValorantProfile from "./components/valorantProfile";
import ValorantInsights from "./components/valorantInsights";
import LoRProfile from "./components/lorProfile";
import LoRInsights from "./components/lorInsights";
import NavBar from "./components/elements/navbar";
import { Router } from "@reach/router";
import Route from "./components/elements/route";
import { Scrollbars } from "react-custom-scrollbars";
import "react-toastify/dist/ReactToastify.css";

import {
  HOME_ROUTE,
  TFT_INSIGHTS_ROUTE,
  TFT_PROFILE_ROUTE,
  RIFT_INSIGHTS_ROUTE,
  RIFT_PROFILE_ROUTE,
  RIFT_CHAMPIONS_ROUTE,
  RIFT_CHAMPION_ROUTE,
  VALORANT_PROFILE_ROUTE,
  VALORANT_INSIGHTS_ROUTE,
  LOR_INSIGHTS_ROUTE,
  LOR_PROFILE_ROUTE,
} from "./constants/routes";

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
          <Route default path={HOME_ROUTE} component={() => <Summoners />} />
          <Route
            path={TFT_INSIGHTS_ROUTE}
            component={() => <TFTInsights />}
          />
          <Route path={TFT_PROFILE_ROUTE} component={() => <TFTProfile />} />
          <Route
            path={RIFT_INSIGHTS_ROUTE}
            component={() => <RiftInsights />}
          />
          <Route
            path={RIFT_PROFILE_ROUTE}
            component={() => <RiftProfile />}
          />
          <Route
            path={RIFT_CHAMPIONS_ROUTE}
            component={() => <RiftChampions />}
          />
          <Route
            path={RIFT_CHAMPION_ROUTE}
            component={({ name }:any) => 
              <RiftChampion name={name} />
            }
          />
          <Route
            path={VALORANT_PROFILE_ROUTE}
            component={() => <ValorantProfile />}
          />
          <Route
            path={VALORANT_INSIGHTS_ROUTE}
            component={() => <ValorantInsights />}
          />
          <Route path={LOR_PROFILE_ROUTE} component={() => <LoRProfile />} />
          <Route
            path={LOR_INSIGHTS_ROUTE}
            component={() => <LoRInsights />}
          />
        </Router>
      </Scrollbars>
    </React.Fragment>
  );
}
