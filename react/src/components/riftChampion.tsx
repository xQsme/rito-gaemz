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
  riftChampion: RiftChampionReducer;
  requestRiftChampion(name: string): Promise<string>;
}

function RiftChampion(props: ChampionProps) {
  // const { champion }= props.champion;
  let { riftChampion, name } = props;
  const [chosen, setChosen] = React.useState<String>("0");
  // let riftChampion = props.riftChampion;

  React.useEffect(() => {
    //rift && mastery.length === 0 && requestMastery(region, rift.id);
    riftChampion &&
      riftChampion.name === "" &&
      requestRiftChampion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const requestRiftChampion = async () => {
    const result = await props.requestRiftChampion(name);
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
        
        <div className="details-container" 
         style={{
          backgroundImage: `url("http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${props.name}_${chosen}.jpg")`,
        }}
        
        >
          <div className="background-opacity" />
          <div className="details-top">
            <div className="champion-avatar">
              <img
                className="champion-avatar-img"
                src={
                  `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${props.name}_${chosen}.jpg`
                  // `http://ddragon.leagueoflegends.com/cdn/10.22.1/img/champion/${props.name}.png`
                }
                alt="avatar"
              />
            </div>
            <div className="champion-name-title-container">
              <div className="champion-name">
                <span>{riftChampion && riftChampion.name}</span>
              </div>
              <div className="champion-title">
                <span>{riftChampion && riftChampion.title}</span>
              </div>

              <div className="website-references"> 
                <div className="website-reference">
                  <a href={`https://u.gg/lol/champions/${props.name}/build`}>u.gg</a>
                  <span>Builds</span>
                </div>
                <div className="website-reference">
                  <a href={`https://lolalytics.com/lol/${props.name.toLowerCase()}/build/`}>Lolalytics</a>
                  <span>Builds</span>
                </div>
                <div className="website-reference">
                  <a href={`https://www.murderbridge.com/Champion/${props.name}`}>MurderBridge </a>
                  <span>ARAM Builds</span>
                </div>
              </div>
            </div>
                
            <div className="champion-stats">
              <div className="stat-row">
                <div className="stat">
                  <div className="stat-name">Health</div>
                  <div className="value"><span>Total: {riftChampion && riftChampion.stats.hp}</span> (<span className="per-level">+{riftChampion && riftChampion.stats.hpperlevel}</span>/lvl)</div>
                  <div className="value"><span>Regen: {riftChampion && riftChampion.stats.hpregen} </span> (<span className="per-level">+{riftChampion && riftChampion.stats.hpregenperlevel}</span>/lvl) per 5 seconds</div>
                </div>
                <div className="stat">
                <div className="stat-name">Mana</div>
                  <div className="value"><span>Total: {riftChampion && riftChampion.stats.mp }</span> (<span className="per-level">+{riftChampion && riftChampion.stats.mpperlevel}</span>/lvl)</div>
                  <div className="value"><span>Regen: {riftChampion && riftChampion.stats.mpregen}</span> (<span className="per-level">+{riftChampion && riftChampion.stats.mpregenperlevel}</span>/lvl) per 5 seconds</div>
                </div>
                <div className="stat">
                  <div className="stat-name">Movement</div>
                  <div className="value"><span>Speed: {riftChampion && riftChampion.stats.movespeed}</span></div>
                </div>
              </div>

              <div className="stat-row">
                <div className="stat">
                  <div className="stat-name">Attack</div>
                  <div className="value"><span>Damage: {riftChampion && riftChampion.stats.attackdamage}</span> (<span className="per-level">+{riftChampion && riftChampion.stats.attackdamageperlevel}</span>/lvl)</div>
                  <div className="value"><span>Speed: {riftChampion && riftChampion.stats.attackspeed}</span> (<span className="per-level">+{riftChampion && riftChampion.stats.attackspeedperlevel}</span>/lvl)</div>
                  <div className="value"><span>Range: {riftChampion && riftChampion.stats.attackrange} units</span></div>
                  <div className="value"><span>Crit Chance: {riftChampion && riftChampion.stats.crit}</span> (<span className="per-level">+{riftChampion && riftChampion.stats.critperlevel}</span>/lvl)</div>
                </div>
                <div className="stat">
                  <div className="stat-name">Defenses</div>
                  <div className="value"><span>Armor: {riftChampion && riftChampion.stats.armor}</span> (<span className="per-level">+{riftChampion && riftChampion.stats.armorperlevel}</span>/lvl)</div>
                  <div className="value"><span>Magic Resistance: {riftChampion && riftChampion.stats.spellblock}</span> (<span className="per-level">+{riftChampion && riftChampion.stats.spellblockperlevel}</span>/lvl)</div>
                </div>
               
               
              </div>
            </div>

          </div>

          <div className="details-bottom">
            <div className="tips-container">
              <div className="ally-tips-container">
                <div className="fight-as-against">Fighting As</div>
                <div className="tips">
                  {riftChampion.allytips.map((tip:any, i: number) => { 
                    return ( 
                      <>
                        <span key={i} className={`tip-${i}`}> 👌 {tip}</span>
                      </>
                    )
                  })}
                </div>
              </div>
                  
              <div className="enemy-tips-container">
                <div className="fight-as-against">Fighting Against</div>
                <div className="tips">
                  {riftChampion.enemytips.map((tip:any, i: number) => {  
                    return ( 
                      <>
                        <span className={`tip-${i}`}> 😒 {tip}</span>
                      </>
                    )
                  })}
                </div>
              </div>
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
          {/* good code not found 😨 */}
          <div className="arrow-left">
            {/* puxa mais skins vindas da esquerda, só visivel se não estiver o maximo para a esquerda */}
          </div>
          {riftChampion.skins.map((skin:any) => { 
            // console.log(skin)
            return ( 
             
              <img onClick={()=>setChosen(skin.num)} key={skin.id}
                className={`champion-avatar-img clickable ${chosen !== skin.num ? "" : "chosen" }`}
                // src={skin.path}
                src={`http://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${props.name}_${skin.num}.jpg`}
                alt="avatar"
              />

            )})}
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
