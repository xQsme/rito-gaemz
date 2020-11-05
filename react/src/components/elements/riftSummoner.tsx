import React from "react";
import server from "../../constants/server";
import League2 from "../../assets/images/league-of-legends2.png";
import { navigate } from "@reach/router";
import { RIFT_PROFILE_ROUTE } from "../../constants/routes";
import { toTitleCase } from "../../utils/to_title_case";
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
  const { profileIconId, name, summonerLevel, riftRankeds } = props.rift;
  let soloRankTier = toTitleCase(riftRankeds[1].tier);
  let flexRankTier = toTitleCase(riftRankeds[0].tier);
  
  let soloRank = process.env.PUBLIC_URL + '/shared/ranks/Emblem_' + soloRankTier + '.png';
  let flexRank = process.env.PUBLIC_URL + '/shared/ranks/Emblem_' + flexRankTier + '.png';
  
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
          
          <div className="rank-container">
            <div className="rank">
              <span className="label-rank">Solo: {soloRankTier} {riftRankeds[1].rank}</span>
              <img className="summoner-rank-icon" src={soloRank} alt="Rift" />
            </div>
            <div className="rank">
              <span className="label-rank">Flex: {flexRankTier} {riftRankeds[0].rank}</span>
              <img className="summoner-rank-icon" src={flexRank} alt="Rift" />
            </div>
          </div>

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
