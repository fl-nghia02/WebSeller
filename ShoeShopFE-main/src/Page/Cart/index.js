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
import { SplitButton } from 'primereact/splitbutton';
function Cart() {

    const [data, setData] = useState([])
    const [sumPrice , setSumPrice] = useState(0)

    useEffect(() => {
        if (localStorage.getItem("userId")) {
            loadCart()
        }
    }, [])

    const loadCart = () => {
        fetch("http://localhost:8080/cart/get-by-user", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                'userId': Number(localStorage.getItem("userId")),
            })
        }).then((res) => res.json()).then((result) => {
            if (result) {

                if (result.status) {


                } else {
                    var sum = 0;
                    setData(result)
                    for (let index = 0; index < result.length; index++) {
                        sum += result[index].price;
                        
                    }
                    setSumPrice(sum)
                }
            }
        })
    }
    const header = (
        <div className="c-header-table">
            <span className="text-xl text-900 font-bold">Giỏ hàng</span>
            <span className="text-xl text-900 font-bold">Tổng tiền phải thanh toán: {sumPrice}VNĐ</span>
            <Button label='Thanh toán'/>
        </div>
    );

    const renderImg = (rowData) => {
        return <img src={`${rowData.image}`} style={{ maxWidth: "100px" }} />
    }

    const remove = (rowData) => {
        fetch("http://localhost:8080/cart/delete", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                'id': rowData.id,
            })
        }).then((res) => {

            if (!res.ok) {


            } else {
                loadCart()
            }

        })
    }

    const renderLasterColumn = (rowData) => {
        const items = [
            {
                label: 'Thanh toán',
                icon: 'pi pi-refresh',
                command: () => { }
            },
            {
                label: 'Hủy',
                icon: 'pi pi-times',
                command: () => {
                    remove(rowData)
                }
            },

        ];
        return (
            <div className="card flex justify-content-center">
                <SplitButton model={items} className='c-custom-btn'/>
            </div>
        )
    }

    return (
        <Layout>
            <div style={{ padding: '2%' }}>
                <DataTable header={header} value={data} tableStyle={{ minWidth: '60rem' }}>
                    <Column field="productName" header="Tên sản phẩm"></Column>
                    <Column field="productCode" header="Mã sản phẩm"></Column>
                    <Column body={renderImg} header="Ảnh"></Column>
                    <Column field="productColorName" header="Màu sản phẩm"></Column>
                    <Column field="productSizeName" header="Cỡ sản phẩm"></Column>
                    <Column field="trademark" header="Thương hiệu"></Column>
                    <Column field="quantityProduct" header="Số lượng"></Column>
                    <Column body={(rowData) => { return <p>{rowData.price / rowData.quantityProduct} VND</p> }} header="Đơn giá"></Column>
                    <Column body={(rowData) => { return <p>{rowData.price} VND</p> }} header="Tổng tiền"></Column>
                    <Column body={renderLasterColumn} header="Tổng tiền"></Column>
                </DataTable>
            </div>
        </Layout>

    );
}

export default Cart;
