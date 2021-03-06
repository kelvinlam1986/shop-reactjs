import React, { Component } from "react"
import RegisterModal from "../components/RegisterModal";
import { Form } from "react-bootstrap";
import { reduxForm, Field } from "redux-form";
import renderInput from "../components/AdvanceTextField";
import renderTextArea from "../components/AdvanceTextArea";
import renderSelection from "../components/SelectInput"
import renderNumber from "../components/NumberField"
import { connect } from "react-redux";
import _ from "lodash"

const validate = values => {
    const errors = {};
    const requiredFields =
        [
            "serial",
            "name",
            "description",
            "supplierId",
            "categoryId",
            "price",
            "reorder"
        ];
    requiredFields.forEach(field => {
        if (!values[field]) {
            if (field === "serial") {
                errors[field] = `Bạn phải nhập Mã sản phẩm !`;
            }

            if (field === "name") {
                errors[field] = "Bạn phải nhập Tên sản phẩm !";
            }

            if (field === "description") {
                errors[field] = "Bạn phải nhập Mô tả !";
            }

            if (field === "supplierId") {
                errors[field] = "Bạn phải chọn một Nhà cung cấp !";
            }

            if (field === "categoryId") {
                errors[field] = "Bạn phải chọn một Loại sản phẩm !";
            }

            if (field === "price") {
                errors[field] = "Bạn phải nhập Giá sản phầm !";
            }

            if (field === "reorder") {
                errors[field] = "Bạn phải nhập Sắp xếp"
            }
        }
    });

    const numberFields =
        [
            "price",
            "reorder"
        ]

    numberFields.forEach(field => {
        if (isNaN(values[field])) {
            if (field === "price") {
                errors[field] = "Giá sản phẩm phải là một số !";
            }

            if (field === "reorder") {
                errors[field] = "Thự tự sắp xếp phải là một số !"
            }
        }
    })

    return errors;
};


class ProductEdit extends Component {
    render() {
        const {
            handleSubmit,
            isShowModal,
            handleClose,
            container,
            title,
            saveProduct,
            pristine,
            submitting,
            suppliers,
            categories
        } = this.props;

        let suppliersModel = [];
        let categoriesModel = [];

        if (_.isEmpty(suppliers) === false) {
            suppliersModel = suppliers.map(item => {
                return {
                    value: item.id,
                    name: item.name
                }
            })
        }

        if (_.isEmpty(categories) === false) {
            categoriesModel = categories.map(item => {
                return {
                    value: item.id,
                    name: item.name
                }
            })
        }
        return (
            <RegisterModal
                isShowModal={isShowModal}
                handleClose={handleClose}
                container={container}
                title={title}
                hiddenFooter={false}
                showCancel={true}
                clickOK={handleSubmit(saveProduct)}
                okText="Lưu"
                pristine={pristine}
                submitting={submitting}>
                <Form>
                    <Field
                        name="serial"
                        component={renderInput}
                        label="Mã sản phẩm"
                        autofocus
                    />
                    <Field
                        name="name"
                        component={renderInput}
                        label="Tên sản phẩm"
                        autofocus
                    />
                    <Field
                        name="description"
                        component={renderTextArea}
                        label="Mô tả" />
                    <Field
                        name="supplierId"
                        component={renderSelection}
                        label="Nhà cung cấp"
                        placeholder="Chọn một nhà cung cấp"
                        options={suppliersModel} />
                    <Field
                        name="categoryId"
                        component={renderSelection}
                        label="Loại sản phẩm"
                        placeholder="Chọn một loại sản phẩm"
                        options={categoriesModel} />
                    <Field
                        name="price"
                        component={renderNumber}
                        label="Giá"
                    />
                    <Field
                        name="reorder"
                        component={renderNumber}
                        label="Sắp xếp"
                    />
                </Form>
            </RegisterModal>
        )
    }
}

const mapStateToProps = state => {
    const { currentProduct, categories, suppliers } = state.product;
    return {
        initialValues: currentProduct,
        categories,
        suppliers
    };
};

const rxForm = reduxForm({
    form: "ProductEditPage",
    enableReinitialize: true,
    validate
})(ProductEdit);

export default connect(mapStateToProps)(rxForm);