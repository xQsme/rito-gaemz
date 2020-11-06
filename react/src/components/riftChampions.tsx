import React from "react";
import { connect } from "react-redux";
import ButtonBase from "@material-ui/core/ButtonBase";
import { Link } from "@reach/router";
// import { toast } from "react-toastify";
// import RiftChampion from "./riftChampion";
import { requestRiftChampions } from "../actions";

function RiftChampions(props: any) {
  const { champions } = props.riftChampions;

  //Component Did Mount
  React.useEffect(() => {
    Object.keys(champions).length === 0 && props.requestRiftChampions();
  }, [champions]);

  //concat <a data-featherlight={ `string${this.props.data.imageUrl}` }>
  // background-image: url("http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg")

  return (
    <div className="champion-grid-container">
      {Object.keys(champions).map((key) => (
        <Link to={`/rift/champions/${key}`} className="hidden-container" key={champions[key].key}>
          <div
            className="rift-champion-container"
            key={champions[key].key}
            style={{
              backgroundImage: `url("http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champions[key].id}_0.jpg")`,
            }}
          >
            <div className="rift-champion-container-child">
              <ButtonBase className="rift-champion-button hide">
                <img
                  className="champ-img"
                  alt="complex"
                  src={`http://ddragon.leagueoflegends.com/cdn/10.22.1/img/champion/${champions[key].id}.png`}
                />
                {/* <img className={classes.img} alt="complex" src="/static/images/grid/complex.jpg" /> */}
              </ButtonBase>
              <div className="text-grid hide">
                <span className="champ-name">{champions[key].name}</span>
                <span className="champ-tags">{champions[key].tags.join(" / ")}</span>
              </div>
            </div>
          </div>

          <div className="hidden-details">
            <span>
              <h1> {champions[key].name} </h1>
            </span>
            <span> Details </span>
          </div>
        </Link>
      ))}
    </div>
  );

}

function mapStateToProps({ riftChampions }: any) {
  return {
    riftChampions,
  };
}

export default connect(mapStateToProps, {
  requestRiftChampions,
})(RiftChampions);
