import React from "react";
import Search from "./elements/search";
import { connect } from "react-redux";
import TFTSummoner from "./elements/tftSummoner";
import TFTHistory from "./elements/tftHistory";
import { requestTFTHistory } from "../actions";
import type { SearchReducer, TFTProfileReducer } from "../interfaces";
import toast from "../utils/toast";
import ErrorLoader from "./elements/errorLoader";

interface TFTProfileProps {
  search: SearchReducer;
  requestTFTHistory: (region: number, id: string) => Promise<string>;
  tftProfile: TFTProfileReducer;
}

function TFTProfile(props: TFTProfileProps) {
  const { tft, region } = props.search;
  const { history } = props.tftProfile;

  const requestHistory = async (region: number, id: string) => {
    const result = await props.requestTFTHistory(region, id);
    if (result) {
      toast(result);
    }
  };

  //Component Did Mount
  React.useEffect(() => {
    tft && history.length === 0 && requestHistory(region, tft.puuid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tft]);

  return (
    <React.Fragment>
      <Search>{tft && <TFTSummoner tft={tft} />}</Search>
      {tft && (
        <ErrorLoader
          error={props.tftProfile.error}
          loader={!props.tftProfile.requested}
          request={() => requestHistory(region, tft.puuid)}
        >
          {history.length > 0 && <TFTHistory history={history} />}
        </ErrorLoader>
      )}
    </React.Fragment>
  );
}

function mapStateToProps({ search, tftProfile }: any) {
  return {
    search,
    tftProfile,
  };
}

export default connect(mapStateToProps, { requestTFTHistory })(TFTProfile);
