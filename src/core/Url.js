import config from "../config";

const protocol = "http";

const Urls = {
  Token: `${protocol}://${config.hostName}:${config.apiPort}/api/connect/token`,
  SignOut: `${protocol}://${config.hostName}:${config.apiPort}/api/account/signout`,
  GetDefaultBranch: `${protocol}://${config.hostName}:${config.apiPort}/api/${config.apiVersioning}/branch/${config.defaultBranch}`,
  GetCategories: `${protocol}://${config.hostName}:${config.apiPort}/api/${config.apiVersioning}/category`,
  GetCustomers: `${protocol}://${config.hostName}:${config.apiPort}/api/${config.apiVersioning}/customer?branchId=${config.defaultBranch}`,
  PutCustomer: `${protocol}://${config.hostName}:${config.apiPort}/api/${config.apiVersioning}/customer`,
  GetProducts: `${protocol}://${config.hostName}:${config.apiPort}/api/${config.apiVersioning}/product?branchId=${config.defaultBranch}`,
  GetSupplierSelection: `${protocol}://${config.hostName}:${config.apiPort}/api/${config.apiVersioning}/supplier/all?branchId=${config.defaultBranch}`,
  PutProduct: `${protocol}://${config.hostName}:${config.apiPort}/api/${config.apiVersioning}/product`,
  GetSuppliers: `${protocol}://${config.hostName}:${config.apiPort}/api/${config.apiVersioning}/supplier`,
  PutSupplier: `${protocol}://${config.hostName}:${config.apiPort}/api/${config.apiVersioning}/supplier`,
  PostSupplier: `${protocol}://${config.hostName}:${config.apiPort}/api/${config.apiVersioning}/supplier`
};

export default Urls;
