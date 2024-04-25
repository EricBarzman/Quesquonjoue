const { Style } = require('../models/index');

const styleController = {

    getAll: async (req, res) => {
        try {
            const styles = await Style.findAll();
            res.status(200).json(styles);
        } catch(error) {
            res.status(500).json({ message: "Erreur interne du serveur"});
        }
    },

    getOne: async (req, res) => {
        try {
            const id = req.params.id;
            const style = await Style.findByPk(id);
            
            if (!style)
                return res.status(404).json({ message: `Le style avec l'id ${id} n'a pas été trouvé`})
            res.status(200).json(style);

        } catch(error) {
            res.status(500).json({ message: "Erreur interne du serveur"});
        }
    },
    
    createOne: async (req, res) => {
        const { name } = req.body;
        try {
            const newstyle = await Style.create({ name });
            res.status(201).json(newstyle);

        } catch(error) {
            res.status(500).json({ message: "Erreur interne du serveur"});
        }
    },
    
    updateOne: async (req, res) => {
        const { name } = req.body;
        const id = req.params.id;
        try {
            const styleToEdit = await Style.findByPk(id);
            if (!styleToEdit)
                return res.status(404).json({ message : `Aucun style trouvé avec l'ID ${id}`})

            if (name) styleToEdit.name = name;
            await styleToEdit.save();

            res.status(200).json(styleToEdit);

        } catch(error) {
            res.status(500).json({ message: "Erreur interne du serveur"});
        }
    },
    
    deleteOne: async (req, res) => {
        const id = req.params.id;
        try {
            const styleToRemove = await Style.findByPk(id);
            if (!styleToRemove)
                return res.status(404).json({ message : `Aucun style trouvé avec l'ID ${id}`});
            styleToRemove.destroy();
            res.status(200).json({ message : `Bien supprimé`});
        } catch(error) {
            res.status(500).json({ message: "Erreur interne du serveur"});
        }
    }
}

module.exports = styleController;