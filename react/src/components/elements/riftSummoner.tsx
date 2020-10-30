import React from "react";
import server from "../../constants/server";
import League2 from "../../assets/images/league-of-legends2.png";

export default function RiftSummoner(props: any) {
  const { clickable } = props;
  const { profileIconId, name, summonerLevel } = props.rift;
  return (
    <div className="summoner-container">
      <div className={"rift-summoner" + (clickable ? " clickable" : "")}>
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
