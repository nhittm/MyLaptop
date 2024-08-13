const jwt = require("node-jsonwebtoken");
const fs = require("fs");
const PRIVATE_KEY = fs.readFileSync("private-key.txt"); 
const maxAge = 3*60*60;
const roleAdmin = 1;
exports.adminAuth = (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) {
        res.status(401).json({thongbao: "Không có token, mời đăng nhập lại"});
        return;
    }
}
