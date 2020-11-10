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
import Fab from '@material-ui/core/Fab';
import DownIcon from '@material-ui/icons/KeyboardArrowDown';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';

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
  const [order, setOrder] = React.useState<string>('mastery level');
  const [fabText, setFabText] = React.useState<string>('Expand your Dongers ヽ༼ຈل͜ຈ༽ﾉ');
  const [collapsed, setCollapsed] = React.useState<boolean>(true);

  let masteryByLevel:MasteryEntry[] = []
  
  for (let i:any = 7; i > 0; i--) {
    mastery.forEach( masteryEntry => {
      if(masteryEntry.championLevel === i){
        masteryByLevel.push(masteryEntry)
      }
    });
  }

  const sortChampions = () => {
    let auxArray : MasteryEntry[] = [];
    let arrayLength : number = 24;
    console.log('sortChampions', collapsed, arrayLength)
    
    switch (order) {
      case 'mastery level':
        console.log('switch = mastery level descending')
        for (let i:any = 7; i > 0; i--) {
          mastery.forEach( (masteryEntry) => {
            if(masteryEntry.championLevel === i){
              auxArray.push(masteryEntry)
            }
          });
        }        
        break;           
        case 'mastery score':
        console.log('switch = mastery score descending')
        auxArray = mastery
        break;
    }
    console.log(auxArray.slice(0, arrayLength))
    return auxArray.slice(0, arrayLength);
  }

  const handlePictureLoaded = (index:number, element:any) =>{ 

  }

  return (
    <div className="mastery-container">
      <div className="mastery-summoner">
        <div className="mastery-summoner-top">
          
          <div className="mastery-score">
            <span>Champion Mastery Score: {masteryScore}</span>
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
          {sortChampions().map((mastery:MasteryEntry, index:number) => {
            let masteryIcon = (mastery.championLevel >= 5) ? mastery.championLevel : 4;
            return (
              <ChampionImage mastery={mastery} index={index} masteryIcon={masteryIcon} collapsed={collapsed}/>
            );
          })}
        </div>
        <div className="mastery-fab-container">
          <div className="mastery-fab">
            <Fab
              variant="extended"
              size="medium"
              color="primary"
              aria-label="add"
              onClick={(evt) => {
                //console.log(evt)
                setCollapsed(!collapsed)
                if(collapsed){
                  setFabText(" Collapse your Dongers ヽ༼ຈل͜ຈ༽ﾉ ")  
                }else{
                  setFabText(" Expand your Dongers ヽ༼ຈل͜ຈ༽ﾉ ")
                }
              }}
            >
              {collapsed ? <DownIcon/> : <UpIcon/>} {fabText} {collapsed ? <DownIcon/> : <UpIcon/>}
            </Fab>
          </div>
        </div>
      </div>
    </div>
  );
}


interface ChampionImageProps {
  mastery: MasteryEntry;
  collapsed: boolean;
  index: number;
  masteryIcon: number;
}

class ChampionImage extends React.Component<ChampionImageProps> {
  state = { loaded: false };

  onLoad = () => {
    this.setState({ loaded: true });
    console.log("Loaded!");
  };

  render() {
    const { loaded } = this.state;
    const { mastery, collapsed, index, masteryIcon} = this.props;

    return (

      <div key={mastery.championId} className="col mastery-champ-img-div" hidden={ (collapsed) && (index > 7)}>
        <img
          className={ loaded ? "mastery-champ-img-" + mastery.championLevel : 'mastery-champ-img'}
          alt={mastery.championName}
          src={'http://ddragon.leagueoflegends.com/cdn/img/champion/tiles/' + mastery.championName + '_0.jpg'}
          onLoad={this.onLoad}
        />

        <img className="mastery-champ-ribbon" src={process.env.PUBLIC_URL + '/rift/mastery/mastery_icon_' + masteryIcon + '.png'} hidden={!loaded}/>
        <span className="mastery-champ-label " hidden={!loaded}>
          {Math.floor(mastery.championPoints / 1000)}k
        </span>
      </div>
      
    );
  }
}


function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps, { setTab })(RiftSummoner);
