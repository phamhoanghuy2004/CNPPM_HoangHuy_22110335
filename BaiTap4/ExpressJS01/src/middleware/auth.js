require("dotenv").config();
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const whiteList = ["/", "/register", "/login"];

    // Dùng req.path thay vì originalUrl để không bị dư prefix
    if (whiteList.includes(req.path)) {
        return next();
    }

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = {
                email: decoded.email,
                name: decoded.name,
                createBy: "hoidanit"
            };
            console.log(">>> Check token: ", decoded);
            return next();
        } catch (err) {
            return res.status(401).json({ message: "Token hết hạn hoặc không hợp lệ." });
        }
    }

    return res.status(401).json({ message: "Token không tồn tại." });
};

module.exports = auth;
