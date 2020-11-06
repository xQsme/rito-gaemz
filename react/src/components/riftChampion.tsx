import React from 'react'
import { toast } from "react-toastify";
import { connect } from "react-redux";

// import { toast } from "react-toastify";

import {requestRiftChampion} from '../actions';

import type { SingleRiftChampion } from "../interfaces";
import type { RiftChampionReducer } from '../interfaces';

interface ChampionProps {
  name: string,
  champion: SingleRiftChampion
  requestRiftChampion(name: string): Promise<string>
}

function RiftChampion(props: ChampionProps) {
  console.log(props);
  const champion  = props.champion;
  React.useEffect(() => {

    //rift && mastery.length === 0 && requestMastery(region, rift.id);
    !champion && requestRiftChampion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const requestRiftChampion = async () => {
    const result = await props.requestRiftChampion(props.name);
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
    <div className="champion-container">
      <div className="rift-champion">
        <span> ola {props.name} </span>
      </div>
      
    </div>    
  )
}

function mapStateToProps({ requestRiftChampion }: any) {
  return {
    requestRiftChampion,
  };
}

export default connect(mapStateToProps, {
  requestRiftChampion,
})(RiftChampion);

