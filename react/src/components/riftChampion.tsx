import React from 'react'
import { connect } from "react-redux";
import ButtonBase from '@material-ui/core/ButtonBase';

// import { toast } from "react-toastify";

import {requestRiftChampion} from '../actions';

import type { SingleChampion } from "../interfaces";



function RiftChampion() {
  
  const { profileIconId, name, summonerLevel, riftRankeds } = props.champion;
  // const [spacing, setSpacing] = React.useState<GridSpacing>(2);
  // const classes = useStyles();

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSpacing(Number((event.target as HTMLInputElement).value) as GridSpacing);
  // };

  
  const { champion } = props.riftChampion;

  
  //Component Did Mount
  React.useEffect(() => {

    Object.keys(champion).length === 0 && props.requestRiftChampion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [champion]);
  // console.log(champions);
 //<a data-featherlight={ `string${this.props.data.imageUrl}` }></a>
  
  //   <Grid key={champions[key].key} item>
  //     <Paper className={classes.paper} >
  //       <img alt={champions[key].id} src={champions[key].image.path}/>
  //     </Paper>
  //   </Grid>
  // ))}

  //concat <a data-featherlight={ `string${this.props.data.imageUrl}` }>

  // background-image: url("http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg")

  return (
    <div className="summoner-container">
    <div
      className={"rift-summoner" + (clickable ? " clickable" : "")}
      onClick={() => {
        if (clickable) {
          navigate(RIFT_PROFILE_ROUTE);
          setTab(1);
        }
      }}
    >
      <div className="summoner-icon-container">
        <img
          className="summoner-icon"
          src={server + "/shared/profileicon/" + profileIconId + ".png"}
          alt="summoner-icon"
        />
        <span className="summoner-level">{summonerLevel}</span>
      </div>
      <div className="summoner-info-container">
        <span className="label">Summoner Name</span>
        <span className="summoner-name">{name}</span>
        
        <div className="rank-container">
          <div className="rank">
            <span className="label-rank">Solo: {soloRankTier} {riftRankeds[1].rank}</span>
            <img className="summoner-rank-icon" src={soloRank} alt="Rift" />
          </div>
          <div className="rank">
            <span className="label-rank">Flex: {flexRankTier} {riftRankeds[0].rank}</span>
            <img className="summoner-rank-icon" src={flexRank} alt="Rift" />
          </div>
        </div>

        {clickable && (
          <img className="summoner-type-icon" src={League2} alt="Rift" />
        )}
        

      </div>
    </div>
  </div>
      
)



}

// function mapStateToProps({  }: any) {
//     return {
      
//     };
//   }

// export default connect(mapStateToProps, {
//   requestRiftChampion
// })(RiftChampion);
