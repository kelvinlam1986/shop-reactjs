import React, { Component } from "react";
import ReactPaginate from "react-paginate";
import "./Pagination.css";

export default class Pagination extends Component {
  render() {
    let { totalPages, page, pageRangeDisplayed, onPageChange } = this.props;
    let initPage = page - 1;
    return (
      totalPages > 0 && (
        <ReactPaginate
          disableInitialCallback={true}
          initialPage={initPage}
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          pageClassName={"page-item"}
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          pageCount={totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={pageRangeDisplayed || 1}
          onPageChange={onPageChange}
          containerClassName={"pagination"}
          activeLinkClassName={"active"}
          activeClassName={"active"}
        />
      )
    );
  }
}
