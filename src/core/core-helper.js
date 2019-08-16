const getBranchFromCache = () => {
  if (sessionStorage.getItem("branch")) {
    return JSON.parse(sessionStorage.getItem("branch"));
  } else {
    return "";
  }
};

const setBranchToCache = branch => {
  if (typeof window != "undefined") {
    sessionStorage.setItem("branch", JSON.stringify(branch));
  }
};

export { getBranchFromCache, setBranchToCache };
