const Session = require("../models/session.model")
const Question = require("../models/question.model")

const createSession = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, description, questions } = req.body

    const userId = req.user._id

    const session = await Session.create({
      user: userId,
      role,
      experience,
      topicsToFocus,
      description,
    })

    const questionDocs = await Promise.all(
      questions.map(async (q) => {
        const question = await Question.create({
          session: session._id,
          question: q.question,
          answer: q.answer,
        })

        return question._id
      }),
    )

    session.questions = questionDocs

    await session.save()

    res.status(201).json({ success: true, session })
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" })
  }
}

const getMySessions = async (req, res) => {
  try {
    const session = await Session.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate("questions")

    res.status(200).json(session)
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" })
  }
}

const getSessionsById = async (req, res) => {}

const deleteSession = async (req, res) => {}

module.exports = {
  createSession,
  getMySessions,
  getSessionsById,
  deleteSession,
}
