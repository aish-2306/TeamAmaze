"use client"

import { useSearchParams } from "next/navigation"
import { Eye, MessageSquare, ArrowUp, Check } from "lucide-react"
import Link from "next/link"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import { useForum } from "@/contexts/forum-context"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const { questions } = useForum()

  // Filter questions based on search query
  const filteredQuestions = questions.filter((question) => {
    const searchTerm = query.toLowerCase()
    return (
      question.title.toLowerCase().includes(searchTerm) ||
      question.description.toLowerCase().includes(searchTerm) ||
      question.tags.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
      question.author.name.toLowerCase().includes(searchTerm)
    )
  })

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <div className="container py-4 md:py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Search Results</h1>
              <p className="text-muted-foreground">
                {filteredQuestions.length} result{filteredQuestions.length !== 1 ? "s" : ""} for "{query}"
              </p>
            </div>

            {filteredQuestions.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <h2 className="text-xl font-semibold mb-2">No results found</h2>
                <p className="mb-4">Try adjusting your search terms or browse popular questions</p>
                <Link href="/">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Browse Questions</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredQuestions.map((question) => (
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
