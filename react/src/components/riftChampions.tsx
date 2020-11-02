import React from 'react'
import { connect } from "react-redux";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';


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
  console.log(champions);
  return (
    <div>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={spacing}>
            {Object.keys(champions).map((key) => (
              <Grid key={champions[key].key} item>
                <Paper className={classes.paper} >
                  <img alt={champions[key].id} src={champions[key].image.path}/>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.control}>
            <Grid container>
              <Grid item>
                <FormLabel>spacing</FormLabel>
                <RadioGroup
                  name="spacing"
                  aria-label="spacing"
                  value={spacing.toString()}
                  onChange={handleChange}
                  row
                >
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                    <FormControlLabel
                      key={value}
                      value={value.toString()}
                      control={<Radio />}
                      label={value.toString()}
                    />
                  ))}
                </RadioGroup>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
  
// function RiftChampions() {
//     return (
//         <div>
//             <h1>Rift Insights</h1>
//         </div>
//     )
// }



function mapStateToProps({ riftChampions }: any) {
    return {
      riftChampions,
    };
  }
  
  export default connect(mapStateToProps, {
    requestRiftChampions
  })(RiftChampions);
  