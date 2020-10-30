import React from "react";
import Search from "./elements/search";
import { connect } from "react-redux";
import RiftSummoner from "./elements/riftSummoner";

function RiftProfile(props: any) {
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
