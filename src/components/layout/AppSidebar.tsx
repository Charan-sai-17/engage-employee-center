
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent,
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem 
} from "@/components/ui/sidebar";
import { 
  Users, 
  Calendar, 
  Bell, 
  Briefcase, 
  FileText, 
  User 
} from "lucide-react";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  const location = useLocation();
  
  // Navigation items with their icons and paths
  const mainNavItems = [
    {
      title: "Dashboard",
      href: "/",
      icon: FileText,
    },
    {
      title: "Employees",
      href: "/employees",
      icon: Users,
    },
    {
      title: "Leave Management",
      href: "/leave",
      icon: Calendar,
    },
    {
      title: "Announcements",
      href: "/announcements",
      icon: Bell,
    },
    {
      title: "Recruitment",
      href: "/recruitment",
      icon: Briefcase,
    },
  ];
  
  return (
    <Sidebar>
      <div className="flex flex-col h-full">
        <div className="px-4 py-6">
          <div className="flex items-center gap-2">
            <div className="bg-hr-blue-500 text-white p-1 rounded">
              <Users size={20} />
            </div>
            <h1 className="text-lg font-semibold">HR Portal</h1>
          </div>
        </div>
        
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {mainNavItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild className={cn(
                      location.pathname === item.href && "bg-sidebar-accent"
                    )}>
                      <Link to={item.href} className="flex items-center gap-3">
                        <item.icon size={18} />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        
        <div className="mt-auto p-4 border-t">
          <div className="flex items-center gap-3">
            <div className="bg-hr-gray-200 rounded-full p-1.5">
              <User size={18} />
            </div>
            <div className="text-sm">
              <p className="font-medium">Admin User</p>
              <p className="text-muted-foreground">HR Manager</p>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
