const mysql = require('mysql');
const exp = require("express");
const app = exp();
var cors = require('cors');
app.use([cors(), exp.json()]);
const db = mysql.createConnection({
    host: 'localhost', user: 'root', password: '', port: 3306, database: 'laptop_react'
});
db.connect(err => { if (err) throw err; console.log("database ket noi thanh cong") });


// noi dinh nghia cac route


app.listen(3000, () => console.log("ung dung dang chay voi port 3000"));

// lay sp moi
app.get('/spxemnhieu/:sosp?', function (req, res) {
    let sosp = parseInt(req.params.sosp || 6);
    if (sosp <= 1) sosp = 6;
    let sql = `SELECT id, ten_sp, gia, gia_km, hinh, ngay, luot_xem
               FROM san_pham WHERE an_hien = 1 ORDER BY ngay desc LIMIT 0, ?`;
    db.query(sql, sosp, (err, data) => {
        if (err) res.json({ "thongbao": "Lỗi lấy list sp", err });
        else res.json(data);
    });
});
// lay list sp xem nhieu
app.get('/spxemnhieu/:sosp?', function (req, res) {
    let sosp = parseInt(req.params.sosp || 6);
    if (sosp <= 1) sosp = 6;
    let sql = `SELECT id, ten_sp, gia, gia_km, hinh, ngay, luot_xem
               FROM san_pham WHERE an_hien = 1 ORDER BY luot_xem desc LIMIT 0, ?`;
    db.query(sql, sosp, (err, data) => {
        if (err) res.json({ "thongbao": "Lỗi lấy list sp", err });
        else res.json(data);
    });
});
//lay chi tiet sp

app.get('/sp/:id/:id_loai', function (req, res) {
    let id = parseInt(req.params.id || 0);
    let id_loai = parseInt(req.params.id_loai || 0);
    if (isNaN(id) || id <= 0 || isNaN(id_loai) || id_loai <= 0) {
        res.json({ "thong bao": "Không biết sản phẩm", "id": id, "id_loai": id_loai });
        return;
    }

    let sql = `SELECT p.id, p.id_loai, p.ten_sp, p.gia, p.gia_km, p.hinh, p.ngay, p.luot_xem, tt.ram, tt.cpu, tt.dia_cung, tt.mau_sac, tt.can_nang
               FROM san_pham p INNER JOIN thuoc_tinh tt ON p.id = tt.id_sp WHERE p.id = ? AND p.id_loai = ?`;
    
    db.query(sql, [id, id_loai], (err, data) => {
        if (err) {
            res.json({ "thongbao": "Lỗi lấy thông tin sản phẩm", "err": err });
        } else {
            if (data.length === 0) {
                res.json({ "thongbao": "Không tìm thấy sản phẩm với id và id_loai cung cấp" });
            } else {
                res.json(data[0]);
            }
        }
    });
});

