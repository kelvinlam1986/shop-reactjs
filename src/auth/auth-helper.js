const auth = {
  authenticate(jwt, username) {
    if (typeof window != "undefined") {
      sessionStorage.setItem("jwt", JSON.stringify(jwt));
      sessionStorage.setItem("username", username);
    }
  },

  getUserNameFromCache() {
    if (sessionStorage.getItem("username")) {
      return sessionStorage.getItem("username");
    } else {
      return "";
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
