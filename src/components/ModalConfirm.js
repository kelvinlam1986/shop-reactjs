import React from "react";
import { Modal, Button } from "react-bootstrap";

const ModalConfirm = ({ isShowModal, clickOk, handleClose }) => {
    return (
        <div>
            <Modal show={isShowModal} onHide={handleClose}>
                <Modal.Body>Bạn có chắc chắn muốn xoá trường dữ liệu này?</Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="danger" onClick={clickOk}>
                        Xác nhận
                    </Button>{' '}
                    <Button bsStyle="secondary" onClick={handleClose}>
                        Huỷ bỏ
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ModalConfirm;