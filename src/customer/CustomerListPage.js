import React, { Component } from "react";
import { Link } from "react-router-dom";

class CustomerListPage extends Component {
  render() {
    return (
      <React.Fragment>
        <section className="content-header">
          <h1>
            <Link to="/" className="btn btn-md btn-info">
              Quay về
            </Link>
          </h1>
          <ol className="breadcrumb">
            <li>
              <Link to="/">
                <i className="fa fa-dashboard" /> Trang chủ
              </Link>
            </li>
            <li className="active">Khách hàng</li>
          </ol>
        </section>
        <section className="content">
          <div className="row">
            <div className="col-xs-12">
              <div className="box-header">
                <h3 className="box-title">Danh sách khách hàng</h3>
              </div>
              <div className="box-body">
                <table
                  id="example1"
                  className="table table-bordered table-striped"
                >
                  <thead>
                    <tr>
                      <th>STT #</th>
                      <th>Hình</th>
                      <th>Họ và</th>
                      <th>Tên</th>
                      <th>Địa chỉ</th>
                      <th>Liên hệ #</th>
                      <th>Trạng thái</th>
                      <th>Hoạt động</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>
                        <img
                          style={{ width: "60px", height: "80px" }}
                          src=""
                          alt="image1"
                        />
                      </td>
                      <td>Lam Su</td>
                      <td>Minh</td>
                      <td>240/2 Le Thanh Ton P. Ben Thanh Q1 TPHCM</td>
                      <td>0902 305 226</td>
                      <td>
                        <span className="label label-info">active</span>
                      </td>
                      <td>
                        <a
                          href="/ghty"
                          style={{ color: "#fff" }}
                          className="small-box-footer"
                        >
                          <i className="glyphicon glyphicon-edit text-blue" />
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default CustomerListPage;