///lay sp trong loai
app.get('/sptrongloai/:id_loai', function (req, res) {
    let id_loai = parseInt(req.params.id_loai);
    if (isNaN(id_loai) || id_loai <= 0) {
        res.json({ "thong bao": "Không biết loại", "id_loai": id_loai });
        return;
    }

    let sql = `SELECT p.id, p.ten_sp, p.gia, p.gia_km, p.hinh, p.ngay, p.luot_xem, tt.ram, tt.cpu
               FROM san_pham p INNER JOIN thuoc_tinh tt ON p.id = tt.id_sp WHERE id_loai = ? AND an_hien = 1 ORDER BY id desc`;
    db.query(sql, id_loai, (err, data) => {
        if (err) res.json({ "thongbao": "Lỗi lấy sp trong loại", err });
        else res.json(data);
    });
});
//lay thong tin loai
app.get('/loai/:id_loai', function (req, res) {
    let id_loai = parseInt(req.params.id_loai);
    if (isNaN(id_loai) || id_loai <= 0) {
        res.json({ "thong bao": "Không biết loại", "id_loai": id_loai });
        return;
    }

    let sql = `SELECT id, ten_loai FROM loai WHERE id = ?`;
    db.query(sql, id_loai, (err, data) => {
        if (err) res.json({ "thongbao": "Lỗi lấy loại", err });
        else res.json(data[0]);
    });
});
// lay thong tin tat ca loai
app.get('/loai', function (req, res) {
    let sql = `SELECT id, ten_loai FROM loai`;
    db.query(sql, (err, data) => {
        if (err) res.json({ "thongbao": "Lỗi lấy list loai", err });
        else res.json(data);
    });
});
// luu don hang
app.post('/luudonhang', function (req, res) {
    let data=req.body;
    let sql=`INSERT INTO don_hang SET ?`;
    db.query(sql, data, function(err, data) {
        if(err) res.json({"id_dh":-1, "thongbao": "Lỗi lưu đơn hàng", err });
        else {
            id_dh=data.insertId
            res.json({"id_dh":id_dh, "thongbao": "Đã lưu đơn hàng", "id": data.insertId });
        }
    });

});
// lưu giỏ hàng
app.post('/luugiohang', function (req, res) {
    let data=req.body;
    let sql=`INSERT INTO don_hang_chi_tiet SET ?`;
    db.query(sql, data, function(err, data) {
        if(err) res.json({"thongbao": "Lỗi lưu sp", err });
        else res.json({"thongbao": "Đã lưu sp vào giỏ hàng", "id_sp": data.id_sp });
    });
});
/*-----------------------------------------------------admin------------------------------------------------- */
// lay list sp
app.get('/admin/sp', function (req, res) {
    let sql = `SELECT id, ten_sp, gia, gia_km, hinh, ngay, luot_xem
               FROM san_pham ORDER BY id desc`;
    db.query(sql, (err, data) => {
        if (err) res.json({ "thongbao": "Lỗi lấy list sp", err });
        else res.json(data);
    });
});
// lay chi tiet 1 sp trong admin
app.get('/admin/sp/:id', function (req, res) {
    let id = parseInt(req.params.id || 0);
    if (isNaN(id) || id <= 0 ) {
        res.json({ "thong bao": "Không biết sản phẩm", "id": id, "id_loai": id_loai });
        return;
    }

    let sql = `SELECT p.id, p.id_loai,p.tinh_chat, p.ten_sp, p.gia, p.gia_km, p.hinh, p.ngay, p.luot_xem, tt.ram, tt.cpu, tt.dia_cung, tt.mau_sac, tt.can_nang
               FROM san_pham p INNER JOIN thuoc_tinh tt ON p.id = tt.id_sp WHERE p.id = ? `;
    
    db.query(sql, id, (err, data) => {
        if (err) {
            res.json({ "thongbao": "Lỗi lấy thông tin sản phẩm", "err": err });
        } else {
            if (data.length === 0) {
                res.json({ "thongbao": "Không tìm thấy sản phẩm cung cấp" });
            } else {
                res.json(data[0]);
            }
        }
    });
});
// app.get('/admin/sp/:id', function (req, res) {
//     let id = parseInt(req.params.id);
//     if ( id <= 0) {
//         res.json({ "thong bao": "Không biết sp", "id": id });
//         return;
//     }
//     let sql = `SELECT  * FROM san_pham WHERE id = ?`;
//     db.query(sql, id, (err, data) => {
//         if (err) res.json({ "thongbao": "Lỗi lấy chi tiet sp", err });
//         else res.json(data[0]);
//     });
    
