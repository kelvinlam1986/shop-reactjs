import React, { Component } from "react";
import { Link } from "react-router-dom";

class SupplierListPage extends Component {
    render() {
        return (
            <React.Fragment>
                <section className="content-header">
                    <h1>
                        <Link to="/" className="btn btn-md btn-info">
                            Quay về
                        </Link>
                        {" "}
                        <button type="button" className="btn btn-md btn-primary">Thêm mới</button>
                    </h1>
                    <ol className="breadcrumb">
                        <li>
                            <Link to="/">
                                <i className="fa fa-dashboard" /> Trang chủ
                            </Link>
                        </li>
                        <li className="active">Nhà cung cấp</li>
                    </ol>
                </section>
                <section className="content">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box box-primary">
                                <div className="box-header">
                                    <h3 className="box-title">Danh sách nhà cung cấp</h3>
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
                                        className="table table-bordered table-striped"
                                    >
                                        <thead>
                                            <tr>
                                                <th>STT #</th>
                                                <th>Tên nhà cung cấp</th>
                                                <th>Địa chỉ</th>
                                                <th>Liên hệ #</th>
                                                <th>Hoạt động</th>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>Minh Hằng</td>
                                                <td>243 Trần Hưng Đạo Q1 TP.HCM</td>
                                                <td>098675678</td>
                                                <td>
                                                    <span
                                                        style={{ color: "#fff", cursor: "pointer" }}
                                                        className="small-box-footer"
                                                    >
                                                        <i className="glyphicon glyphicon-edit text-blue" />
                                                    </span>
                                                </td>
                                            </tr>
                                        </thead>
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

export default SupplierListPage;