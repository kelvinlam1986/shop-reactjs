import React, { Component } from "react";
import { Route } from "react-router-dom";
import Home from "./core/Home";
import CategoryListPage from "./category/CategoryListPage";
import CustomerListPage from "./customer/CustomerListPage";
import ProductListPage from "./product/ProductListPage";
import SupplierListPage from "./supplier/SupplierListPage";
import PurchaseListPage from "./purchase/PurchaseListPage";
import PrivateRoute from "./core/PrivateRoute";
import BankListPage from "./bank/BankListPage";
import CountryListPage from "./country/CountryListPage";
import { SignInForm } from "./auth/SignIn";

export default class MainRouter extends Component {
  render() {
    return (
      <React.Fragment>
        <PrivateRoute exact path="/categories" component={CategoryListPage} />
        <PrivateRoute exact path="/customers" component={CustomerListPage} />
        <PrivateRoute exact path="/products" component={ProductListPage} />
        <PrivateRoute exact path="/suppliers" component={SupplierListPage} />
        <PrivateRoute exact path="/purchase" component={PurchaseListPage} />
        <PrivateRoute exact path="/banks" component={BankListPage} />
        <PrivateRoute exact path="/countries" component={CountryListPage} />
        <PrivateRoute exact path="/" component={Home} />
        <Route path="/signin" component={props => <SignInForm {...props} />} />
      </React.Fragment>
    );
  }
}
