const { User, Band } = require('../models/index');

const bandController = {

    getAll: async (req, res) => {
        try {
            const bands = await Band.findAll({ include: User });
            res.status(200).json(bands);
        } catch(error) {
            res.status(500).json({ message: "Erreur interne du serveur"});
        }
    },

    getOne: async (req, res) => {
        try {
            const id = req.params.id;
            const band = await Band.findByPk(id, {
                include: User
            });
            
            if (!band)
                return res.status(404).json({ message: `Le groupe avec l'id ${id} n'a pas été trouvé`})
            res.status(200).json(band);

        } catch(error) {
            res.status(500).json({ message: "Erreur interne du serveur"});
        }
    },
    
    createOne: async (req, res) => {
        const { name } = req.body;
        try {
            const newBand = await Band.create({ name });
            res.status(201).json(newBand);

        } catch(error) {
            res.status(500).json({ message: "Erreur interne du serveur"});
        }
    },
    
    updateOne: async (req, res) => {
        const { name } = req.body;
        const id = req.params.id;
        try {
            const bandToEdit = await Band.findByPk(id);
            if (!bandToEdit)
                return res.status(404).json({ message : `Aucun groupe trouvé avec l'ID ${id}`})

            if (name) bandToEdit.name = name;
            await bandToEdit.save();

            res.status(200).json(bandToEdit);

        } catch(error) {
            res.status(500).json({ message: "Erreur interne du serveur"});
        }
    },
    
    deleteOne: async (req, res) => {
        const id = req.params.id;
        try {
            const bandToRemove = await Band.findByPk(id);
            if (!bandToRemove)
                return res.status(404).json({ message : `Aucun band trouvé avec l'ID ${id}`});
            bandToRemove.destroy();
            res.status(200).json({ message : `Bien supprimé`});
        } catch(error) {
            res.status(500).json({ message: "Erreur interne du serveur"});
        }
    },

    addUser: async (req, res) => {
        const user_id = req.params.id;
        const { band_id } = req.body;
        try {
            const userToEdit = await User.findByPk(user_id);
            const bandToEdit = await Band.findByPk(band_id);
            userToEdit.addBand(bandToEdit);
            
            res.status(200).json({ message: "Bien effectué"});
        } catch(error) {
            res.status(500).json({ message: "Erreur interne du serveur"});
        } 
    },

    removeUser: async (req, res) => {
        const user_id = req.params.id;
        const { band_id } = req.body;
        try {
            const userToEdit = await User.findByPk(user_id);
            const bandToEdit = await Band.findByPk(band_id);
            userToEdit.removeBand(bandToEdit);
            
            res.status(200).json({ message: "Bien effectué"});

        } catch(error) {
            res.status(500).json({ message: "Erreur interne du serveur"});
        } 
    }
}

module.exports = bandController;