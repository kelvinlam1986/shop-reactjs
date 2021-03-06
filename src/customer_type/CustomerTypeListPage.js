import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { reset } from "redux-form";
import config from "../config";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";
import _ from "lodash";
import {
    getCustomerTypesAction,
    setLoadingCustomerType,
    resetNewCustomerType,
    loadCurrentCustomerType,
    resetCurrentCustomerType
} from "./customerType-action-creator"
import auth from "../auth/auth-helper"

import { redirectToLoginAction } from "../core/core-action-creator";
import CustomerTypeAdd from "./CustomerTypeAdd";
import CustomerTypeEdit from "./CustomerTypeEdit";
import { postCustomerType, putCustomerType, deleteCustomerType } from "./customerType-api";
import Alert from "react-s-alert";
import ModalConfirm from "../components/ModalConfirm";

class CustomerTypeListPage extends Component {

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
            titleAdd: "Thêm mới loại khách hàng",
            title: "Thông tin chi tiết",
            customerTypeId: null,
            isShowModalConfirm: false
        }

        this.delayedCallback = _.debounce(this.search, 250);
    }

    componentDidMount = () => {
        this.getCustomerTypes();
    }

    getCustomerTypes = () => {
        this.props.getCustomerTypes(this.state.params);
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
                this.getCustomerTypes();
            }
        );
    };

    
    onChangeSearch = e => {
        e.persist();
        this.props.setLoading(true);
        this.delayedCallback(e);
    };

    onClickSearch = e => {
        this.getCustomerTypes();
    };

    handleShowAdd = () => {
        this.setState({
            isShowModalAdd: true,
        });
    }

    handleCloseAdd = e => {
        const { resetAddPage, resetNewCustomerType } = this.props;
        resetAddPage();
        resetNewCustomerType();
        this.setState({ isShowModalAdd: false });
    };

    addCustomerType = values => {
        const {
            resetAddPage,
            resetNewCustomerType,
            redirectLoginPage
        } = this.props;

        this.setState({ isShowModalAdd: false });
        const jwt = auth.isAuthenticated();
        postCustomerType(
            jwt,
            {
                code: values.code,
                name: values.name
            }
        )
            .then(
                result => {
                    resetAddPage();
                    resetNewCustomerType();
                    Alert.success("Lưu loại khách hàng thành công");
                    this.getCustomerTypes();
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

    updateCustomerType = values => {
        const {
            resetEditPage,
            resetCurrentCustomerType,
            redirectLoginPage
        } = this.props;

        this.setState({ isShowModal: false });
        const jwt = auth.isAuthenticated();
        putCustomerType(
            jwt,
            {
                code: values.code,
                name: values.name
            }
        )
            .then(
                result => {
                    resetEditPage();
                    resetCurrentCustomerType();
                    Alert.success("Lưu loại khách hàng thành công");
                    this.getCustomerTypes();
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

    showDetail = index => {
        this.handleShow(index);
    };

    handleShow = index => {
        const currentCustomerType = this.props.customerTypes[index];
        this.setState({
            isShowModal: true,
            title: `Thông tin chi tiết: ${currentCustomerType.code} ${currentCustomerType.name}`
        }, () => {
            this.props.load(this.props.customerTypes[index]);
        })
    };

    handleClose = (e) => {
        const { resetEditPage, resetCurrentCustomerType } = this.props;
        resetEditPage();
        resetCurrentCustomerType();
        this.setState({ isShowModal: false });
    }

    showConfirmDelete = itemId => {
        this.setState(
            {
                customerTypeId: itemId
            },
            () => this.toggleModalConfirm()
        )
    }

    toggleModalConfirm = () => {
        this.setState(prevState => ({
            isShowModalConfirm: !prevState.isShowModalConfirm
        }))
    }

    delete = () => {
        const { redirectLoginPage } = this.props;
        const jwt = auth.isAuthenticated();
        deleteCustomerType(jwt, {
            code: this.state.customerTypeId,
        }).then(result => {
            this.setState({ customerTypeId: null });
            this.getCustomerTypes();
            this.toggleModalConfirm();
            Alert.success("Xóa loại khách hàng thành công");
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
            customerTypes,
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
                        <li className="active">Loại khách hàng</li>
                    </ol>
                </section>
                <section className="content">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box box-primary">
                                <div className="box-header">
                                    <h3 className="box-title">Danh sách loại khách hàng</h3>
                                    <div className="box-tools">
                                        <div
                                            className="input-group input-group-sm hidden-xs"
                                            style={{ width: "200px" }}>
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
                                        className="table table-bordered table-striped">
                                         <thead>
                                            <tr>
                                                <th>Mã</th>
                                                <th>Loại khách hàng</th>
                                                <th>Hoạt động</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                 customerTypes &&
                                                 customerTypes.length > 0 &&
                                                 customerTypes.map((customerType, index) => {  
                                                     return (
                                                        <tr key={index}>
                                                            <td>{customerType.code}</td>
                                                            <td>{customerType.name}</td>
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
                                                                    onClick={() => this.showConfirmDelete(customerType.code)}
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
                                        onPageChange={this.handlePageClick}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <CustomerTypeAdd
                    isShowModal={isShowModalAdd}
                    handleClose={this.handleCloseAdd}
                    title={titleAdd}
                    addCustomerType={this.addCustomerType}
                    pristine={pristine}
                    submitting={submitting}
                />
                <CustomerTypeEdit
                    isShowModal={isShowModal}
                    handleClose={this.handleClose}
                    title={title}
                    updateCustomerType={this.updateCustomerType}
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
    const { loading, customerTypes, totalPages, page } = state.customerType;
    const { redirectToLogin } = state.core;

    return {
      loading,
      customerTypes,
      redirectToLogin,
      totalPages,
      page
    };
  };

const mapDispatchToProps = dispatch => {
    return {
      getCustomerTypes: params => dispatch(getCustomerTypesAction(params)),
      load: data => dispatch(loadCurrentCustomerType(data)),
      resetAddPage: () => dispatch(reset("CustomerTypeAddPage")),
      resetNewCustomerType: () => dispatch(resetNewCustomerType()),
      resetEditPage: () => dispatch(reset("CustomerTypeEditPage")),
      resetCurrentCustomerType: () => dispatch(resetCurrentCustomerType()),
      redirectLoginPage: () => dispatch(redirectToLoginAction()),
      setLoading: isLoading => dispatch(setLoadingCustomerType(isLoading))
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(CustomerTypeListPage);