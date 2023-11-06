import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { Box } from "@mui/material";
import sortings from "../assets/Sortings";
import { recoilSortBy } from "../recoil/atoms";
import { useRecoilState } from "recoil";

// type sortingBoxProps = {
//   updateSort: React.Dispatch<React.SetStateAction<string>>;
//   sortBy: string;
// };

export default function SortingBox() {
  const [sortBy] = useRecoilState(recoilSortBy);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  console.log(sortBy);

  function updateSortBy(sort: string) {
    console.log(sort + " is clicked");
    sessionStorage.setItem("sortBy", JSON.stringify(sort));
  }

  return (
    <Box>
      <h2>Sortings</h2>
      <Button
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Sorting
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {sortings.map((sorting) => (
          <MenuItem
            key={sorting[1]}
            value={sorting[1]}
            onClick={() => {
              handleClose;
              updateSortBy(sorting[1]);
            }}
            style={{
              backgroundColor: sortBy === sorting[1] ? "lightblue" : "white",
            }}
          >
            {sorting[0]}
          </MenuItem>
        ))}

        <MenuItem
          onClick={() => {
            handleClose;
            updateSortBy("");
          }}
        >
          Reset
        </MenuItem>
      </Menu>
    </Box>
  );
}
