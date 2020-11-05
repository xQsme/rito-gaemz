import React from "react";
// import server from "../../constants/server";
// import League2 from "../../assets/images/league-of-legends2.png";
// import { navigate } from "@reach/router";
// import { RIFT_PROFILE_ROUTE } from "../../constants/routes";
// import { toTitleCase } from "../../utils/to_title_case";
import { setTab,requestRiftHistory } from "../../actions";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function formatTime(date:string) {
  return new Date(date).toLocaleDateString('pt-PT');
}
function formatKDA(kda:string) {
  return kda === null ? 'Perfect' : kda;
}

function Row(props:any) {
  const { game } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
            <img src={`http://ddragon.leagueoflegends.com/cdn/10.22.1/img/champion/${game.champion}.png`} alt=""/>
        </TableCell>
        <TableCell align="right">{game.kills}</TableCell>
        <TableCell align="right">{game.deaths}</TableCell>
        <TableCell align="right">{game.assists}</TableCell>
        <TableCell align="right">{formatTime(game.date)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                More Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Items</TableCell>
                    <TableCell>Summoners</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableCell>{game.items.map((item:any) => (
                    <img src={`http://ddragon.leagueoflegends.com/cdn/10.22.1/img/item/${item}.png`} alt=""/>
                  ))}</TableCell>
                  <TableCell>{game.summonerDetails.map((summoner:any) => (
                    <img src={`${summoner.image}`} alt=""/>
                  ))}</TableCell>
                </TableBody>
              </Table>
              {"\n"}
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Cs</TableCell>
                    <TableCell>Kda</TableCell>
                    <TableCell>Duration</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableCell>{game.cs}</TableCell>
                  <TableCell>{formatKDA(game.kda)}</TableCell>
                  <TableCell>{game.duration}</TableCell>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// import type { Summoner } from "../../interfaces";

interface RiftHistoryProps {
  history: any;
}

function RiftHistory(props: RiftHistoryProps) {
  const { games} = props.history;
  console.log(games);

  
  return (
    <div className="summoner-container">
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Champion</TableCell>
              <TableCell align="right">Kills</TableCell>
              <TableCell align="right">Death</TableCell>
              <TableCell align="right">Assist</TableCell>
              <TableCell align="right">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {games.map((game:any) => (
              <Row key={game.gameId} game={game} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

function mapStateToProps() {
  return {
      
  };
}

export default connect(mapStateToProps, { 
    setTab,
    requestRiftHistory,
 })(RiftHistory);
