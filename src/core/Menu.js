import React from "react";
import { withRouter, Link } from "react-router-dom";
import auth from "../auth/auth-helper";

const Menu = withRouter(({ history }) => (
  <header className="main-header">
    <nav className="navbar navbar-static-top" role="navigation">
      <div className="container">
        <div className="navbar-header" style={{ paddingLeft: 20 }}>
          <Link to="/home" className="navbar-brand">
            <b>
              <i className="glyphicon glyphicon-home" /> Minh Shop{" "}
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
              <a href="log.php" className="dropdown-toggle">
                <i className="glyphicon glyphicon-list-alt" />
                &nbsp; Lịch sử truy cập
              </a>
            </li>
            <li className="dropdown notifications-menu">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                <i className="glyphicon glyphicon-wrench" /> &nbsp; Bảo trì
              </a>
              <ul className="dropdown-menu">
                <li>
                  <ul className="menu">
                    <li>
                      <a href="/category">
                        <i className="glyphicon glyphicon-user text-green" />
                        Danh mục
                      </a>
                    </li>
                    <li>
                      <a href="/customer">
                        <i className="glyphicon glyphicon-user text-green" />{" "}
                        Khách hàng
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li className="">
              <a href="/profile" className="dropdown-toggle">
                <i className="glyphicon glyphicon-cog text-orange" />
                &nbsp; Minh Lam
              </a>
            </li>
            <li className="">
              <a
                href="#"
                className="dropdown-toggle"
                onClick={() => auth.signout(() => history.push("/"))}
              >
                <i className="glyphicon glyphicon-off text-red" />
                &nbsp; Thoát
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
));

export default Menu;
