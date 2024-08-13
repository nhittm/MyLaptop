import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import {useDispatch} from 'react-redux';
import { themSP } from './CartSlice';

function PhanTrang({ listSP, pageSize }) {
    const [fromIndex, setfromIndex] = useState(0);
    const toIndex = fromIndex + pageSize;
    const spTrong1Trang = listSP.slice(fromIndex, toIndex);
    const tongSoTrang = Math.ceil(listSP.length / pageSize);
    const chuyenTrang = (event) => {
        const newIndex = (event.selected * pageSize) % listSP.length;
        setfromIndex(newIndex);
    };
    return (
        <div className="text-center"> 
            <HienSPTrongMotTrang spTrongTrang={spTrong1Trang} />
            <ReactPaginate  nextLabel=">" previousLabel="<" pageCount={tongSoTrang}
                pageRangeDisplayed={5} onPageChange={chuyenTrang} className="thanhphantrang"
            />
        </div>);
}//PhanTrang


function HienSPTrongMotTrang({ spTrongTrang }) {
    const dispatch = useDispatch();
    return (
        <div id="data">
        {spTrongTrang.map( (sp, index) => 
        <div className="sp" key={index}>
            <img src = {sp['hinh']} alt= {sp['ten_sp']}/>
            <h4 className="text-info-emphasis fw-bold"><Link to={ "/sp/" + sp.id } > {sp['ten_sp']} </Link></h4>
            <span className="boder border-info">Ram:{sp['ram']} </span ><span className="boder border-info">CPU:{sp['cpu']}</span ><br/>
            <del className="fw-lighter text-body-secondary">{Number(sp['gia']).toLocaleString("vi")} VND</del> 
            <p className="text-danger m-0">{Number(sp['gia_km']).toLocaleString("vi")} VND</p>
            <p><Link href="#" onClick={() => dispatch(themSP(sp))}><i class="fa-solid fa-cart-shopping"></i></Link></p>
        </div> 
     )}
    </div>
    );
} //HienSPTrongMotTrang


function SPTrongLoai() {
    document.title = "Sản phẩm";
    let { id_loai } = useParams();
    const [list_sp, ganListSP] = useState([]);
    const [loai, ganLoai] = useState("");
    useEffect(() => {
        fetch(`http://localhost:3000/sptrongloai/${id_loai}`)
            .then(res => res.json()).then(data => ganListSP(data));
        fetch(`http://localhost:3000/loai/${id_loai}`)
            .then(res => res.json()).then(data => ganLoai(data));
    }, [id_loai]);

    return (
        <div id="listsp">
            <h4 className=" fs-4 fw-bold m-3 text-center text-uppercase"> Sản phẩm trong loại {loai['ten_loai']}</h4>
            <PhanTrang listSP={list_sp} pageSize={12} />
        </div>



    );
}


export default SPTrongLoai;