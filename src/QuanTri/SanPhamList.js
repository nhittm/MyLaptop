import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router'
function SanPhamList() {
    const [listSP, ganListSP ] = useState([]);
    const navigate = useNavigate()
    const xoaSP = (id) => {
        if (window.confirm('Xóa thật không bồ')===false) return false;
        fetch(`http://localhost:3000/admin/sp/${id}`, {method: "delete"}) .then(res => res.json())
        .then(data => navigate(0) );
    };
    useEffect(() => {
        fetch("http://localhost:3000/admin/sp")
        .then(res => res.json())
        .then(data => ganListSP(data))
    }, []);
    return (
        <div id="adminspList" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Danh sách sản phẩm</h1>
            </div>
            <div className="container">
                <div className="sp" >
                    <span className="text-center">Tên SP</span> 
                    <span className="text-center">Ngày</span> 
                    <span className="text-center">Giá</span>
                    <span className="text-center">
                    <a href="/admin/spthem" className="btn btn-success">Thêm</a>
                    </span>
                </div>
                {listSP.map((sp, index) => (
                    <div className='sp' key={sp.id_sp}>
                        <span>{sp.ten_sp}</span> 
                        <span>{new Date(sp.ngay).toLocaleDateString('vi')}</span> 
                        <span>{sp.gia.toLocaleString('vi')} VND</span>
                        <span className="text-center">
                            <a href="/" className='btn btn-danger' onClick={() => xoaSP(sp.id)} >Xóa</a> &nbsp;
                            <Link to={"/admin/sp/" + sp.id} className='btn btn-primary'>Sửa</Link>
                        </span>
                    </div>
                ))}
            </div>
        </div>

    );
}//SanPhamList
export default SanPhamList;