
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

export function Header({ title }: { title: string }) {
  return (
    <div className="sticky top-0 z-30 flex items-center justify-between w-full h-16 px-4 border-b bg-background">
      <h1 className="text-xl font-semibold">{title}</h1>
      
      <div className="flex items-center space-x-4">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search..." className="pl-8" />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-auto">
              <DropdownMenuItem className="flex flex-col items-start cursor-pointer py-2">
                <p className="font-medium">New Leave Request</p>
                <p className="text-sm text-muted-foreground">John Doe requested annual leave</p>
                <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start cursor-pointer py-2">
                <p className="font-medium">New Job Application</p>
                <p className="text-sm text-muted-foreground">3 new applications for Frontend Developer</p>
                <p className="text-xs text-muted-foreground mt-1">5 hours ago</p>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start cursor-pointer py-2">
                <p className="font-medium">Announcement Posted</p>
                <p className="text-sm text-muted-foreground">Summer office party announced</p>
                <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center font-medium text-hr-blue-500">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
