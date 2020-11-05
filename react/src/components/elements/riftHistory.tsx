import React from "react";
// import server from "../../constants/server";
// import League2 from "../../assets/images/league-of-legends2.png";
// import { navigate } from "@reach/router";
// import { RIFT_PROFILE_ROUTE } from "../../constants/routes";
// import { toTitleCase } from "../../utils/to_title_case";
import { setTab,requestRiftHistory } from "../../actions";
import { connect } from "react-redux";

// import type { Summoner } from "../../interfaces";

interface RiftHistoryProps {
  history: any;
}


function RiftHistory(props: RiftHistoryProps) {
  const { games} = props.history;
  console.log(games);
  
  return (
    <div className="summoner-container">
      
    </div>
  );
}

function mapStateToProps() {
  return {
      
  };
}

export default connect(mapStateToProps, { 
    setTab,
    requestRiftHistory,
 })(RiftHistory);
