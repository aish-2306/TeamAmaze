import Link from "next/link"
import { Eye, MessageSquare, ArrowUp, Check, TrendingUp, Tag } from "lucide-react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import { useForum } from "@/contexts/forum-context"

export default function Home() {
  const { questions, tags: popularTags } = useForum()

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <div className="container py-4 md:py-8 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 md:mb-6 gap-4">
                <h1 className="text-xl md:text-2xl font-bold">Latest Questions</h1>
                <div className="flex gap-2 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 sm:flex-none bg-transparent border-border text-foreground hover:bg-accent"
                  >
                    Newest
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 sm:flex-none bg-transparent border-border text-foreground hover:bg-accent"
                  >
                    Active
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 sm:flex-none bg-transparent border-border text-foreground hover:bg-accent"
                  >
                    Unanswered
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {questions.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <p className="mb-4">No questions posted yet. Be the first to ask!</p>
                    <Link href="/ask">
                      <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Ask a Question</Button>
                    </Link>
                  </div>
                ) : (
                  questions.map((question) => (
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
                            <span className="hidden sm:inline">
                              {new Date(question.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4 md:space-y-6">
              {/* Mobile Stats Cards */}
              <div className="grid grid-cols-2 gap-4 lg:hidden">
                <Card className="bg-card text-card-foreground border-border">
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <MessageSquare className="h-5 w-5 text-primary" />
                      <span className="text-2xl font-bold">{questions.length}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">Questions</div>
                  </CardContent>
                </Card>
                <Card className="bg-card text-card-foreground border-border">
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Tag className="h-5 w-5 text-primary" />
                      <span className="text-2xl font-bold">{popularTags.length}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">Tags</div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-card text-card-foreground border-border">
                <CardHeader>
                  <h3 className="font-semibold flex items-center gap-2">
                    <Tag className="h-4 w-4 text-primary" />
                    Popular Tags
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {popularTags.map((tag) => (
                      <Link
                        key={tag.id}
                        href={`/tags/${tag.name.toLowerCase()}`}
                        className="flex items-center justify-between p-2 rounded hover:bg-accent transition-colors"
                      >
                        <Badge
                          variant="outline"
                          style={{ borderColor: tag.color }}
                          className="text-xs bg-secondary text-secondary-foreground"
                        >
                          {tag.name}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{tag.questionCount}</span>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Desktop Stats */}
              <Card className="hidden lg:block bg-card text-card-foreground border-border">
                <CardHeader>
                  <h3 className="font-semibold flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    Community Stats
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Questions</span>
                      <span className="font-medium">{questions.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Answers</span>
                      <span className="font-medium">{questions.reduce((sum, q) => sum + q.answerCount, 0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Tags</span>
                      <span className="font-medium">{popularTags.length}</span>
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
    </div>
  )
}
