import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router'
function ListLoai() {
    const [listLoai, ganListLoai ] = useState([]);
    const navigate = useNavigate()
    const xoaSP = (id) => {
        if (window.confirm('Xóa thật không bồ')===false) return false;
        fetch(`http://localhost:3000/admin/loai/${id}`, {method: "delete"}) .then(res => res.json())
        .then(data => navigate(0) );
    };
    useEffect(() => {
        fetch("http://localhost:3000/admin/loai")
        .then(res => res.json())
        .then(data => ganListLoai(data))
    }, []);
    return (
        <div id="adminspList" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Danh sách loại</h1>
            </div>
            <div className="container">
                <div className="sp" >
                    <span className="text-center">Tên Loại</span> 
                    <span className="text-center">
                    <a href="/admin/loaithem" className="btn btn-success">Thêm</a>
                    </span>
                </div>
                {listLoai.map((loai, index) => (
                    <div className='sp' key={loai.id}>
                        <span>{loai.ten_loai}</span> 
                        <span className="text-center">
                            <a href="/" className='btn btn-danger' onClick={() => xoaSP(loai.id)} >Xóa</a> &nbsp;
                            <Link to={"/admin/loai/" + loai.id} className='btn btn-primary'>Sửa</Link>
                        </span>
                    </div>
                ))}
            </div>
        </div>

    );
}//ListLoai
export default ListLoai;