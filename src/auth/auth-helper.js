const auth = {
  authenticate(jwt) {
    if (typeof window != "undefined") {
      sessionStorage.setItem("jwt", JSON.stringify(jwt));
    }
  },

  isAuthenticated() {
    if (typeof window == "undefined") {
      return false;
    }

    if (sessionStorage.getItem("jwt")) {
      return JSON.parse(sessionStorage.getItem("jwt"));
    } else {
      return false;
    }
  },

  signout() {
    if (typeof window != "undefined") {
      sessionStorage.removeItem("jwt");
    }
  }
};

export default auth;
