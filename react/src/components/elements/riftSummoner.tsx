import React from "react";
import server from "../../constants/server";
import League2 from "../../assets/images/league-of-legends2.png";
import { navigate } from "@reach/router";
import { RIFT_PROFILE_ROUTE } from "../../constants/routes";
import { setTab } from "../../actions";
import { connect } from "react-redux";

import type { Summoner } from "../../interfaces";

interface RiftSummonerProps {
  clickable?: boolean;
  setTab: (tab: number) => void;
  rift: Summoner;
}

function RiftSummoner(props: RiftSummonerProps) {
  const { clickable, setTab } = props;
  const { profileIconId, name, summonerLevel } = props.rift;
  return (
    <div className="summoner-container">
      <div
        className={"rift-summoner" + (clickable ? " clickable" : "")}
        onClick={() => {
          if (clickable) {
            navigate(RIFT_PROFILE_ROUTE);
            setTab(1);
          }
        }}
      >
        <div className="summoner-icon-container">
          <img
            className="summoner-icon"
            src={server + "/shared/profileicon/" + profileIconId + ".png"}
            alt="summoner-icon"
          />
          <span className="summoner-level">{summonerLevel}</span>
        </div>
        <div className="summoner-info-container">
          <span className="label">Summoner Name</span>
          <span className="summoner-name">{name}</span>
          {clickable && (
            <img className="summoner-type-icon" src={League2} alt="Rift" />
          )}
        </div>
      </div>
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps, { setTab })(RiftSummoner);
