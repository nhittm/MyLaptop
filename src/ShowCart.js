import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { xoaSP, xoaGH, suaSL } from "./CartSlice";
import { Link } from 'react-router-dom';
function ShowCart(props) {
    const cart = useSelector(state => state.cart.listSP);
    const dispatch = useDispatch();
    return (
        <div id="giohang" >
            <h2>Giỏ hàng của bạn</h2>
            <div className="p-2">
                <div >
                        <span>Tên sản phẩm</span>
                        <span>SL</span>
                        <span>Giá</span>
                        <span>Thành tiền</span>
                        <span>Thao tác </span>
                </div>
                {cart.map ((sp, index) => { return (
                    <div key={index}>
                        <span>{sp.ten_sp}</span>
                        <input type="number" defaultValue={sp.so_luong} 
                        onclick={e => dispatch(suaSL([sp.id, e.target.value]))}/>
                        <span>{Number(sp.gia).toLocaleString("vi")} VNĐ</span>
                        <span>{Number(sp.gia*sp.so_luong).toLocaleString("vi")} VNĐ</span>
                        <span className="bg-danger"> <a href="#" onClick={()=>dispatch(xoaSP(sp.id))}>Xóa</a> </span>
                    </div>
                    )}
                )}
            </div>
            <a href="#" onClick={() => dispatch(xoaGH())} id="xoagh">Xóa toàn bộ</a><br/><br/>
            <Link id="button"  to='/thanhtoan'>Thanh toán</Link>
        </div>
    );
}
export default ShowCart;