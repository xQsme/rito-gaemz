import React from "react";
import { connect } from "react-redux";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SpecialTable from "./elements/special_table";
import Button from "@material-ui/core/Button";
import toast from "../utils/toast";
import { requestInsights, changeTFTInsightsRegion } from "../actions";

import type { TFTInsightsReducer } from "../interfaces";
import ErrorLoader from "./elements/errorLoader";

interface TFTInsightsProps {
  tftInsights: TFTInsightsReducer;
  requestInsights: (region: number) => Promise<string>;
  changeTFTInsightsRegion: (region: number) => void;
}

function TFTInsights(props: TFTInsightsProps) {
  const { requested, units, totalMatches, region, error } = props.tftInsights;

  const requestUnits = async (region: number) => {
    const result = await props.requestInsights(region);
    if (result) {
      toast(result);
    }
  };

  const handleChange = (stuff: any, region: number) => {
    props.changeTFTInsightsRegion(region);
    props.requestInsights(region);
  };

  //Component Did Mount
  React.useEffect(() => {
    units.length === 0 && requestUnits(region);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="tft-insights-container">
      <Tabs
        value={region}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="EU" />
        <Tab label="NA" />
        <Tab label="KR" />
      </Tabs>
      <ErrorLoader error={error} loader={!requested} request={() => requestUnits(region)}>
        <React.Fragment>
          <SpecialTable
            rows={units}
            headers={["Unit", "1st Place", "Top 4", "Items"]}
            elements={["unit", "win", "top", "items"]}
            primaryKey={"Unit"}
            orderCol="1st Place"
            orderDir="desc"
            rowCount={15}
          />
          <p className="note">
            Data recovered from {totalMatches} of the latest matches of the top
            Challenger players of the selected region.
          </p>
        </React.Fragment>
      </ErrorLoader>
    </div>
  );
}

function mapStateToProps({ tftInsights }: any) {
  return {
    tftInsights,
  };
}

export default connect(mapStateToProps, {
  requestInsights,
  changeTFTInsightsRegion,
})(TFTInsights);
