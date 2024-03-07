import React, { useEffect, useState } from 'react';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import './style.scss'
import { Button } from 'primereact/button';

import { Dialog } from 'primereact/dialog';
import Layout from '../../Component/Layout'
import { Dropdown } from 'primereact/dropdown';
function Home() {

    const [data, setData] = useState([])
    const [category, setCategory] = useState([])
    const [valueCategory , setValueCategory] = useState(0)


    useEffect(() => { loadCategory() }, [])

    useEffect(() => { 
        loadProduct() 
    }, [valueCategory])


    const loadCategory = () => {
        fetch("http://localhost:8080/category/get-all", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }).then((res) => res.json()).then((result) => {
            if (result) {
                setCategory(result)
            }
        })
    }

    const loadProduct = () => {
        fetch("http://localhost:8080/product/search", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                'search': '',
                'categoryId': valueCategory ? valueCategory : 0
            })
        }).then((res) => res.json()).then((result) => {
            if (result) {
                if (result.status) {

                } else {
                    setData(result)
                }
            }
        })
    }


    return (
        <Layout>
            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel" style={{ width: "80%", margin: "auto" }}>
                <ol class="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img class="d-block w-100 " src="https://a.ipricegroup.com/trends-article/top-3-mau-giay-converse-duoc-cac-ngoi-sao-quoc-te-ua-chuong-medium.jpg" alt="First slide" />
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="https://a.ipricegroup.com/trends-article/top-3-mau-giay-converse-duoc-cac-ngoi-sao-quoc-te-ua-chuong-medium.jpg" alt="Second slide" />
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="https://a.ipricegroup.com/trends-article/top-3-mau-giay-converse-duoc-cac-ngoi-sao-quoc-te-ua-chuong-medium.jpg" alt="Third slide" />
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>

            <div className='c-group-product'>
                <div className='c-group-product__header'>
                    <span style={{ color: "orange", fontSize: '40px', fontWeight: '700' }}>Danh sách sản phẩm</span>
                    <div style={{ marginBottom: "10px" }}>
                        <label style={{ width: "200px" }}>Chọn thể loại:</label>
                        {/* <InputText style={{ marginRight: "20px" }} value={productColor.productName} onChange={(e) => changeForm("productName", e.target.value)} /> */}
                        <Dropdown
                            inputId="city"
                            name="city"
                            value={valueCategory}
                            options={category}
                            optionLabel="categoryName"
                            optionValue='id'
                            placeholder="Select a product"
                            showClear
                            onChange={(e) => {
                                setValueCategory(e.target.value);
                            }}
                        />
                    </div>
                </div>
                <div className='c-group-product__product'>
                    {data?.map((val, idx) => {
                        return (
                            <div key={idx} className='c-product__item'>
                                <a className='c-product__item__group' href={`/product-detail/${val.id}`}>
                                    <div className='c-product__item__group__left'>
                                        <img src={`${val.image}`} />
                                    </div>
                                    <div className='c-product__item__group__right'>
                                        <span style={{ color: "orange", fontSize: "20px", fontWeight: "700", display: "block" }}>{val.productName}</span>
                                        <span style={{ color: "gray", fontSize: "15px", display: "block" }}>Mã sản phẩn: {val.productCode}</span>
                                        <span style={{ color: "gray", fontSize: "15px", display: "block" }}>Nhãn hiệu: {val.trademark}</span>
                                    </div>
                                </a>
                            </div>
                        )
                    })}
                </div>
            </div>


        </Layout>

    );
}

export default Home;
