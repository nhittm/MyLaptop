import React, { useState } from 'react';

const Dangky = () => {
    const [email, setEmail] = useState('');
    const [dien_thoai, setdien_thoai] = useState('');
    const [name, setname] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState(0); // Có thể thay đổi giá trị role nếu cần
    const [message, setMessage] = useState('');

    const submitDuLieu = async (e) => {
        e.preventDefault();

        // Kiểm tra xem mật khẩu và xác nhận mật khẩu có khớp không
        if (password !== confirmPassword) {
            setMessage("Mật khẩu và xác nhận mật khẩu không khớp.");
            return;
        }

        // Gửi yêu cầu đến API
        try {
            const response = await fetch('http://localhost:3000/dangky', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    dien_thoai,
                    name,
                    password,
                    confirmPassword,
                    role
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Đăng ký thành công!");
            } else {
                setMessage(data.thongbao || "Đã xảy ra lỗi.");
            }
        } catch (error) {
            setMessage("Lỗi kết nối đến máy chủ.");
        }
    };

    return (
        <form id="frmlogin" onSubmit={submitDuLieu} className="col-7 m-auto border border-primary">
            <h2 className="bg-info h5 p-2">Thành viên đăng nhập</h2>
            <div className="m-3">
                Tên đăng nhập <input className="form-control" type="text" value={name} onChange={(e) => setname(e.target.value)} required />
            </div>
            <div className="m-3">
                Email<input className="form-control" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required  />
            </div>
            <div className="m-3">
                Số điện thoại <input className="form-control"type="text" value={dien_thoai} onChange={(e) => setdien_thoai(e.target.value)} required />
            </div>
            <div className="m-3">
                Mật khẩu <input className="form-control" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required  />
            </div>
            <div className="m-3">
                Nhập lại mật khẩu <input className="form-control" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required  />
            </div>
            <div className="m-3">
                <button className="btn btn-info" type="submit">Đăng Ký</button> 
            </div>
    </form>
        
    );
};

export default Dangky;