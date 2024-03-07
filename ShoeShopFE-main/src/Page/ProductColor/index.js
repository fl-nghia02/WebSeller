import React, { useEffect, useState } from 'react';
import Layout from '../../Component/Layout'
import moment from 'moment';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import './style.scss'
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import './style.scss'
import { Dropdown } from 'primereact/dropdown';
function ProductColor() {

    const productColorDefault = {
        productColorName: null,
        productId: null,
    }

    const [data, setData] = useState([])
    const [product, setProduct] = useState([])
    const [errorDialog, setErrorDialog] = useState('')
    const [visible, setVisible] = useState(false);
    const [productColor, setProductColor] = useState(productColorDefault)

    useEffect(() => {
        loadData()
        loadProductColor()
    }, [])

    const loadData = () => {
        fetch("http://localhost:8080/product/get-all", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }).then((res) => res.json()).then((result) => {
            if (result) {
                setProduct(result)
            }
        })
    }

    const loadProductColor = () => {
        fetch("http://localhost:8080/product-color/get-all", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }).then((res) => res.json()).then((result) => {
            if (result) {
                setData(result)
            }
        })
    }

    const changeForm = (name, val) => {
        var _productSize = { ...productColor }
        _productSize[name] = val
        setProductColor(_productSize)
    }


    const header = (
        <div className="c-header-table">
            <span className="text-xl text-900 font-bold">Màu</span>
            <Button rounded label='Thêm màu' onClick={() => setVisible(true)} />
        </div>
    );

    const addProductSize = () => {
        if (!productColor.productId || !productColor.productColorName) {
            setErrorDialog("Vui lòng nhập đủ thông tin")
        } else {
            fetch("http://localhost:8080/product-color/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(productColor)
            }).then((res) => {
                if (res) {
                    if (res.ok) {
                        setVisible(false)
                        loadProductColor()
                    } else {
                        alert("Thêm thất bại")
                    }
                }
            })

        }


    }

    const footerContent = (
        <div>
            <Button label="Hủy" onClick={() => setVisible(false)} className="p-button-text" />
            <Button label="Thêm" onClick={() => addProductSize()} />
        </div>
    );
    return (
        <Layout>
            <div style={{ padding: '2%' }}>
                <DataTable header={header} value={data} tableStyle={{ minWidth: '60rem' }}>
                    <Column field="productName" header="Tên sản phẩm"></Column>
                    {/* <Column header="Image" body={imageBodyTemplate}></Column> */}
                    <Column field="productColorName" header="Cỡ sản phẩm"></Column>
                </DataTable>
            </div>

            <Dialog footer={footerContent} header="Thêm màu" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>

                <div className='c-dialog-register'>
                    <div style={{ marginBottom: "10px" }}>
                        <label style={{ width: "200px" }}>Chọn sản phẩm:</label>
                        {/* <InputText style={{ marginRight: "20px" }} value={productColor.productName} onChange={(e) => changeForm("productName", e.target.value)} /> */}
                        <Dropdown
                            inputId="city"
                            name="city"
                            value={productColor.productId}
                            options={product}
                            optionLabel="productName"
                            optionValue='id'
                            placeholder="Select a product"
                            onChange={(e) => {
                                changeForm("productId", e.target.value);
                            }}
                        />
                    </div>
                    <div>
                        <label style={{ width: "200px" }}>Màu sản phẩm:</label>
                        <InputText style={{ marginRight: "20px" }} value={productColor.productColorName} onChange={(e) => changeForm("productColorName", e.target.value)} />
                        
                    </div>

                    <div style={{ marginTop: "20px" }}><span style={{ color: "red" }}>{errorDialog}</span></div>
                </div>
            </Dialog>
        </Layout>

    );
}

export default ProductColor;
