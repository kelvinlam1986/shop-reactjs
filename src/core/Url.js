import config from "../config";

const protocol = "http";

const Urls = {
  Token: `${protocol}://${config.hostName}:${config.apiPort}/api/connect/token`,
  SignOut: `${protocol}://${config.hostName}:${
    config.apiPort
  }/api/account/signout`,
  GetDefaultBranch: `${protocol}://${config.hostName}:${config.apiPort}/api/${
    config.apiVersioning
  }/branch/${config.defaultBranch}`
};

export default Urls;
