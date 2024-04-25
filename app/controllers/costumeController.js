const { Costume } = require('../models/index');

const costumeController = {

    getAll: async (req, res) => {
        try {
            const costumes = await Costume.findAll();
            res.status(200).json(costumes);
        } catch(error) {
            res.status(500).json({ message: "Erreur interne du serveur"});
        }
    },

    getOne: async (req, res) => {
        try {
            const id = req.params.id;
            const costume = await Costume.findByPk(id);
            
            if (!costume)
                return res.status(404).json({ message: `Le costume avec l'id ${id} n'a pas été trouvé`})
            res.status(200).json(costume);

        } catch(error) {
            res.status(500).json({ message: "Erreur interne du serveur"});
        }
    },
    
    createOne: async (req, res) => {
        const { label } = req.body;
        try {
            const newCostume = await Costume.create({ label });
            res.status(201).json(newCostume);

        } catch(error) {
            res.status(500).json({ message: "Erreur interne du serveur"});
        }
    },
    
    updateOne: async (req, res) => {
        const { label } = req.body;
        const id = req.params.id;
        try {
            const costumeToEdit = await Costume.findByPk(id);
            if (!costumeToEdit)
                return res.status(404).json({ message : `Aucun costume trouvé avec l'ID ${id}`})

            if (label) costumeToEdit.label = label;
            await costumeToEdit.save();

            res.status(200).json(costumeToEdit);

        } catch(error) {
            res.status(500).json({ message: "Erreur interne du serveur"});
        }
    },
    
    deleteOne: async (req, res) => {
        const id = req.params.id;
        try {
            const costumeToRemove = await Costume.findByPk(id);
            if (!costumeToRemove)
                return res.status(404).json({ message : `Aucun costume trouvé avec l'ID ${id}`});
            costumeToRemove.destroy();
            res.status(200).json({ message : `Bien supprimé`});
        } catch(error) {
            res.status(500).json({ message: "Erreur interne du serveur"});
        }
    }
}

module.exports = costumeController;