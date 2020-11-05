import React from 'react'
import { connect } from "react-redux";
// import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid, {  } from '@material-ui/core/Grid';
// import FormLabel from '@material-ui/core/FormLabel';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import Radio from '@material-ui/core/Radio';
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

// import GridList from '@material-ui/core/GridList';
// import GridListTile from '@material-ui/core/GridListTile';
// import GridListTileBar from '@material-ui/core/GridListTileBar';
// import ListSubheader from '@material-ui/core/ListSubheader';
// import IconButton from '@material-ui/core/IconButton';
// import InfoIcon from '@material-ui/icons/Info';


// import { toast } from "react-toastify";

import {requestRiftChampions} from '../actions';
import { blue } from '@material-ui/core/colors';


// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       flexGrow: 4,
//     },
//     paper: {
//       height: 140,
//       width: 100,
//     },
//     control: {
//       padding: theme.spacing(2),
//     },
//   }),
// );

function RiftChampions(props: any) {
  // const [spacing, setSpacing] = React.useState<GridSpacing>(2);
  // const classes = useStyles();

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSpacing(Number((event.target as HTMLInputElement).value) as GridSpacing);
  // };

  
  const { champions } = props.riftChampions;

  
  //Component Did Mount
  React.useEffect(() => {

    Object.keys(champions).length === 0 && props.requestRiftChampions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [champions]);
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
    <div className="champion-grid-container">
      {Object.keys(champions).map((key) => (
        <div className="rift-champion-container" key={champions[key].key} style={{backgroundImage: `url("http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champions[key].id}_0.jpg")`}}> 
          {/* <div className="container-background-image"  /> */}
          <div className="rift-champion-container-child">
          
            <ButtonBase className="rift-champion-button" >
              <img className="champ-img" alt="complex" src={`http://ddragon.leagueoflegends.com/cdn/10.22.1/img/champion/${champions[key].id}.png`} />
              {/* <img className={classes.img} alt="complex" src="/static/images/grid/complex.jpg" /> */}
            </ButtonBase>
                    
          
            <div className="text-grid">
              <span className="champ-name">
                  {champions[key].id}
              </span>
              <span>
                Mage / Bruiser
              </span>
              
            </div>
            
          </div>
          <span className="hidden-details">
            Details
          </span>
        </div>
       
      ))}
    </div>
    
      
)



// return (
//   <div className="paper-root">
//     <Paper className="paper-rift-champions">
     
//       <Grid container spacing={5} >
//         {Object.keys(champions).map((key) => (
//           <div className="rift-champion-container" key={champions[key].key} style={{backgroundImage: `url("http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champions[key].id}_0.jpg")`}}> 
//               <Grid item container > 
//                 <div className="grid-item-container">
//                   <ButtonBase className="rift-champion-button" >
//                     <img className="champ-img" alt="complex" src={`http://ddragon.leagueoflegends.com/cdn/10.22.1/img/champion/${champions[key].id}.png`} />
//                     {/* <img className={classes.img} alt="complex" src="/static/images/grid/complex.jpg" /> */}
//                   </ButtonBase>
                        
             
//                 <div className="text-grid">
//                   <Typography gutterBottom className="champ-name" variant="subtitle1">
//                       {champions[key].id}
//                     </Typography>
//                     <Typography variant="body2" gutterBottom>
//                       Mage / Bruiser
//                     </Typography>
              
//                     </div>
              
//                 </div>
                  
                  
//               </Grid>
           
//           </div>
//         ))}
//       </Grid>
      
     
//     </Paper>
//   </div>
// )























  // return (
  //   <div className="paper-root">
  //     <Paper className="paper-rift-champions">
       
  //       <Grid container spacing={2} >
  //         {Object.keys(champions).map((key) => (
  //           <div className="rift-champion-container" key={champions[key].key} style={{backgroundImage: `url("http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champions[key].id}_0.jpg")`}}> 
  //               <Grid item > 
  //                   <ButtonBase className="rift-champion-button" >
  //                   <img className="champ-img" alt="complex" src={`http://ddragon.leagueoflegends.com/cdn/10.22.1/img/champion/${champions[key].id}.png`} />
  //                   {/* <img className={classes.img} alt="complex" src="/static/images/grid/complex.jpg" /> */}
  //                 </ButtonBase>
  //               </Grid>
  //               <Grid item xs={12} sm container>
  //                 <Grid item xs container direction="column" spacing={2}>
  //                   <Grid item xs>
  //                     <Typography gutterBottom variant="subtitle1">
  //                       {champions[key].id}
  //                     </Typography>
  //                     <Typography variant="body2" gutterBottom>
  //                       Roles:
  //                     </Typography>
  //                     <Typography variant="body2" gutterBottom>
  //                       xxxxx xxxxx
  //                     </Typography>
  //                   </Grid>
  //                 </Grid>
  //               </Grid>
  //           </div>
  //         ))}
  //       </Grid>
        
       
  //     </Paper>
  //   </div>











// return (
//   <div className="paper-root">
//     <Paper className="paper-rift-champions">
     
//       <Grid container spacing={2} >
//         {Object.keys(champions).map((key) => (
//           <div className="rift-champion-container" style={{backgroundImage: `url("http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champions[key].id}_0.jpg")`}}> 
//             <Grid item > 
//                 <ButtonBase className="rift-champion-button" >
//                 <img className="champ-img" alt="complex" src={`http://ddragon.leagueoflegends.com/cdn/10.22.1/img/champion/${champions[key].id}.png`} />
//                 {/* <img className={classes.img} alt="complex" src="/static/images/grid/complex.jpg" /> */}
//               </ButtonBase>
//             </Grid>
//             <Grid item xs={12} sm container>
//               <Grid item xs container direction="column" spacing={2}>
//                 <Grid item xs>
//                   <Typography gutterBottom variant="subtitle1">
//                     Standard license
//                   </Typography>
//                   <Typography variant="body2" gutterBottom>
//                     Full resolution 1920x1080 • JPEG
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     ID: 1030114
//                   </Typography>
//                 </Grid>
//                 <Grid item>
//                   <Typography variant="body2" style={{ cursor: 'pointer' }}>
//                     Remove
//                   </Typography>
//                 </Grid>
//               </Grid>
//               <Grid item>
//                 <Typography variant="subtitle1">$19.00</Typography>
//               </Grid>
//             </Grid>
//           </div>
     
//            ))}
//       </Grid>
      
     
//     </Paper>
//   </div>
// )







































  // return (
  //   <div className="champ-list-root">
  //     <GridList className="champ-list-grid-list">
  //       <GridListTile key="Subheader" cols={5} style={{ height: 'auto' }}>
  //         <ListSubheader component="div">December</ListSubheader>
  //       </GridListTile>
  //       {Object.keys(champions).map((key) => (
       
  //         <GridListTile key={champions[key].key}>
  //           <img src={`http://ddragon.leagueoflegends.com/cdn/10.22.1/img/champion/${champions[key].id}.png`} alt={champions[key].id} />
  //           <GridListTileBar
  //             title={champions[key].id}
  //             subtitle={<span>Roles: temp</span>}
  //             actionIcon={
  //               <IconButton aria-label={`info about ${champions[key].id}`}>
  //                 <InfoIcon />
  //               </IconButton>
  //             }
  //           />
  //         </GridListTile>
  //       ))}
  //     </GridList>
  //   </div>
  // );






































  // return (
  //   <div>
  //     <Grid container className={classes.root} spacing={2}>
  //       <Grid item xs={12}>
  //         <Grid container justify="center" spacing={spacing}>
  //           {Object.keys(champions).map((key) => (
  //             <Grid key={champions[key].key} item>
  //               <Paper className={classes.paper} >
  //                 <img alt={champions[key].id} src={champions[key].image.path}/>
  //               </Paper>
  //             </Grid>
  //           ))}
  //         </Grid>
  //       </Grid>
  //       <Grid item xs={12}>
  //         <Paper className={classes.control}>
  //           <Grid container>
  //             <Grid item>
  //               <FormLabel>spacing</FormLabel>
  //               <RadioGroup
  //                 name="spacing"
  //                 aria-label="spacing"
  //                 value={spacing.toString()}
  //                 onChange={handleChange}
  //                 row
  //               >
  //                 {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
  //                   <FormControlLabel
  //                     key={value}
  //                     value={value.toString()}
  //                     control={<Radio />}
  //                     label={value.toString()}
  //                   />
  //                 ))}
  //               </RadioGroup>
  //             </Grid>
  //           </Grid>
  //         </Paper>
  //       </Grid>
  //     </Grid>
  //   </div>
  // );
}

function mapStateToProps({ riftChampions }: any) {
    return {
      riftChampions,
    };
  }

export default connect(mapStateToProps, {
  requestRiftChampions
})(RiftChampions);
