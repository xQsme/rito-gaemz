import React from "react";
import { connect } from "react-redux";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import SearchIcon from "@material-ui/icons/Search";
import { requestSummoners } from "../../actions";
import toast from "../../utils/toast";
import ErrorLoader from "./errorLoader";
import { SearchReducer } from "../../interfaces";

interface SearchProps {
  requestSummoners:(option: number, search:string)=>Promise<string>;
  children: any,
  search: SearchReducer,
}

function Search(props:SearchProps) {
  const { error, requesting } = props.search;
  const [search, setSearch] = React.useState<string>("");
  const [option, setOption] = React.useState<number>(0);
  
  const handleSearchSubmit = (evt:React.KeyboardEvent<HTMLInputElement>):void => {
    if (evt.key === 'Enter') {
      submitSearch();
    }
  }

  const submitSearch = async () => {
    const result:string = await props.requestSummoners(option, search);
    if (result) {
      toast(result);
    }
  }

  return (
    <>
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
      <ErrorLoader
        error={error}
        loader={requesting}
        request={() => submitSearch()}
      >
        {props.children}
      </ErrorLoader>
    </>
  );
}

function mapStateToProps({ search }: any) {
  return {
    search,
  };
}

export default connect(mapStateToProps, {
  requestSummoners,
})(Search);
