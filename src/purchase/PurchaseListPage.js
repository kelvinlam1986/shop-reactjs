import React, { Component } from "react";
import { Link } from "react-router-dom";

class PurchaseListPage extends Component {
    render() {
        return (
            <React.Fragment>
                <section className="content-header">
                    <h1>
                        <Link to="/" className="btn btn-md btn-info">
                            Quay về
                        </Link>
                        {" "}
                        <button type="button"
                            className="btn btn-md btn-primary">Thêm mới</button>
                    </h1>
                    <ol className="breadcrumb">
                        <li>
                            <Link to="/">
                                <i className="fa fa-dashboard" /> Trang chủ
                            </Link>
                        </li>
                        <li className="active">Danh sách hóa đơn mua hàng</li>
                    </ol>
                </section>
                <section className="content">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box box-primary">
                                <div className="box-header">
                                    <h3 className="box-title">Danh sách hóa đơn mua hàng</h3>
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
                                                <button
                                                    type="submit"
                                                    className="btn btn-default"
                                                >
                                                    <i className="fa fa-search"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="box-body">
                                    <table
                                        id="example1"
                                        className="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>Chấp thuận</th>
                                                <th>Trạng thái</th>
                                                <th>Mã HD</th>
                                                <th>Ngày lập</th>
                                                <th>Nhà cung cấp</th>
                                                <th>Loại tiền</th>
                                                <th>Người tạo</th>
                                                <th>Tỷ giá</th>
                                                <th>Tổng tiền</th>
                                                <th>Ghi chú</th>
                                                <th>Hoạt động</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td>PIV001</td>
                                                <td>2019-11-28</td>
                                                <td>Đan Trường</td>
                                                <td>VND</td>
                                                <td>admin</td>
                                                <td>1</td>
                                                <td>165.000</td>
                                                <td>Nhập hàng</td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        )
    }
}

export default PurchaseListPage;