import React from "react";
import LoR from "../../assets/images/runeterra.png";
import { setTab } from "../../actions";
import { navigate } from "@reach/router";
import { connect } from "react-redux";
import { LOR_PROFILE_ROUTE } from "../../constants/routes";

import type { Account } from "../../interfaces";

interface LoRSummonerProps {
  clickable?: boolean;
  setTab: (tab: number) => void;
  lor: Account;
}

function LoRSummoner(props: LoRSummonerProps) {
  const { clickable, setTab } = props;
  const { gameName, tagLine } = props.lor;
  return (
    <div className="summoner-container">
      <div
        className={"lor-summoner" + (clickable ? " clickable" : "")}
        onClick={() => {
          if (clickable) {
            navigate(LOR_PROFILE_ROUTE);
            setTab(7);
          }
        }}
      >
        <div className="summoner-info-container">
          <span className="label">Riot Account</span>
          <span className="summoner-name">{gameName}</span>
          <span className="label">Tag</span>
          <span className="summoner-name">#{tagLine}</span>
          {clickable && (
            <img className="summoner-type-icon" src={LoR} alt="LoR" />
          )}
        </div>
      </div>
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps, { setTab })(LoRSummoner);
