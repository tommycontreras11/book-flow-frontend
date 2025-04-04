"use client"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@/components/ui/sidebar"
import { IAppSidebarMainNavItemProps } from "@/interfaces/sidebar.interface"

export function MainNav({
  items,
}: {
  items: IAppSidebarMainNavItemProps[]
}) {
  const { isMobile } = useSidebar()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Main Nav</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <a href={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
