import React, { Component } from "react";
import Alert from "react-s-alert";
import { Redirect } from "react-router-dom";
import { getBranchDefault } from "./core-api";
import auth from "../auth/auth-helper";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      branchAdress: null,
      branchContact: null,
      redirectToLogin: false
    };
  }

  componentDidMount() {
    const jwt = auth.isAuthenticated();
    getBranchDefault(jwt)
      .then(data => {
        if (data.errorCode === "404") {
          Alert.error("Không tìm thấy Chủ shop nào phù hợp.");
          auth.signout(() => {
            this.setState({ redirectToLogin: true });
          });
        } else {
          this.setState({
            branchAdress: data.address,
            branchContact: data.contact
          });
        }
      })
      .catch(e => {
        Alert.error("Không thể kết nối server !");
        auth.signout(() => {
          this.setState({ redirectToLogin: true });
        });
      });
  }
  render() {
    const { branchAdress, branchContact, redirectToLogin } = this.state;
    const from = { pathname: "/signin" };
    if (redirectToLogin) {
      return <Redirect to={from} />;
    }
    return (
      <section className="content">
        <div className="row">
          <div className="col-md-8">
            <div className="box box-primary">
              <div className="box-header with-border">
                <h3 className="box-title">Giao dịch</h3>
              </div>
              <div className="box-body">
                <div className="row">
                  <div className="col-lg-4 col-xs-6">
                    <div className="small-box bg-green">
                      <div className="inner">
                        <h3>Bán hàng</h3>
                        <p>Tạo mới</p>
                      </div>
                      <div className="icon" style={{ marginTop: "10px" }}>
                        <i className="glyphicon glyphicon-user" />
                      </div>
                      <a
                        className="small-box-footer"
                        href="/SalesTransaction/AddNew"
                      >
                        Thực hiện <i className="fa fa-arrow-circle-right" />
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-4 col-xs-6">
                    <div className="small-box bg-red">
                      <div className="inner">
                        <h3>Kho hàng</h3>
                        <p>Sản phẩm</p>
                      </div>
                      <div className="icon" style={{ marginTop: "10px" }}>
                        <i className="glyphicon glyphicon-share-alt" />
                      </div>
                      <a href="stockin.php" className="small-box-footer">
                        Xem chi tiết <i className="fa fa-arrow-circle-right" />
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-4 col-xs-6">
                    <div className="small-box bg-yellow">
                      <div className="inner">
                        <h3>Thanh toán</h3>
                        <p>Khách hàng</p>
                      </div>
                      <div className="icon" style={{ marginTop: "10px" }}>
                        <i className="glyphicon glyphicon-usd" />
                      </div>
                      <a href="customer.php" className="small-box-footer">
                        Xem chi tiết <i className="fa fa-arrow-circle-right" />
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-4 col-xs-6">
                    <div className="small-box bg-red">
                      <div className="inner">
                        <h3>Tín dụng</h3>
                        <p>Ứng dụng</p>
                      </div>
                      <div className="icon" style={{ marginTop: "10px" }}>
                        <i className="glyphicon glyphicon-user" />
                      </div>
                      <a href="creditor.php" className="small-box-footer">
                        Xem chi tiết <i className="fa fa-arrow-circle-right" />
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-4 col-xs-6">
                    <div className="small-box bg-orange">
                      <div className="inner">
                        <h3>Sản phẩm</h3>
                        <p>Xem/Thêm</p>
                      </div>
                      <div className="icon" style={{ marginTop: "10px" }}>
                        <i className="glyphicon glyphicon-shopping-cart" />
                      </div>
                      <a href="product.php" className="small-box-footer">
                        Xem chi tiết <i className="fa fa-arrow-circle-right" />
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-4 col-xs-6">
                    <div className="small-box bg-orange">
                      <div className="inner">
                        <h3>Khách hàng</h3>
                        <p>Khách hàng tồn tại</p>
                      </div>
                      <div className="icon" style={{ marginTop: "10px" }}>
                        <i className="glyphicon glyphicon-shopping-cart" />
                      </div>
                      <a
                        className="small-box-footer"
                        href="/SalesTransactionCredit/OldCustomer"
                      >
                        Xem chi tiết <i className="fa fa-arrow-circle-right" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="box box-primary">
              <div className="box-header with-border">
                <h3 className="box-title">Về chúng tôi</h3>
              </div>
              <div className="box-body">
                <strong>
                  <i className="glyphicon glyphicon-map-marker margin-r-5" />{" "}
                  Địa chỉ công ty
                </strong>
                <p className="text-muted">{branchAdress}</p>
                <hr />

                <strong>
                  <i className="glyphicon glyphicon-phone-alt margin-r-5" /> Số
                  điện thoại
                </strong>
                <p className="text-muted">{branchContact}</p>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
