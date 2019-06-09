const protocol = "http";
const hostname = "localhost";
const port = 5000;

const Urls = {
  Token: `${protocol}://${hostname}:${port}/api/connect/token`,
  SignOut: `${protocol}://${hostname}:${port}/api/account/signout`
};

export default Urls;
