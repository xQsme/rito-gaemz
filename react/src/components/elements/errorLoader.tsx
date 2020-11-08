import React from "react";
import Button from "@material-ui/core/Button";

interface Props {
  error: boolean;
  loader: boolean,
  children: any;
  request: Function;
}

export default function ErrorLoader(props: Props, ref: any) {
  const { error, children, loader, request } = props;
  return (
    <React.Fragment>
      {error ? (
        <div className="full-width">
          <Button
            className="btn-main retry-button"
            variant="contained"
            color="primary"
            onClick={() => request()}
          >
            Retry Request
          </Button>
          <p className="note">
            Request limit reached, please wait a bit before retrying.
          </p>
        </div>
      ) : (
        <>
          {loader ? (
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
            <>{children}</>
          )}
        </>
      )}
    </React.Fragment>
  );
}
