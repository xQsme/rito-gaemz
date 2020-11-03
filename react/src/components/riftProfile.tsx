import React from "react";
import Search from "./elements/search";
import { connect } from "react-redux";
import RiftSummoner from "./elements/riftSummoner";
import { toast } from "react-toastify";

import type { SearchReducer } from '../interfaces';

import {requestRiftMastery} from '../actions';

interface RiftProfileProps {
  search:SearchReducer,
  riftProfile:any,
  requestRiftMastery:Function,
}

function RiftProfile(props: RiftProfileProps) {
  const { rift , region} = props.search;
  const { mastery } = props.riftProfile;

  //Component Did Mount
  React.useEffect(() => {

    rift && !mastery && requestMastery(region, rift.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rift]);

  const requestMastery = async (region: number, summonerId: string) => {
    const result = await props.requestRiftMastery(region, summonerId);
    if (result) {
      toast(result, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <React.Fragment>
      <Search />
      {rift && <RiftSummoner rift={rift} />}
    </React.Fragment>
  );
}


function mapStateToProps({ search, riftProfile}: any) {
  return {
    search,
    riftProfile,
  };
}

export default connect(mapStateToProps, {requestRiftMastery})(RiftProfile);
