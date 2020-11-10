import React from "react";
import Search from "./elements/search";
import { connect } from "react-redux";
import RiftSummoner from "./elements/riftSummoner";
import RiftHistory from "./elements/riftHistory";
import RiftMastery from "./elements/riftMastery";
import toast from "../utils/toast";

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
  const { mastery , history , masteryScore} = props.riftProfile; //rever

  //Component Did Mount
  React.useEffect(() => {

    rift && mastery.length === 0 && requestMastery(region, rift.name);
    rift && history.length === 0 && requestHistory(region, rift.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rift]);

  const requestMastery = async (region: number, summonerId: string) => {
    const result = await props.requestRiftMastery(region, summonerId);

    if (result) {
      toast(result);
    }
  };
  const requestHistory = async (region: number, name: string) => {
    const result = await props.requestRiftHistory(region, name);
    if (result) {
      toast(result);
    }
  };

  return (
    <React.Fragment>
      <Search>
        {rift && <RiftSummoner rift={rift} />}
      </Search>
      {rift && <RiftMastery mastery={mastery} masteryScore={masteryScore}/>}
      {history.length !== 0 && <RiftHistory history={history} />}
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
