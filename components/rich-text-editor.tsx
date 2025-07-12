"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  LinkIcon,
  ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Smile,
  MoreHorizontal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export default function RichTextEditor({ value, onChange, placeholder, className }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [showLinkDialog, setShowLinkDialog] = useState(false)
  const [linkUrl, setLinkUrl] = useState("")
  const [showMoreTools, setShowMoreTools] = useState(false)

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value
    }
  }, [value])

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const insertLink = () => {
    if (linkUrl) {
      execCommand("createLink", linkUrl)
      setLinkUrl("")
      setShowLinkDialog(false)
    }
  }

  const insertEmoji = (emoji: string) => {
    execCommand("insertText", emoji)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = `<img src="${e.target?.result}" alt="Uploaded image" style="max-width: 100%; height: auto;" />`
        execCommand("insertHTML", img)
      }
      reader.readAsDataURL(file)
    }
  }

  const commonEmojis = ["😀", "😂", "😍", "🤔", "👍", "👎", "❤️", "🔥", "💯", "🎉"]

  return (
    <div className={`border rounded-lg ${className}`}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b bg-muted/50 border-border">
        {/* Primary Tools - Always Visible */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => execCommand("bold")}
          className="h-8 w-8 p-0 hover:bg-accent"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => execCommand("italic")}
          className="h-8 w-8 p-0 hover:bg-accent"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => execCommand("strikeThrough")}
          className="h-8 w-8 p-0 hover:bg-accent"
        >
          <Strikethrough className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => execCommand("insertUnorderedList")}
          className="h-8 w-8 p-0 hover:bg-accent"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => execCommand("insertOrderedList")}
          className="h-8 w-8 p-0 hover:bg-accent"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>

        {/* Mobile: Show more tools in popover */}
        <div className="md:hidden">
          <Popover open={showMoreTools} onOpenChange={setShowMoreTools}>
            <PopoverTrigger asChild>
              <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-accent">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 bg-popover text-popover-foreground border-border" align="end">
              <div className="grid grid-cols-4 gap-2">
                <Popover open={showLinkDialog} onOpenChange={setShowLinkDialog}>
                  <PopoverTrigger asChild>
                    <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-accent">
                      <LinkIcon className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 bg-popover text-popover-foreground border-border">
                    <div className="space-y-2">
                      <Input
                        placeholder="Enter URL"
                        value={linkUrl}
                        onChange={(e) => setLinkUrl(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && insertLink()}
                        className="bg-input border-input focus:ring-primary focus:border-primary"
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={insertLink}
                          className="bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                          Insert Link
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setShowLinkDialog(false)}
                          className="bg-transparent border-border text-foreground hover:bg-accent"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                <label className="cursor-pointer">
                  <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-accent" asChild>
                    <span>
                      <ImageIcon className="h-4 w-4" />
                    </span>
                  </Button>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => execCommand("justifyLeft")}
                  className="h-8 w-8 p-0 hover:bg-accent"
                >
                  <AlignLeft className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => execCommand("justifyCenter")}
                  className="h-8 w-8 p-0 hover:bg-accent"
                >
                  <AlignCenter className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => execCommand("justifyRight")}
                  className="h-8 w-8 p-0 hover:bg-accent"
                >
                  <AlignRight className="h-4 w-4" />
                </Button>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-accent">
                      <Smile className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 bg-popover text-popover-foreground border-border">
                    <div className="grid grid-cols-5 gap-2">
                      {commonEmojis.map((emoji) => (
                        <Button
                          key={emoji}
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => insertEmoji(emoji)}
                          className="h-8 w-8 p-0 text-lg hover:bg-accent"
                        >
                          {emoji}
                        </Button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Desktop: Show all tools */}
        <div className="hidden md:flex items-center gap-1">
          <div className="w-px h-6 bg-border mx-1" />

          <Popover open={showLinkDialog} onOpenChange={setShowLinkDialog}>
            <PopoverTrigger asChild>
              <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-accent">
                <LinkIcon className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-popover text-popover-foreground border-border">
              <div className="space-y-2">
                <Input
                  placeholder="Enter URL"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && insertLink()}
                  className="bg-input border-input focus:ring-primary focus:border-primary"
                />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={insertLink}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Insert Link
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowLinkDialog(false)}
                    className="bg-transparent border-border text-foreground hover:bg-accent"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <label className="cursor-pointer">
            <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-accent" asChild>
              <span>
                <ImageIcon className="h-4 w-4" />
              </span>
            </Button>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>

          <div className="w-px h-6 bg-border mx-1" />

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand("justifyLeft")}
            className="h-8 w-8 p-0 hover:bg-accent"
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand("justifyCenter")}
            className="h-8 w-8 p-0 hover:bg-accent"
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand("justifyRight")}
            className="h-8 w-8 p-0 hover:bg-accent"
          >
            <AlignRight className="h-4 w-4" />
          </Button>

          <div className="w-px h-6 bg-border mx-1" />

          <Popover>
            <PopoverTrigger asChild>
              <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-accent">
                <Smile className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 bg-popover text-popover-foreground border-border">
              <div className="grid grid-cols-5 gap-2">
                {commonEmojis.map((emoji) => (
                  <Button
                    key={emoji}
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => insertEmoji(emoji)}
                    className="h-8 w-8 p-0 text-lg hover:bg-accent"
                  >
                    {emoji}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="min-h-[200px] p-3 md:p-4 focus:outline-none text-sm md:text-base"
        style={{ wordBreak: "break-word" }}
        data-placeholder={placeholder}
        suppressContentEditableWarning={true}
      />

      <style jsx>{`
      [contenteditable]:empty:before {
        content: attr(data-placeholder);
        color: hsl(var(--muted-foreground));
        pointer-events: none;
      }
    `}</style>
    </div>
  )
}
