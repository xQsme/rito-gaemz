import React from "react";
import server from "../../constants/server";
import TFT from "../../assets/images/tft.webp";

export default function TFTSummoner(props: any) {
  const { profileIconId, name, summonerLevel } = props.tft;
  return (
    <div className="summoner-container">
      <div className="tft-summoner clickable">
        <div className="summoner-icon-container">
          <img
            className="summoner-icon"
            src={server + "/rift/profileicon/" + profileIconId + ".png"}
            alt="summoner-icon"
          />
          <span className="summoner-level">{summonerLevel}</span>
        </div>
        <div className="summoner-info-container">
          <span className="label">Summoner Name</span>
          <span className="summoner-name">{name}</span>
          <img className="summoner-type-icon" src={TFT} alt="TFT" />
        </div>
      </div>
    </div>
  );
}
