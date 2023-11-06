import { Box, Button, Modal } from "@mui/material";
import { useState } from "react";
import FilterBox from "./components/FilterBox";
import SortingBox from "./components/SortingBox";
import { recoilFilterBy, recoilSortBy, recoilPage } from "./recoil/atoms";
import { useRecoilState } from "recoil";

const modalBoxStyles = {
  position: "absolute",
  top: "50vh",
  left: "50vw",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "#002c58",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  text: "white",
};

export default function FilterAndSortingBox() {
  const [open, setOpen] = useState(false);
  const [currentFilter, setCurrentFilter] =
    useRecoilState<string[]>(recoilFilterBy);
  const [sortBy, setSortBy] = useRecoilState<string>(recoilSortBy);
  const [page, setPage] = useRecoilState<number>(recoilPage);
  const [tempFilters, setTempFilters] = useState<string[]>(currentFilter);
  const [tempSortBy, setTempSortBy] = useState<string>(sortBy);
  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    // Reset the local state variables if the modal is closed without applying changes
    updatePage(1);
  };

  const handleResetFilter = () => {
    updateFilterBy([]);
    updateSortBy("name,1");
    handleClose();
    updatePage(1);
  };

  function updateFilterBy(filters: string[]) {
    sessionStorage.setItem("filterBy", JSON.stringify(filters));
    setCurrentFilter(tempFilters);
  }

  function updateSortBy(sort: string) {
    sessionStorage.setItem("sortBy", JSON.stringify(sort));
    setSortBy(tempSortBy);
  }

  function updatePage(pagenr: number) {
    if (page > 20) {
      throw new Error("Page number cannot be greater than 20");
    }
    sessionStorage.setItem("page", JSON.stringify(pagenr));
    setPage(pagenr);
  }

  const handleApplyFilter = () => {
    updateFilterBy(tempFilters);
    updateSortBy(tempSortBy);
    updatePage(1);
    handleClose(); // Close the modal
  };

  return (
    <div className="filter_container">
      <Button onClick={handleOpen}>Filters/Sorting</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalBoxStyles}>
          <div className="filter_sorting_inner">
            <FilterBox
              currentFilters={tempFilters}
              setCurrentFilter={setTempFilters}
            />
            <SortingBox
              currentSorting={tempSortBy}
              setCurrentSorting={setTempSortBy}
            />
          </div>
          <hr />
          <div className="apply_reset_filter">
            <Button
              style={{ backgroundColor: "green", color: "white" }}
              onClick={handleApplyFilter}
            >
              Apply
            </Button>
            <Button
              style={{
                backgroundColor: "red",
                color: "white",
              }}
              onClick={handleResetFilter}
            >
              Reset
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
