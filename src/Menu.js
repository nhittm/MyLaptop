import React from "react";
// import { listloai } from "./data";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { useSelector } from "react-redux";

function Menu(){
    const user = useSelector(state => state.auth.user);
    
    const [listloai, ganListloai] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3000/loai")
            .then(res => res.json()).then(data => ganListloai(data));
    }, []);
    return (
        <div className="row">
            <ul className="col-1">
                <li><img src="/MyLab.png" alt=""/></li>
            </ul>
            <ul className="col-7 ">
                <li><Link to="/">Trang chủ</Link></li>
                <li class="nav-item dropdown">
                    <Link class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false" to="#">Danh mục</Link>
                    <ul class="dropdown-menu">
                    {listloai.map((loai,i) =>
                        <li key={i}><Link class="dropdown-item" to={"/loai/"+loai.id}>{loai.ten_loai}</Link></li>
                        )//map
                    } 
                    </ul> 
                </li> 
                <li><Link to="/gioithieu">Giới thiệu</Link></li>               
            </ul>
            <ul  className="col">
                <li><input type="text" name="text" class="input" placeholder="Type here..."/><i class="fa-solid fa-magnifying-glass"></i></li>
                <li><Link to="/showcart"><i class="fa-solid fa-cart-shopping"></i></Link></li>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="/#" role="button" data-bs-toggle="dropdown">
                    { user===null || user===undefined? "Tài khoản":"Chào " + user.name } 
                    </a>
                    
                    { user===null || user===undefined?
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="/dangnhap">Đăng nhập</a></li>
                        <li><a className="dropdown-item" href="/dangky">Đăng ký</a></li>
                        <li><a className="dropdown-item" href="/quenpass">Quên pass</a></li>
                    </ul>
                    : 
                    <ul className="dropdown-menu">
                        { user.role===1 ? <li><a className="dropdown-item" href="/admin">Quản trị</a></li> : ""} 
                        <li><a className="dropdown-item" href="/doipass">Đổi pass</a></li>
                        <li><a className="dropdown-item" href="/profile">Thông tin tài khoản</a></li>
                        <li><Link className="dropdown-item" to="/thoat" >Thoát</Link></li>
                    </ul>
                    } 
                </li>
            </ul>
        </div>
    )
}
export default Menu;
