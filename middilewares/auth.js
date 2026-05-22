// middleware/auth.js
const jwt = require("jsonwebtoken")

const verifyUser =  (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" })
    }
}

const verifyAdmin = (req, res, next) => {
    verifyUser(req, res, () => {
        if (!req.user.admin) {
            return res.status(403).json({ message: "Access denied" })
        }
        next()
    })
}

module.exports = { verifyUser, verifyAdmin }