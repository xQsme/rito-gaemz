import React from "react";
import Search from "./elements/search";
import { connect } from "react-redux";
import TFTSummoner from "./elements/tftSummoner";

function TFTProfile(props: any) {
  const { tft } = props.search;
  return (
    <React.Fragment>
      <Search />
      {tft && <TFTSummoner tft={tft} />}
    </React.Fragment>
  );
}

function mapStateToProps({ search }: any) {
  return {
    search,
  };
}

export default connect(mapStateToProps, {})(TFTProfile);
