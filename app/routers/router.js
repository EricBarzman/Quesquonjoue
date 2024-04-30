const instrumentController = require('../controllers/instrumentController');
const styleController = require('../controllers/styleController');
const bandController = require('../controllers/bandController');
const costumeController = require('../controllers/costumeController');
const userController = require('../controllers/userController');
const tuneController = require('../controllers/tuneController');
const moodController = require('../controllers/moodController');
const setlistController = require('../controllers/setlistController');

const auth = require('../middlewares/authorization');
const admin = require('../middlewares/admin');

const express = require('express');
const router = express.Router();


/* USER */

// Sign in
router.post('/users/', userController.signIn);
// Log in
router.post('/login/', userController.logIn);


router.get('/users/', userController.getAll);
router.get('/users/:id', userController.getOne);
router.patch('/users/:id', auth, userController.updateOne);
router.delete('/users/:id', auth, userController.deleteOne);

// Add/Remove a band from the user
router.post('/users/:id/add-band', auth, bandController.addUser);
router.post('/users/:id/remove-band', auth, bandController.removeUser);

// Add/Remove an instrument the user plays
router.post('/users/:id/add-instrument', auth, instrumentController.addUser);
router.post('/users/:id/remove-instrument', auth, instrumentController.removeUser);




/* BANDS */

router.get('/bands/', bandController.getAll);
router.get('/bands/:id', bandController.getOne);
router.post('/bands/', auth, bandController.createOne);
router.patch('/bands/:id', auth, bandController.updateOne);
router.delete('/bands/:id', auth, bandController.deleteOne);

// Get all the tunes of a band
router.get('/bands/:id/tunes', auth, bandController.getAllTunesOfABand);



/* INSTRUMENTS */

router.get('/instruments/', instrumentController.getAllInstruments);
router.get('/instruments/:id', instrumentController.getOneInstrument);
router.post('/instruments/', auth, instrumentController.createOneInstrument);
router.patch('/instruments/:id', auth, instrumentController.updateOneInstrument);
router.delete('/instruments/:id', auth, instrumentController.deleteOneInstrument);

// Association instrument pas requis dans tune
router.post('/instruments/:id/add-tune', auth, instrumentController.addTuneNotNeedingIt);
router.post('/instruments/:id/remove-tune', auth, instrumentController.removeTuneNotNeedingIt);



/* STYLES */

router.get('/styles/', styleController.getAll);
router.get('/styles/:id', styleController.getOne);
router.post('/styles/', auth, styleController.createOne);
router.patch('/styles/:id', auth, styleController.updateOne);
router.delete('/styles/:id', auth, styleController.deleteOne);



/* MOODS */

router.get('/moods/', moodController.getAll);
router.get('/moods/:id', moodController.getOne);
router.post('/moods/', auth, moodController.createOne);
router.patch('/moods/:id', auth, moodController.updateOne);
router.delete('/moods/:id', auth, moodController.deleteOne);



/* COSTUMES */

router.get('/costumes/', costumeController.getAll);
router.get('/costumes/:id', costumeController.getOne);
router.post('/costumes/', auth, costumeController.createOne);
router.patch('/costumes/:id', auth, costumeController.updateOne);
router.delete('/costumes/:id', auth, costumeController.deleteOne);



/* TUNES */

router.get('/tunes/', auth, admin, tuneController.getAll);
router.get('/tunes/:id', tuneController.getOne);
router.post('/tunes/', auth, tuneController.createOne);
router.patch('/tunes/:id', auth, tuneController.updateOne);
router.delete('/tunes/:id', auth, tuneController.deleteOne);



/* SETLISTS */

router.get('/setlists/', setlistController.getAll);
router.get('/setlists/:id', setlistController.getOne);
router.post('/setlists/', auth, setlistController.createOne);
router.patch('/setlists/:id', auth, setlistController.updateOne);
router.delete('/setlists/:id', auth, setlistController.deleteOne);



module.exports = router;