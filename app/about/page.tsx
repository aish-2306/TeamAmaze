import Link from "next/link"
import { MessageSquare, Users, Target, Heart } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <div className="container py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-4 text-primary">
                <MessageSquare className="h-8 w-8" />
                <h1 className="text-4xl font-bold">About StackIt</h1>
              </div>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                A community-driven Q&A platform where developers help developers solve problems and share knowledge.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card className="bg-card text-card-foreground border-border shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Target className="h-5 w-5" />
                    Our Mission
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    To create a collaborative environment where developers of all skill levels can ask questions, share
                    knowledge, and learn from each other. We believe that the best solutions come from community
                    collaboration.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card text-card-foreground border-border shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Users className="h-5 w-5" />
                    Our Community
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    StackIt brings together developers, designers, and tech enthusiasts from around the world. Our
                    community values respect, helpfulness, and continuous learning.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-6">How It Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">1</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Ask Questions</h3>
                  <p className="text-muted-foreground">
                    Post detailed questions about programming challenges you're facing.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">2</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Get Answers</h3>
                  <p className="text-muted-foreground">
                    Receive helpful answers from experienced developers in the community.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">3</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Share Knowledge</h3>
                  <p className="text-muted-foreground">
                    Help others by answering questions and sharing your expertise.
                  </p>
                </div>
              </div>
            </div>

            <Card className="text-center bg-card text-card-foreground border-border shadow-sm">
              <CardContent className="pt-6">
                <Heart className="h-12 w-12 text-destructive mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">Join Our Community</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Whether you're a beginner looking for help or an expert ready to share your knowledge, StackIt is the
                  place for you. Join thousands of developers who are already part of our community.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/auth/signup">
                    <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Get Started
                    </Button>
                  </Link>
                  <Link href="/">
                    <Button
                      variant="outline"
                      size="lg"
                      className="bg-transparent border-border text-foreground hover:bg-accent"
                    >
                      Browse Questions
                    </Button>
                  </Link>
                </div>
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
