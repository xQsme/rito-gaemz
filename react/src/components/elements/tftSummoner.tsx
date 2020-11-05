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
  tft: Summoner;
}

function TFTSummoner(props: TFTSummonerProps) {
  const { clickable, setTab } = props;
  const { profileIconId, name, summonerLevel, tftRanked } = props.tft;

  let tftRankTier = undefined;
  let tftRank = undefined;
 
  tftRankTier = toTitleCase(tftRanked.tier);
  tftRank = process.env.PUBLIC_URL + '/shared/ranks/Emblem_' + tftRankTier + '.png';
  
  
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
            <img className="summoner-type-icon" src={TFT} alt="TFT" />
          )}

          <div className="rank-container">
            <div className="rank">
            {tftRanked && (
              <React.Fragment>
                <span className="label-rank">Rank: {tftRanked.tier} {tftRanked.rank}</span>
                <img className="summoner-rank-icon" src={tftRank} alt="Rift" />
              </React.Fragment>
            )}
               
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
