import { atom } from "recoil";

export const recoilMyTeam = atom({
  key: "myTeam", // unique ID (with respect to other atoms/selectors)
  default: getTeam() as string[], // default value (aka initial value)
});

function getTeam() {
  const team: string[] = JSON.parse(localStorage.getItem("team")!);
  if (team === null) {
    localStorage.setItem("team", JSON.stringify([]));
    return [];
  }
  return team;
}

export const recoilFilterBy = atom({
  key: "filterBy",
  default: getFilterBy() as string[],
});

function getFilterBy() {
  const filterBy: string[] = JSON.parse(sessionStorage.getItem("filterBy")!);
  if (filterBy === null) {
    sessionStorage.setItem("filterBy", JSON.stringify([]));
    return [];
  }
  return filterBy;
}

export const recoilSortBy = atom({
  key: "sortBy", // unique ID (with respect to other atoms/selectors)
  default: getSortBy() as string, // default value (aka initial value)
});

function getSortBy() {
  const sortBy: string = JSON.parse(sessionStorage.getItem("sortBy")!);
  console.log(sortBy);
  if (sortBy === null) {
    sessionStorage.setItem("sortBy", JSON.stringify("name,1"));
    return;
  }
  return sortBy;
}

export const recoilSearch = atom({
  key: "search", // unique ID (with respect to other atoms/selectors)
  default: getSearch() as string, // default value (aka initial value)
});

function getSearch() {
  const search: string = JSON.parse(sessionStorage.getItem("search")!);
  if (search === null) {
    sessionStorage.setItem("search", JSON.stringify(""));
    return;
  }
  return search;
}

export const recoilPage = atom({
  key: "page", // unique ID (with respect to other atoms/selectors)
  default: getPage() as number, // default value (aka initial value)
});

function getPage() {
  const page: number = JSON.parse(sessionStorage.getItem("page")!);
  if (page === null) {
    sessionStorage.setItem("page", JSON.stringify(1));
    return;
  }
  return page;
}
