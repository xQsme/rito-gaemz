import React from "react";
import { setTab } from "../../actions";
import { connect } from "react-redux";
import { TFTMatch, TFTUnit, TFTTrait } from "../../interfaces";
import Star from '@material-ui/icons/StarRate';

interface TFTHistoryProps {
  history: TFTMatch[];
}

function TFTHistory(props: TFTHistoryProps) {
  const { history } = props;

  return (
    <div className="tft-history">
      {history.map((match: TFTMatch) => {
        const { player } = match;
        return (
          <div key={match.id} className={`tft-match ${player.placement === 1 ? 'win' : player.placement <= 4 ? 'average' : player.placement >= 7 ? 'loss' : '' }`}>
            <div className="tft-placement-div">
              <span className="placement">#{player.placement}</span>
              <span>{match.ranked ? 'Ranked' : 'Normal'}</span>
              <span>{match.length}</span>
            </div>
            <div className="tft-units-div">
              {player.units.map((unit:TFTUnit, index:number) => {
                return (
                  <div key={index} className={`unit rarity${unit.rarity}`}>
                    <div className="star-level">
                    {[...Array(unit.tier)].map((e:any, index:number) => {
                      return (<Star key={index}/>)
                    })}
                    </div>
                    <img src={'/tft/champions/' + unit.character_id + '.png'} alt={unit.character_id} />
                  </div>
                )
              })}
            </div>
            <div className="tft-traits-div">
              {player.traits.map((trait:TFTTrait) => {
                if(trait.tier_current !== 0) {
                  return(
                    <div className="trait-container">
                      <img src={'/tft/traits/bg' + trait.style + '.png'} className="trait-background"/>
                      <img src={'/tft/traits/' + trait.name.replace('Set4_', '') + '.svg'} className="trait-icon"/>
                    </div>
                  )
                }
                return null;
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
