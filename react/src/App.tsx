import React from "react";
import "./assets/styles/main.scss";
import { ToastContainer } from "react-toastify";
import Home from "./components/home";
import TFTInsights from "./components/tftInsights";
import TFTProfile from "./components/tftProfile";
import RiftInsights from "./components/riftInsights";
import RiftProfile from "./components/riftProfile";
import NavBar from "./components/elements/navbar";
import { Router, RouteComponentProps } from '@reach/router';

import {
  HOME_ROUTE,
  TFT_INSIGHTS_ROUTE,
  TFT_PROFILE_ROUTE,
  RIFT_INSIGHTS_ROUTE,
  RIFT_PROFILE_ROUTE,
} from "./constants/routes";

const RouterPage = (props: {pageComponent:JSX.Element} & RouteComponentProps) => {return props.pageComponent};
export default function App() {
  return (
    <main className="App">
      <ToastContainer />
      <NavBar />
      <Router style={{width: '100%', height: '100%'}}>
          <RouterPage path={HOME_ROUTE} pageComponent={<Home />} />
          <RouterPage path={TFT_INSIGHTS_ROUTE} pageComponent={<TFTInsights />} />
          <RouterPage path={TFT_PROFILE_ROUTE} pageComponent={<TFTProfile />} />
          <RouterPage path={RIFT_INSIGHTS_ROUTE} pageComponent={<RiftInsights />} />
          <RouterPage path={RIFT_PROFILE_ROUTE} pageComponent={<RiftProfile />} />
      </Router>
    </main>
  );
}