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
import { InputNumber } from 'primereact/inputnumber';
function PriceProduct() {

    const priceProductDefault = {
        productColorId: null,
        productId: null,
        productSizeId: null,
        price: null,
        quantity: null,
    }

    const [data, setData] = useState([])
    const [product, setProduct] = useState([])
    const [errorDialog, setErrorDialog] = useState('')
    const [visible, setVisible] = useState(false);
    const [productColor, setProductColor] = useState([])
    const [productSize, setProductSize] = useState([])

    const [productColorFilter, setProductColorFilter] = useState([])
    const [productSizeFilter, setProductSizeFilter] = useState([])
    const [priceProduct, setPriceProduct] = useState(priceProductDefault)

    useEffect(() => {
        loadData()
        loadProduct()
        loadProductColor()
        loadProductSize()
    }, [])

    const loadData = () => {
        fetch("http://localhost:8080/price/get-all", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }).then((res) => res.json()).then((result) => {
            if (result) {
                console.log(result)
                setData(result)
            }
        })
    }

    const loadProduct = () => {
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
                setProductColor(result)
            }
        })
    }

    const loadProductSize = () => {
        fetch("http://localhost:8080/product-size/get-all", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }).then((res) => res.json()).then((result) => {
            if (result) {
                setProductSize(result)
            }
        })
    }

    const changeForm = (name, val) => {
        switch (name) {
            case "productId":
                var _productSize = productSize.filter(item => item.productId == val);
                setProductSizeFilter(_productSize)

                var _productColor = productColor.filter(item => item.productId == val);
                setProductColorFilter(_productColor)
                break;

            default:
                break;
        }
        var _priceProduct = { ...priceProduct }
        _priceProduct[name] = val
        setPriceProduct(_priceProduct)
    }


    const header = (
        <div className="c-header-table">
            <span className="text-xl text-900 font-bold">Bảng giá</span>
            <Button rounded label='Thêm bảng giá' onClick={() => setVisible(true)} />
        </div>
    );

    const addPriceProduct = () => {
        if (!priceProduct.productId || !priceProduct.productColorId || !priceProduct.productSizeId || !priceProduct.price || !priceProduct.quantity) {
            setErrorDialog("Vui lòng nhập đủ thông tin")
        } else {
            fetch("http://localhost:8080/price/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(priceProduct)
            }).then((res) => {
                if (res) {
                    if (res.ok) {
                        setVisible(false)
                        loadData()
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
            <Button label="Thêm" onClick={() => addPriceProduct()} />
        </div>
    );

    const renderProductName = (rowData) => {
        var _product = product.find(val => val.id == rowData.productId)    
        return <p>{_product?.productName}</p>
    }

    const renderProductColorName = (rowData) => {
        var _productColor = productColor.find(val => val.productId == rowData.productId)  
        return <p>{_productColor?.productColorName}</p>
    }

    const renderProductSizeName = (rowData) => {
        var _productSize = productSize.find(val => val.productId == rowData.productId)    
        return <p>{_productSize?.productSizeName}</p>
    }

    return (
        <Layout>
            <div style={{ padding: '2%' }}>
                <DataTable header={header} value={data} tableStyle={{ minWidth: '60rem' }}>
                    <Column body={renderProductName} header="Tên sản phẩm"></Column>
                    {/* <Column header="Image" body={imageBodyTemplate}></Column> */}
                    <Column body={renderProductColorName} header="Màu sản phẩm"></Column>
                    <Column body={renderProductSizeName} header="Kích thước"></Column>
                    <Column field='quantity' header="Sản phầm còn"></Column>
                    <Column field='price' header="Giá/1 sản phẩm"></Column>
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
                            value={priceProduct.productId}
                            options={product}
                            optionLabel="productName"
                            optionValue='id'
                            placeholder="Select a product"
                            onChange={(e) => {
                                changeForm("productId", e.target.value);
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                        <label style={{ width: "200px" }}>Màu sản phẩm:</label>
                        <Dropdown
                            inputId="city"
                            name="city"
                            value={priceProduct.productColorId}
                            options={productColorFilter}
                            optionLabel="productColorName"
                            optionValue='id'
                            placeholder="Select a productColor"
                            onChange={(e) => {
                                changeForm("productColorId", e.target.value);
                            }}
                        />

                    </div>
                    <div style={{ marginBottom: "10px" }}>
                        <label style={{ width: "200px" }}>Kích thước:</label>
                        <Dropdown
                            inputId="city"
                            name="city"
                            value={priceProduct.productSizeId}
                            options={productSizeFilter}
                            optionLabel="productSizeName"
                            optionValue='id'
                            placeholder="Select a productSize"
                            onChange={(e) => {
                                changeForm("productSizeId", e.target.value);
                            }}
                        />

                    </div>

                    <div style={{ marginBottom: "10px" }}>
                        <label style={{ width: "200px" }}>Số lượng:</label>
                        <InputText style={{ marginRight: "20px" }} value={priceProduct.quantity} onChange={(e) => changeForm("quantity", e.target.value)} />
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                        <label style={{ width: "200px" }}>Giá tiền:</label>
                        <InputNumber style={{ marginRight: "20px" }} value={priceProduct.price} onChange={(e) => changeForm("price", e.value)} />
                    </div>

                    <div style={{ marginTop: "20px" }}><span style={{ color: "red" }}>{errorDialog}</span></div>
                </div>
            </Dialog>
        </Layout>

    );
}

export default PriceProduct;
