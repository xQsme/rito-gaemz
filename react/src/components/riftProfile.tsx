import React from "react";
import Search from "./elements/search";
import { connect } from "react-redux";
import RiftSummoner from "./elements/riftSummoner";

import type { SearchReducer } from '../interfaces';

interface RiftProfileProps {
  search:SearchReducer,
}

function RiftProfile(props: RiftProfileProps) {
  const { rift } = props.search;
  return (
    <React.Fragment>
      <Search />
      {rift && <RiftSummoner rift={rift} />}
    </React.Fragment>
  );
}

function mapStateToProps({ search }: any) {
  return {
    search,
  };
}

export default connect(mapStateToProps, {})(RiftProfile);
