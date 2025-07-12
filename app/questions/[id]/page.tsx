"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowUp, ArrowDown, Check, Eye, Calendar, User } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import Header from "@/components/header"
import RichTextEditor from "@/components/rich-text-editor"
import { useAuth } from "@/contexts/auth-context"
import { useForum } from "@/contexts/forum-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getInitials } from "@/lib/utils"

export default function QuestionDetailPage() {
  const params = useParams()
  const questionId = params.id as string
  const router = useRouter()
  const { toast } = useToast()
  const { user, loading: authLoading } = useAuth()
  const {
    getQuestionById,
    getAnswersByQuestionId,
    addAnswer,
    voteOnItem,
    getUserVote,
    acceptAnswer,
    incrementViewCount,
  } = useForum()

  const [question, setQuestion] = useState(getQuestionById(questionId))
  const [answers, setAnswers] = useState(getAnswersByQuestionId(questionId))
  const [newAnswerContent, setNewAnswerContent] = useState("")
  const [submittingAnswer, setSubmittingAnswer] = useState(false)

  useEffect(() => {
    if (!question) {
      // If question is not found initially, try to fetch again or redirect
      const foundQuestion = getQuestionById(questionId)
      if (foundQuestion) {
        setQuestion(foundQuestion)
        setAnswers(getAnswersByQuestionId(questionId))
        incrementViewCount(questionId) // Increment view count on load
      } else if (!authLoading) {
        // Only redirect if auth is not loading, to prevent premature redirects
        toast({
          title: "Question not found",
          description: "The question you are looking for does not exist.",
          variant: "destructive",
        })
        router.replace("/")
      }
    } else {
      // Ensure answers are up-to-date if question already exists
      setAnswers(getAnswersByQuestionId(questionId))
      incrementViewCount(questionId) // Increment view count on load
    }
  }, [questionId, getQuestionById, getAnswersByQuestionId, router, toast, authLoading, question, incrementViewCount])

  const handlePostAnswer = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to post an answer",
        variant: "destructive",
      })
      return
    }
    if (newAnswerContent.length < 50) {
      toast({
        title: "Answer too short",
        description: "Your answer must be at least 50 characters long.",
        variant: "destructive",
      })
      return
    }

    setSubmittingAnswer(true)
    try {
      addAnswer({
        questionId: questionId,
        content: newAnswerContent,
        authorId: user.id,
        author: user,
      })
      setNewAnswerContent("")
      toast({
        title: "Answer posted!",
        description: "Your answer has been successfully added.",
      })
      // Re-fetch answers to update the list
      setAnswers(getAnswersByQuestionId(questionId))
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to post answer. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSubmittingAnswer(false)
    }
  }

  const handleVote = (targetId: string, targetType: "question" | "answer", voteType: "up" | "down") => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to vote",
        variant: "destructive",
      })
      return
    }
    voteOnItem(targetId, targetType, voteType, user.id)
    // Re-fetch question/answers to update vote counts
    setQuestion(getQuestionById(questionId))
    setAnswers(getAnswersByQuestionId(questionId))
  }

  const handleAcceptAnswer = (answerId: string) => {
    if (!user || user.id !== question?.authorId) {
      toast({
        title: "Permission denied",
        description: "Only the question author can accept an answer.",
        variant: "destructive",
      })
      return
    }
    acceptAnswer(answerId, questionId)
    toast({
      title: "Answer accepted!",
      description: "This answer has been marked as accepted.",
    })
    // Re-fetch answers to update accepted status
    setAnswers(getAnswersByQuestionId(questionId))
    setQuestion(getQuestionById(questionId)) // Update question to show acceptedAnswerId
  }

  if (authLoading || !question) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  const questionUserVote = user ? getUserVote(question.id, user.id) : undefined

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <div className="container py-4 md:py-8 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Question Section */}
            <Card className="mb-6 bg-card text-card-foreground border-border shadow-sm">
              <CardHeader className="pb-4 border-b border-border">
                <h1 className="text-xl md:text-2xl font-bold mb-2">{question.title}</h1>
                <div className="flex flex-wrap gap-2 mb-3">
                  {question.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-secondary text-secondary-foreground">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {question.viewCount} views
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Asked {new Date(question.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <Link href={`/users/${question.author.id}`} className="flex items-center gap-1 hover:underline">
                    <User className="h-4 w-4" />
                    {question.author.name} ({question.author.reputation})
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="pt-4 flex">
                {/* Voting */}
                <div className="flex flex-col items-center gap-2 mr-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleVote(question.id, "question", "up")}
                    className={`hover:bg-accent ${questionUserVote?.type === "up" ? "text-primary" : ""}`}
                  >
                    <ArrowUp className="h-5 w-5" />
                  </Button>
                  <span className="text-lg font-semibold">{question.votes}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleVote(question.id, "question", "down")}
                    className={`hover:bg-accent ${questionUserVote?.type === "down" ? "text-primary" : ""}`}
                  >
                    <ArrowDown className="h-5 w-5" />
                  </Button>
                </div>
                {/* Question Content */}
                <div className="prose max-w-none flex-1" dangerouslySetInnerHTML={{ __html: question.description }} />
              </CardContent>
            </Card>

            {/* Answers Section */}
            <h2 className="text-xl md:text-2xl font-bold mb-4">{answers.length} Answers</h2>
            <div className="space-y-4">
              {answers.map((answer) => {
                const answerUserVote = user ? getUserVote(answer.id, user.id) : undefined
                return (
                  <Card key={answer.id} className="bg-card text-card-foreground border-border shadow-sm">
                    <CardContent className="pt-4 flex">
                      {/* Voting and Accept */}
                      <div className="flex flex-col items-center gap-2 mr-4">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleVote(answer.id, "answer", "up")}
                          className={`hover:bg-accent ${answerUserVote?.type === "up" ? "text-primary" : ""}`}
                        >
                          <ArrowUp className="h-5 w-5" />
                        </Button>
                        <span className="text-lg font-semibold">{answer.votes}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleVote(answer.id, "answer", "down")}
                          className={`hover:bg-accent ${answerUserVote?.type === "down" ? "text-primary" : ""}`}
                        >
                          <ArrowDown className="h-5 w-5" />
                        </Button>
                        {question.authorId === user?.id && !question.acceptedAnswerId && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleAcceptAnswer(answer.id)}
                            className="mt-2 text-green-600 hover:bg-green-100"
                            title="Accept this answer"
                          >
                            <Check className="h-6 w-6" />
                          </Button>
                        )}
                        {answer.isAccepted && <Check className="h-6 w-6 text-green-600 mt-2" title="Accepted Answer" />}
                      </div>
                      {/* Answer Content */}
                      <div className="flex-1">
                        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: answer.content }} />
                        <Separator className="my-4 bg-border" />
                        <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={answer.author.avatar || "/placeholder.svg"} alt={answer.author.name} />
                            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                              {getInitials(answer.author.name)}
                            </AvatarFallback>
                          </Avatar>
                          <Link href={`/users/${answer.author.id}`} className="font-medium hover:underline">
                            {answer.author.name}
                          </Link>
                          <span>({answer.author.reputation})</span>
                          <span>•</span>
                          <span>answered {new Date(answer.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Post Answer Section */}
            <Card className="mt-6 bg-card text-card-foreground border-border shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Your Answer</CardTitle>
              </CardHeader>
              <CardContent>
                <RichTextEditor
                  value={newAnswerContent}
                  onChange={setNewAnswerContent}
                  placeholder="Write your answer here. Be detailed and helpful!"
                  className="min-h-[150px] bg-input border-input focus-within:ring-1 focus-within:ring-primary focus-within:border-primary"
                />
                <Button
                  onClick={handlePostAnswer}
                  disabled={submittingAnswer}
                  className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {submittingAnswer ? "Posting..." : "Post Your Answer"}
                </Button>
              </CardContent>
            </Card>
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
    </div>
  )
}
