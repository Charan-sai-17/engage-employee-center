
import { ReactNode } from "react";
import { AppSidebar } from "./AppSidebar";
import { Header } from "./Header";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

interface PageLayoutProps {
  children: ReactNode;
  title: string;
}

export function PageLayout({ children, title }: PageLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header title={title} />
          <div className="p-4 md:p-6 flex-1">
            <SidebarTrigger className="mb-4 lg:hidden" />
            <main>{children}</main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
