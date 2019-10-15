import React, { Component } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

class ProductListPage extends Component {
  render() {
    const { loading } = this.props;
    return (
      <React.Fragment>
        {loading && <Loading />}
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
            <li className="active">Hàng hoá</li>
          </ol>
        </section>
        <section className="content">
          <div className="row">
            <div className="col-xs-12">
              <div className="box box-primary">
                <div className="box-header">
                  <h3 className="box-title">Danh sách hàng hoá</h3>
                  <div className="box-tools">
                    <div
                      className="input-group input-group-sm hidden-xs"
                      style={{ width: "200px" }}
                    >
                      <input
                        type="text"
                        name="table_search"
                        className="form-control pull-right"
                        placeholder="Tìm kiếm"
                      />
                      <div className="input-group-btn">
                        <button type="submit" className="btn btn-default">
                          <i className="fa fa-search"></i>
                        </button>
                      </div>
                    </div>
                  </div>
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
                        <th>Mã SP</th>
                        <th>Tên</th>
                        <th>Mô tả</th>
                        <th>Nhà cung cấp</th>
                        <th>SL</th>
                        <th>Giá</th>
                        <th>Loại</th>
                        <th>Reorder</th>
                        <th>Hoạt động</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td></td>
                        <td>SP0001</td>
                        <td>San pham 1</td>
                        <td>San pham danh cho gia dinh</td>
                        <td>Minh Lam</td>
                        <td>1</td>
                        <td>100.000</td>
                        <td>Quan Ao</td>
                        <td>true</td>
                        <td>
                          <span
                            style={{ color: "#fff", cursor: "pointer" }}
                            className="small-box-footer"
                          >
                            <i className="glyphicon glyphicon-edit text-blue" />
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default ProductListPage;
