import React from "react";
import server from "../../constants/server";
import League2 from "../../assets/images/league-of-legends2.png";
import { navigate } from "@reach/router";
import { RIFT_PROFILE_ROUTE } from "../../constants/routes";
import { toTitleCase } from "../../utils/to_title_case";
import { setTab } from "../../actions";
import { connect } from "react-redux";
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import type { MasteryEntry } from "../../interfaces";

interface RiftMasteryProps {
  clickable?: boolean;
  setTab: (tab: number) => void;
  //rift: Summoner;
  masteryScore?: number;
  mastery: MasteryEntry[];
}


function RiftSummoner(props: RiftMasteryProps) {
  
  const { masteryScore , mastery} = props;
  //let order:string = 'mastery level'
  const [order, setOrder] = React.useState<string>('mastery level');
  let masteryByLevel:MasteryEntry[] = []
  let masteryByScore:MasteryEntry[] = mastery;
  
  for (let i:any = 7; i > 0; i--) {
    mastery.forEach( masteryEntry => {
      if(masteryEntry.championLevel == i){
        masteryByLevel.push(masteryEntry)
      }
    });
  }

  /*
  const handleChange = (event: React.ChangeEvent<{ value: any }>) => {
    console.log(event.target.value)
    order = event.target.value
    console.log(order)
  };*/

  const sortChampions = () => {
    if (order === 'mastery level'){
      return masteryByLevel;
    }
    else{
      return masteryByScore;
    }
  }
  
  return (
    <div className="mastery-container">
      <div className="mastery-summoner">
        <div className="mastery-summoner-top">
          
          <div className="mastery-score">
            <span>Mastery Score: {masteryScore}</span>
          </div>

          <div className="mastery-filler">
          </div>
          
          <div className="mastery-order">
            <InputLabel id="order-label">Order By</InputLabel>
            <Select
              labelId="order-label"
              id="order-select"
              value={order}
              onChange={(evt) => setOrder(String(evt.target.value))}
            >
              <MenuItem value={'mastery level'}>Mastery Level</MenuItem>
              <MenuItem value={'mastery score'}>Mastery Score</MenuItem>
            </Select>
          </div>

        </div>
        <div className="mastery-grid">
          {sortChampions().slice(0, 24).map((mastery:MasteryEntry) => {
            let masteryIcon = (mastery.championLevel > 5) ? mastery.championLevel : 4;
            return (
              <div key={mastery.championId} className="col mastery-champ-img-div">
                <img className={"mastery-champ-img-" + mastery.championLevel}  src={'http://ddragon.leagueoflegends.com/cdn/img/champion/tiles/' + mastery.championName + '_0.jpg'} alt={mastery.championName}/>
                <img className="mastery-champ-ribbon" src={process.env.PUBLIC_URL + '/rift/mastery/mastery_icon_' + masteryIcon + '.png'}/>
                <span className="mastery-champ-label">
                  {Math.floor(mastery.championPoints / 1000)}k
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps, { setTab })(RiftSummoner);
