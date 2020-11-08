import React from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux";
// import Button from "@material-ui/core/Button";

// import { toast } from "react-toastify";

import { requestRiftChampion } from "../actions";

import type { RiftChampionReducer } from "../interfaces";
// import type { RiftChampionReducer } from '../interfaces';

interface ChampionProps {
  name: string;
  riftChampion?: RiftChampionReducer;
  requestRiftChampion(name: string): Promise<string>;
}

function RiftChampion(props: ChampionProps) {
  // const { champion }= props.champion;
  console.log(props);
  let riftChampion = props.riftChampion;

  React.useEffect(() => {
    //rift && mastery.length === 0 && requestMastery(region, rift.id);
    props.riftChampion &&
      // Object.keys(props.riftChampion.champion).length === 0 && props.riftChampion.champion.name != props.name  &&
      Object.keys(props.riftChampion.champion).length === 0 &&
      requestRiftChampion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.riftChampion, props.name]);

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
      <div className="champion-details-container">
        <div className="background-image"></div>
        <div className="details-container">
          <div className="details-top">
            <div className="champion-avatar">
              <img
                className="champion-avatar-img"
                src={
                  "http://ddragon.leagueoflegends.com/cdn/10.22.1/img/champion/" +
                  props.name +
                  ".png"
                } /*trocar props.name para o que vem do request*/
                alt="avatar-image"
              />
            </div>
            <div className="champion-name-title-container">
              <div className="champion-name">
                <span>{riftChampion ? riftChampion.champion.name : ""}</span>
              </div>
              <div className="champion-title">
                <span>{riftChampion ? riftChampion.champion.title : ""}</span>
              </div>
            </div>
          </div>

          <div className="details-bottom">
            <div className="">
              (div1)
              <div className="">(div1.1)</div>
              <div className="">(div1.2)</div>
            </div>
            <div className="">
              (div2)
              <div className="">(div2.1)</div>
              <div className="">(div2.2)</div>
            </div>
            <div className="">
              (div3)
              <div className="">(div3.1)</div>
              <div className="">(div3.2)</div>
            </div>
            <div className="">(div4)
              <div className="">(div4.1)</div>
              <div className="">(div4.2)</div>
            </div>
              
          </div>

          <div className="skin-image-expanded">
            {/* div ou background da div pai? */}
          </div>
          <div className="close-skin-image-expanded">
            {/* cruz para fechar o expanded */}
          </div>
        </div>
      </div>

      <div className="skins-list-container">
        <div className="skins-list">
          good code not found 😨
          <div className="arrow-left">
            {/* puxa mais skins vindas da esquerda, só visivel se não estiver o maximo para a esquerda */}
          </div>
            {/* {props.riftChampion ? props.riftChampion.champion.skins.map((item:any) => (
              <img style={{width:"50px", height:"50px"}} src={`http://ddragon.leagueoflegends.com/cdn/10.22.1/img/item/${item}.png`} alt=""/>
            )) : ""} */}
          <div className="arrow-right">
            {/* puxa mais skins vindas da direita, só visivel se não estiver o maximo para a direita */}
          </div>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps({ riftChampion }: any) {
  return {
    riftChampion, 
  };
}

export default connect(mapStateToProps, {
  requestRiftChampion,
})(RiftChampion);
