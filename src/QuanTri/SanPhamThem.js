function SanPhamThem() {
    let sp = {};
    const submitDuLieu = ()=>{
        let url =`http://localhost:3000/admin/sp`;
        let opt = {
        method: "post",
        body: JSON.stringify(sp),
        headers: { 'Content-Type': 'application/json' }
        };
        fetch(url, opt).then(res => res.json() ).then(data => {
        alert('Đã thêm');
        window.location.reload() ;
        })
    }//submitDuLieu
    return (
        <form id="frmaddsp">
            <h2>Thêm sản phẩm</h2>
            <div className="row mb-3">
                <div className='col'>Tên SP <input type="text" className="form-control" onChange={e => sp.ten_sp = e.target.value} required/> </div>
                <div className='col'>Giá <input type="number" className="form-control" onChange={e => sp.gia = e.target.value} required/> </div>
                <div className='col'>Giá KM <input type="number" className="form-control" onChange={e => sp.gia_km = e.target.value} required/> </div>
            </div>
            <div className="row mb-3">
                <div className='col'>Hình <input type="text" className="form-control" onChange={e => sp.hinh = e.target.value}/> </div>
                <div className='col'>Ngày<input type="date" className="form-control"onChange={e => sp.ngay = e.target.value} required/> </div>
                <div className='col'>Lượt Xem <input type="number" className="form-control" onChange={e => sp.luot_xem = e.target.value} required/> </div>
            </div>
            <div className="row mb-3">
                <div className='col'>Id Loại <input type="text" className="form-control" onChange={e => sp.id_loai = e.target.value} required/> </div>
                <div className='col'>Tính Chất <input type="text" className="form-control" onChange={e => sp.tinh_chat = e.target.value} required/> </div>
                <div className='col'>RAM <input type="text" className="form-control" onChange={e => sp.ram = e.target.value} required/> </div>
            </div>
            <div className="row mb-3">
                <div className='col'>CPU <input type="text" className="form-control" onChange={e => sp.cpu = e.target.value} required/> </div>
                <div className='col'>Đĩa Cứng <input type="text" className="form-control" onChange={e => sp.dia_cung = e.target.value} required/> </div>
                <div className='col'>Cân Nặng <input type="text" className="form-control" onChange={e => sp.can_nang = e.target.value} required/> </div>
            </div>
                <div className='mb-3'>
                <button className="btn btn-warning" type="button" onClick={ () => submitDuLieu()} >Thêm sản phẩm</button> &nbsp; 
                <a href="/admin/sp" className='btn btn-info'>Danh sách</a>
            </div>
        </form>
    )}
export default SanPhamThem;