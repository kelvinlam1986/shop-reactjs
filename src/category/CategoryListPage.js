import React, { Component } from "react";
import { Link } from "react-router-dom";
import RegisterModal from "../components/RegisterModal";

import { Form, FormGroup, ControlLabel, FormControl } from "react-bootstrap";

export default class CategoryListPage extends Component {
  constructor(props) {
    super(props);
    this.state = { isShowModal: false, title: "Thông tin chi tiết" };
  }

  handleClose = () => {
    this.setState({ isShowModal: false });
  };

  handleShow = () => {
    this.setState({ isShowModal: true });
  };

  saveCategory = () => {
    console.log("we are here");
  };

  render() {
    const { isShowModal, title } = this.state;
    return (
      <React.Fragment>
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
            <li className="active">Danh mục</li>
          </ol>
        </section>
        <section className="content">
          <div className="row">
            <div className="col-md-4">
              <div className="box box-primary">
                <div className="box-header">
                  <h3 className="box-title">Thêm danh mục mới</h3>
                </div>
                <div className="box-body">
                  <form>
                    <div className="form-group">
                      <label htmlFor="date">Danh mục</label>
                      <div className="input-group col-md-12">
                        <input
                          type="text"
                          className="form-control pull-right"
                          id="date"
                          name="category"
                          placeholder="Danh mục"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="input-group">
                        <button
                          className="btn btn-primary"
                          id="daterange-btn"
                          style={{ marginRight: "5px" }}
                        >
                          Lưu lại
                        </button>
                        <button className="btn btn-danger" id="daterange-btn">
                          Xóa
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-xs-8">
              <div className="box box-primary">
                <div className="box-header">
                  <h3 className="box-title">Danh sách danh mục</h3>
                </div>
                <div className="box-body">
                  <table
                    id="example1"
                    className="table table-bordered table-striped"
                  >
                    <thead>
                      <tr>
                        <th>Tên danh mục</th>
                        <th>Hoạt động</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Banh mi</td>
                        <td>
                          <span
                            style={{ color: "#fff", cursor: "pointer" }}
                            className="small-box-footer"
                            onClick={this.handleShow}
                          >
                            <i className="glyphicon glyphicon-edit text-blue" />
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
        <RegisterModal
          isShowModal={isShowModal}
          handleClose={this.handleClose}
          container={this}
          title={title}
          hiddenFooter={false}
          showCancel={true}
          clickOK={this.saveCategory}
          okText="Lưu"
        >
          <Form>
            <FormGroup controlId="name">
              <ControlLabel>Loại sản phẩm</ControlLabel>
              <FormControl type="text" autoFocus />
            </FormGroup>
          </Form>
        </RegisterModal>
      </React.Fragment>
    );
  }
}
