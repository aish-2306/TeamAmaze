"use client"

import Link from "next/link"

import type React from "react"

import { useEffect, useState } from "react"
import { Mail, Calendar, Edit, MessageSquare, TrendingUp, Tag, RefreshCw } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Header from "@/components/header"
import { useAuth } from "@/contexts/auth-context"
import { useForum } from "@/contexts/forum-context"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { getInitials } from "@/lib/utils"

export default function ProfilePage() {
  const { user, loading, updateUser } = useAuth()
  const { questions, answers } = useForum()
  const router = useRouter()
  const { toast } = useToast()
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  })
  const [showAvatarDialog, setShowAvatarDialog] = useState(false)
  const [customAvatarUrl, setCustomAvatarUrl] = useState("")

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/signin")
    } else if (user) {
      setFormData({
        name: user.name,
        email: user.email,
      })
      setCustomAvatarUrl(user.avatar || "")
    }
  }, [user, loading, router])

  const handleSave = () => {
    updateUser(formData)
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    })
    setEditing(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleAvatarSave = () => {
    updateUser({ avatar: customAvatarUrl })
    toast({
      title: "Avatar updated",
      description: "Your avatar has been successfully updated.",
    })
    setShowAvatarDialog(false)
  }

  const generateNewAvatar = () => {
    if (user?.name) {
      const newSeed = `${user.name}-${Date.now()}` // Add timestamp for unique avatar
      setCustomAvatarUrl(`https://api.dicebear.com/7.x/initials/svg?seed=${newSeed}`)
    }
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!user) {
    return null
  }

  const userQuestionsCount = questions.filter((q) => q.authorId === user.id).length
  const userAnswersCount = answers.filter((a) => a.authorId === user.id).length
  const totalVotesReceived =
    questions.filter((q) => q.authorId === user.id).reduce((sum, q) => sum + q.votes, 0) +
    answers.filter((a) => a.authorId === user.id).reduce((sum, a) => sum + a.votes, 0)

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <div className="container py-4 md:py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Profile</h1>
                <p className="text-muted-foreground">Manage your account information</p>
              </div>
              <Button
                variant={editing ? "outline" : "default"}
                onClick={() => setEditing(!editing)}
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
              >
                <Edit className="h-4 w-4 mr-2" />
                {editing ? "Cancel" : "Edit Profile"}
              </Button>
            </div>

            <div className="space-y-6">
              <Card className="bg-card text-card-foreground border-border shadow-sm">
                <CardHeader className="flex flex-col sm:flex-row items-center gap-4 pb-4 border-b border-border">
                  <div className="relative group">
                    <Avatar className="h-20 w-20 border-2 border-primary">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback className="text-3xl bg-primary text-primary-foreground">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute bottom-0 right-0 bg-background rounded-full border border-border p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => setShowAvatarDialog(true)}
                    >
                      <Edit className="h-4 w-4 text-muted-foreground" />
                      <span className="sr-only">Change avatar</span>
                    </Button>
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold">{user.name}</CardTitle>
                    <p className="text-muted-foreground flex items-center gap-1 text-sm">
                      <Mail className="h-4 w-4" />
                      {user.email}
                    </p>
                    <p className="text-muted-foreground flex items-center gap-1 text-sm">
                      <Calendar className="h-4 w-4" />
                      Member Since: {new Date(user.joinDate).toLocaleDateString()}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                  <h3 className="font-semibold text-lg mb-2">Personal Information</h3>
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    {editing ? (
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-input border-input focus:ring-primary focus:border-primary"
                      />
                    ) : (
                      <div className="p-2 bg-muted rounded-md text-sm text-muted-foreground">{user.name}</div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    {editing ? (
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-input border-input focus:ring-primary focus:border-primary"
                      />
                    ) : (
                      <div className="p-2 bg-muted rounded-md text-sm text-muted-foreground">{user.email}</div>
                    )}
                  </div>
                  {editing && (
                    <div className="flex gap-2 pt-4">
                      <Button onClick={handleSave} className="bg-primary text-primary-foreground hover:bg-primary/90">
                        Save Changes
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setEditing(false)}
                        className="bg-transparent border-border text-foreground hover:bg-accent"
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-card text-card-foreground border-border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Account Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="text-center p-4 border rounded-lg bg-muted/50 border-border">
                      <div className="text-2xl font-bold flex items-center justify-center gap-2 text-primary">
                        <MessageSquare className="h-6 w-6" />
                        {userQuestionsCount}
                      </div>
                      <div className="text-sm text-muted-foreground">Questions Asked</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg bg-muted/50 border-border">
                      <div className="text-2xl font-bold flex items-center justify-center gap-2 text-primary">
                        <Tag className="h-6 w-6" />
                        {userAnswersCount}
                      </div>
                      <div className="text-sm text-muted-foreground">Answers Provided</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg bg-muted/50 border-border">
                      <div className="text-2xl font-bold flex items-center justify-center gap-2 text-primary">
                        <TrendingUp className="h-6 w-6" />
                        {totalVotesReceived}
                      </div>
                      <div className="text-sm text-muted-foreground">Total Votes Received</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t py-4 md:py-6 bg-background border-border">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8 px-4">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2024 StackIt. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4 text-foreground">
              About
            </Link>
            <Link href="/privacy" className="text-sm font-medium hover:underline underline-offset-4 text-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm font-medium hover:underline underline-offset-4 text-foreground">
              Terms
            </Link>
          </div>
        </div>
      </footer>

      <Dialog open={showAvatarDialog} onOpenChange={setShowAvatarDialog}>
        <DialogContent className="sm:max-w-[425px] bg-card text-card-foreground border-border">
          <DialogHeader>
            <DialogTitle>Change Avatar</DialogTitle>
            <DialogDescription>Update your profile picture here. Click save when you're done.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-24 w-24 border-2 border-primary">
                <AvatarImage src={customAvatarUrl || user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback className="text-4xl bg-primary text-primary-foreground">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <Button
                variant="outline"
                onClick={generateNewAvatar}
                className="bg-transparent border-border text-foreground hover:bg-accent"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Generate New Avatar
              </Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="avatarUrl">Custom Avatar URL</Label>
              <Input
                id="avatarUrl"
                value={customAvatarUrl}
                onChange={(e) => setCustomAvatarUrl(e.target.value)}
                placeholder="https://example.com/your-avatar.jpg"
                className="bg-input border-input focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAvatarDialog(false)}
              className="bg-transparent border-border text-foreground hover:bg-accent"
            >
              Cancel
            </Button>
            <Button onClick={handleAvatarSave} className="bg-primary text-primary-foreground hover:bg-primary/90">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
