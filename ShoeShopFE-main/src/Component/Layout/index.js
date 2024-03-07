import React, { useState } from 'react';
import './style.scss'



function Layout(props) {

    const [data, setData] = useState([])
    const [checkSearch , setCheckSearch] = useState(false)

    const searchProduct = (e) => {
        console.log(e)
        if(e){
            setCheckSearch(true)
        } else {
            setCheckSearch(false)
        }
        fetch("http://localhost:8080/product/search", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                'search': e,
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
        <div className='c-layout'>
            <div className='c-layout__menu'>
                <div className='c-layout__menu__header'><span>MENU</span></div>
                <div className='c-layout__menu__content'>
                    <a href='/home'>Trang chủ</a>
                    <span>Quản lý Sản phẩm</span>
                    <a href='/product' style={{ marginLeft: "20px" }}>Sản phẩm</a>
                    <a href='/product-size' style={{ marginLeft: "20px" }}>Cỡ sản phẩm</a>
                    <a href='/product-color' style={{ marginLeft: "20px" }}>Màu sản phẩm</a>
                    <a href='/category' style={{ marginLeft: "20px" }}>Thể loại</a>
                    <a href='/price' style={{ marginLeft: "20px" }}>Bảng giá</a>
                    <a href='/cart'>Giỏ hàng</a>
                </div>

            </div>
            <div className='c-layout__header'>
                <div className='c-layout__header__left'>
                    <img src="https://png.pngtree.com/png-clipart/20190514/ourmid/pngtree-3d-neon-light-abstract-background-png-image_1028317.jpg" style={{ height: '50px' }} />
                    <i className='pi pi-phone c-phone' />
                    <span>0345678999</span>
                </div>
                <div className='c-layout__header__right'>
                    <div className='c-search'>
                        <input type='text' onChange={(e) => searchProduct(e.target.value)} />
                        <i className='pi pi-search' />
                        <div className='c-popup-search' style={{ background: "white", padding: "10px", minWidth: "300px" , display:`${!checkSearch ? "none" : ''}` , transition:"1s" }}>
                            {data.length > 0 ? data.map((val, idx) => {
                                return (
                                    <a href={`/product-detail/${val.id}`} key={idx} style={{ marginBottom: "10px", display: 'flex', alignItems: "center" }}>
                                        <img src={`${val.image}`} style={{ width: "100px", marginRight: "10px" }} />
                                        <div>
                                            <span style={{ display: "block", fontSize: "15px", color: "orange" }}>{val.productName}</span>
                                            <span style={{ display: "block", color: "gray" }}>Hãng {val.trademark}</span>
                                        </div>
                                    </a>
                                )
                            }) : "Không tìm thấy sản phẩm"}
                        </div>
                    </div>
                    <a href='/cart'><i className='pi pi-cart-plus' style={{ color: "black", fontSize: '25px', fontWeight: "700" }}/></a>

                </div>
            </div>
            <div style={{ padding: "50px 0px 0px 0px", height: "100vh" }}>
                {props.children}
            </div>
        </div>
    );
}

export default Layout;
