"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import type { Question, Answer, Vote, Notification, Tag } from "@/types/forum"

interface ForumContextType {
  questions: Question[]
  answers: Answer[]
  votes: Vote[]
  notifications: Notification[]
  tags: Tag[]
  addQuestion: (
    question: Omit<Question, "id" | "createdAt" | "updatedAt" | "votes" | "viewCount" | "answerCount">,
  ) => void
  addAnswer: (answer: Omit<Answer, "id" | "createdAt" | "updatedAt" | "votes" | "isAccepted">) => void
  voteOnItem: (targetId: string, targetType: "question" | "answer", voteType: "up" | "down", userId: string) => void
  acceptAnswer: (answerId: string, questionId: string) => void
  markNotificationAsRead: (notificationId: string) => void
  getQuestionById: (id: string) => Question | undefined
  getAnswersByQuestionId: (questionId: string) => Answer[]
  getUserVote: (targetId: string, userId: string) => Vote | undefined
  incrementViewCount: (questionId: string) => void
  unreadNotificationCount: number
}

const ForumContext = createContext<ForumContextType | undefined>(undefined)

// Mock data
const mockTags: Tag[] = [
  {
    id: "1",
    name: "React",
    description: "A JavaScript library for building user interfaces",
    questionCount: 45,
    color: "#61DAFB",
  },
  { id: "2", name: "JavaScript", description: "Programming language of the web", questionCount: 78, color: "#F7DF1E" },
  { id: "3", name: "TypeScript", description: "Typed superset of JavaScript", questionCount: 32, color: "#3178C6" },
  { id: "4", name: "Next.js", description: "React framework for production", questionCount: 28, color: "#000000" },
  { id: "5", name: "CSS", description: "Styling language for web pages", questionCount: 56, color: "#1572B6" },
]

const initialQuestions: Question[] = [
  {
    id: "1",
    title: "How to implement authentication in Next.js?",
    description:
      "I'm building a Next.js application and need to implement user authentication. What are the best practices?",
    tags: ["Next.js", "React", "JavaScript"],
    authorId: "1",
    author: {
      id: "1",
      email: "john@example.com",
      name: "John Doe",
      role: "user",
      reputation: 150,
      joinDate: "2024-01-01",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=John%20Doe",
    },
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    votes: 5,
    viewCount: 123,
    answerCount: 3,
    status: "open",
  },
  {
    id: "2",
    title: "Best practices for React state management?",
    description:
      "What are the current best practices for managing state in React applications? Should I use Context API, Redux, or something else?",
    tags: ["React", "JavaScript"],
    authorId: "2",
    author: {
      id: "2",
      email: "jane@example.com",
      name: "Jane Smith",
      role: "user",
      reputation: 89,
      joinDate: "2024-01-05",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Jane%20Smith",
    },
    createdAt: "2024-01-14T15:30:00Z",
    updatedAt: "2024-01-14T15:30:00Z",
    votes: 8,
    viewCount: 89,
    answerCount: 2,
    acceptedAnswerId: "2",
    status: "open",
  },
]

const initialAnswers: Answer[] = [
  {
    id: "1",
    questionId: "1",
    content:
      "You can use NextAuth.js for authentication in Next.js. It supports multiple providers and is easy to set up.",
    authorId: "2",
    author: {
      id: "2",
      email: "jane@example.com",
      name: "Jane Smith",
      role: "user",
      reputation: 89,
      joinDate: "2024-01-05",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Jane%20Smith",
    },
    createdAt: "2024-01-15T11:00:00Z",
    updatedAt: "2024-01-15T11:00:00Z",
    votes: 3,
    isAccepted: false,
  },
  {
    id: "2",
    questionId: "2",
    content:
      "For most applications, React Context API is sufficient. Use Redux only for complex state management needs.",
    authorId: "1",
    author: {
      id: "1",
      email: "john@example.com",
      name: "John Doe",
      role: "user",
      reputation: 150,
      joinDate: "2024-01-01",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=John%20Doe",
    },
    createdAt: "2024-01-14T16:00:00Z",
    updatedAt: "2024-01-14T16:00:00Z",
    votes: 5,
    isAccepted: true,
  },
]