// });
// them moi sp
app.post('/admin/sp', (req, res) => {
    const san_pham = {
        id_loai: req.body.id_loai,
        ten_sp: req.body.ten_sp,
        tinh_chat: req.body.tinh_chat,
        gia: req.body.gia,
        gia_km: req.body.gia_km,
        hinh: req.body.hinh,
        ngay: req.body.ngay,
        luot_xem: req.body.luot_xem
    };

    const thuoc_tinh = {
        ram: req.body.ram,
        cpu: req.body.cpu,
        dia_cung: req.body.dia_cung,
        can_nang: req.body.can_nang
    };

    // Chèn vào bảng `san_pham`
    const san_phamSQL = 'INSERT INTO san_pham SET ?';
    db.query(san_phamSQL, san_pham, (err, result) => {
        if (err) {
            console.error("Lỗi chèn 1 sp:", err);
            res.json({ "thongbao": "Lỗi chèn 1 sản phẩm", err });
        } else {
            const newIdSP = result.insertId;

            const thuoc_tinhSQL = 'INSERT INTO thuoc_tinh SET ?';
            const thuoc_tinhIDSP = { ...thuoc_tinh, id_sp: newIdSP };

            db.query(thuoc_tinhSQL, thuoc_tinhIDSP, (err, result) => {
                if (err) {
                    console.error("Lỗi chèn 1 thuộc tính:", err);
                    res.json({ "thongbao": "Lỗi chèn thuộc tính sản phẩm", err });
                } else {
                    console.log("Thêm thành công:", result);
                    res.json({ "thongbao": "Đã chèn 1 sản phẩm và thuộc tính", "id": newIdSP });
                }
            });
        }
    });
});
// sua sp
app.put('/admin/sp/:id', async (req, res) => {
    const productId = parseInt(req.params.id || 0);
    if (isNaN(productId) || productId <= 0) {
        return res.status(400).json({ "thongbao": "ID sản phẩm không hợp lệ" });
    }

    const san_pham = {
        id_loai: req.body.id_loai,
        ten_sp: req.body.ten_sp,
        tinh_chat: req.body.tinh_chat,
        gia: req.body.gia,
        gia_km: req.body.gia_km,
        hinh: req.body.hinh,
        ngay: req.body.ngay,
        luot_xem: req.body.luot_xem
    };

    const thuoc_tinh = {
        ram: req.body.ram,
        cpu: req.body.cpu,
        dia_cung: req.body.dia_cung,
        mau_sac: req.body.mau_sac,  // thêm trường màu sắc
        can_nang: req.body.can_nang
    };

    try {
        // Cập nhật thông tin sản phẩm
        const san_phamSQL = 'UPDATE san_pham SET ? WHERE id = ?';
        await query(san_phamSQL, [san_pham, productId]);

        // Cập nhật thông tin thuộc tính sản phẩm
        const thuoc_tinhSQL = 'UPDATE thuoc_tinh SET ? WHERE id_sp = ?';
        const result = await query(thuoc_tinhSQL, [thuoc_tinh, productId]);

        if (result.affectedRows === 0) {
            // Nếu không có thuộc tính nào được cập nhật
            return res.status(404).json({ "thongbao": "Sản phẩm hoặc thuộc tính không tồn tại" });
        } else {
            console.log("Cập nhật thành công sản phẩm và thuộc tính:", result);
            res.json({ "thongbao": "Đã cập nhật sản phẩm và thuộc tính thành công", "id": productId });
        }
    } catch (err) {
        console.error("Lỗi khi cập nhật sản phẩm hoặc thuộc tính:", err);
        res.status(500).json({ "thongbao": "Lỗi khi cập nhật sản phẩm hoặc thuộc tính", err });
    }
});
// xoa sp
app.delete('/admin/sp/:id', (req, res) => {
    const id_sp = req.params.id;

    // Xóa thuộc tính của sản phẩm
    const deleteAttributesSQL = 'DELETE FROM thuoc_tinh WHERE id_sp = ?';
    db.query(deleteAttributesSQL, [id_sp], (err, result) => {
        if (err) {
            console.error("Lỗi khi xóa thuộc tính sản phẩm:", err);
            return res.status(500).json({ "thongbao": "Lỗi khi xóa thuộc tính sản phẩm", err });
        }

        // Xóa sản phẩm
        const deleteProductSQL = 'DELETE FROM san_pham WHERE id = ?';
        db.query(deleteProductSQL, [id_sp], (err, result) => {
            if (err) {
                console.error("Lỗi khi xóa sản phẩm:", err);
                return res.status(500).json({ "thongbao": "Lỗi khi xóa sản phẩm", err });
            } else if (result.affectedRows === 0) {
                // Nếu không tìm thấy sản phẩm nào để xóa
                return res.status(404).json({ "thongbao": "Sản phẩm không tồn tại" });
            } else {
                console.log("Xóa thành công:", result);
                res.json({ "thongbao": "Đã xóa sản phẩm và thuộc tính liên quan", "id": id_sp });
            }
        });
    });
});
//login

