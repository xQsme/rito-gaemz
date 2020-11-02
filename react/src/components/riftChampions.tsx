import React from 'react'
import { connect } from "react-redux";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
// import FormLabel from '@material-ui/core/FormLabel';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';



import { toast } from "react-toastify";

import {requestRiftChampions} from '../actions';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
  }),
);

function RiftChampions(props: any) {
  const [spacing, setSpacing] = React.useState<GridSpacing>(2);
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpacing(Number((event.target as HTMLInputElement).value) as GridSpacing);
  };

  
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
  return (
      <div className={classes.root}>
        <Paper className={`paper-champ ${classes.paper}`}>
          {Object.keys(champions).map((key) => (
            <Grid container spacing={2}>
              <Grid item>
                <ButtonBase className={classes.image}>
                  <img className="champ-img" alt="complex" src={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champions[key].id}_0.jpg`} />
                  {/* <img className={classes.img} alt="complex" src="/static/images/grid/complex.jpg" /> */}
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography gutterBottom variant="subtitle1">
                      Standard license
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Full resolution 1920x1080 • JPEG
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      ID: 1030114
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2" style={{ cursor: 'pointer' }}>
                      Remove
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1">$19.00</Typography>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Paper>
      </div>
  )













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
