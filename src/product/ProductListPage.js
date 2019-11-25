import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";
import config from "../config";
import _ from "lodash";
import { getProductsAction, setLoadingProduct } from "./product-action-creator";
import { redirectToLoginAction } from "../core/core-action-creator";
import ProductEdit from "./ProductEdit";
import { loadCurrentProduct, resetCurrentProduct } from "./product-action-creator"
import { reset } from "redux-form";

class ProductListPage extends Component {
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
    this.getProducts();
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
        this.getProducts();
      }
    );
  };

  getProducts = () => {
    this.props.getProducts(this.state.params);
  };

  handlePageClick = e => {
    this.setState(
      {
        params: {
          ...this.state.params,
          page: e.selected
        }
      },
      () => this.getProducts()
    );
  };

  onSearchChange = e => {
    e.persist();
    this.props.setLoading(true);
    this.delayedCallback(e);
  };

  onSearchClick = e => {
    this.getProducts();
  };

  showDetail = index => {
    this.handleShow(index);
  };

  handleShow = index => {
    const currentProduct = this.props.products[index];
    this.setState(
      {
        isShowModal: true,
        title: `Thông tin chi tiết: ${currentProduct.serial} ${currentProduct.name}`
      },
      () => {
        this.props.load(this.props.products[index]);
      }
    );
  };

  handleClose = (e) => {
    const { resetEditPage, resetCurrentProduct } = this.props;
    resetEditPage();
    resetCurrentProduct();
    this.setState({ isShowModal: false });
  }

  updateProduct = (values) => {

  }

  render() {
    const { isShowModal, title } = this.state;
    const {
      loading,
      redirectToLogin,
      products,
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
                      {products &&
                        products.length > 0 &&
                        products.map((product, index) => {
                          return (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>
                                <img
                                  style={{ width: "60px", height: "80px" }}
                                  src={"/uploads/" + product.picture}
                                  alt="image1"
                                />
                              </td>
                              <td>{product.serial}</td>
                              <td>{product.name}</td>
                              <td>{product.description}</td>
                              <td>{product.supplierName}</td>
                              <td>{product.quantity}</td>
                              <td>{product.price}</td>
                              <td>{product.categoryName}</td>
                              <td>{product.reorder}</td>
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
        <ProductEdit
          isShowModal={isShowModal}
          handleClose={this.handleClose}
          container={this}
          title={title}
          saveProduct={this.updateProduct}
          pristine={pristine}
          submitting={submitting}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { loading, products, totalPages, page } = state.product;
  const { redirectToLogin } = state.core;
  return {
    loading,
    products,
    redirectToLogin,
    totalPages,
    page
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProducts: params => dispatch(getProductsAction(params)),
    redirectLoginPage: () => dispatch(redirectToLoginAction()),
    setLoading: isLoading => dispatch(setLoadingProduct(isLoading)),
    load: data => dispatch(loadCurrentProduct(data)),
    resetEditPage: () => dispatch(reset("ProductEditPage")),
    resetCurrentProduct: () => dispatch(resetCurrentProduct()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage);
