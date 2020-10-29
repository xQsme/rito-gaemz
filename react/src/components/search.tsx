import React from "react";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import SearchIcon from '@material-ui/icons/Search';

export default function Search() {
  const [search, setSearch] = React.useState<String>("");
  const [option, setOption] = React.useState<Number>(0);
  return (
    <div className="search-container">
      <div className="search-bar">
        <TextField
          className="input"
          name="search"
          placeholder="Summoner Search"
          value={search}
          onChange={(evt) => setSearch(evt.target.value)}
          // onKeyDown={this.handleSearchSubmit}
          margin="normal"
          InputProps={{
            startAdornment: (
              <SearchIcon
                // onClick={() => this.search()}
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
