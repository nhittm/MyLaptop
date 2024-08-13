import { Navigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';

function SanPhamSua(productId) { 
    const [product, setProduct] = useState({
        ten_sp: '',
        id_loai: '',
        tinh_chat: '',
        gia: '',
        gia_km: '',
        hinh: '',
        ngay: '',
        luot_xem: '',
        ram: '',
        cpu: '',
        dia_cung: '',
        can_nang: ''
    });

    const [message, setMessage] = useState('');

    useEffect(() => {
        // Tải dữ liệu sản phẩm khi component được gắn
        fetch(`/admin/sp/${productId}`)
            .then(response => response.json())
            .then(data => {
                setProduct(data);
            })
            .catch(error => {
                console.error('Lỗi khi tải dữ liệu sản phẩm:', error);
            });
    }, [productId]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [id]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`/admin/sp/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
        .then(response => response.json())
        .then(data => {
            setMessage(data.thongbao);
            Navigate("/admin/sp");
        })
        .catch(error => {
            setMessage('Lỗi khi cập nhật sản phẩm');
            console.error('Lỗi khi gửi yêu cầu cập nhật:', error);
        });
    };
    // let sp = {};
    // const submitDuLieu = ()=>{
    //     let url =`http://localhost:3000/admin/sp`;
    //     let opt = {
    //     method: "put",
    //     body: JSON.stringify(sp),
    //     headers: { 'Content-Type': 'application/json' }
    //     };
    //     fetch(url, opt).then(res => res.json() ).then(data => {
    //     alert('Đã cập nhật');
    //     Navigate("/admin/sp");
    //     })
    // }//submitDuLieu
    return (
        <form id="frmaddsp">
            <h2>Sửa sản phẩm</h2>
            <div className="row mb-3">
                <div className='col'>Tên SP <input type="text" id="ten_sp" className="form-control" value={product.ten_sp} onChange={handleChange} required/> </div>
                <div className='col'>Giá <input type="number" id="gia" className="form-control" value={product.gia} onChange={handleChange} required/> </div>
                <div className='col'>Giá KM <input type="number" id="gia_km" className="form-control" value={product.gia_km} onChange={handleChange} required/> </div>
            </div>
            <div className="row mb-3">
                <div className='col'>Hình <input type="text" id="hinh" className="form-control" value={product.hinh} onChange={handleChange}/> </div>
                <div className='col'>Ngày<input type="date" id="ngay" className="form-control"value={product.ngay} onChange={handleChange} required/> </div>
                <div className='col'>Lượt Xem <input type="number" id="luot_xem" className="form-control" value={product.luot_xem} onChange={handleChange} required/> </div>
            </div>
            <div className="row mb-3">
                <div className='col'>Id Loại <input type="text" id="id_loai" className="form-control" value={product.id_loai} onChange={handleChange} required/> </div>
                <div className='col'>Tính Chất <input type="text" id="tinh_chat" className="form-control" value={product.tinh_chat} onChange={handleChange} required/> </div>
                <div className='col'>RAM <input type="text" id="ram" className="form-control" value={product.ram} onChange={handleChange} required/> </div>
            </div>
            <div className="row mb-3">
                <div className='col'>CPU <input type="text" id="cpu" className="form-control" value={product.cpu} onChange={handleChange} required/> </div>
                <div className='col'>Đĩa Cứng <input type="text" id="dia_cung" className="form-control" value={product.dia_cung} onChange={handleChange} required/> </div>
                <div className='col'>Cân Nặng <input type="text" id="can_nang" className="form-control" value={product.can_nang} onChange={handleChange} required/> </div>
            </div>
                <div className='mb-3'>
                <button className="btn btn-warning" type="button" onClick={ () => handleSubmit()} >Cập nhật</button> &nbsp; 
            </div>
        </form>
    )}
export default SanPhamSua;