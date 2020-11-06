import React from "react";
import server from "../../constants/server";
import TFT from "../../assets/images/tft.webp";
import { navigate } from "@reach/router";
import { TFT_PROFILE_ROUTE } from "../../constants/routes";
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

    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps, { setTab })(TFTSummoner);
