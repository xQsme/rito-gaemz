import React from "react";
import { connect } from "react-redux";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SpecialTable from "./elements/special_table";
import Button from "@material-ui/core/Button";
import { toast } from "react-toastify";
import { requestInsights, changeTFTInsightsRegion } from "../actions";

function TFTInsights(props: any) {
  const { requested, units, totalMatches, region, error } = props.tftInsights;

  const requestUnits = async (region: number) => {
    const result = await props.requestInsights(region);
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
      {error ? (
        <div className="full-width">
          <Button
            className="btn-main retry-button"
            variant="contained"
            color="primary"
            onClick={() => {
              requestUnits(region);
            }}
          >
            Retry Request
          </Button>
          <p className="note">
            Request limit reached, please wait a bit before retrying.
          </p>
        </div>
      ) : (
        <>
          {!requested ? (
            <div className="center">
              <div className="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          ) : (
            <>
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
                Data recovered from {totalMatches} of the latest matches of the
                top Challenger players of the selected region.
              </p>
            </>
          )}
        </>
      )}
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
