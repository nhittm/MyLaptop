import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { themSP } from './CartSlice';
import SanPhamXemNhieu from "./SanPhamXemNhieu";
function Home() {

    document.title = "Home";
    let title="Sản phẩm mới";
    const [listsp, ganListSP] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        fetch("http://localhost:3000/spmoi/12")
            .then(res => res.json()).then(data => ganListSP(data));
    }, []);

    return (
        <div id="main">
            <div className="banner">
                <img  src="/12.png" alt=""/>
                <img  src="/13.jpg" alt=""/>
            </div>
           <div id="trangchu" className=" row">
                <div id="article" className=" col-md-8 border border-info">
                    <p className=" fs-4 fw-bold text-center">{title.toUpperCase()}</p>
                    <div className="home">                
                        {listsp.slice(0,12).map((sp, i) => 
                        <div className="sp" key={i}>                   
                            <img src={sp['hinh']} alt={sp['ten_sp']}/>
                            <h4 className="text-info-emphasis fw-bold"><Link to={`/sp/${sp.id}/${sp.id_loai}`}>{sp['ten_sp']}</Link></h4>
                            <span className="boder border-info">Ram:{sp['ram']} </span ><span className="boder border-info">CPU:{sp['cpu']}</span ><br/>
                            <del className="fw-lighter text-body-secondary">{Number(sp['gia']).toLocaleString("vi")} VND</del> 
                            <p className="text-danger m-0 fw-bold">{Number(sp['gia_km']).toLocaleString("vi")} VND</p>  
                            <p><Link href="#" onClick={() => dispatch(themSP(sp))}><i class="fa-solid fa-cart-shopping text-success"></i></Link></p>
                            <p></p>
                        </div>
                        )//map
                        }
                    </div>
                </div>
                <div className="aside col"><SanPhamXemNhieu/></div>
           </div>
        </div>
    )
};

export default Home;