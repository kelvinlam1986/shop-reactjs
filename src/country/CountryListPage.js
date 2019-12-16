import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import config from "../config"
import _ from "lodash";
import { getCountriesAction, setLoadingCountry } from "./country-action-creator"
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";

class CountryListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            params: {
                page: 0,
                pageSize: config.pageSize,
                keyword: ""
            },
        }

        this.delayedCallback = _.debounce(this.search, 250);
    }

    componentDidMount = () => {
        this.getCountries();
    }

    getCountries = () => {
        this.props.getCountries(this.state.params);
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
                this.getCountries();
            }
        );
    };

    handlePageClick = e => {
        this.setState(
            {
                params: {
                    ...this.state.params,
                    page: e.selected
                }
            },
            () => this.getCountries()
        );
    };

    render() {
        const {
            countries,
            loading,
            redirectToLogin,
            totalPages,
            page,
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
                        <li className="active">Quốc gia</li>
                    </ol>
                </section>
                <section className="content">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box box-primary">
                                <div className="box-header">
                                    <h3 className="box-title">Danh sách quốc gia</h3>
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
                                                <th>Hoạt động</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                countries &&
                                                countries.length > 0 &&
                                                countries.map((country, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{country.code}</td>
                                                            <td>{country.name}</td>
                                                            <td>
                                                                <span
                                                                    style={{ color: "#fff", cursor: "pointer" }}
                                                                    className="small-box-footer"
                                                                >
                                                                    <i className="glyphicon glyphicon-edit text-blue" />
                                                                </span>
                                                                {" "}
                                                                <span
                                                                    style={{ color: "#fff", cursor: "pointer" }}
                                                                    className="small-box-footer"
                                                                >
                                                                    <i className="glyphicon glyphicon-trash text-red" />
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
    const { loading, countries, totalPages, page } = state.country;
    const { redirectToLogin } = state.core;
    return {
        loading,
        countries,
        redirectToLogin,
        totalPages,
        page
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getCountries: params => dispatch(getCountriesAction(params)),
        setLoading: isLoading => dispatch(setLoadingCountry(isLoading)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CountryListPage);