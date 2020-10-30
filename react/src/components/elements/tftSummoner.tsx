import React from "react";
import server from "../../constants/server";
import TFT from "../../assets/images/tft.webp";
import { navigate } from "@reach/router";
import { TFT_PROFILE_ROUTE } from "../../constants/routes";
import { setTab } from "../../actions";
import { connect } from "react-redux";

function TFTSummoner(props: any) {
  const { tftProfile, clickable, setTab } = props;
  const { profileIconId, name, summonerLevel } = props.tft;
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
          <span>{name}</span>
          {tftProfile && (
            <React.Fragment>
              <span className="label">Rank</span>
              <span className="capitalized">
                {tftProfile.tier.toLowerCase()}
              </span>
              {tftProfile.rank && (
                <React.Fragment>
                  <span className="label">Division</span>
                  <span>{tftProfile.rank}</span>
                </React.Fragment>
              )}
            </React.Fragment>
          )}
          {clickable && (
            <img className="summoner-type-icon" src={TFT} alt="TFT" />
          )}
        </div>
      </div>
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps, { setTab })(TFTSummoner);
