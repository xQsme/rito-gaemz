import React from 'react'
import { connect } from "react-redux";
import ButtonBase from '@material-ui/core/ButtonBase';

// import { toast } from "react-toastify";

import {requestRiftChampion} from '../actions';

import type { SingleRiftChampion } from "../interfaces";

interface ChampionProps {
  name: string
}


type Props = {path: string};

export default function RiftChampion(props: ChampionProps) {
  console.log(props);



  // const { profileIconId, name, summonerLevel, riftRankeds } = props.champion;
  
  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSpacing(Number((event.target as HTMLInputElement).value) as GridSpacing);
  // };

  
  // const { champion } = props.riftChampion;

  
  //Component Did Mount
  // React.useEffect(() => {

  //   Object.keys(champion).length === 0 && requestRiftChampion(/*TODO - como obter nome?*/);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [champion]);
  
  // background-image: url("http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg")

  return (
    <div className="summoner-container">
      <span> ola {props.name} </span>
    </div>    
  )
}
