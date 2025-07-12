export interface User {
  id: string
  email: string
  name: string
  role: "user" | "admin"
  reputation: number
  joinDate: string // ISO string
  avatar?: string // Optional avatar URL
}

export interface Question {
  id: string
  title: string
  description: string
  tags: string[]
  authorId: string
  author: User
  createdAt: string // ISO string
  updatedAt: string // ISO string
  votes: number
  viewCount: number
  answerCount: number
  status: "open" | "closed" | "answered"
  acceptedAnswerId?: string
}

export interface Answer {
  id: string
  questionId: string
  content: string
  authorId: string
  author: User
  createdAt: string // ISO string
  updatedAt: string // ISO string
  votes: number
  isAccepted: boolean
}

export interface Comment {
  id: string
  content: string
  authorId: string
  author: User
  createdAt: string // ISO string
  updatedAt: string // ISO string
  parentId: string // ID of the question or answer it belongs to
  parentType: "question" | "answer"
}

export interface Vote {
  id: string
  userId: string
  targetId: string // ID of the question or answer being voted on
  targetType: "question" | "answer"
  type: "up" | "down"
}

export interface Notification {
  id: string
  userId: string
  type: "answer" | "vote" | "mention" | "system"
  title: string
  message: string
  read: boolean
  createdAt: string // ISO string
  relatedId?: string // ID of the related question/answer
}

export interface Tag {
  id: string
  name: string
  description: string
  questionCount: number
  color?: string // Hex color for the tag badge
}

export interface Product {
  id: number
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  category: string
  sale: boolean
  stock: number
}

export interface Order {
  id: string
  userId: string
  items: { productId: number; quantity: number; price: number }[]
  total: number
  status: "pending" | "completed" | "cancelled"
  createdAt: string
}
