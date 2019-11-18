import config from "../config";

const protocol = "http";

const Urls = {
  Token: `${protocol}://${config.hostName}:${config.apiPort}/api/connect/token`,
  SignOut: `${protocol}://${config.hostName}:${config.apiPort}/api/account/signout`,
  GetDefaultBranch: `${protocol}://${config.hostName}:${config.apiPort}/api/${config.apiVersioning}/branch/${config.defaultBranch}`,
  GetCategories: `${protocol}://${config.hostName}:${config.apiPort}/api/${config.apiVersioning}/category`,
  GetCustomers: `${protocol}://${config.hostName}:${config.apiPort}/api/${config.apiVersioning}/customer?branchId=${config.defaultBranch}`,
  PutCustomer: `${protocol}://${config.hostName}:${config.apiPort}/api/${config.apiVersioning}/customer`,
  GetProducts: `${protocol}://${config.hostName}:${config.apiPort}/api/${config.apiVersioning}/product?branchId=${config.defaultBranch}`
};

export default Urls;