export function ForumProvider({ children }: { children: React.ReactNode }) {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions)
  const [answers, setAnswers] = useState<Answer[]>(initialAnswers)
  const [votes, setVotes] = useState<Vote[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [tags] = useState<Tag[]>(mockTags)

  const addQuestion = (
    questionData: Omit<Question, "id" | "createdAt" | "updatedAt" | "votes" | "viewCount" | "answerCount">,
  ) => {
    const newQuestion: Question = {
      ...questionData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      votes: 0,
      viewCount: 0,
      answerCount: 0,
    }
    setQuestions((prev) => [newQuestion, ...prev])
  }

  const addAnswer = (answerData: Omit<Answer, "id" | "createdAt" | "updatedAt" | "votes" | "isAccepted">) => {
    const newAnswer: Answer = {
      ...answerData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      votes: 0,
      isAccepted: false,
    }
    setAnswers((prev) => [...prev, newAnswer])

    // Update question answer count
    setQuestions((prev) =>
      prev.map((q) => (q.id === answerData.questionId ? { ...q, answerCount: q.answerCount + 1 } : q)),
    )

    // Create notification for question author
    const question = questions.find((q) => q.id === answerData.questionId)
    if (question && question.authorId !== answerData.authorId) {
      const notification: Notification = {
        id: Date.now().toString(),
        userId: question.authorId,
        type: "answer",
        title: "New Answer",
        message: `${answerData.author.name} answered your question: ${question.title}`,
        read: false,
        createdAt: new Date().toISOString(),
        relatedId: answerData.questionId,
      }
      setNotifications((prev) => [notification, ...prev])
    }
  }

  const voteOnItem = (targetId: string, targetType: "question" | "answer", voteType: "up" | "down", userId: string) => {
    const existingVote = votes.find((v) => v.targetId === targetId && v.userId === userId)

    if (existingVote) {
      if (existingVote.type === voteType) {
        // Remove vote
        setVotes((prev) => prev.filter((v) => v.id !== existingVote.id))
        updateVoteCount(targetId, targetType, voteType === "up" ? -1 : 1)
      } else {
        // Change vote
        setVotes((prev) => prev.map((v) => (v.id === existingVote.id ? { ...v, type: voteType } : v)))
        updateVoteCount(targetId, targetType, voteType === "up" ? 2 : -2)
      }
    } else {
      // Add new vote
      const newVote: Vote = {
        id: Date.now().toString(),
        userId,
        targetId,
        targetType,
        type: voteType,
      }
      setVotes((prev) => [...prev, newVote])
      updateVoteCount(targetId, targetType, voteType === "up" ? 1 : -1)
    }
  }

  const updateVoteCount = (targetId: string, targetType: "question" | "answer", change: number) => {
    if (targetType === "question") {
      setQuestions((prev) => prev.map((q) => (q.id === targetId ? { ...q, votes: q.votes + change } : q)))
    } else {
      setAnswers((prev) => prev.map((a) => (a.id === targetId ? { ...a, votes: a.votes + change } : a)))
    }
  }

  const acceptAnswer = (answerId: string, questionId: string) => {
    setAnswers((prev) =>
      prev.map((a) => ({
        ...a,
        isAccepted: a.id === answerId ? true : a.questionId === questionId ? false : a.isAccepted,
      })),
    )

    setQuestions((prev) => prev.map((q) => (q.id === questionId ? { ...q, acceptedAnswerId: answerId } : q)))
  }

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n)))
  }

  const getQuestionById = (id: string) => questions.find((q) => q.id === id)
  const getAnswersByQuestionId = (questionId: string) => answers.filter((a) => a.questionId === questionId)
  const getUserVote = (targetId: string, userId: string) =>
    votes.find((v) => v.targetId === targetId && v.userId === userId)

  const incrementViewCount = (questionId: string) => {
    setQuestions((prev) => prev.map((q) => (q.id === questionId ? { ...q, viewCount: q.viewCount + 1 } : q)))
  }

  const unreadNotificationCount = notifications.filter((n) => !n.read).length

  return (
    <ForumContext.Provider
      value={{
        questions,
        answers,
        votes,
        notifications,
        tags,
        addQuestion,
        addAnswer,
        voteOnItem,
        acceptAnswer,
        markNotificationAsRead,
        getQuestionById,
        getAnswersByQuestionId,
        getUserVote,
        incrementViewCount,
        unreadNotificationCount,
      }}
    >
      {children}
    </ForumContext.Provider>
  )
}

export function useForum() {
  const context = useContext(ForumContext)
  if (context === undefined) {
    throw new Error("useForum must be used within a ForumProvider")
  }
  return context
}
