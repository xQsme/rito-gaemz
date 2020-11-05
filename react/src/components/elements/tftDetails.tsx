import React from "react";
import { toTitleCase } from "../../utils/to_title_case";
import { setTab } from "../../actions";
import { connect } from "react-redux";

interface TFTDetailsProps {
  tftRanked: any;
}

function TFTSummoner(props: TFTDetailsProps) {
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
  } = props.tftRanked;

  let tftRankTier = toTitleCase(tier ? tier : "Unranked");
  let tftRank =
    process.env.PUBLIC_URL + "/shared/ranks/Emblem_" + tftRankTier + ".png";

  return (
    <div className="ranked-container">
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
          <span className="label-rank">Veteran: {veteran ? "Yes" : "No"}</span>
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
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps, { setTab })(TFTSummoner);
