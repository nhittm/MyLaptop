// import { listsp } from "./data";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function SanPhamXemNhieu(prop){
    const [sotin, setsotin] = useState(10);
    const [listsp, ganListSP] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3000/spxemnhieu/12")
            .then(res => res.json()).then(data => ganListSP(data));
    }, []);
    let title="Sản phẩm xem nhiều"
    let jsxcode = <div id="spxn" className="border border-info">
        <p className=" fs-4 mb-2 text-center ">{title.toUpperCase()}</p>
        {listsp.map((sp, i) => 
        <div className="sp" key={i}>
            <div className="ms-2"><img className="w-100 " src={sp['hinh']} alt={sp['ten_sp']}/></div>
            <div className="ms-2">
                <Link className="text-info-emphasis fw-bold" to={ "/sp/" + sp.id_sp } > {sp['ten_sp']} </Link><br/>
                <del className="fw-lighter text-body-secondary">{Number(sp['gia']).toLocaleString("vi")} VND</del> 
                <p className="text-danger m-0">{Number(sp['gia_km']).toLocaleString("vi")} VND</p>  
                <p>Số lượt xem: {sp['luot_xem']}</p>
            </div>
             
        </div>

        )//map
        }
        <div className="button">
        <button className="btn  m-2" onClick={() => setsotin(sotin + 10)}>Xem thêm</button>
        <button className="btn  m-2" onClick={() => setsotin(sotin -10)}>Ẩn bớt</button>
        </div>
    </div>
    return (jsxcode);
}
export default SanPhamXemNhieu;
