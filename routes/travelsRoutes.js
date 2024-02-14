const express = require('express');
const travelController = require('../controllers/travelController');
const questionController = require('../controllers/questionController')
const router = express.Router();


router.get('/travels', travelController.getActiveTravels);
router.get('/travels/admin', travelController.getAllTravels);
router.get('/travels/:userId', travelController.getMyTravels);
router.post('/travels/:travelId/signUp', travelController.travelSignUp)
router.get('/travels/:travelId/signedUp', travelController.checkSignUp)
router.post('/travels', travelController.addTravel)
router.delete('/travels/:travelId', travelController.deleteTravel)

/*router.get('/travels/questions/questions', questionController.getAllQuestions)
router.get('/travels/:travelId/questions', questionController.getAllQuestionsFromTravel);
router.delete('/travels/questions/:questionId', questionController.deleteQuestion)
router.post('/travels/questions/:questionId', questionController.replyQuestion)
router.post('/travels/:travelId/questions/addQuestion', questionController.addQuestion);
*/

module.exports=router;