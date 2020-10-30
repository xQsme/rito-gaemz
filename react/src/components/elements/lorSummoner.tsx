import React from "react";
import LoR from "../../assets/images/runeterra.png";

export default function LoRSummoner(props: any) {
  const { gameName, tagLine } = props.lor;
  return (
    <div className="summoner-container">
      <div className="lor-summoner clickable">
        <div className="summoner-info-container">
          <span className="label">Summoner Name</span>
          <span className="summoner-name">{gameName}</span>
          <span className="label">Server</span>
          <span className="summoner-name">{tagLine}</span>
          <img className="summoner-type-icon" src={LoR} alt="LoR" />
        </div>
      </div>
    </div>
  );
}
