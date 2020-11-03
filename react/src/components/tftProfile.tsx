import React from "react";
import Search from "./elements/search";
import { connect } from "react-redux";
import TFTSummoner from "./elements/tftSummoner";
import TFTDetails from "./elements/tftDetails";

import type { SearchReducer } from '../interfaces';

interface TFTProfileProps {
  search:SearchReducer,
  requestTFTProfile?:(region:number, id:string) => Promise<string>;
}

function TFTProfile(props:TFTProfileProps) {
  const { tft } = props.search;

  return (
    <React.Fragment>
      <Search />
      {tft && <TFTSummoner tft={tft} />}
      {tft && tft.tftRanked.length > 0 && <TFTDetails tftRanked={tft.tftRanked[0]} />}
    </React.Fragment>
  );
}

function mapStateToProps({ search, tftProfile }: any) {
  return {
    search,
    tftProfile,
  };
}

export default connect(mapStateToProps, { })(TFTProfile);
