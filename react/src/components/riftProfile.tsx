import React from "react";
import Search from "./elements/search";
import { connect } from "react-redux";
import RiftSummoner from "./elements/riftSummoner";
import RiftHistory from "./elements/riftHistory";
import { toast } from "react-toastify";

import type { SearchReducer } from '../interfaces';

import {requestRiftMastery} from '../actions';
import {requestRiftHistory} from '../actions';

interface RiftProfileProps {
  search:SearchReducer,
  riftProfile:any,
  requestRiftMastery:Function,
  requestRiftHistory:Function
}

function RiftProfile(props: RiftProfileProps) {
  const { rift , region} = props.search;
  const { mastery , history } = props.riftProfile; //rever

  //Component Did Mount
  React.useEffect(() => {

    //rift && mastery.length === 0 && requestMastery(region, rift.id);
    rift && history.length === 0 && requestHistory(region, rift.name);
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
  const requestHistory = async (region: number, name: string) => {
    const result = await props.requestRiftHistory(region, name);
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
      {rift && <RiftHistory history={history} />}
    </React.Fragment>
  );
}


function mapStateToProps({ search, riftProfile}: any) {
  return {
    search,
    riftProfile,
  };
}

export default connect(mapStateToProps, {
  requestRiftMastery,
  requestRiftHistory,
}
)(RiftProfile);
