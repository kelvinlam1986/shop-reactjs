import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import "../components/Modal.css";

export default class RegisterModal extends Component {
  render() {
    const {
      className,
      isShowModal,
      handleClose,
      size,
      title,
      children,
      hiddenFooter,
      okDisabled,
      clickOK,
      clickCancel,
      showCancel,
      cancelText,
      okText,
      container
    } = this.props;
    return (
      <div className="modal-container" style={{ height: 200 }}>
        <Modal
          className={className}
          show={isShowModal}
          onHide={handleClose}
          container={container}
          size={size}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{children}</Modal.Body>
          {!hiddenFooter && (
            <Modal.Footer>
              <Button
                disabled={okDisabled}
                bsStyle="primary"
                onClick={clickOK || handleClose}
              >
                {okText || "Xác nhận"}
              </Button>{" "}
              {showCancel && (
                <Button bsStyle="danger" onClick={clickCancel || handleClose}>
                  {cancelText || "Hủy bỏ"}
                </Button>
              )}
            </Modal.Footer>
          )}
        </Modal>
      </div>
    );
  }
}
