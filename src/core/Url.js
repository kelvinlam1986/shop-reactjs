import config from "../config";

const protocol = "http";

const Urls = {
  Token: `${protocol}://${config.hostName}:${config.apiPort}/api/connect/token`,
  SignOut: `${protocol}://${config.hostName}:${config.apiPort}/api/account/signout`,
  GetDefaultBranch: `${protocol}://${config.hostName}:${config.apiPort}/api/${config.apiVersioning}/branch/${config.defaultBranch}`,
  GetCategories: `${protocol}://${config.hostName}:${config.apiPort}/api/${config.apiVersioning}/category`,
  GetCustomers: `${protocol}://${config.hostName}:${config.apiPort}/api/${config.apiVersioning}/customer`,
  PutCustomer: `${protocol}://${config.hostName}:${config.apiPort}/api/${config.apiVersioning}/customer`,
  GetProducts: `${protocol}://${config.hostName}:${config.apiPort}/api/${config.apiVersioning}/product`,
  GetSupplierSelection: `${protocol}://${config.hostName}:${config.apiPort}/api/${config.apiVersioning}/supplier/all?branchId=${config.defaultBranch}`,
  PutProduct: `${protocol}://${config.hostName}:${config.apiPort}/api/${config.apiVersioning}/product`,
  GetSuppliers: `${protocol}://${config.hostName}:${config.apiPort}/api/${config.apiVersioning}/supplier`,
  PutSupplier: `${protocol}://${config.hostName}:${config.apiPort}/api/${config.apiVersioning}/supplier`,
  PostSupplier: `${protocol}://${config.hostName}:${config.apiPort}/api/${config.apiVersioning}/supplier`,
  GetPurchaseInvoicesSelection: `${protocol}://${config.hostName}:${config.apiPort}/api/${config.apiVersioning}/purchaseInvoice/all?branchId=${config.defaultBranch}`,
  GetBanks: `${protocol}://${config.hostName}:${config.apiPort}/api/${config.apiVersioning}/bank`,
  PostBank: `${protocol}://${config.hostName}:${config.apiPort}/api/${config.apiVersioning}/bank`,
  PutBank: `${protocol}://${config.hostName}:${config.apiPort}/api/${config.apiVersioning}/bank`,
};

export default Urls;
