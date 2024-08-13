import React from "react";                                                                                                                                                                                                                                                                                                      
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
function Menu () {
    const user = useSelector(state => state.auth.user);
    return (
        <div id="menu" className="col d-flex">
            <ul className="col-10">
                <li className="nav-item">
                    <Link className="nav-link active" to={"/"} aria-current="page" href="#">Home</Link>
                </li>
                <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Quản lý loại
                    </Link>
                    <ul className="dropdown-menu">
                        <li><Link className="dropdown-item" to={"/admin/loaithem"}>Thêm loại</Link></li>
                        <li><Link className="dropdown-item" to={"/admin/loai"}>Danh sách loại</Link></li>
                    </ul>
                </li>
                <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Quản lý sản phẩm
                    </Link>
                    <ul className="dropdown-menu">
                        <li><Link className="dropdown-item" to={"/admin/spthem"}>Thêm sản phẩm</Link></li>
                        <li><Link className="dropdown-item" to={"/admin/sp"}>Danh sách sản phẩm</Link></li>
                    </ul>
                </li>
                <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Quản lý đơn hàng
                    </Link>
                    <ul className="dropdown-menu">
                        <li><Link className="dropdown-item" href="#">Xem đơn hàng mới</Link></li>
                        <li><Link className="dropdown-item" href="#">Quản lí đơn hàng</Link></li>
                    </ul>
                </li>

            </ul>
            <ul>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="/#" role="button" data-bs-toggle="dropdown">
                    { user===null || user===undefined? "Tài khoản":"Chào " + user.name } 
                    </a>
                    <ul className="dropdown-menu"> 
                        <li><a className="dropdown-item" href="/doipass">Đổi pass</a></li>
                        <li><a className="dropdown-item" href="/profile">Thông tin tài khoản</a></li>
                        <li><Link className="dropdown-item" to="/thoat" >Thoát</Link></li>
                    </ul>
                </li>
            </ul>
            
        </div>
    )
}//return
export default Menu;