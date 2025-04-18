"use client"

import { Book, ClipboardList, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"

export default function Navbar() {
  const pathname = usePathname()
  
  const navigation = [
    { name: 'Explore', href: '/', icon: Book },
    { name: 'My Books', href: '/my-books', icon: Book },
    { name: 'My Requests', href: '/my-requests', icon: ClipboardList },
  ]

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2 mr-6">
          <Book className="h-6 w-6" />
          <span className="text-xl font-semibold">BookFlow</span>
        </Link>
        <nav className="flex items-center gap-4 flex-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors",
                pathname === item.href 
                  ? "bg-primary text-primary-foreground" 
                  : "hover:bg-muted"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button variant="outline" size="icon">
            <User className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}