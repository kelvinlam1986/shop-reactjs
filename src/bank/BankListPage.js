import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { reset } from "redux-form";
import {
    getBanksAction,
    setLoadingBank,
    resetNewBank,
    loadCurrentBank,
    resetCurrentBank
} from "./bank-action-creator"
import { redirectToLoginAction } from "../core/core-action-creator";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";
import config from "../config";
import _ from "lodash";
import BankAdd from "./BankAdd";
import BankEdit from "./BankEdit";
import auth from "../auth/auth-helper"
import { postBank, putBank, deleteBank } from "./bank-api";
import Alert from "react-s-alert";
import ModalConfirm from "../components/ModalConfirm";

class BankListPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            params: {
                page: 0,
                pageSize: config.pageSize,
                keyword: ""
            },
            isShowModal: false,
            isShowModalAdd: false,
            titleAdd: "Thêm mới nhà cung cấp",
            title: "Thông tin chi tiết",
            bankId: null,
            isShowModalConfirm: false
        }

        this.delayedCallback = _.debounce(this.search, 250);
    }

    componentDidMount = () => {
        this.getBanks();
    }

    getBanks = () => {
        this.props.getBanks(this.state.params);
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
                this.getBanks();
            }
        );
    };

    onChangeSearch = e => {
        e.persist();
        this.props.setLoading(true);
        this.delayedCallback(e);
    };

    onClickSearch = e => {
        this.getBanks();
    };

    handlePageClick = e => {
        this.setState(
            {
                params: {
                    ...this.state.params,
                    page: e.selected
                }
            },
            () => this.getBanks()
        );
    };

    handleShowAdd = () => {
        this.setState({
            isShowModalAdd: true,
        });
    }

    addBank = values => {
        const {
            resetAddPage,
            resetNewBank,
            redirectLoginPage
        } = this.props;

        this.setState({ isShowModalAdd: false });
        const jwt = auth.isAuthenticated();
        postBank(
            jwt,
            {
                code: values.code,
                name: values.name,
                address: values.address,
            }
        )
            .then(
                result => {
                    resetAddPage();
                    resetNewBank();
                    Alert.success("Lưu ngân hàng thành công");
                    this.getBanks();
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

    handleCloseAdd = e => {
        const { resetAddPage, resetNewBank } = this.props;
        resetAddPage();
        resetNewBank();
        this.setState({ isShowModalAdd: false });
    };

    updateBank = values => {
        const {
            resetEditPage,
            resetCurrentBank,
            redirectLoginPage
        } = this.props;

        this.setState({ isShowModal: false });
        const jwt = auth.isAuthenticated();
        putBank(
            jwt,
            {
                code: values.code,
                name: values.name,
                address: values.address,
            }
        )
            .then(
                result => {
                    resetEditPage();
                    resetCurrentBank();
                    Alert.success("Lưu ngân hàng thành công");
                    this.getBanks();
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

    handleClose = e => {
        const { resetEditPage, resetCurrentBank } = this.props;
        resetEditPage();
        resetCurrentBank();
        this.setState({ isShowModal: false });
    }

    showDetail = index => {
        this.handleShow(index);
    };

    handleShow = index => {
        const currentBank = this.props.banks[index];
        this.setState({
            isShowModal: true,
            title: `Thông tin chi tiết: ${currentBank.code} ${currentBank.name}`
        }, () => {
            this.props.load(this.props.banks[index]);
        })
    };


    toggleModalConfirm = () => {
        this.setState(prevState => ({
            isShowModalConfirm: !prevState.isShowModalConfirm
        }))
    }

    showConfirmDelete = itemId => {
        this.setState(
            {
                bankId: itemId
            },
            () => this.toggleModalConfirm()
        )
    }

    delete = () => {
        const { redirectLoginPage } = this.props;
        const jwt = auth.isAuthenticated();
        deleteBank(jwt, {
            code: this.state.bankId,
        }).then(result => {
            this.setState({ bankeId: null });
            this.getBanks();
            this.toggleModalConfirm();
            Alert.success("Xóa ngân hàng thành công");
        }, error => {
            if (error.errorCode) {
                Alert.error(error.errorMessage);
                if (error.errorCode === "401") {
                    redirectLoginPage();
                }
            } else {
                redirectLoginPage();
                Alert.error("Không thể kết nối đến server.");
            }
        }).catch(err => {
            redirectLoginPage();
            Alert.error("Không thể kết nối đến server.");
        })
    }


    render() {
        const { isShowModalAdd, titleAdd, isShowModal, title, isShowModalConfirm } = this.state;
        const {
            banks,
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
                                                                    onClick={() => this.showDetail(index)}
                                                                >
                                                                    <i className="glyphicon glyphicon-edit text-blue" />
                                                                </span>
                                                                {" "}
                                                                <span
                                                                    style={{ color: "#fff", cursor: "pointer" }}
                                                                    className="small-box-footer"
                                                                    onClick={() => this.showConfirmDelete(bank.code)}
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
                <BankAdd
                    isShowModal={isShowModalAdd}
                    handleClose={this.handleCloseAdd}
                    title={titleAdd}
                    addBank={this.addBank}
                    pristine={pristine}
                    submitting={submitting}
                />
                <BankEdit
                    isShowModal={isShowModal}
                    handleClose={this.handleClose}
                    title={title}
                    updateBank={this.updateBank}
                    pristine={pristine}
                    submitting={submitting}
                />
                <ModalConfirm
                    isShowModal={isShowModalConfirm}
                    handleClose={this.toggleModalConfirm}
                    clickOk={this.delete}
                />
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
        setLoading: isLoading => dispatch(setLoadingBank(isLoading)),
        resetAddPage: () => dispatch(reset("BankAddPage")),
        resetNewBank: () => dispatch(resetNewBank()),
        load: data => dispatch(loadCurrentBank(data)),
        resetCurrentBank: () => dispatch(resetCurrentBank()),
        resetEditPage: () => dispatch(reset("BankEditPage")),
        redirectLoginPage: () => dispatch(redirectToLoginAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BankListPage);