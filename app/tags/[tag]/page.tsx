"use client"

import { Eye, MessageSquare, ArrowUp, Check } from "lucide-react"
import Link from "next/link"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import { useForum } from "@/contexts/forum-context"

export default function TagPage({ params }: { params: { tag: string } }) {
  const tagName = decodeURIComponent(params.tag)
  const { questions, tags } = useForum()

  // Find the tag info
  const tagInfo = tags.find((t) => t.name.toLowerCase() === tagName.toLowerCase())

  // Filter questions by tag
  const taggedQuestions = questions.filter((question) =>
    question.tags.some((tag) => tag.toLowerCase() === tagName.toLowerCase()),
  )

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <div className="container py-4 md:py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Badge
                  variant="outline"
                  className="text-lg px-4 py-2 bg-secondary text-secondary-foreground border-border"
                  style={{ borderColor: tagInfo?.color || "hsl(var(--border))" }}
                >
                  {tagName}
                </Badge>
                <span className="text-muted-foreground">
                  {taggedQuestions.length} question{taggedQuestions.length !== 1 ? "s" : ""}
                </span>
              </div>

              {tagInfo && <p className="text-muted-foreground mb-4">{tagInfo.description}</p>}

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent border-border text-foreground hover:bg-accent"
                >
                  Newest
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent border-border text-foreground hover:bg-accent"
                >
                  Active
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent border-border text-foreground hover:bg-accent"
                >
                  Unanswered
                </Button>
              </div>
            </div>

            {taggedQuestions.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <h2 className="text-xl font-semibold mb-2">No questions found</h2>
                <p className="mb-4">Be the first to ask a question with this tag!</p>
                <Link href="/ask">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Ask Question</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {taggedQuestions.map((question) => (
                  <Card
                    key={question.id}
                    className="hover:shadow-md transition-shadow bg-card text-card-foreground border-border"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <Link href={`/questions/${question.id}`} className="hover:underline">
                            <h3 className="text-base md:text-lg font-semibold mb-2 line-clamp-2">{question.title}</h3>
                          </Link>
                          <p className="text-muted-foreground text-sm mb-3 line-clamp-2 md:line-clamp-3">
                            {question.description}
                          </p>
                          <div className="flex flex-wrap gap-1 md:gap-2 mb-3">
                            {question.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="text-xs bg-secondary text-secondary-foreground"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm text-muted-foreground gap-2">
                        <div className="flex items-center gap-3 md:gap-4">
                          <div className="flex items-center gap-1">
                            <ArrowUp className="h-4 w-4 text-primary" />
                            <span>{question.votes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4 text-primary" />
                            <span>{question.answerCount}</span>
                            {question.acceptedAnswerId && <Check className="h-4 w-4 text-green-600" />}
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4 text-primary" />
                            <span>{question.viewCount}</span>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2 text-xs">
                          <span>asked by</span>
                          <Link
                            href={`/users/${question.author.id}`}
                            className="font-medium hover:underline text-primary"
                          >
                            {question.author.name}
                          </Link>
                          <span>({question.author.reputation})</span>
                          <span className="hidden sm:inline">{new Date(question.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
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
