import React, { useState } from 'react';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import './style.scss'
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

function Login() {
    const registerDefault = {
        name: null,
        age: null,
        email: null,
        phone: null,
        userName: null,
        password: null,
    }
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [errorDialog, setErrorDialog] = useState('')
    const [visible, setVisible] = useState(false);

    const [dataRegister, setDataRegister] = useState(registerDefault)


    const login = () => {
        console.log(userName.length, password.length)
        if (userName.length == 0 || password.length == 0) {
            setError("Vui lòng nhập đủ thông tin")
        } else {
            setError('')
            fetch("http://localhost:8080/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({
                    'userName': userName,
                    'password': password,
                })
            }).then((res) => res.json()).then((result) => {
                if (result) {

                    if (result.status) {

                        setError("Tài khoản, mật khẩu không đúng")
                    } else {
                        alert("Đăng nhập thành công")
                        window.location.href = 'http://localhost:3000/home'
                        localStorage.setItem("userId" , result.id)
                        // history.push('/home');
                    }
                }
            })
        }

    }

    const changeForm = (name, val) => {
        var _dataRegister = { ...dataRegister }
        _dataRegister[name] = val
        setDataRegister(_dataRegister)
    }

    const footerContent = (
        <div>
            <Button label="Hủy" onClick={() => setVisible(false)} className="p-button-text" />
            <Button label="Đăng ký" onClick={() => register()} autoFocus />
        </div>
    );

    const register = () => {

        if (!dataRegister.age || !dataRegister.email || !dataRegister.name || !dataRegister.password || !dataRegister.phone || !dataRegister.userName) {
            setErrorDialog("Vui lòng nhập đủ thông tin")
        } else {
            fetch("http://localhost:8080/user/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataRegister)
            }).then(res => {
                if (res) {
                    if (!res.ok) {
                        alert("Đăng ký thất bại")
                    } else {
                        console.log(res)
                        alert("Đăng ký thành công")
                    }
                }
            })
            setDataRegister(registerDefault)
            setVisible(false)
        }


    }



    return (
        <div className='login'>
            <div className="c-login">
                <h1 className='c-login__header'>
                    Đăng nhập
                </h1>
                <div style={{textAlign:'left'}}>
                    <div style={{ marginBottom: "10px" }}>
                        <label style={{ width: "100px" }}>User:</label>
                        <InputText  value={userName} onChange={(e) => setUserName(e.target.value)} />
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                        <label style={{ width: "100px" }}>Password:</label>
                        <Password  value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>
                <div>
                    <label />
                    <Button label="Login" style={{ marginRight: "5px" }} onClick={() => login()} />
                    <Button label="Register" onClick={() => setVisible(true)} /></div>
                <div style={{ marginTop: "20px" }}><span style={{ color: "red" }}>{error}</span></div>
            </div>


            <Dialog footer={footerContent} header="Đăng ký" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>

                <div style={{ textAlign: "center" }} className='c-dialog-register'>
                    <div style={{ marginBottom: "10px" }}>
                        <label>Tên:</label>
                        <InputText style={{ marginRight: "20px" }} value={dataRegister.name} onChange={(e) => changeForm("name", e.target.value)} />
                        <label>Tuổi:</label>
                        <InputText value={dataRegister.age} onChange={(e) => changeForm("age", e.target.value)} />
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                        <label>Email:</label>
                        <InputText style={{ marginRight: "20px" }} value={dataRegister.email} onChange={(e) => changeForm("email", e.target.value)} />
                        <label>Phone:</label>
                        <InputText value={dataRegister.phone} onChange={(e) => changeForm("phone", e.target.value)} />
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                        <label>User:</label>
                        <InputText style={{ marginRight: "20px" }} value={dataRegister.userName} onChange={(e) => changeForm("userName", e.target.value)} />
                        <label>Password:</label>
                        <Password value={dataRegister.password} onChange={(e) => changeForm("password", e.target.value)} />
                    </div>

                    <div style={{ marginTop: "20px" }}><span style={{ color: "red" }}>{errorDialog}</span></div>
                </div>
            </Dialog>
        </div>
    );
}

export default Login;
