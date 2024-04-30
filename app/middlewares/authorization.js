const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const authorization = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) return res.status(401).json({ message: "Accès non autorisé" });

        jwt.verify(token, jwtSecret, (err, decoded) => {
            if (err)
                return res.status(401).json({ message: "Token invalide" });
            req.user_id = decoded.user_id;
            req.role = decoded.role;
            next();
        });

    } catch {
        res.status(401).json({
            error: 'Requête invalide !'
        });
    }
}

module.exports = authorization;