import React from "react";
// import server from "../../constants/server";
// import League2 from "../../assets/images/league-of-legends2.png";
// import { navigate } from "@reach/router";
// import { RIFT_PROFILE_ROUTE } from "../../constants/routes";
// import { toTitleCase } from "../../utils/to_title_case";
import { setTab,requestRiftHistory } from "../../actions";
import { connect } from "react-redux";
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
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom:'unset',
      borderTop:'unset',
    },
  },
});

function formatTime(date:string) {
  return new Date(date).toLocaleDateString('pt-PT');
}
function formatKDA(kda:string) {
  return kda === null ? '👌' : parseFloat(kda).toFixed(2);
}

function processWin(win:boolean,bgColor:any){
  return win ? '#1D8348' : '#B03A2E';
}

function Row(props:any) {
  const { game } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  let bgColor;

  bgColor = processWin(game.win,bgColor);

  return (
    <React.Fragment>
      <TableRow className={classes.root} style={{ backgroundColor:bgColor}}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
            <img style={{width:"50px", height:"50px"}} src={`http://ddragon.leagueoflegends.com/cdn/10.22.1/img/champion/${game.champion}.png`} alt=""/>
        </TableCell>
        <TableCell align="center">{game.kills}/{game.deaths}/{game.assists}</TableCell>
        <TableCell align="center">{formatKDA(game.kda)}</TableCell>
        <TableCell align="center">{game.cs}</TableCell>
        <TableCell align="center">{game.queueDetails[0].map}<br/>{game.duration}    {formatTime(game.date)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Items</TableCell>
                    <TableCell>Summoners</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableCell>{game.items.map((item:any) => (
                    <img key={item} style={{width:"50px", height:"50px"}} src={`http://ddragon.leagueoflegends.com/cdn/10.22.1/img/item/${item}.png`} alt=""/>
                  ))}</TableCell>
                  <TableCell>{game.summonerDetails.map((summoner:any, i:number) => (
                    <img key={i} style={{width:"50px", height:"50px"}} src={`${summoner.image}`} alt=""/>
                  ))}</TableCell>
                </TableBody>
              </Table>
              <br/>
              <br/>
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
    <div style={{width:"50%",margin:"auto",padding:"10px"}} className="summoner-container">
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell >Champion</TableCell>
              <TableCell align="center">Score</TableCell>
              <TableCell align="center">KDA</TableCell>
              <TableCell align="center">CS</TableCell>
              <TableCell align="center">Info</TableCell>
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
