"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

interface User {
  id: string
  email: string
  name: string
  role: "user" | "admin"
  reputation: number
  joinDate: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ success: boolean; message: string }>
  signUp: (email: string, password: string, name: string) => Promise<{ success: boolean; message: string }>
  signOut: () => void
  updateUser: (updates: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Simulate loading user from local storage or a session
    const storedUser = localStorage.getItem("currentUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]")
    const foundUser = storedUsers.find((u: User) => u.email === email && u.password === password) // password check is simplified

    if (foundUser) {
      const loggedInUser: User = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role,
        reputation: foundUser.reputation,
        joinDate: foundUser.joinDate,
        avatar: foundUser.avatar,
      }
      setUser(loggedInUser)
      localStorage.setItem("currentUser", JSON.stringify(loggedInUser))
      setLoading(false)
      return { success: true, message: "Signed in successfully!" }
    } else {
      setLoading(false)
      return { success: false, message: "Invalid email or password." }
    }
  }

  const signUp = async (email: string, password: string, name: string) => {
    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]")
    const userExists = storedUsers.some((u: User) => u.email === email)

    if (userExists) {
      setLoading(false)
      return { success: false, message: "User with this email already exists." }
    }

    const newUser: User & { password?: string } = {
      id: Date.now().toString(),
      email,
      name,
      role: "user",
      reputation: 0,
      joinDate: new Date().toISOString(),
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`, // Generate initial avatar
      password, // In a real app, hash this password
    }

    const updatedUsers = [...storedUsers, newUser]
    localStorage.setItem("users", JSON.stringify(updatedUsers))

    const loggedInUser: User = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
      reputation: newUser.reputation,
      joinDate: newUser.joinDate,
      avatar: newUser.avatar,
    }
    setUser(loggedInUser)
    localStorage.setItem("currentUser", JSON.stringify(loggedInUser))
    setLoading(false)
    return { success: true, message: "Account created successfully!" }
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem("currentUser")
    toast({
      title: "Signed out",
      description: "You have been signed out.",
    })
  }

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
      localStorage.setItem("currentUser", JSON.stringify(updatedUser))

      // Also update in the 'users' array in local storage
      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]")
      const updatedUsers = storedUsers.map((u: User) => (u.id === user.id ? { ...u, ...updates } : u))
      localStorage.setItem("users", JSON.stringify(updatedUsers))
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
