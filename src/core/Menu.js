import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import auth from "../auth/auth-helper";

const Menu = withRouter(({ history, username }) => (
  <header className="main-header">
    <nav className="navbar navbar-static-top" role="navigation">
      <div className="container">
        <div className="navbar-header" style={{ paddingLeft: 20 }}>
          <Link to="/home" className="navbar-brand">
            <b>
              <i className="glyphicon glyphicon-home" /> Minh Shop
            </b>
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#navbar-collapse"
            >
              <i className="fa fa-bars" />
            </button>
          </Link>
        </div>
        <div className="navbar-custom-menu">
          <ul className="nav navbar-nav">
            <li className="">
              <Link to="/log" className="dropdown-toggle">
                <i className="glyphicon glyphicon-list-alt" />
                &nbsp; Lịch sử truy cập
              </Link>
            </li>
            <li className="dropdown notifications-menu">
              <Link
                to="/notification"
                className="dropdown-toggle"
                data-toggle="dropdown"
              >
                <i className="glyphicon glyphicon-wrench" /> &nbsp; Bảo trì
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <ul className="menu">
                    {/* <li>
                      <Link to="/categories">
                        <i className="glyphicon glyphicon-user text-green" />
                        Danh mục
                      </Link>
                    </li> */}
                    <li>
                      <Link to="/customer_type">
                        <i className="glyphicon glyphicon-user text-green" />
                        Loại khách hàng
                      </Link>
                    </li>
                    <li>
                      <Link to="/banks">
                        <i className="glyphicon glyphicon-piggy-bank text-green" />
                        Ngân hàng
                      </Link>
                    </li>
                    <li>
                      <Link to="/countries">
                        <i className="glyphicon glyphicon-plane text-green" />
                        Quốc gia
                      </Link>
                    </li>
                    <li>
                      <Link to="/customers">
                        <i className="glyphicon glyphicon-user text-green" />{" "}
                        Khách hàng
                      </Link>
                    </li>
                    <li>
                      <Link to="/products">
                        <i className="glyphicon glyphicon-cutlery text-green" />{" "}
                        Hàng hoá
                      </Link>
                    </li>
                    <li>
                      <Link to="/suppliers">
                        <i className="glyphicon glyphicon-send text-green" />{" "}
                        Nhà cung cấp
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li className="dropdown notifications-menu">
              <Link
                to="/notification"
                className="dropdown-toggle"
                data-toggle="dropdown"
              >
                <i className="glyphicon glyphicon-wrench" /> &nbsp; Nghiệp vụ

              </Link>
              <ul className="dropdown-menu">
                <li>
                  <ul className="menu">
                    <li>
                      <Link to="/purchase">
                        <i className="glyphicon glyphicon-book text-green" />
                        Danh sách phiếu mua hàng
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li className="">
              <Link to="/profile" className="dropdown-toggle">
                <i className="glyphicon glyphicon-cog text-orange" />
                {" " + username}
              </Link>
            </li>
            <li className="">
              <Link
                to="/#"
                onClick={() => auth.signout(() => history.push("/"))}
              >
                <i className="glyphicon glyphicon-off text-red" />
                &nbsp; Thoát
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
));

const mapStateToProps = state => {
  const { branch, username } = state.core;
  return { branch, username };
};

export default connect(mapStateToProps)(Menu);
