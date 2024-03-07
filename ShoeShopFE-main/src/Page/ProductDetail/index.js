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
import { useParams } from 'react-router-dom';
import { Rating } from 'primereact/rating';
function ProductDetail() {

    const { id } = useParams();
    const [product, setProduct] = useState([])
    const [productColor, setProductColor] = useState([])
    const [productSize, setProductSize] = useState([])
    const [price, setPrice] = useState({})
    const [quantityProduct, setQuantityProduct] = useState(1)

    const [valueColor, setValuaColor] = useState(null)
    const [valueSize, setValuaSize] = useState(null)


    const [dataDetail, setDataDetail] = useState({})


    const [value, setValue] = useState(null);


    useEffect(() => {
        loadData()
        loadProductColor()
        loadProductSize()
    }, [id])

    const loadData = () => {
        fetch("http://localhost:8080/product/get-by-id", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                'id': id,
            })
        }).then((res) => res.json()).then((result) => {
            if (result) {
                setProduct(result)
            }
        })
    }

    const loadProductColor = () => {
        fetch("http://localhost:8080/product-color/get-by-product", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                'productId': id,
            })
        }).then((res) => res.json()).then((result) => {
            if (result) {
                setProductColor(result)
            }
        })
    }

    const loadProductSize = () => {
        fetch("http://localhost:8080/product-size/get-by-product", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                'productId': id,
            })
        }).then((res) => res.json()).then((result) => {
            if (result) {
                setProductSize(result)
            }
        })
    }




    const loadPrice = () => {
        fetch("http://localhost:8080/price/get-info-price", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                'productId': id,
                'productColorId': valueColor,
                'productSizeId': valueSize,
            })
        }).then((res) => res.json()).then((result) => {
            if (result) {
                setPrice(result)
            } else {
                setPrice({})
            }
        })
    }

    useEffect(() => {
        if (valueColor && valueSize) {
            loadPrice()
        }
    }, [valueColor, valueSize])

    const saveCart = () => {
        var color = productColor.find(val => val.id == valueColor)?.productColorName
        var size = productSize.find(val => val.id == valueSize)?.productSizeName
        var _dataDetail = { ...product }
        _dataDetail["quantityProduct"] = quantityProduct
        _dataDetail["productColorName"] = color
        _dataDetail["productSizeName"] = size
        _dataDetail["price"] = price?.price * quantityProduct
        _dataDetail["userId"] = localStorage.getItem("userId")
        _dataDetail["productId"] = id
        _dataDetail["productColorId"] = valueColor
        _dataDetail["productSizeId"] = valueSize




        fetch("http://localhost:8080/cart/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(_dataDetail)
        }).then((res) => {
            if (res) {
                if (res.ok) {
                    alert("Thêm thành công")
                } else {
                    alert("Thêm thất bại")
                    
                }
            }
        })


    }


    return (
        <Layout>
            <div className='c-product-detail'>
                <div className='c-product-detail__left'>
                    <img src={`${product?.image}`} />
                </div>
                <div className='c-product-detail__right'>
                    <div style={{ marginBottom: "10px" }}><span style={{ color: "gray" }}>Mã số: {product?.id}</span></div>
                    <div style={{ marginBottom: "10px" }}><span style={{ color: "orange", fontSize: "30px", fontWeight: "700" }}> {product?.productName}</span></div>
                    <div style={{ marginBottom: "10px" }}><span style={{ color: "gray" }}>Thương hiệu: {product?.trademark}</span></div>
                    <div style={{ marginBottom: "10px" }}><span style={{ color: "gray" }}>Mã sản phẩm: {product?.productCode}</span></div>
                    <div style={{ marginBottom: "10px" }}><span style={{ color: "gray", width: "120px", display: "inline-block" }}>Màu sản phẩm: </span>
                        <Dropdown
                            inputId="city"
                            name="city"
                            value={valueColor}
                            options={productColor}
                            optionLabel="productColorName"
                            optionValue='id'
                            placeholder="Select a productColor"
                            onChange={(e) => {
                                setValuaColor(e.target.value);
                            }}
                        /></div>

                    <div style={{ marginBottom: "10px" }}><span style={{ color: "gray", width: "120px", display: "inline-block" }}>Kích thước: </span>
                        <Dropdown
                            inputId="city"
                            name="city"
                            value={valueSize}
                            options={productSize}
                            optionLabel="productSizeName"
                            optionValue='id'
                            placeholder="Select a productSize"
                            onChange={(e) => {
                                setValuaSize(e.target.value);
                            }}
                        /></div>
                    {price ? <div style={{ marginBottom: "10px" }}><span style={{ color: "gray" }}>Số lượng còn lại: {price?.quantity}</span></div> : ""}
                    {price ? <div style={{ marginBottom: "10px" }}><span style={{ color: "gray" }}>Giá:</span> <span style={{ color: "orange", fontSize: "40px", fontWeight: "500" }}>{price?.price * quantityProduct} VNĐ</span></div> : ""}
                    {price ? <div style={{ marginBottom: "10px" }}><span style={{ color: "gray" }}>Số lượng mua: <span style={{ fontSize: "20px", cursor: "pointer" }} onClick={() => { if (quantityProduct > 1) { setQuantityProduct(quantityProduct - 1) } }}>-</span> {quantityProduct}</span><span style={{ cursor: "pointer", fontSize: "20px", color: "gray" }} onClick={() => { if (quantityProduct < price?.quantity) { setQuantityProduct(quantityProduct + 1) } }}>+</span ></div> : ""}
                    <div style={{ marginBottom: "10px" }}>
                        <Rating value={value} onChange={(e) => setValue(e.value)} cancel={false} />
                    </div>
                    <Button label='Thêm vào giỏ hàng' onClick={() => saveCart()} />


                </div>
            </div>
            <div className='c-product-content'>
                <div>Mô tả sản phẩm</div>
                <span>{product.description}</span>
            </div>
        </Layout>

    );
}

export default ProductDetail;
