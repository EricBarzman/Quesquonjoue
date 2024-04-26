const { Mood } = require('../models/index');

const moodController = {

    getAll: async (req, res) => {
        try {
            const moods = await Mood.findAll();
            res.status(200).json(moods);
        } catch(error) {
            res.status(500).json({ message: "Erreur interne du serveur"});
        }
    },

    getOne: async (req, res) => {
        try {
            const id = req.params.id;
            const mood = await Mood.findByPk(id);
            
            if (!mood)
                return res.status(404).json({ message: `Le mood avec l'id ${id} n'a pas été trouvé`})
            res.status(200).json(mood);

        } catch(error) {
            res.status(500).json({ message: "Erreur interne du serveur"});
        }
    },
    
    createOne: async (req, res) => {
        const { name } = req.body;
        try {
            const newmood = await Mood.create({ name });
            res.status(201).json(newmood);

        } catch(error) {
            res.status(500).json({ message: "Erreur interne du serveur"});
        }
    },
    
    updateOne: async (req, res) => {
        const { name } = req.body;
        const id = req.params.id;
        try {
            const moodToEdit = await Mood.findByPk(id);
            if (!moodToEdit)
                return res.status(404).json({ message : `Aucun mood trouvé avec l'ID ${id}`})

            if (name) moodToEdit.name = name;
            await moodToEdit.save();

            res.status(200).json(moodToEdit);

        } catch(error) {
            res.status(500).json({ message: "Erreur interne du serveur"});
        }
    },
    
    deleteOne: async (req, res) => {
        const id = req.params.id;
        try {
            const moodToRemove = await Mood.findByPk(id);
            if (!moodToRemove)
                return res.status(404).json({ message : `Aucun mood trouvé avec l'ID ${id}`});
            moodToRemove.destroy();
            res.status(200).json({ message : `Bien supprimé`});
        } catch(error) {
            res.status(500).json({ message: "Erreur interne du serveur"});
        }
    }
}

module.exports = moodController;