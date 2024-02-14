const express = require('express');

const questionController = require('../controllers/questionController')
const router = express.Router();


router.delete('/questions/:questionId', questionController.deleteQuestion)
router.post('/questions/:questionId', questionController.replyQuestion)
router.post('/questions/:travelId/addQuestion', questionController.addQuestion);
router.get('/questions', questionController.getAllQuestions)
router.get('/questions/:travelId', questionController.getAllQuestionsFromTravel);

module.exports=router