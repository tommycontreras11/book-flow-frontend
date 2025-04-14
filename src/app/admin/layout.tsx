"use client"

import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Book, BookCopy, Building, Building2, FileText, Globe2, Languages, Library, Microscope, UserCircle, Users } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

const mainNavItems = [
  { name: 'Home', href: '/admin', icon: Book },
  { name: 'Authors', href: '/admin/authors', icon: UserCircle },
  { name: 'Books', href: '/admin/books', icon: BookCopy },
  { name: 'Publishers', href: '/admin/publishers', icon: Building2 },
  { name: 'Bibliography Types', href: '/admin/bibliography-types', icon: FileText },
  { name: 'Countries', href: '/admin/countries', icon: Globe2 },
  { name: 'Languages', href: '/admin/languages', icon: Languages },
  { name: 'Sciences', href: '/admin/sciences', icon: Microscope },
  { name: 'Employees', href: '/admin/employees', icon: Building },
  { name: 'Users', href: '/admin/users', icon: Users },
]

const secondaryNavItems = [
  {
    name: 'Requests',
    icon: FileText,
    items: [
      { name: 'All Requests', href: '/admin/requests' },
      { name: 'Pending Requests', href: '/admin/requests/pending' },
    ],
  },
  {
    name: 'Loans Management',
    icon: Library,
    items: [
      { name: 'All Loans', href: '/admin/loans' },
      { name: 'Overdue Loans', href: '/admin/loans/overdue' },
    ],
  },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [openSections, setOpenSections] = useState<string[]>([])

  const toggleSection = (section: string) => {
    setOpenSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    )
  }

  return (
    <div className="flex h-screen">
      <div className="w-64 border-r bg-card">
        <div className="flex h-16 items-center gap-2 px-6 border-b">
          <Library className="h-6 w-6" />
          <span className="text-xl font-semibold">Admin Panel</span>
        </div>
        <ScrollArea className="h-[calc(100vh-4rem)]">
          <div className="space-y-4 py-4">
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                Main Navigation
              </h2>
              <div className="space-y-1">
                {mainNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                      pathname === item.href
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                Management
              </h2>
              <div className="space-y-1">
                {secondaryNavItems.map((section) => (
                  <Collapsible
                    key={section.name}
                    open={openSections.includes(section.name)}
                    onOpenChange={() => toggleSection(section.name)}
                  >
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                      >
                        <section.icon className="mr-2 h-4 w-4" />
                        {section.name}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-6 space-y-1">
                      {section.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            "flex items-center rounded-lg px-3 py-2 text-sm transition-colors",
                            pathname === item.href
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-muted"
                          )}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
      <div className="flex-1">
        <div className="h-16 border-b px-6 flex items-center">
          <h1 className="text-2xl font-semibold">
            {mainNavItems.find(item => item.href === pathname)?.name || 
             secondaryNavItems.flatMap(section => section.items).find(item => item.href === pathname)?.name ||
             'Dashboard'}
          </h1>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  )
}