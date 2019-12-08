import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getBanksAction, setLoadingBank } from "./bank-action-creator"
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";
import config from "../config";

class BankListPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            params: {
                page: 0,
                pageSize: config.pageSize,
                keyword: ""
            }
        }
    }

    componentDidMount = () => {
        this.getBanks();
    }

    getBanks = () => {
        this.props.getBanks(this.state.params);
    };

    render() {
        const {
            banks,
            loading,
            redirectToLogin,
            totalPages,
            page
        } = this.props;

        const from = { pathname: "/signin" };
        if (redirectToLogin) {
            return <Redirect to={from} />;
        }

        return (
            <React.Fragment>
                {loading && <Loading delay={0} />}
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
                        <li className="active">Ngân hàng</li>
                    </ol>
                </section>
                <section className="content">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box box-primary">
                                <div className="box-header">
                                    <h3 className="box-title">Danh sách ngân hàng</h3>
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
                                                <th>Mã</th>
                                                <th>Tên</th>
                                                <th>Địa chỉ`</th>
                                                <th>Hoạt động</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                banks &&
                                                banks.length > 0 &&
                                                banks.map((bank, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{bank.code}</td>
                                                            <td>{bank.name}</td>
                                                            <td>{bank.address}</td>
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
    const { loading, banks, totalPages, page } = state.bank;
    const { redirectToLogin } = state.core;
    return {
        loading,
        banks,
        redirectToLogin,
        totalPages,
        page
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getBanks: params => dispatch(getBanksAction(params)),
        setLoading: isLoading => dispatch(setLoadingBank(isLoading))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BankListPage);