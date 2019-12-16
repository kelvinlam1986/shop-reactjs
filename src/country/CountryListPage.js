import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import config from "../config"
import _ from "lodash";
import {
    getCountriesAction,
    setLoadingCountry,
    resetCurrentCountry,
    loadCurrentCountry,
    resetNewCountry
} from "./country-action-creator"
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";
import CountryEdit from "./CountryEdit";
import auth from "../auth/auth-helper";
import { putCountry, postCountry } from "./country-api";
import Alert from "react-s-alert";
import { reset } from "redux-form"
import { redirectToLoginAction } from "../core/core-action-creator";
import CountryAdd from "./CountryAdd";

class CountryListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            params: {
                page: 0,
                pageSize: config.pageSize,
                keyword: ""
            },
            title: "Thông tin chi tiết",
            isShowModal: false,
            isShowModalAdd: false,
            titleAdd: "Thêm mới quốc gia",
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

    onChangeSearch = e => {
        e.persist();
        this.props.setLoading(true);
        this.delayedCallback(e);
    };

    onClickSearch = e => {
        this.getCountries();
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

    handleClose = e => {
        const { resetEditPage, resetCurrentCountry } = this.props;
        resetEditPage();
        resetCurrentCountry();
        this.setState({ isShowModal: false });
    }

    showDetail = index => {
        this.handleShow(index);
    };

    handleShow = index => {
        const currentCountry = this.props.countries[index];
        this.setState({
            isShowModal: true,
            title: `Thông tin chi tiết: ${currentCountry.code} ${currentCountry.name}`
        }, () => {
            this.props.load(this.props.countries[index]);
        })
    };

    updateCountry = values => {
        const {
            resetEditPage,
            resetCurrentCountry,
            redirectLoginPage
        } = this.props;

        this.setState({ isShowModal: false });
        const jwt = auth.isAuthenticated();
        putCountry(
            jwt,
            {
                code: values.code,
                name: values.name,
            }
        )
            .then(
                result => {
                    resetEditPage();
                    resetCurrentCountry();
                    Alert.success("Lưu quốc gia thành công");
                    this.getCountries();
                },
                error => {
                    if (error.errorCode) {
                        Alert.error(error.errorMessage);
                        if (error.errorCode === "401") {
                            redirectLoginPage();
                        }
                    } else {
                        redirectLoginPage();
                        Alert.error("Không thể kết nối đến server.");
                    }
                }
            )
            .catch(err => {
                redirectLoginPage();
                Alert.error("Không thể kết nối đến server.");
            });
    }

    handleShowAdd = () => {
        this.setState({
            isShowModalAdd: true,
        });
    }

    handleCloseAdd = e => {
        const { resetAddPage, resetNewCountry } = this.props;
        resetAddPage();
        resetNewCountry();
        this.setState({ isShowModalAdd: false });
    };

    addCountry = values => {
        const {
            resetAddPage,
            resetNewCountry,
            redirectLoginPage
        } = this.props;

        this.setState({ isShowModalAdd: false });
        const jwt = auth.isAuthenticated();
        postCountry(
            jwt,
            {
                code: values.code,
                name: values.name,
            }
        )
            .then(
                result => {
                    resetAddPage();
                    resetNewCountry();
                    Alert.success("Lưu quốc gia thành công");
                    this.getCountries();
                },
                error => {
                    if (error.errorCode) {
                        Alert.error(error.errorMessage);
                        if (error.errorCode === "401") {
                            redirectLoginPage();
                        }
                    } else {
                        redirectLoginPage();
                        Alert.error("Không thể kết nối đến server.");
                    }
                }
            )
            .catch(err => {
                redirectLoginPage();
                Alert.error("Không thể kết nối đến server.");
            });
    }

    render() {
        const { isShowModal, title, isShowModalAdd, titleAdd } = this.state
        const {
            countries,
            loading,
            redirectToLogin,
            totalPages,
            page,
            pristine,
            submitting,
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
                            className="btn btn-md btn-primary"
                            onClick={this.handleShowAdd}>Thêm mới</button>
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
                                                onChange={this.onChangeSearch}
                                            />
                                            <div className="input-group-btn">
                                                <button
                                                    type="submit"
                                                    className="btn btn-default"
                                                    onClick={this.onClickSearch}
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
                                                                    onClick={() => this.showDetail(index)}
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
                <CountryAdd
                    isShowModal={isShowModalAdd}
                    handleClose={this.handleCloseAdd}
                    title={titleAdd}
                    addCountry={this.addCountry}
                    pristine={pristine}
                    submitting={submitting}
                />
                <CountryEdit
                    isShowModal={isShowModal}
                    handleClose={this.handleClose}
                    title={title}
                    updateCountry={this.updateCountry}
                    pristine={pristine}
                    submitting={submitting}
                />
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
        page,

    };
}

const mapDispatchToProps = dispatch => {
    return {
        getCountries: params => dispatch(getCountriesAction(params)),
        setLoading: isLoading => dispatch(setLoadingCountry(isLoading)),
        resetCurrentCountry: () => dispatch(resetCurrentCountry()),
        resetEditPage: () => dispatch(reset("CountryEditPage")),
        redirectLoginPage: () => dispatch(redirectToLoginAction()),
        load: data => dispatch(loadCurrentCountry(data)),
        resetAddPage: () => dispatch(reset("CountryAddPage")),
        resetNewCountry: () => dispatch(resetNewCountry()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CountryListPage);