import React from "react";
import Search from "./elements/search";
import { connect } from "react-redux";
import LoRSummoner from "./elements/lorSummoner";

function LoRProfile(props: any) {
  const { lor } = props.search;
  return (
    <React.Fragment>
      <Search />
      {lor && <LoRSummoner lor={lor} />}
    </React.Fragment>
  );
}

function mapStateToProps({ search }: any) {
  return {
    search,
  };
}

export default connect(mapStateToProps, {})(LoRProfile);
