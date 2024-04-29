const { SetList, User, Tune, Band, Costume } = require('../models/index');


const setlistController = {

    getAll : async (req, res) => {
        try {
            const setlists = await SetList.findAll({
                include: Band
            });
            res.status(200).json(setlists);
        } catch(error) {
            res.status(500).json({ message: "Erreur interne du serveur"});
        }
    },

    getOne : async (req, res) => {
        const id = req.params.id;
        try {
            const setlist = await SetList.findByPk(id, {
                include: [
                    Band,
                    Costume,
                    {
                        model: User,
                        as: 'creator_user',
                        attributes: ['id', 'username', 'mail', 'avatar_path']
                    },
                    {
                        model: User,
                        as: 'gig_leader',
                        attributes: ['id', 'username', 'mail', 'avatar_path']
                    },
                    {
                        model: Tune,
                        as: "tunes",
                        attributes: ['id', 'title'],
                        through : { as: 'tune', attributes : ['position'] }
                    }
                ]
            });
            if (!setlist)
                return res.status(404).json({ message: `La setlist avec l'id ${id} n'a pas été trouvée`})
            res.status(200).json(setlist);
        } catch(error) {
            res.status(500).json({ message: "Erreur interne du serveur"});
        }
    },

    createOne : async (req, res) => {
        const {
            title,
            duration,
            band_id,
            costume_id,
            place,
            date,
            user_gig_leader_id,
            user_creator_id,
            list_of_tunes
        } = req.body;

        try {
            const newSetlist = SetList.build({ title, duration, band_id });

            if (costume_id) newSetlist.costume_id = costume_id;
            if (place) newSetlist.place = place;
            if (date) newSetlist.date = date;
            if (user_gig_leader_id) newSetlist.user_gig_leader_id = user_gig_leader_id;
            if (user_creator_id) newSetlist.user_creator_id = user_creator_id;
            
            // List of tunes
            list_of_tunes.forEach(async tune => {
                const tuneToAdd = await Tune.findByPk(tune.tune_id)
                await newSetlist.addTune(tuneToAdd, {
                    through: { position : tune.position }
                });
            });

            await newSetlist.save();
            res.status(201).json(newSetlist);

        } catch(error) {
            res.status(500).json({ message: "Erreur interne du serveur"});
        }
    },

    updateOne : async (req, res) => {
        const setlist_id = req.params.id;
        const {
            title,
            duration,
            band_id,
            costume_id,
            place,
            date,
            user_gig_leader_id,
            user_creator_id,
            list_of_tunes
        } = req.body;

        try {
            const setlist = await SetList.findByPk(setlist_id);
            if (!setlist)
                return res.status(404).json({ message: `La setlist avec l'id ${id} n'a pas été trouvée`})

            if (title) setlist.title = title;
            if (duration) setlist.duration = duration;
            if (band_id) setlist.band_id = band_id;
            if (place) setlist.place = place;
            if (date) setlist.date = date;
            if (costume_id) setlist.costume_id = costume_id;
            if (user_gig_leader_id) setlist.user_gig_leader_id = user_gig_leader_id;
            if (user_creator_id) setlist.user_creator_id = user_creator_id;
            
            // List of tunes
            list_of_tunes.forEach(async tune => {
                const tuneToAdd = await Tune.findByPk(tune.tune_id)
                await setlist.addTune(tuneToAdd, {
                    through: { position : tune.position }
                });
            });

            await setlist.save();
            res.status(201).json(setlist);

        } catch(error) {
            res.status(500).json({ message: "Erreur interne du serveur"});
        }
    },

    deleteOne: async (req, res) => {  
        const id = req.params.id;
        try {
            const setlistToRemove = await SetList.findByPk(id);
            if (!setlistToRemove)
                return res.status(404).json({ message : `Aucune setlist trouvée avec l'ID ${id}`});
            setlistToRemove.destroy();
            res.status(200).json({ message : `Bien supprimé`});
        } catch(error) {
            res.status(500).json({ message: "Erreur interne du serveur"});
        }
    },
}

module.exports = setlistController;