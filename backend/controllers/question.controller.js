const Session = require("../models/session.model")
const Question = require("../models/question.model")

const addQuestionsToSession = async (req, res) => {
  try {
    const { sessionId, questions } = req.body

    if (!sessionId || !questions || !Array.isArray(questions)) {
      return res.status(400).json({ message: "Invalid input data" })
    }

    const session = await Session.findById(sessionId)

    if (!session) {
      return res
        .status(400)
        .json({ success: false, message: "Session not found" })
    }

    // create new question
    const createdQuestions = await Question.insertMany(
      questions.map((q) => ({
        session: sessionId,
        question: q.question,
        answer: q.answer,
      })),
    )

    session.questions.push(...createdQuestions.map((q) => q._id))

    await session.save()

    res.status(201).json(createdQuestions)
  } catch (error) {
    console.log(error)

    res.status(500).json({ success: false, message: "Server Error" })
  }
}

const togglePinQuestion = async (req, res) => {}

const updateQuestionNote = async (req, res) => {}

module.exports = {
  addQuestionsToSession,
  togglePinQuestion,
  updateQuestionNote,
}
