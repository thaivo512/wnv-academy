module.exports = () => (req, res, next) => {
    
    if(req.accessTokenPayload.is_active) {
        next();
    }
    else {
        return res.status(402).json({
            message: 'Tai khoan cua ban chua xac thuc email'
        })
    }
}