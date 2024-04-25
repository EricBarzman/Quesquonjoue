const instrumentController = require('../controllers/instrumentController');
const styleController = require('../controllers/styleController');
const bandController = require('../controllers/bandController');
const costumeController = require('../controllers/costumeController');
const userController = require('../controllers/userController');
const tuneController = require('../controllers/tuneController');

const express = require('express');
const router = express.Router();

/* USER */
router.get('/users/', userController.getAll);
router.get('/users/:id', userController.getOne);
router.post('/users/', userController.signIn);
router.patch('/users/:id', userController.updateOne);
router.delete('/users/:id', userController.deleteOne);

// A garder ?
// Association User-Band
router.post('/users/:id/add-band', bandController.addUser);
router.post('/users/:id/remove-band', bandController.removeUser);

// Association User-Instrument
router.post('/users/:id/add-instrument', instrumentController.addUser);
router.post('/users/:id/remove-instrument', instrumentController.removeUser);

/* BANDS */
router.get('/bands/', bandController.getAll);
router.get('/bands/:id', bandController.getOne);
router.post('/bands/', bandController.createOne);
router.patch('/bands/:id', bandController.updateOne);
router.delete('/bands/:id', bandController.deleteOne);

/* INSTRUMENTS */
router.get('/instruments/', instrumentController.getAllInstruments);
router.get('/instruments/:id', instrumentController.getOneInstrument);
router.post('/instruments/', instrumentController.createOneInstrument);
router.patch('/instruments/:id', instrumentController.updateOneInstrument);
router.delete('/instruments/:id', instrumentController.deleteOneInstrument);

/* STYLES */
router.get('/styles/', styleController.getAll);
router.get('/styles/:id', styleController.getOne);
router.post('/styles/', styleController.createOne);
router.patch('/styles/:id', styleController.updateOne);
router.delete('/styles/:id', styleController.deleteOne);

/* MOODS */


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

module.exports = router;