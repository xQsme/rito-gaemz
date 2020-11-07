import React from "react";
import Search from "./elements/search";
import { connect } from "react-redux";
import LoRSummoner from "./elements/lorSummoner";

import type { SearchReducer } from '../interfaces';

interface LoRProfileProps {
  search:SearchReducer,
}

function LoRProfile(props:LoRProfileProps) {
  const { lor } = props.search;
  return (
    <React.Fragment>
      <Search>
        {lor && <LoRSummoner lor={lor} />}
      </Search>
    </React.Fragment>
  );
}

function mapStateToProps({ search }: any) {
  return {
    search,
  };
}

export default connect(mapStateToProps, {})(LoRProfile);
