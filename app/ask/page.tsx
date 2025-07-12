"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { X, HelpCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import Header from "@/components/header"
import RichTextEditor from "@/components/rich-text-editor"
import { useAuth } from "@/contexts/auth-context"
import { useForum } from "@/contexts/forum-context"

export default function AskQuestionPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { user, loading } = useAuth()
  const { addQuestion, tags: availableTags } = useForum()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/signin")
    }
  }, [user, loading, router])

  const addTag = (tagName: string) => {
    const trimmedTag = tagName.trim()
    if (trimmedTag && !tags.includes(trimmedTag) && tags.length < 5) {
      setTags([...tags, trimmedTag])
      setTagInput("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleTagInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      addTag(tagInput)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to ask a question",
        variant: "destructive",
      })
      return
    }

    if (title.length < 10) {
      toast({
        title: "Title too short",
        description: "Title must be at least 10 characters long",
        variant: "destructive",
      })
      return
    }

    if (description.length < 20) {
      toast({
        title: "Description too short",
        description: "Description must be at least 20 characters long",
        variant: "destructive",
      })
      return
    }

    if (tags.length === 0) {
      toast({
        title: "Tags required",
        description: "Please add at least one tag",
        variant: "destructive",
      })
      return
    }

    setSubmitting(true)

    try {
      addQuestion({
        title,
        description,
        tags,
        authorId: user.id,
        author: user,
        status: "open",
      })

      toast({
        title: "Question posted!",
        description: "Your question has been successfully posted",
      })

      router.push("/")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to post question. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <div className="container py-4 md:py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 md:mb-8">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Ask a Question</h1>
              <p className="text-muted-foreground text-sm md:text-base">
                Get help from the community by asking a clear, detailed question
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <Card className="bg-card text-card-foreground border-border shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <HelpCircle className="h-5 w-5 text-primary" />
                    Question Title
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Label htmlFor="title" className="text-sm">
                    Be specific and imagine you're asking a question to another person
                  </Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. How to implement authentication in Next.js?"
                    className="mt-2 bg-input border-input focus:ring-primary focus:border-primary"
                    maxLength={150}
                  />
                  <div className="text-xs md:text-sm text-muted-foreground mt-1">{title.length}/150 characters</div>
                </CardContent>
              </Card>

              <Card className="bg-card text-card-foreground border-border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Question Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <Label className="text-sm">
                    Include all the information someone would need to answer your question
                  </Label>
                  <div className="mt-2">
                    <RichTextEditor
                      value={description}
                      onChange={setDescription}
                      placeholder="Provide details about your question. Include what you've tried, what you've expected to happen, and what actually happened."
                      className="min-h-[200px] md:min-h-[300px] bg-input border-input focus-within:ring-1 focus-within:ring-primary focus-within:border-primary"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card text-card-foreground border-border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <Label htmlFor="tags" className="text-sm">
                    Add up to 5 tags to describe what your question is about
                  </Label>
                  <div className="mt-2">
                    <Input
                      id="tags"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleTagInputKeyDown}
                      placeholder="e.g. react, javascript, typescript"
                      disabled={tags.length >= 5}
                      className="bg-input border-input focus:ring-primary focus:border-primary"
                    />
                    <div className="text-xs md:text-sm text-muted-foreground mt-1">
                      Press Enter or comma to add a tag
                    </div>
                  </div>

                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="flex items-center gap-1 text-xs bg-secondary text-secondary-foreground"
                        >
                          {tag}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0 hover:bg-transparent text-muted-foreground hover:text-foreground"
                            onClick={() => removeTag(tag)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="mt-4">
                    <Label className="text-sm font-medium">Popular tags:</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {availableTags.slice(0, 8).map((tag) => (
                        <Button
                          key={tag.id}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addTag(tag.name)}
                          disabled={tags.includes(tag.name) || tags.length >= 5}
                          className="h-7 text-xs bg-transparent border-border text-foreground hover:bg-accent"
                        >
                          {tag.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {submitting ? "Posting..." : "Post Question"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  className="w-full sm:w-auto bg-transparent border-border text-foreground hover:bg-accent"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
