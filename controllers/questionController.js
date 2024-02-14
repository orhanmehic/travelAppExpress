const Question = require('../models/Question')


const questionController = {
    getAllQuestionsFromTravel: async (req,res) =>{
        try {
            const { travelId } = req.params;

            const savedQuestions = await Question.find({ travel: travelId })
                .populate('travel')

            if (!savedQuestions) {
                return res.status(404).json({ error: 'No questions found for this travel' });
            }

            res.json(savedQuestions);
        } catch (error) {
            console.log(error);
            res.status(500).json({error: 'Internal Server Error'});
        }
    },
    addQuestion: async (req,res) =>{
        try{
            const{travelId}=req.params;
            const{question}=req.body;
            if(!question || question===''){
                return res.status(400).json({error:'Question is empty'})
            }
            const newQuestion=new Question({
                text:question,
                travel:travelId
            });
            const savedQuestion = await newQuestion.save();
            return res.status(200).json(savedQuestion)

        }catch (error) {
            console.log(error);
            return res.status(400).json({error:'Internal server error'});
        }
    },
    replyQuestion: async(req,res)=>{
        try {
            const { questionId } = req.params;
            const { reply } = req.body;
            const actualReply=reply[questionId]
            console.log(reply);
            console.log(actualReply);
            const updatedQuestion = await Question.findByIdAndUpdate(
                questionId,
                { response:actualReply },
                { new: true }
            );
            res.json(updatedQuestion);
        } catch (error) {
            console.error('Error updating question:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    deleteQuestion: async(req,res) => {
        try {
            const { questionId } = req.params;
            await Question.findByIdAndDelete(questionId);
            res.json({ message: 'Question deleted successfully' });
        } catch (error) {
            console.error('Error deleting question:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    getAllQuestions: async(req,res) =>{
        try {
            const questions = await Question.find({ $or: [
                    { response: { $eq: "" } }, // Empty string
                    { response: { $eq: null } }  // Null value
                ] });
            res.json(questions);
        } catch (error) {
            console.error('Error fetching questions:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = questionController;