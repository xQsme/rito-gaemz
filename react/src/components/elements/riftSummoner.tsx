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

function toTitleCase(str:String) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}
function RiftSummoner(props: RiftSummonerProps) {
  const { clickable, setTab } = props;
  const { profileIconId, name, summonerLevel, rankeds } = props.rift;

  let soloRankTier = toTitleCase(rankeds[1].tier);
  let flexRankTier = toTitleCase(rankeds[0].tier);
  let soloRank = process.env.PUBLIC_URL + '/shared/ranks/Emblem_' + soloRankTier + '.png';
  let flexRank = process.env.PUBLIC_URL + '/shared/ranks/Emblem_' + flexRankTier + '.png';
  
  rankeds.forEach(rankedQueue => {

  });
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
          
          <div className="rank-wrapper">
            <div className="rank">
              <span className="label-rank">Solo: {soloRankTier} {rankeds[1].rank}</span>
              <img className="summoner-rank-icon" src={soloRank} alt="Rift" />
            </div>
            <div className="rank">
              <span className="label-rank">Flex: {flexRankTier} {rankeds[0].rank}</span>
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
