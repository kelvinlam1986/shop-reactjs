import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import config from "../config";
import { getSuppliersAction, setLoadingSupplier } from "./supplier-action-creator";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";

import _ from "lodash";

class SupplierListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowModal: false,
            title: "Thông tin chi tiết",
            params: {
                page: 0,
                pageSize: config.pageSize,
                keyword: ""
            }
        };

        this.delayedCallback = _.debounce(this.search, 250);
    }

    componentDidMount = () => {
        this.getSuppliers();
    };

    search = e => {
        this.setState(
            {
                params: {
                    ...this.state.params,
                    page: 0,
                    pageSize: config.pageSize,
                    keyword: e.target.value
                }
            },
            () => {
                this.getSuppliers();
            }
        );
    };

    getSuppliers = () => {
        this.props.getSuppliers(this.state.params);
    };

    handlePageClick = e => {
        this.setState(
            {
                params: {
                    ...this.state.params,
                    page: e.selected
                }
            },
            () => this.getSuppliers()
        );
    };

    onSearchChange = e => {
        e.persist();
        this.props.setLoading(true);
        this.delayedCallback(e);
    };

    onSearchClick = e => {
        this.getSuppliers();
    };

    render() {
        const {
            suppliers,
            redirectToLogin,
            totalPages,
            page,
            loading
        } = this.props;

        const from = { pathname: "/signin" };
        if (redirectToLogin) {
            return <Redirect to={from} />;
        }

        return (
            <React.Fragment>
                {loading && <Loading />}
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
                                                onChange={this.onSearchChange}
                                            />

                                            <div className="input-group-btn">
                                                <button
                                                    type="submit"
                                                    className="btn btn-default"
                                                    onClick={this.onSearchClick}
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
                                        </thead>
                                        <tbody>
                                            {
                                                suppliers &&
                                                suppliers.length > 0 &&
                                                suppliers.map((supplier, index) => {
                                                    return (
                                                        <tr>
                                                            <td>{index + 1}</td>
                                                            <td>{supplier.name}</td>
                                                            <td>{supplier.address}</td>
                                                            <td>{supplier.contact}</td>
                                                            <td>
                                                                <span
                                                                    style={{ color: "#fff", cursor: "pointer" }}
                                                                    className="small-box-footer"
                                                                >
                                                                    <i className="glyphicon glyphicon-edit text-blue" />
                                                                </span>
                                                            </td>
                                                        </tr>

                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    <Pagination
                                        totalPages={totalPages}
                                        page={page}
                                        pageRangeDisplayed={2}
                                        onPageChange={this.handlePageClick}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    const { loading, suppliers, totalPages, page } = state.supplier;
    const { redirectToLogin } = state.core;
    return {
        loading,
        suppliers,
        redirectToLogin,
        totalPages,
        page
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getSuppliers: params => dispatch(getSuppliersAction(params)),
        setLoading: isLoading => dispatch(setLoadingSupplier(isLoading))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SupplierListPage);