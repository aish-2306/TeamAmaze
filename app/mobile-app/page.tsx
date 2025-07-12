"use client"

import { useState } from "react"
import { Search, Plus, Bell, Menu, MessageSquare, TrendingUp, Users, Tag } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getInitials } from "@/lib/utils"

export default function MobileAppView() {
  const [activeTab, setActiveTab] = useState("home")

  const mockQuestions = [
    {
      id: "1",
      title: "How to implement authentication in Next.js?",
      tags: ["Next.js", "React"],
      author: "John Doe",
      votes: 5,
      answers: 3,
      time: "2h ago",
    },
    {
      id: "2",
      title: "Best practices for React state management?",
      tags: ["React", "JavaScript"],
      author: "Jane Smith",
      votes: 8,
      answers: 2,
      time: "4h ago",
    },
  ]

  // Mock user for mobile app view
  const mockUser = {
    name: "John Doe",
    reputation: 150,
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=John%20Doe",
  }

  return (
    <div className="max-w-sm mx-auto bg-background min-h-screen flex flex-col text-foreground">
      {/* Mobile App Header */}
      <header className="sticky top-0 z-50 bg-background border-b px-4 py-3 border-border">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-primary">
            <MessageSquare className="h-5 w-5" />
            <span>StackIt</span>
          </Link>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative hover:bg-accent">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-xs bg-destructive text-destructive-foreground">
                3
              </Badge>
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-accent">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-background text-foreground border-border">
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-2 mb-6">
                    <MessageSquare className="h-6 w-6 text-primary" />
                    <span className="font-bold text-xl">StackIt</span>
                  </div>

                  <div className="space-y-4">
                    <Link href="/profile" className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={mockUser.avatar || "/placeholder.svg"} alt={mockUser.name} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {getInitials(mockUser.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{mockUser.name}</div>
                        <div className="text-sm text-muted-foreground">{mockUser.reputation} reputation</div>
                      </div>
                    </Link>

                    <div className="space-y-2">
                      <Link href="/my-questions" className="block p-3 rounded-lg hover:bg-accent">
                        My Questions
                      </Link>
                      <Link href="/saved" className="block p-3 rounded-lg hover:bg-accent">
                        Saved Questions
                      </Link>
                      <Link href="/settings" className="block p-3 rounded-lg hover:bg-accent">
                        Settings
                      </Link>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search questions..."
              className="pl-10 bg-input border-input focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-4">
        {activeTab === "home" && (
          <div className="space-y-4">
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3">
              <Card className="text-center bg-card text-card-foreground border-border">
                <CardContent className="p-3">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <MessageSquare className="h-4 w-4 text-primary" />
                    <span className="text-lg font-bold">1.2K</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Questions</div>
                </CardContent>
              </Card>
              <Card className="text-center bg-card text-card-foreground border-border">
                <CardContent className="p-3">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="text-lg font-bold">456</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Users</div>
                </CardContent>
              </Card>
              <Card className="text-center bg-card text-card-foreground border-border">
                <CardContent className="p-3">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Tag className="h-4 w-4 text-primary" />
                    <span className="text-lg font-bold">89</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Tags</div>
                </CardContent>
              </Card>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              <Button
                variant="default"
                size="sm"
                onClick={() => setActiveTab("home")}
                className="whitespace-nowrap bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Latest
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="whitespace-nowrap bg-transparent border-border text-foreground hover:bg-accent"
              >
                Trending
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="whitespace-nowrap bg-transparent border-border text-foreground hover:bg-accent"
              >
                Unanswered
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="whitespace-nowrap bg-transparent border-border text-foreground hover:bg-accent"
              >
                My Tags
              </Button>
            </div>

            {/* Questions List */}
            <div className="space-y-3">
              {mockQuestions.map((question) => (
                <Card
                  key={question.id}
                  className="hover:shadow-sm transition-shadow bg-card text-card-foreground border-border"
                >
                  <CardContent className="p-4">
                    <Link href={`/questions/${question.id}`}>
                      <h3 className="font-medium text-sm mb-2 line-clamp-2">{question.title}</h3>
                    </Link>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {question.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs px-2 py-0.5 bg-secondary text-secondary-foreground"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3 text-primary" />
                          {question.votes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3 text-primary" />
                          {question.answers}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>{question.author}</span>
                        <span>•</span>
                        <span>{question.time}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="border-t bg-background px-4 py-2 border-border">
        <div className="flex items-center justify-around">
          <Button
            variant={activeTab === "home" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("home")}
            className={`flex-col h-12 w-16 ${activeTab === "home" ? "bg-primary text-primary-foreground" : "bg-transparent text-muted-foreground hover:bg-accent"}`}
          >
            <MessageSquare className="h-4 w-4 mb-1" />
            <span className="text-xs">Home</span>
          </Button>

          <Button
            variant={activeTab === "search" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("search")}
            className={`flex-col h-12 w-16 ${activeTab === "search" ? "bg-primary text-primary-foreground" : "bg-transparent text-muted-foreground hover:bg-accent"}`}
          >
            <Search className="h-4 w-4 mb-1" />
            <span className="text-xs">Search</span>
          </Button>

          <Link href="/ask">
            <Button size="sm" className="flex-col h-12 w-16 bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="h-4 w-4 mb-1" />
              <span className="text-xs">Ask</span>
            </Button>
          </Link>

          <Button
            variant={activeTab === "notifications" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("notifications")}
            className={`flex-col h-12 w-16 relative ${activeTab === "notifications" ? "bg-primary text-primary-foreground" : "bg-transparent text-muted-foreground hover:bg-accent"}`}
          >
            <Bell className="h-4 w-4 mb-1" />
            <span className="text-xs">Alerts</span>
            <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-xs bg-destructive text-destructive-foreground">
              3
            </Badge>
          </Button>

          <Button
            variant={activeTab === "profile" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("profile")}
            className={`flex-col h-12 w-16 ${activeTab === "profile" ? "bg-primary text-primary-foreground" : "bg-transparent text-muted-foreground hover:bg-accent"}`}
          >
            <Avatar className="h-4 w-4 mb-1">
              <AvatarImage src={mockUser.avatar || "/placeholder.svg"} alt={mockUser.name} />
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                {getInitials(mockUser.name)}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs">Profile</span>
          </Button>
        </div>
      </nav>
    </div>
  )
}
