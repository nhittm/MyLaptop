import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { themSP } from './CartSlice';

function ChiTiet() {
    const { id, id_loai } = useParams();
    const [sp, setSp] = useState({});
    const [sanPhamNgauNhien, setSanPhamNgauNhien] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        // Fetch chi tiết sản phẩm dựa trên id
        fetch(`http://localhost:3000/sp/${id}/${id_loai}`)
            .then(res => res.json())
            .then(data => setSp(data))
            .catch(error => console.error('Error fetching product details:', error));
    }, [id,id_loai]);

    useEffect(() => {
        // Fetch các sản phẩm cùng loại (id_loai) để hiển thị sản phẩm liên quan
        fetch(`http://localhost:3000/sptrongloai/${id_loai}`)
            .then(res => res.json())
            .then(data => {
                // Lấy ngẫu nhiên 4 sản phẩm khác với sản phẩm hiện tại
                const randomProducts = [];
                while (randomProducts.length < 6 && data.length > 0) {
                    const index = Math.floor(Math.random() * data.length);
                    const randomProduct = data[index];
                    if (randomProduct.id !== id && !randomProducts.some(sp => sp.id === randomProduct.id)) {
                        randomProducts.push(randomProduct);
                    }
                }
                setSanPhamNgauNhien(randomProducts);
            })
            .catch(error => console.error('Error fetching related products:', error));
    }, [id_loai, id]);

    return (
        <div id="chitiet">
            <p className="fs-4 fw-bold m-3 text-center">Chi tiết sản phẩm</p>
            <div id="row1">
                <div id="trai"> 
                    <img src={sp.hinh} alt={sp.ten_sp} /> 
                </div>
                <div id="phai" className="ms-3"> 
                    <h1 className="h3 fw-bold">{sp.ten_sp}</h1>
                    <p><span>Giá gốc</span>: {Number(sp.gia).toLocaleString("vi")} VNĐ</p>
                    <p><span>Giá KM</span>: {Number(sp.gia_km).toLocaleString("vi")} VNĐ</p>
                    <p><span>Ngày</span>: {new Date(sp.ngay).toLocaleString("vi-VN")}</p>
                    <p><span>RAM</span>: {sp.ram}</p>
                    <p><span>CPU</span>: {sp.cpu}</p>
                    <p><span>Đĩa cứng</span>: {sp.dia_cung}</p>
                    <p><span>Màu sắc</span>: {sp.mau_sac}</p>
                    <p><span>Cân nặng</span>: {sp.can_nang} KG</p>
                </div>
            </div>
            <div id="row2"> 
                <p className="fs-4 fw-bold m-3 text-center">Sản phẩm liên quan</p>
                <div id="data">
                    {sanPhamNgauNhien.map((sp, index) => (
                        <div className="sp" key={index}>
                            <img src={sp.hinh} alt={sp.ten_sp} />
                            <h4><Link to={`/sp/${sp.id}/${sp.id_loai}`}>{sp.ten_sp}</Link></h4>
                            <del className="fw-lighter text-body-secondary">{Number(sp.gia).toLocaleString("vi")} VND</del> 
                            <p className="text-danger m-0">{Number(sp.gia_km).toLocaleString("vi")} VND</p>
                            <p><Link href="#" onClick={() => dispatch(themSP(sp))}><i class="fa-solid fa-cart-shopping"></i></Link></p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ChiTiet;
