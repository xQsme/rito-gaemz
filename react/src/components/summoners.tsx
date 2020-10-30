import React from "react";
import Search from "./elements/search";
import { connect } from "react-redux";
import RiftSummoner from './elements/riftSummoner';
import TFTSummoner from './elements/tftSummoner';
import LoRSummoner from './elements/lorSummoner';

function Summoners(props: any) {
  const { rift, tft, lor } = props.search;
  return (
    <React.Fragment>
      <Search />
      {rift && 
        <RiftSummoner rift={rift} clickable/>
      }
      {tft && 
        <TFTSummoner tft={tft} clickable/>}
      {lor && <LoRSummoner lor={lor} clickable/>}
    </React.Fragment>
  );
}

function mapStateToProps({ search }: any) {
  return {
    search,
  };
}

export default connect(mapStateToProps, {})(Summoners);
