const protocol = "http";
const hostname = "localhost";
const port = 5000;
const apiVersioning = "v1";

const Urls = {
  Token: `${protocol}://${hostname}:${port}/api/connect/token`,
  SignOut: `${protocol}://${hostname}:${port}/api/account/signout`,
  GetDefaultBranch: `${protocol}://${hostname}:${port}/api/${apiVersioning}/branchs/default`
};

export default Urls;
