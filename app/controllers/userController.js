const { User, Band, Instrument, User_is_in_a_band } = require('../models/index');
const { v4: uuidv4 } = require('uuid');

const bcrypt = require('bcrypt');
const saltRounds = 10;
const jsonwebtoken = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const userController = {

    getAll: async (req, res) => {
        try {
            const users = await User.findAll({
                // include: [
                //     {
                //         model: Instrument,
                //         through: { attributes: [] }
                //     },
                //     {
                //         model: Band,
                //         through: { attributes: [] }
                //     }
                // ]
            });
            res.status(200).json(users);
        } catch(error) {
            res.status(500).json({ message: "Erreur interne du serveur"});
        }
    },

    getOne: async (req, res) => {
        try {
            const id = req.params.id;
            const user = await User.findOne({
                where : { id: id },
                include: [
                    {
                        model: Instrument,
                        through: { attributes: [] }
                    },
                    {
                        model: Band,
                        through: { attributes: [] }
                    }
                ]
            });
            res.status(200).json(user);
        } catch(error) {
            res.status(500).json({ message: "Erreur interne du serveur"});
        }
    },
    
    signIn: async (req, res) => {
        const { username, mail, password } = req.body;
        
        // Check if values are acceptable
        if (username === undefined || '')
            return res
                .status(400)
                .json({ message : "Il est nécessaire d'entrer un surnom."})

        if (password === undefined || password === "")
            return res
                .status(400)
                .json({ message: "Le mot de passe ne doit pas être une chaîne vide."});

        if (mail === undefined || '')
            return res
                .status(400)
                .json({ message : "Le mail ne doit pas être vide."})

        try {
            const doesMailExists = await User.findAll({ where: { mail: mail } });
            if (doesMailExists.length > 0) {
                return res
                    .status(401)
                    .json({ message: "Ce mail est déjà pris par un autre utilisateur" });
            }

            // Encrypt password
            const hash = await bcrypt.hash(password, saltRounds);
            
            const newUser = await User.create({ id: uuidv4(), username, mail, password: hash });
            res.status(200).json(newUser);
        
        } catch(error) {
            res.status(500).json({ message: "Erreur interne du serveur"});
        }
    },
    
    updateOne: async (req, res) => {
        const { username, mail, password, avatar_path, band_id, addOrRemoveBand } = req.body;
        const user_id = req.params.id;
        try {
            const userToEdit = await User.findOne({
                where: { id: user_id}
            });
            if (userToEdit === null)
                return res.status(404).json({ message : `Aucun user trouvé avec l'ID ${id}`})

            // Update regular properties
            if (username) userToEdit.username = username;
            if (mail) userToEdit.mail = mail;
            if (avatar_path) userToEdit.avatar_path = avatar_path;
            if (password) {
                const hashedPassword = await bcrypt.hash(password, saltRounds);
                userToEdit.password = hashedPassword;
            }

            // Add or remove from a band
            if (band_id !== undefined && addOrRemoveBand !== undefined) {
                // Add to band
                if (addOrRemoveBand === 1) {
                    const bandToEdit = await Band.findByPk(band_id);
                    userToEdit.addBand(bandToEdit);
                }
                // Remove from band
                if (addOrRemoveBand === 2) {
                    const bandToEdit = await Band.findByPk(band_id);
                    userToEdit.removeBand(bandToEdit);
                }
            }

            await userToEdit.save();
            res.status(200).json(userToEdit);

        } catch(error) {
            res.status(500).json({ message: "Erreur interne du serveur"});
        }
    },
    
    deleteOne: async (req, res) => {
        const id = req.params.id;
        try {
            const userToRemove = await User.findOne({
                where: { id : id }
            });
            if (userToEdit === null)
                return res.status(404).json({ message : `Aucun user trouvé avec l'ID ${id}`});
            
            userToRemove.destroy();
            res.status(200).json({ message : `Bien supprimé`});
        } catch(error) {
            res.status(500).json({ message: "Erreur interne du serveur"});
        }
    },
}

module.exports = userController;