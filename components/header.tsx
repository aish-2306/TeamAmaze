"use client"

import type React from "react"

import { Bell, Search, User, LogOut, Plus, MessageSquare, Menu } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/contexts/auth-context"
import { useForum } from "@/contexts/forum-context"
import { getInitials } from "@/lib/utils"

export default function Header() {
  const { user, signOut } = useAuth()
  const { notifications, unreadNotificationCount, markNotificationAsRead } = useForum()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleNotificationClick = (notification: any) => {
    markNotificationAsRead(notification.id)
    // Navigate to related content if needed
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-border">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
          <MessageSquare className="h-6 w-6" />
          <span className="hidden sm:block">StackIt</span>
        </Link>

        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <form onSubmit={handleSearch} className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search questions..."
              className="pl-10 w-full bg-input border-input focus:ring-primary focus:border-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <Link href="/ask">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Ask Question
                </Button>
              </Link>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="relative bg-transparent border-border text-foreground hover:bg-accent"
                  >
                    <Bell className="h-5 w-5" />
                    {unreadNotificationCount > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-destructive text-destructive-foreground">
                        {unreadNotificationCount}
                      </Badge>
                    )}
                    <span className="sr-only">Notifications</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 bg-popover text-popover-foreground border-border" align="end">
                  <div className="space-y-2">
                    <h4 className="font-medium">Notifications</h4>
                    {notifications.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No notifications yet</p>
                    ) : (
                      <div className="space-y-2 max-h-80 overflow-y-auto">
                        {notifications.slice(0, 10).map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-2 rounded-lg cursor-pointer hover:bg-muted ${
                              !notification.read ? "bg-accent border-l-2 border-primary" : ""
                            }`}
                            onClick={() => handleNotificationClick(notification)}
                          >
                            <div className="font-medium text-sm">{notification.title}</div>
                            <div className="text-xs text-muted-foreground">{notification.message}</div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {new Date(notification.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </PopoverContent>
              </Popover>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-accent">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="sr-only">User menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-popover text-popover-foreground border-border">
                  <div className="px-2 py-1.5 text-sm font-medium">{user.name}</div>
                  <div className="px-2 py-1.5 text-xs text-muted-foreground">{user.email}</div>
                  <DropdownMenuSeparator className="bg-border" />
                  <DropdownMenuItem asChild className="hover:bg-accent focus:bg-accent">
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="hover:bg-accent focus:bg-accent">
                    <Link href="/my-questions">My Questions</Link>
                  </DropdownMenuItem>
                  {user.role === "admin" && (
                    <DropdownMenuItem asChild className="hover:bg-accent focus:bg-accent">
                      <Link href="/admin">Admin Panel</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator className="bg-border" />
                  <DropdownMenuItem
                    onClick={signOut}
                    className="text-destructive hover:bg-destructive/10 focus:bg-destructive/10"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex gap-2">
              <Link href="/auth/signin">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent border-border text-foreground hover:bg-accent"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center gap-2">
          {user && (
            <>
              {/* Mobile Notifications */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative hover:bg-accent">
                    <Bell className="h-5 w-5" />
                    {unreadNotificationCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-xs bg-destructive text-destructive-foreground">
                        {unreadNotificationCount}
                      </Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 bg-popover text-popover-foreground border-border" align="end">
                  <div className="space-y-2">
                    <h4 className="font-medium">Notifications</h4>
                    {notifications.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No notifications yet</p>
                    ) : (
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {notifications.slice(0, 5).map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-2 rounded-lg cursor-pointer hover:bg-muted ${
                              !notification.read ? "bg-accent border-l-2 border-primary" : ""
                            }`}
                            onClick={() => handleNotificationClick(notification)}
                          >
                            <div className="font-medium text-sm">{notification.title}</div>
                            <div className="text-xs text-muted-foreground line-clamp-2">{notification.message}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </PopoverContent>
              </Popover>

              {/* Mobile Ask Question Button */}
              <Link href="/ask">
                <Button size="icon" className="bg-primary hover:bg-primary/90">
                  <Plus className="h-5 w-5" />
                </Button>
              </Link>
            </>
          )}

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-accent">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-background text-foreground border-border">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
                    <MessageSquare className="h-6 w-6" />
                    <span>StackIt</span>
                  </Link>
                </div>

                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search questions..."
                    className="pl-10 bg-input border-input focus:ring-primary focus:border-primary"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>

                <div className="flex-1 space-y-4">
                  {user ? (
                    <>
                      <div className="border-b pb-4 flex items-center gap-3 border-border">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {getInitials(user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                      </div>

                      <Link href="/ask" onClick={() => setMobileMenuOpen(false)}>
                        <Button className="w-full justify-start bg-primary text-primary-foreground hover:bg-primary/90">
                          <Plus className="mr-2 h-4 w-4" />
                          Ask Question
                        </Button>
                      </Link>

                      <div className="space-y-2">
                        <Link
                          href="/profile"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-2 p-2 rounded hover:bg-accent text-foreground"
                        >
                          <User className="h-4 w-4" />
                          Profile
                        </Link>
                        <Link
                          href="/my-questions"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-2 p-2 rounded hover:bg-accent text-foreground"
                        >
                          <MessageSquare className="h-4 w-4" />
                          My Questions
                        </Link>
                        {user.role === "admin" && (
                          <Link
                            href="/admin"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-2 p-2 rounded hover:bg-accent text-foreground"
                          >
                            <User className="h-4 w-4" />
                            Admin Panel
                          </Link>
                        )}
                      </div>

                      <Button
                        variant="outline"
                        className="w-full justify-start text-destructive border-destructive/50 hover:bg-destructive/10 bg-transparent"
                        onClick={() => {
                          signOut()
                          setMobileMenuOpen(false)
                        }}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <div className="space-y-4">
                      <Link href="/auth/signin" onClick={() => setMobileMenuOpen(false)}>
                        <Button
                          variant="outline"
                          className="w-full bg-transparent border-border text-foreground hover:bg-accent"
                        >
                          Sign In
                        </Button>
                      </Link>
                      <Link href="/auth/signup" onClick={() => setMobileMenuOpen(false)}>
                        <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                          Sign Up
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
