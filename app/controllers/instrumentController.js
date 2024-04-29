const { Instrument, User, Tune } = require('../models/index');

const instrumentController = {

    getAllInstruments: async (req, res) => {
        try {
            const instruments = await Instrument.findAll();
            res.status(200).json(instruments);

        } catch(error) {
            res.status(500).json({ message: "Erreur interne du serveur"});
        }
    },

    getOneInstrument: async (req, res) => {
        try {
            const id = req.params.id;
            const instrument = await Instrument.findByPk(id, {
                include: [
                    User,
                    {
                        model: Tune,
                        as: 'is_not_needed_for',
                        attributes: ['id', 'title'],
                        through : { attributes : [] }
                    }
                ]
            });
            
            if (!instrument)
                return res.status(404).json({ message: `L'instrument avec l'id ${id} n'a pas été trouvé`})
            res.status(200).json(instrument);

        } catch(error) {
            res.status(500).json({ message: "Erreur interne du serveur"});
        }
    },
    
    createOneInstrument: async (req, res) => {
        const { name, family } = req.body;
        try {
            const newInstrument = Instrument.build({ name });
            if (family) newInstrument.family = family;
            await newInstrument.save();
            res.status(201).json(newInstrument);

        } catch(error) {
            res.status(500).json({ message: "Erreur interne du serveur"});
        }
    },
    
    updateOneInstrument: async (req, res) => {
        const { name, family } = req.body;
        const id = req.params.id;
        try {
            const instrumentToEdit = await Instrument.findByPk(id);
            if (!instrumentToEdit)
                return res.status(404).json({ message : `Aucun instrument trouvé avec l'ID ${id}`})

            if (name) instrumentToEdit.name = name;
            if (family) instrumentToEdit.family = family;
            await instrumentToEdit.save();

            res.status(200).json(instrumentToEdit);

        } catch(error) {
            res.status(500).json({ message: "Erreur interne du serveur"});
        }
    },
    
    deleteOneInstrument: async (req, res) => {
        const id = req.params.id;
        try {
            const instrumentToRemove = await Instrument.findByPk(id);
            if (!instrumentToRemove)
                return res.status(404).json({ message : `Aucun instrument trouvé avec l'ID ${id}`});
            instrumentToRemove.destroy();
            res.status(200).json({ message : `Bien supprimé`});
        } catch(error) {
            res.status(500).json({ message: "Erreur interne du serveur"});
        }
    },

    addUser: async (req, res) => {
        const user_id = req.params.id;
        const { instrument_id } = req.body;
        try {
            const userToEdit = await User.findByPk(user_id);
            const instrumentToEdit = await Instrument.findByPk(instrument_id);
            
            instrumentToEdit.addUser(userToEdit);
            
            res.status(200).json({ message: "Bien effectué"});
        } catch(error) {
            res.status(500).json({ message: "Erreur interne du serveur"});
        } 
    },

    removeUser: async (req, res) => {
        const user_id = req.params.id;
        const { instrument_id } = req.body;
        try {
            const userToEdit = await User.findByPk(user_id);
            const instrumentToEdit = await Instrument.findByPk(instrument_id);
            instrumentToEdit.removeUser(userToEdit);
            
            res.status(200).json({ message: "Bien effectué"});
        } catch(error) {
            res.status(500).json({ message: "Erreur interne du serveur"});
        }
    },

    addTuneNotNeedingIt : async (req, res) => {
        const instrument_id = req.params.id;
        const { tune_id } = req.body;
        try {
            const tuneTarget = await Tune.findByPk(tune_id);
            const instrumentTarget = await Instrument.findByPk(instrument_id);
            instrumentTarget.addTune(tuneTarget);
            
            res.status(200).json({ message: "Bien effectué"});
        } catch(error) {
            res.status(500).json({ message: "Erreur interne du serveur"});
        }
    },

    removeTuneNotNeedingIt : async (req, res) => {
        const instrument_id = req.params.id;
        const { tune_id } = req.body;
        try {
            const tuneTarget = await Tune.findByPk(tune_id);
            const instrumentTarget = await Instrument.findByPk(instrument_id);
            instrumentTarget.removeTune(tuneTarget);
            
            res.status(200).json({ message: "Bien effectué"});
        } catch(error) {
            res.status(500).json({ message: "Erreur interne du serveur"});
        }
    }
}

module.exports = instrumentController;