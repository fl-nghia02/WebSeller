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
function Category() {

    const categoryDefault = {
        categoryName: null,
        categoryCode: null,
    }

    const [data, setData] = useState([])
    const [errorDialog, setErrorDialog] = useState('')
    const [visible, setVisible] = useState(false);
    const [category, setCategory] = useState(categoryDefault)

    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        fetch("http://localhost:8080/category/get-all", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }).then((res) => res.json()).then((result) => {
            if (result) {
                setData(result)
            }
        })
    }

    
    const changeForm = (name, val) => {
        var _category = { ...category }
        _category[name] = val
        setCategory(_category)
    }


    const header = (
        <div className="c-header-table">
            <span className="text-xl text-900 font-bold">Thể loại</span>
            <Button rounded label='Thêm loại' onClick={() => setVisible(true)} />
        </div>
    );

    const addProductSize = () => {
        if (!category.categoryCode || !category.categoryName) {
            setErrorDialog("Vui lòng nhập đủ thông tin")
        } else {
            fetch("http://localhost:8080/category/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(category)
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
            <Button label="Thêm" onClick={() => addProductSize()} />
        </div>
    );
    return (
        <Layout>
            <div style={{ padding: '2%' }}>
                <DataTable header={header} value={data} tableStyle={{ minWidth: '60rem' }}>
                    <Column field="categoryCode" header="Mã"></Column>
                    {/* <Column header="Image" body={imageBodyTemplate}></Column> */}
                    <Column field="categoryName" header="Tên thể loại"></Column>
                </DataTable>
            </div>

            <Dialog footer={footerContent} header="Thêm màu" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>

                <div className='c-dialog-register'>
                    
                    <div>
                        <label style={{ width: "200px" }}>Mã:</label>
                        <InputText style={{ marginRight: "20px" }} value={category.productColorName} onChange={(e) => changeForm("categoryCode", e.target.value)} />
                    </div>
                    <div style={{marginTop:"10px"}}>
                        <label style={{ width: "200px" }}>Tên thể loại:</label>
                        <InputText style={{ marginRight: "20px" }} value={category.productColorName} onChange={(e) => changeForm("categoryName", e.target.value)} />
                    </div>

                    <div style={{ marginTop: "20px" }}><span style={{ color: "red" }}>{errorDialog}</span></div>
                </div>
            </Dialog>
        </Layout>

    );
}

export default Category;
