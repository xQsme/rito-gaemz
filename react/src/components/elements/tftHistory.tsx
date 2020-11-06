import React from "react";
import { setTab } from "../../actions";
import { connect } from "react-redux";
import { TFTParticipant } from "../../interfaces";
import Star from '@material-ui/icons/StarRate';

interface TFTHistoryProps {
  history: TFTParticipant[];
}

function TFTHistory(props: TFTHistoryProps) {
  const { history } = props;

  return (
    <div className="tft-history">
      {history.map((match: TFTParticipant) => {
        return (
          <div className={`tft-match ${match.placement === 1 ? 'win' : match.placement === 8 ? 'loss' : '' }`}>
            <div className="tft-placement-div">
              <span className="placement">#{match.placement}</span>
            </div>
            <div className="tft-units-div">
              {match.units.map(unit => {
                return (
                  <div className={`unit rarity${unit.rarity}`}>
                    <div className="star-level">
                    {[...Array(unit.tier)].map(e => {
                      return (<Star />)
                    })}
                    </div>
                    <img src={'/tft/champions/' + unit.character_id + '.png'} />
                  </div>
                )
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps, { setTab })(TFTHistory);
