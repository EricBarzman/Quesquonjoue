const admin = (req, res, next) => {
    if (req.role !== 'ADMIN') {
        return res.status(401).json({ message : 'Vous n\'avez pas les autorisations.'})
    }
    next();
};

module.exports = admin;