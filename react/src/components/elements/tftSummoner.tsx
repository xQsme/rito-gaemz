import React from "react";
import server from "../../constants/server";
import TFT from "../../assets/images/tft.webp";
import { navigate } from "@reach/router";
import { TFT_PROFILE_ROUTE } from "../../constants/routes";
import { toTitleCase } from "../../utils/to_title_case";
import { setTab } from "../../actions";
import { connect } from "react-redux";

import type { Summoner } from "../../interfaces";

interface TFTSummonerProps {
  clickable?: boolean;
  setTab: (tab: number) => void;
  tft: any;
}

function TFTSummoner(props: TFTSummonerProps) {
  const { clickable, setTab } = props;
  const { profileIconId, name, summonerLevel, tftRanked } = props.tft;
  const {
    tier,
    rank,
    leaguePoints,
    wins,
    losses,
    veteran,
    inactive,
    freshBlood,
    hotStreak,
  } = tftRanked;

  let tftRankTier = toTitleCase(tftRanked[0] ? tftRanked[0].tier : "Unranked");
  let tftRank =
    process.env.PUBLIC_URL +
    "/shared/ranks/Emblem_" +
    (tftRanked[0] ? tftRankTier : "Unranked") +
    ".png";

  return (
    <div className="summoner-container">
      <div
        className={"tft-summoner" + (clickable ? " clickable" : "")}
        onClick={() => {
          if (clickable) {
            navigate(TFT_PROFILE_ROUTE);
            setTab(3);
          }
        }}
      >
        <div className="summoner-icon-name">
          <div className="summoner-icon-container">
            <img
              className="summoner-icon"
              src={server + "/shared/profileicon/" + profileIconId + ".png"}
              alt="summoner-icon"
            />
            <span className="summoner-level">{summonerLevel}</span>
          </div>
          <span className="summoner-name">{name}</span>
        </div>
        <div className="summoner-info-container">
          <span className="label">Summoner Name</span>

          {clickable && (
            <img className="summoner-type-icon" src={TFT} alt="TFT" />
          )}

          <div className="tft-rank">
            <div className="ranked-flex-container">
              <img className="summoner-rank-icon" src={tftRank} alt="Icon" />
              <span className="label-rank">
                Rank: {tftRankTier} {rank}
              </span>
              <span className="label-rank">LP: {leaguePoints}</span>
              <span className="label-rank">Wins: {wins}</span>
              <span className="label-rank">Games: {wins + losses}</span>
            </div>
            <div className="ranked-flex-container">
              <span className="label-rank">
                Veteran: {veteran ? "Yes" : "No"}
              </span>
              <span className="label-rank">
                Inactive: {inactive ? "Yes" : "No"}
              </span>
              <span className="label-rank">
                Fresh Blood: {freshBlood ? "Yes" : "No"}
              </span>
              <span className="label-rank">
                Hot Streak: {hotStreak ? "Yes" : "No"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps, { setTab })(TFTSummoner);
