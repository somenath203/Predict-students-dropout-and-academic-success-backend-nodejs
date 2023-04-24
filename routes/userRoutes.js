const router = require('express').Router();

const { registerUser, loginUser, userProfile } = require('../controllers/userControllers');
const { postPredictionController, getAllPredictions } = require('../controllers/predictionResult');
const { auth } = require('./../middlewares/authMiddleware');


router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/profile', auth, userProfile);
router.post('/postpredresult', auth, postPredictionController);
router.post('/getAllPredResult', auth, getAllPredictions);


module.exports = router;