const jwt = require("node-jsonwebtoken");
const fs = require("fs");
const PRIVATE_KEY = fs.readFileSync("private-key.txt"); 
app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const sql = `SELECT * FROM users WHERE email = ? AND password = ?`;
    db.query(sql, [email, password], (err, results) => {
        if (err) {
            console.error("Database query error:", err);
            res.status(500).json({ thongbao: "Lỗi server" });
            return;
        }

        if (results.length > 0) {
            const userInfo = results[0];
            const jwtBearToken = jwt.sign({}, PRIVATE_KEY, {
                algorithm: "RS256",
                expiresIn: 1800,
                subject: userInfo.id.toString()
            });
            res.status(200).json({
                token: jwtBearToken,
                expiresIn: 120,
                userInfo: {
                    id: userInfo.id,
                    email: userInfo.email,
                    role: userInfo.role,
                    name: userInfo.name
                }
            });
        } else {
            res.status(401).json({ thongbao: "Đăng nhập thất bại" });
        }
    });
});
// lay list loai
app.get("/admin/loai", (req, res) => {
    const sql = "SELECT * FROM loai";
    db.query(sql, (err, results) => {   
        if (err) {
            res.status(500).json({ thongbao: "Lỗi lấy list loại" });
            return;
        }
        res.json(results);
    });
});
//them loai
app.post("/admin/loai", (req, res) => {
    const ten_loai = req.body.ten_loai;
    const sql = "INSERT INTO loai (ten_loai) VALUES (?)";
    db.query(sql, [ten_loai], (err, data) => {
        if (err) {  
            res.status(500).json({ thongbao: "Thêm loại thất bại" });
            return;
        }
        res.json({ thongbao: "Thêm loại thành công", id: data.insertId });
    });
});
//xoa loai
app.delete("/admin/loai/:id", (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM loai WHERE id = ?";
    db.query(sql, [id], (err, data) => {
        if (err) {
            res.status(500).json({ thongbao: "Lỗi khi xóa loại" });
            return;
        }
        res.json({ thongbao: "Đã xóa loại", id: id });
    });
});
// dangky
app.post('/dangky', async (req, res) => {
    const { email, dien_thoai, name, password, confirmPassword, role = 0 } = req.body;

    // Kiểm tra xem tất cả các trường đã được cung cấp
    if (!email || !dien_thoai || !name || !password || !confirmPassword) {
        return res.status(400).json({ "thongbao": "Vui lòng cung cấp đầy đủ thông tin" });
    }

    // Kiểm tra sự khớp mật khẩu
    if (password !== confirmPassword) {
        return res.status(400).json({ "thongbao": "Mật khẩu và xác nhận mật khẩu không khớp" });
    }

    // Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ "thongbao": "Địa chỉ email không hợp lệ" });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        // Lưu thông tin người dùng vào cơ sở dữ liệu
        const sql = 'INSERT INTO users (email, dien_thoai, name, password, role) VALUES (?, ?, ?, ?, ?)';
        const result = await query(sql, [email, dien_thoai, name, hashedPassword, role]);

        // Phản hồi thành công
        res.status(201).json({ "thongbao": "Đăng ký tài khoản thành công", "id": result.insertId });
    } catch (err) {
        console.error("Lỗi khi đăng ký tài khoản:", err);
        res.status(500).json({ "thongbao": "Lỗi khi đăng ký tài khoản", err });
    }
});