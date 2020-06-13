import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";
import config from "../config";
import _ from "lodash";
import { redirectToLoginAction } from "../core/core-action-creator";
import ReceiptTypeAdd from "./ReceiptTypeAdd";
// import ProductEdit from "./ProductEdit";
import { loadCurrentReceiptType, 
    resetCurrentReceiptType,
    resetNewReceiptType,
    getReceiptTypesAction, setLoadingReceiptType } from "./receiptType-action-creator"
import { reset } from "redux-form";
import auth from "../auth/auth-helper";
import { postReceiptType } from "./receiptType-api";
import Alert from "react-s-alert";
// import * as numeral from "numeral"

class ReceiptTypeListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowModal: false,
      title: "Thông tin chi tiết",
      titleAdd: "Thêm mới loại thu tiền",
      params: {
        page: 0,
        pageSize: config.pageSize,
        keyword: ""
      }
    };

    this.delayedCallback = _.debounce(this.search, 250);
  }

  componentDidMount = () => {
    this.getReceiptTypes();
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
        this.getReceiptTypes();
      }
    );
  };

  getReceiptTypes = () => {
    this.props.getReceiptTypes(this.state.params);
  };

  handlePageClick = e => {
    this.setState(
      {
        params: {
          ...this.state.params,
          page: e.selected
        }
      },
      () => this.getReceiptTypes()
    );
  };

  onSearchChange = e => {
    e.persist();
    this.props.setLoading(true);
    this.delayedCallback(e);
  };

  onSearchClick = e => {
    this.getReceiptTypes();
  };

//   showDetail = index => {
//     this.handleShow(index);
//   };

//   handleShow = index => {
//     const currentProduct = this.props.products[index];
//     this.setState(
//       {
//         isShowModal: true,
//         title: `Thông tin chi tiết: ${currentProduct.serial} ${currentProduct.name}`
//       },
//       () => {
//         this.props.load(this.props.products[index]);
//       }
//     );
//   };

//   handleClose = (e) => {
//     const { resetEditPage, resetCurrentProduct } = this.props;
//     resetEditPage();
//     resetCurrentProduct();
//     this.setState({ isShowModal: false });
//   }

handleShowAdd = () => {
  this.setState({
      isShowModalAdd: true,
  });
}

handleCloseAdd = e => {
  const { resetAddPage, resetNewReceiptType } = this.props;
  resetAddPage();
  resetNewReceiptType();
  this.setState({ isShowModalAdd: false });
};

addReceiptType = values => {
    const {
        resetAddPage,
        resetNewReceiptType,
        redirectLoginPage
    } = this.props;

    this.setState({ isShowModalAdd: false });
    const jwt = auth.isAuthenticated();
    postReceiptType(
        jwt,
        {
            code: values.code,
            name: values.name,
            receiptTypeInVietnamese: values.receiptTypeInVietnamese,
            receiptTypeInSecondLanguage: values.receiptTypeInSecondLanguage,
            showReceiptTypeInVietNamese: true
        }
    )
        .then(
            result => {
                resetAddPage();
                resetNewReceiptType();
                Alert.success("Lưu loại thu tiền thành công");
                this.getReceiptTypes();
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

//   updateProduct = (values) => {
//     const {
//       resetEditPage,
//       resetCurrentProduct,
//       redirectLoginPage
//     } = this.props;

//     this.setState({ isShowModal: false });
//     const jwt = auth.isAuthenticated();
//     putProduct(
//       jwt,
//       {
//         name: values.name,
//         serial: values.serial,
//         description: values.description,
//         categoryId: parseInt(values.categoryId, 10),
//         supplierId: parseInt(values.supplierId, 10),
//         price: parseFloat(values.price),
//         reorder: parseFloat(values.reorder)
//       }, values.id).then(result => {
//         resetEditPage();
//         resetCurrentProduct();
//         Alert.success("Lưu sản phẩm thành công");
//         this.getProducts();
//       }, error => {
//         if (error.errorCode) {
//           Alert.error(error.errorMessage);
//           if (error.errorCode === "401") {
//             redirectLoginPage();
//           }
//         } else {
//           redirectLoginPage();
//           Alert.error("Không thể kết nối đến server.");
//         }
//       }
//       ).catch(err => {
//         redirectLoginPage();
//         Alert.error("Không thể kết nối đến server.");
//       });
//   }

  render() {
    const { isShowModal, title,  isShowModalAdd, titleAdd, } = this.state;
    const {
      loading,
      redirectToLogin,
      receiptTypes,
      totalPages,
      page,
      pristine,
      submitting
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
            <li className="active">Loại thu tiền</li>
          </ol>
        </section>
        <section className="content">
          <div className="row">
            <div className="col-xs-12">
              <div className="box box-primary">
                <div className="box-header">
                  <h3 className="box-title">Danh sách loại thu tiền</h3>
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
                        <th>Mã</th>
                        <th>Tên (VN)</th>
                        <th>Tên (Khác)</th>
                        <th>Hiển thị VN</th>
                        <th>Hoạt động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {receiptTypes &&
                        receiptTypes.length > 0 &&
                        receiptTypes.map((receiptType, index) => {
                          return (
                            <tr key={index}>
                              <td>{receiptType.code}</td>
                              <td>{receiptType.receiptTypeInVietnamese}</td>
                              <td>{receiptType.receiptTypeInSecondLanguage}</td>
                              <td>
                                {
                                    receiptType.showReceiptTypeInVietNamese === true ?
                                         <span className="badge bg-green">Có</span> : <span className="badge bg-red">Không</span>
                                }
                              </td>
                              <td>
                                <span
                                  style={{ color: "#fff", cursor: "pointer" }}
                                  className="small-box-footer"
                                  onClick={() => this.showDetail(index)}
                                >
                                  <i className="glyphicon glyphicon-edit text-blue" />
                                </span>
                              </td>
                            </tr>
                          );
                        })}
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
        <ReceiptTypeAdd
            isShowModal={isShowModalAdd}
            handleClose={this.handleCloseAdd}
            title={titleAdd}
            addReceiptType={this.addReceiptType}
            pristine={pristine}
            submitting={submitting}
        />
        {/* <ProductEdit
          isShowModal={isShowModal}
          handleClose={this.handleClose}
          container={this}
          title={title}
          saveProduct={this.updateProduct}
          pristine={pristine}
          submitting={submitting}
        /> */}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { loading, receiptTypes, totalPages, page } = state.receiptType;
  const { redirectToLogin } = state.core;
  return {
    loading,
    receiptTypes,
    redirectToLogin,
    totalPages,
    page
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getReceiptTypes: params => dispatch(getReceiptTypesAction(params)),
    redirectLoginPage: () => dispatch(redirectToLoginAction()),
    setLoading: isLoading => dispatch(setLoadingReceiptType(isLoading)),
    resetAddPage: () => dispatch(reset("ReceiptTypeAddPage")),
    resetNewReceiptType: () => dispatch(resetNewReceiptType()),
    // load: data => dispatch(loadCurrentProduct(data)),
    // resetEditPage: () => dispatch(reset("ProductEditPage")),
    // resetCurrentProduct: () => dispatch(resetCurrentProduct()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReceiptTypeListPage);
