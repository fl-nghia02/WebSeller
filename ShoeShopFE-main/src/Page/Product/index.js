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
import { SplitButton } from 'primereact/splitbutton';
function Product() {

    const productDefault = {
        productName: null,
        description: null,
        trademark:null,
        productCode:null,
        image: null
    }



    const [data, setData] = useState([])
    const [product, setProduct] = useState(productDefault)
    const [errorDialog, setErrorDialog] = useState('')
    const [visible, setVisible] = useState(false);
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState(null);


    useEffect(() => {
        loadData()
        loadCategory()
    }, [])



    const loadData = () => {
        fetch("http://localhost:8080/product/get-all", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }).then((res) => res.json()).then((result) => {
            if (result) {
                setData(result)
            }
        })
    }

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

    const columnDate = (rowData) => {
        return <p>{moment(rowData.createDate).format('DD/MM/YYYY')}</p>
    }

    const changeForm = (name, val) => {

        var _product = { ...product }
        switch (name) {
            case "image":
                const file = val.target.files[0];
                const formData = new FormData()
                formData.append("image", file)
        
                setImage(file) // Lấy tệp hình ảnh từ input
                if (file) {
                    
                    const reader = new FileReader();
                    reader.onload = () => {
                        _product[name] = reader.result // Lưu hình ảnh đã tải vào state
                    };
                    reader.readAsDataURL(file);
                }
                break;

            default:
                _product[name] = val
                break;
        }

        setProduct(_product)
    }


    const header = (
        <div className="c-header-table">
            <span className="text-xl text-900 font-bold">Sản phẩm</span>
            <Button rounded label='Thêm sản phẩm' onClick={() => setVisible(true)} />
        </div>
    );

    const addProduct = () => {
        console.log(product)
        if (!product.productName || !product.description || !product.productCode || !product.trademark) {
            setErrorDialog("Vui lòng nhập đủ thông tin")
        } else {
            fetch("http://localhost:8080/product/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(product)
            }).then((res) => {
                if (res) {
                    if (res.ok) {
                        setVisible(false)
                        loadData()
                    } else {
                        alert("Thêm thất bại")
                        setProduct(productDefault)
                    }
                }
            })

        }


    }

    const footerContent = (
        <div>
            <Button label="Hủy" onClick={() => setVisible(false)} className="p-button-text" />
            <Button label="Thêm" onClick={() => addProduct()} />
        </div>
    );

    const renderProductName = (rowData) => {
        return <a href={`/product-detail/${rowData.id}`} target="_blank">{rowData.productName}</a>
    }

    const renderImg = (rowData) => {
        return <img src={`${rowData.image}` } style={{maxWidth:"100px"}}/>
    }

    const renderCategory = (rowData) => {
        var _category = category?.find(val => val.id == rowData.categoryId)
        return <p> {_category?.categoryName}</p>
    }

    const editProduct = (rowData) => {
        console.log(rowData , 111111111)
        setProduct(rowData)
        setVisible(true);
    }

    const columnEnd = (rowData) => {
        const items = [
            {
                label: 'Sửa',
                icon: 'pi pi-refresh',
                command: () => {editProduct(rowData)}
            },
            {
                label: 'Xóa',
                icon: 'pi pi-times',
                command: () => { }
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
                    <Column body={renderProductName} header="Tên sản phẩm"></Column>
                    <Column field="productCode" header="Mã sản phẩm"></Column>
                    <Column body={renderImg} header="Ảnh"></Column>
                    <Column field="trademark" header="Thương hiệu"></Column>
                    <Column body={renderCategory} header="Thể loại"></Column>
                    {/* <Column header="Image" body={imageBodyTemplate}></Column> */}
                    <Column field="description" header="Description"></Column>

                    <Column header="Ngày đăng" body={columnDate}></Column>
                    <Column header="Ngày đăng" body={columnEnd}></Column>

                </DataTable>
            </div>

            <Dialog footer={footerContent} header="Thêm sản phẩm" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>

                <div className='c-dialog-register'>
                    <div style={{ marginBottom: "10px" }}>
                        <label style={{ width: "200px" }}>Tên sản phẩm:</label>
                        <InputText style={{ marginRight: "20px" }} value={product.productName} onChange={(e) => changeForm("productName", e.target.value)} />
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                        <label style={{ width: "200px" }}>Mã sản phẩm:</label>
                        <InputText style={{ marginRight: "20px" }} value={product.productCode} onChange={(e) => changeForm("productCode", e.target.value)} />
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                        <label style={{ width: "200px" }}>Nhãn hiệu:</label>
                        <InputText style={{ marginRight: "20px" }} value={product.trademark} onChange={(e) => changeForm("trademark", e.target.value)} />
                    </div>

                    <div style={{ marginBottom: "10px" }}>
                        <label style={{ width: "200px" }}>Thể loại:</label>
                        <Dropdown
                            inputId="city"
                            name="city"
                            value={product.categoryId}
                            options={category}
                            optionLabel="categoryName"
                            optionValue='id'
                            placeholder="Select a productSize"
                            onChange={(e) => {
                                changeForm("categoryId", e.target.value);
                            }}
                        />

                    </div>
                    <div style={{ marginBottom: "10px" }}>
                        <label style={{ width: "200px" }}>Ảnh</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => changeForm("image", e)}
                        />
                        {product.image && (
                            <div>
                                {/* <img src={product.image} alt="Uploaded" style={{ width: '200px' }} /> */}
                                {/* <img src={URL.createObjectURL(image)} alt="Uploaded" style={{ width: '200px' }} /> */}
                                
                            </div>
                        )}
                    </div>
                    <div>
                        <label style={{ width: "200px" }}>Description:</label>
                        <InputTextarea style={{ width: "calc(100% - 200px)" }} value={product.description} onChange={(e) => changeForm("description", e.target.value)} rows={5} cols={30} />
                    </div>

                    <div style={{ marginTop: "20px" }}><span style={{ color: "red" }}>{errorDialog}</span></div>
                </div>
            </Dialog>
        </Layout>

    );
}

export default Product;
