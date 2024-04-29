const instrumentController = require('../controllers/instrumentController');
const styleController = require('../controllers/styleController');
const bandController = require('../controllers/bandController');
const costumeController = require('../controllers/costumeController');
const userController = require('../controllers/userController');
const tuneController = require('../controllers/tuneController');
const moodController = require('../controllers/moodController');
const setlistController = require('../controllers/setlistController');

const express = require('express');
const router = express.Router();

/* USER */

// Sign in
router.post('/users/', userController.signIn);

// CRUD
router.get('/users/', userController.getAll);
router.get('/users/:id', userController.getOne);
router.patch('/users/:id', userController.updateOne);
router.delete('/users/:id', userController.deleteOne);
// Add/Remove a band from the user
router.post('/users/:id/add-band', bandController.addUser);
router.post('/users/:id/remove-band', bandController.removeUser);
// Add/Remove an instrument the user plays
router.post('/users/:id/add-instrument', instrumentController.addUser);
router.post('/users/:id/remove-instrument', instrumentController.removeUser);


/* BANDS */

// CRUD
router.get('/bands/', bandController.getAll);
router.get('/bands/:id', bandController.getOne);
router.post('/bands/', bandController.createOne);
router.patch('/bands/:id', bandController.updateOne);
router.delete('/bands/:id', bandController.deleteOne);
// Get all the tunes of a band
router.get('/bands/:id/tunes', bandController.getAllTunesOfABand);

/* INSTRUMENTS */
router.get('/instruments/', instrumentController.getAllInstruments);
router.get('/instruments/:id', instrumentController.getOneInstrument);
router.post('/instruments/', instrumentController.createOneInstrument);
router.patch('/instruments/:id', instrumentController.updateOneInstrument);
router.delete('/instruments/:id', instrumentController.deleteOneInstrument);
// Association instrument pas requis dans tune
router.post('/instruments/:id/add-tune', instrumentController.addTuneNotNeedingIt);
router.post('/instruments/:id/remove-tune', instrumentController.removeTuneNotNeedingIt);

/* STYLES */
router.get('/styles/', styleController.getAll);
router.get('/styles/:id', styleController.getOne);
router.post('/styles/', styleController.createOne);
router.patch('/styles/:id', styleController.updateOne);
router.delete('/styles/:id', styleController.deleteOne);

/* MOODS */
router.get('/moods/', moodController.getAll);
router.get('/moods/:id', moodController.getOne);
router.post('/moods/', moodController.createOne);
router.patch('/moods/:id', moodController.updateOne);
router.delete('/moods/:id', moodController.deleteOne);

/* COSTUMES */
router.get('/costumes/', costumeController.getAll);
router.get('/costumes/:id', costumeController.getOne);
router.post('/costumes/', costumeController.createOne);
router.patch('/costumes/:id', costumeController.updateOne);
router.delete('/costumes/:id', costumeController.deleteOne);

/* TUNES */
router.get('/tunes/', tuneController.getAll);
router.get('/tunes/:id', tuneController.getOne);
router.post('/tunes/', tuneController.createOne);
router.patch('/tunes/:id', tuneController.updateOne);
router.delete('/tunes/:id', tuneController.deleteOne);

/* SETLISTS */
router.get('/setlists/', setlistController.getAll);
router.get('/setlists/:id', setlistController.getOne);
router.post('/setlists/', setlistController.createOne);
router.patch('/setlists/:id', setlistController.updateOne);
router.delete('/setlists/:id', setlistController.deleteOne);

module.exports = router;