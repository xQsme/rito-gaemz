import React from "react";
import Search from "./elements/search";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import TFTSummoner from "./elements/tftSummoner";

import { requestTFTProfile } from "../actions";

import type { SearchReducer, TFTProfileReducer } from '../interfaces';

interface TFTProfileProps {
  search:SearchReducer,
  requestTFTProfile:(region:number, id:string) => Promise<string>;
  tftProfile:TFTProfileReducer,
}

function TFTProfile(props:TFTProfileProps) {
  const { region, tft } = props.search;
  const { tier } = props.tftProfile;

  const requestProfile = async (region: number, summonerId: string) => {
    const result = await props.requestTFTProfile(region, summonerId);
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

  //Component Did Mount
  React.useEffect(() => {
    tft && !tier && requestProfile(region, tft.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tft]);

  return (
    <React.Fragment>
      <Search />
      {tft && <TFTSummoner tft={tft} tftProfile={props.tftProfile}/>}
    </React.Fragment>
  );
}

function mapStateToProps({ search, tftProfile }: any) {
  return {
    search,
    tftProfile,
  };
}

export default connect(mapStateToProps, { requestTFTProfile })(TFTProfile);
