import "../../App.css";
import { useEffect, useState, useCallback, ChangeEvent } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import { useRecoilState, useSetRecoilState } from "recoil";
import { recoilSearch, recoilPage } from "../../recoil/atoms";

function Searchbar() {
  const [stateSearch, setStateSearch] = useRecoilState<string>(recoilSearch);
  const [search, setSearch] = useState<string>(stateSearch);
  const setPage = useSetRecoilState<number>(recoilPage);

  useEffect(() => {
    setSearch(stateSearch);
  }, [stateSearch]);

  const updateSearch = useCallback(
    (searchValue: string) => {
      setStateSearch(searchValue);
    },
    [setStateSearch],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      updateSearch(search);
    }, 600);
    return () => clearTimeout(timer);
  }, [search, updateSearch]);

  function type(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
    setPage(1);
  }

  function eraseInput() {
    setSearch("");
    setPage(1);
  }

  return (
    <TextField
      type="text"
      className="search-bar"
      value={search}
      onChange={(event: ChangeEvent<HTMLInputElement>) => type(event)}
      placeholder="type in pokemon name to search"
      fullWidth
      data-testid="search-bar"
      id="outlined"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="clear input"
              color="primary"
              onClick={() => eraseInput()}
              data-testid="clear-button"
            >
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        ),
        style: {
          minHeight: "100px",
          padding: "10px",
          color: "white",
        },
        inputProps: {
          'data-testid': 'search-bar-input',
        },
      }}
      InputLabelProps={{
        style: {
          color: "white",
        },
      }}
    />
  );
}

export default Searchbar;
