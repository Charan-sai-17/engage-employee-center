
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { announcements, Announcement } from "@/data/mockData";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Bell, BellPlus, ClipboardEdit } from "lucide-react";

export default function Announcements() {
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [newAnnouncementOpen, setNewAnnouncementOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [viewAnnouncementOpen, setViewAnnouncementOpen] = useState(false);

  // Filter announcements
  const filteredAnnouncements = announcements.filter((announcement) => {
    return categoryFilter === "all" || announcement.category === categoryFilter;
  });

  // Sort announcements by date (newest first)
  const sortedAnnouncements = [...filteredAnnouncements].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Get priority badge
  const getPriorityBadge = (priority: Announcement["priority"]) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-hr-red-500">High</Badge>;
      case "medium":
        return <Badge className="bg-hr-amber-500">Medium</Badge>;
      case "low":
        return <Badge className="bg-hr-green-500">Low</Badge>;
      default:
        return null;
    }
  };

  // Get category badge
  const getCategoryBadge = (category: Announcement["category"]) => {
    switch (category) {
      case "general":
        return <Badge variant="outline">General</Badge>;
      case "event":
        return <Badge variant="outline" className="border-purple-500 text-purple-500">Event</Badge>;
      case "policy":
        return <Badge variant="outline" className="border-hr-blue-500 text-hr-blue-500">Policy</Badge>;
      case "it":
        return <Badge variant="outline" className="border-hr-gray-500 text-hr-gray-500">IT</Badge>;
      case "other":
        return <Badge variant="outline">Other</Badge>;
      default:
        return null;
    }
  };

  const handleViewAnnouncement = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setViewAnnouncementOpen(true);
  };

  return (
    <PageLayout title="Announcements">
      <div className="animate-fade-in">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold">Company Announcements</h2>
          <Button
            className="bg-hr-blue-500 hover:bg-hr-blue-600 gap-2"
            onClick={() => setNewAnnouncementOpen(true)}
          >
            <BellPlus size={16} />
            New Announcement
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="event">Event</SelectItem>
                <SelectItem value="policy">Policy</SelectItem>
                <SelectItem value="it">IT</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedAnnouncements.length > 0 ? (
            sortedAnnouncements.map((announcement) => (
              <Card key={announcement.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle>{announcement.title}</CardTitle>
                    {getPriorityBadge(announcement.priority)}
                  </div>
                  <CardDescription>
                    Posted on {new Date(announcement.date).toLocaleDateString()} by {announcement.author}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="line-clamp-3">{announcement.content}</p>
                </CardContent>
                <CardFooter className="flex justify-between pt-4 border-t">
                  <div>{getCategoryBadge(announcement.category)}</div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewAnnouncement(announcement)}
                  >
                    Read More
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-2 flex flex-col items-center justify-center p-12 border rounded-lg bg-muted/10">
              <Bell size={48} className="text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No announcements found</h3>
              <p className="text-muted-foreground text-center">
                There are no announcements matching your filter criteria.
              </p>
            </div>
          )}
        </div>

        {/* View Announcement Dialog */}
        <Dialog open={viewAnnouncementOpen} onOpenChange={setViewAnnouncementOpen}>
          {selectedAnnouncement && (
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <div className="flex justify-between items-center gap-4">
                  <DialogTitle>{selectedAnnouncement.title}</DialogTitle>
                  {getPriorityBadge(selectedAnnouncement.priority)}
                </div>
                <DialogDescription>
                  Posted on {new Date(selectedAnnouncement.date).toLocaleDateString()} by {selectedAnnouncement.author}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="prose max-w-none">
                  <p>{selectedAnnouncement.content}</p>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <span className="text-sm text-muted-foreground">Category:</span>
                  {getCategoryBadge(selectedAnnouncement.category)}
                </div>
              </div>

              <DialogFooter className="gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <ClipboardEdit size={16} />
                  Edit
                </Button>
                <Button onClick={() => setViewAnnouncementOpen(false)}>Close</Button>
              </DialogFooter>
            </DialogContent>
          )}
        </Dialog>

        {/* New Announcement Dialog */}
        <Dialog open={newAnnouncementOpen} onOpenChange={setNewAnnouncementOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Announcement</DialogTitle>
              <DialogDescription>
                Create a new announcement to share with the company.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Title
                </label>
                <Input id="title" placeholder="Announcement title" />
              </div>

              <div className="space-y-2">
                <label htmlFor="content" className="text-sm font-medium">
                  Content
                </label>
                <Textarea id="content" placeholder="Write your announcement here..." rows={6} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="priority" className="text-sm font-medium">
                    Priority
                  </label>
                  <Select defaultValue="low">
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="category" className="text-sm font-medium">
                    Category
                  </label>
                  <Select defaultValue="general">
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="event">Event</SelectItem>
                      <SelectItem value="policy">Policy</SelectItem>
                      <SelectItem value="it">IT</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setNewAnnouncementOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-hr-blue-500 hover:bg-hr-blue-600" onClick={() => setNewAnnouncementOpen(false)}>
                Post Announcement
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </PageLayout>
  );
}
