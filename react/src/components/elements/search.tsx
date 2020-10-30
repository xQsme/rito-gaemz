import React from "react";
import { connect } from "react-redux";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import SearchIcon from "@material-ui/icons/Search";
import { requestSummoners, changeSearchRegion } from "../../actions";

function Search(props:any) {
  const [search, setSearch] = React.useState<String>("");
  const [option, setOption] = React.useState<Number>(0);
  
  const handleSearchSubmit = (evt:any) => {
    if (evt.key === 'Enter') {
      submitSearch();
    }
  }

  const submitSearch = () => {
    props.requestSummoners(option, search);
  }

  return (
    <div className="search-container">
      <div className="search-bar">
        <TextField
          className="input"
          name="search"
          placeholder="Summoner Search"
          value={search}
          onChange={(evt) => setSearch(evt.target.value)}
          onKeyDown={handleSearchSubmit}
          margin="normal"
          InputProps={{
            startAdornment: (
              <SearchIcon
                onClick={submitSearch}
                className="red-icon clickable"
                color="secondary"
              />
            ),
          }}
        />
        <Select
          name="searchOption"
          value={option}
          onChange={(evt) => setOption(Number(evt.target.value))}
          className="select-normal region-dropdown"
        >
          <MenuItem value={0}>EUW</MenuItem>
          <MenuItem value={1}>NA</MenuItem>
          <MenuItem value={2}>KR</MenuItem>
        </Select>
      </div>
    </div>
  );
}

function mapStateToProps({ search }: any) {
  return {
    search,
  };
}

export default connect(mapStateToProps, {
  requestSummoners,
  changeSearchRegion,
})(Search);
