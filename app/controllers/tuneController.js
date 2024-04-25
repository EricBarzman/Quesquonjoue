const { Tune } = require('../models/index');
const { Style } = require('../models/index');

const tuneController = {

    getAll: async (req, res) => {
        try {
            const tunes = await Tune.findAll({ include: Style });
            res.status(200).json(tunes);
        } catch(error) {
            res.status(500).json({ message: "Erreur interne du serveur"});
        }
    },

    getOne: async (req, res) => {
        try {
            const id = req.params.id;
            const tune = await Tune.findByPk(id, {
                include: Style
            });
            
            if (!tune)
                return res.status(404).json({ message: `Le morceau avec l'id ${id} n'a pas été trouvé`})
            res.status(200).json(tune);

        } catch(error) {
            res.status(500).json({ message: "Erreur interne du serveur"});
        }
    },
    
    createOne: async (req, res) => {
        const { title, duration, has_solo, place, date, is_tiresome, partition_path } = req.body;
        try {
            const newTune = Tune.build({ title, style_id });
            if (duration) newTune.duration = duration;
            if (place) newTune.place = place;
            if (date) newTune.date = date;
            if (has_solo) newTune.has_solo = has_solo;
            if (is_tiresome) newTune.is_tiresome = is_tiresome;
            if (partition_path) newTune.partition_path = partition_path;
            
            await newTune.save();
            res.status(201).json(newTune);

        } catch(error) {
            res.status(500).json({ message: "Erreur interne du serveur"});
        }
    },
    
    updateOne: async (req, res) => {
        const { title, duration, place, date, has_solo, is_tiresome, partition_path, style_id } = req.body;
        const id = req.params.id;
        try {
            const tuneToEdit = await Tune.findByPk(id);
            if (!tuneToEdit)
                return res.status(404).json({ message : `Aucun morceau trouvé avec l'ID ${id}`})

            // Title
            if (title) tuneToEdit.title = title;
            // Duration
            if (duration) tuneToEdit.duration = duration;
            // Place
            if (place) tuneToEdit.place = place;
            // Date
            if (date) tuneToEdit.date = date;
            // Solo?
            if (typeof has_solo !== 'undefined') tuneToEdit.has_solo = has_solo;
            // Tiresome?
            if (typeof is_tiresome !== 'undefined') tuneToEdit.is_tiresome = is_tiresome;
            // Partition
            if (partition_path) tuneToEdit.partition_path = partition_path;

            // Change associated Style
            if (style_id) {
                tuneToEdit.style_id = style_id;
            }

            await tuneToEdit.save();
            res.status(200).json(tuneToEdit);

        } catch(error) {
            res.status(500).json({ message: "Erreur interne du serveur"});
        }
    },
    
    deleteOne: async (req, res) => {
        const id = req.params.id;
        try {
            const tuneToRemove = await Tune.findByPk(id);
            if (!tuneToRemove)
                return res.status(404).json({ message : `Aucun morceau trouvé avec l'ID ${id}`});
            tuneToRemove.destroy();
            res.status(200).json({ message : `Bien supprimé`});
        } catch(error) {
            res.status(500).json({ message: "Erreur interne du serveur"});
        }
    }
}

module.exports = tuneController;