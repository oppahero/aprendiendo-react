import confetti from 'canvas-confetti'
import { create } from 'zustand'
import { type Question } from '../types.d'

// ?Persist. permite sincronizar el storage en el local storage
// ?Para usarlo solo hay que envolver el callback del state
import { devtools, persist } from 'zustand/middleware'

interface State {
  questions: Question[]
  currentQuestion: number
  fetchQuestions: (limit: number) => Promise<void>
  selectAnswer: (questionId: number, answerIndex: number) => void
  goNextQuestion: () => void
  goPreviousQuestion: () => void
  reset: () => void
}

// const logger = (config) => (set, get, api) => {
//   return config(
//     (...args) => {
//       console.log('applying', args)
//       set(...args)
//     },
//     get,
//     api
//   )
// }

// A través del get podemos acceder al estado
export const useQuestionStore = create<State>()(devtools(persist((set, get) => {
  return {
    questions: [],
    currentQuestion: 0,
    fetchQuestions: async (limit: number) => {
      const res = await fetch('http://localhost:5173/data.json')
      const json = await res.json()

      const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)
      set({ questions }, false, 'FETCH_QUESTIONS')
    },
    selectAnswer: (questionId: number, answerIndex: number) => {
      const { questions } = get()
      const newQuestions = structuredClone(questions)
      // Buscando indice de la pregunta
      const questionIndex = newQuestions.findIndex(q => q.id === questionId)
      // Recuperar info de la pregunta
      const questionInfo = newQuestions[questionIndex]
      const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex

      if (isCorrectUserAnswer) confetti()

      newQuestions[questionIndex] = {
        ...questionInfo,
        isCorrectUserAnswer,
        userSelectedAnswer: answerIndex
      }
      // Actualizar estado
      set({ questions: newQuestions }, false, 'SELECT_ANSWER')
    },
    goNextQuestion: () => {
      const { currentQuestion, questions } = get()
      const nextQuestion = currentQuestion + 1

      if (nextQuestion < questions.length) {
        set({ currentQuestion: nextQuestion }, false, 'NEXT_PAGE')
      }
    },
    goPreviousQuestion: () => {
      const { currentQuestion } = get()
      const previousQuestion = currentQuestion - 1

      if (previousQuestion >= 0) {
        set({ currentQuestion: previousQuestion }, false, 'PREV_PAGE')
      }
    },
    reset: () => {
      set({ currentQuestion: 0, questions: [] }, false, 'RESET')
    }
  }
}, { name: 'quesions' })))
