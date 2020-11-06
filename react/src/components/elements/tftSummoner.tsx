import React from "react";
import server from "../../constants/server";
import TFT from "../../assets/images/tft.webp";
import { navigate } from "@reach/router";
import { TFT_PROFILE_ROUTE } from "../../constants/routes";
import { toTitleCase } from "../../utils/to_title_case";
import { setTab } from "../../actions";
import { connect } from "react-redux";
import Nope from '@material-ui/icons/CancelOutlined';
import Check from '@material-ui/icons/CheckCircleOutline';

interface TFTSummonerProps {
  clickable?: boolean;
  setTab: (tab: number) => void;
  tft: any;
}

function TFTSummoner(props: TFTSummonerProps) {
  const { clickable, setTab } = props;
  const { profileIconId, name, summonerLevel, tftRanked } = props.tft;
  tftRanked[0] = tftRanked[0] ? tftRanked[0] : {};
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
  } = tftRanked[0];

  let tftRankTier = toTitleCase(tftRanked[0] ? tier : "Unranked");
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
        {tier && (
          <>
            <div className="ranked-flex-container">
              <img className="summoner-rank-icon" src={tftRank} alt="Icon" />
              <span>
                Rank: {tftRankTier} {rank}
              </span>
              <span>LP: {leaguePoints}</span>
              <span>Wins: {wins}</span>
              <span>Games: {wins + losses}</span>
            </div>
            <div className="ranked-flex-container ranked-flex-text-container">
              <span className="icon-text">
                Veteran: {veteran ? <Check className="green" /> : <Nope className="red" />}
              </span>
              <span className="icon-text">
                Inactive: {inactive ? <Check className="green" /> : <Nope className="red" />}
              </span>
              <span className="icon-text">
                Fresh Blood: {freshBlood ? <Check className="green" /> : <Nope className="red" />}
              </span>
              <span className="icon-text">
                Hot Streak: {hotStreak ? <Check className="green" /> : <Nope className="red" />}
              </span>
            </div>
          </>
        )}
        {clickable && (
          <img className="summoner-type-icon" src={TFT} alt="TFT" />
        )}
      </div>
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps, { setTab })(TFTSummoner);
