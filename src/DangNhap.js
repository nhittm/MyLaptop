import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { dalogin } from "./authSlice";
import { useNavigate } from "react-router-dom";
function DangNhap() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
const submitDuLieu = () => { //gửi thông tin đăng nhập lên server 
    if (emailRef.current.value === "" || passwordRef.current.value === "") { 
        alert("Nhập đủ thông tin nhe bạn ơi"); return;
    }
    let url = "http://localhost:3000/login";
    let tt = {email:emailRef.current.value, password:passwordRef.current.value }
    var opt = {
    method: "post",
    body: JSON.stringify(tt),
    headers: { 'Content-Type': 'application/json'} }
    fetch(url,opt).then(res => res.json() ).then(data => { 
        console.log(data);
        dispatch( dalogin(data) );
        navigate("/");
    });
}
return (
    <form id="frmlogin" className="col-7 m-auto border border-primary">
        <h2 className="bg-info h5 p-2">Thành viên đăng nhập</h2>
        <div className="m-3">
            Email<input className="form-control" type="text" ref={emailRef} />
        </div>
        <div className="m-3">
            Mật khẩu <input className="form-control" type="password" ref={passwordRef} />
        </div>
        <div className="m-3">
            <button onClick={()=>submitDuLieu()} className="btn btn-info" type="button">Đăng nhập</button> 
        </div>
    </form>
   

)};
export default DangNhap;