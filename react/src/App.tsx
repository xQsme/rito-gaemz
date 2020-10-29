import React from "react";
import "./assets/styles/main.scss";
import { ToastContainer } from "react-toastify";
import Home from "./components/home";
import TFTInsights from "./components/tftInsights";
import TFTProfile from "./components/tftProfile";
import RiftInsights from "./components/riftInsights";
import RiftProfile from "./components/riftProfile";
import ValorantProfile from "./components/valorantProfile";
import ValorantInsights from "./components/valorantInsights";
import NavBar from "./components/elements/navbar";
import { Router, RouteComponentProps } from "@reach/router";
import { Scrollbars } from "react-custom-scrollbars";
import 'react-toastify/dist/ReactToastify.css';

import {
  HOME_ROUTE,
  TFT_INSIGHTS_ROUTE,
  TFT_PROFILE_ROUTE,
  RIFT_INSIGHTS_ROUTE,
  RIFT_PROFILE_ROUTE,
  VALORANT_PROFILE_ROUTE,
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
      <NavBar />{" "}
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
          <RouterPage path={HOME_ROUTE} pageComponent={<Home />} />
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
            path={VALORANT_PROFILE_ROUTE}
            pageComponent={<ValorantInsights />}
          />
        </Router>
      </Scrollbars>
    </React.Fragment>
  );
}
