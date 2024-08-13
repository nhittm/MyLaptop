function Themloai() {
    let loai = {};
    const submitDuLieu = ()=>{
        let url =`http://localhost:3000/admin/loai`;
        let opt = {
        method: "post",
        body: JSON.stringify(loai),
        headers: { 'Content-Type': 'application/json' }
        };
        fetch(url, opt).then(res => res.json() ).then(data => {
        alert('Đã thêm');
        window.location.reload() ;
        })
    }//submitDuLieu
    return (
        <div>
            <div className="row mb-3">
                <div className='col'>Tên loại <input type="text" className="form-control" onChange={e => loai.ten_loai = e.target.value} required/> </div>
                <div className='col'>Ẩn hiện <input type="number" className="form-control" onChange={e => loai.an_hien = e.target.value} required/> </div>
                <div className='col'>Create_at <input type="date" className="form-control" onChange={e => loai.create_at = e.target.value} required/> </div>
            </div>
            <div className='mb-3'>
                <button className="btn btn-warning mx-2" type="button" onClick={ () => submitDuLieu()} >Thêm loại</button> 
                <a href="/admin/loai" className='btn btn-info '>Danh sách</a>
            </div>
        </div>
    )
}
export default Themloai;