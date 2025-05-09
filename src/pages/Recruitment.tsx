
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { jobListings, JobListing } from "@/data/mockData";
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase, Users, MapPin, CalendarCheck } from "lucide-react";

export default function Recruitment() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [viewJobOpen, setViewJobOpen] = useState(false);
  const [newJobOpen, setNewJobOpen] = useState(false);

  // Get unique departments
  const departments = [...new Set(jobListings.map((job) => job.department))];

  // Filter job listings
  const filteredJobs = jobListings.filter((job) => {
    const matchesStatus = statusFilter === "all" || job.status === statusFilter;
    const matchesDepartment = departmentFilter === "all" || job.department === departmentFilter;
    return matchesStatus && matchesDepartment;
  });

  // Sort job listings by posted date (newest first)
  const sortedJobs = [...filteredJobs].sort(
    (a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
  );

  // Group job listings by status
  const openJobs = jobListings.filter(job => job.status === "open");
  const closedJobs = jobListings.filter(job => job.status === "closed");
  const onHoldJobs = jobListings.filter(job => job.status === "on-hold");

  // Get status badge
  const getStatusBadge = (status: JobListing["status"]) => {
    switch (status) {
      case "open":
        return <Badge className="bg-hr-green-500">Open</Badge>;
      case "closed":
        return <Badge className="bg-hr-gray-500">Closed</Badge>;
      case "on-hold":
        return <Badge variant="outline" className="text-hr-amber-500 border-hr-amber-500">On Hold</Badge>;
      default:
        return null;
    }
  };

  // Get job type badge
  const getTypeBadge = (type: JobListing["type"]) => {
    switch (type) {
      case "full-time":
        return <Badge variant="outline" className="border-hr-blue-500 text-hr-blue-500">Full-time</Badge>;
      case "part-time":
        return <Badge variant="outline" className="border-hr-green-500 text-hr-green-500">Part-time</Badge>;
      case "contract":
        return <Badge variant="outline" className="border-purple-500 text-purple-500">Contract</Badge>;
      case "internship":
        return <Badge variant="outline" className="border-hr-amber-500 text-hr-amber-500">Internship</Badge>;
      default:
        return null;
    }
  };

  const handleViewJob = (job: JobListing) => {
    setSelectedJob(job);
    setViewJobOpen(true);
  };

  const JobCard = ({ job }: { job: JobListing }) => (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle>{job.title}</CardTitle>
          {getStatusBadge(job.status)}
        </div>
        <CardDescription className="flex flex-wrap gap-2 items-center">
          <span className="flex items-center gap-1">
            <Briefcase size={14} />
            {job.department}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <MapPin size={14} />
            {job.location}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="line-clamp-3 text-sm">{job.description}</p>
        <div className="flex items-center gap-2 mt-3">
          <Users size={14} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{job.applicants} applicants</span>
          <span className="text-muted-foreground">•</span>
          <CalendarCheck size={14} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Posted {new Date(job.postedDate).toLocaleDateString()}
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-4 border-t">
        <div>{getTypeBadge(job.type)}</div>
        <Button variant="outline" size="sm" onClick={() => handleViewJob(job)}>
          View Details
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <PageLayout title="Recruitment">
      <div className="animate-fade-in">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold">Job Listings</h2>
          <Button
            className="bg-hr-blue-500 hover:bg-hr-blue-600"
            onClick={() => setNewJobOpen(true)}
          >
            Post New Job
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader className="pb-0">
            <CardTitle>Recruitment Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                <TabsList>
                  <TabsTrigger value="all">All Listings</TabsTrigger>
                  <TabsTrigger value="open">
                    Open
                    <Badge variant="outline" className="ml-2">
                      {openJobs.length}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="on-hold">On Hold</TabsTrigger>
                  <TabsTrigger value="closed">Closed</TabsTrigger>
                </TabsList>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <TabsContent value="all" className="m-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {sortedJobs.length > 0 ? (
                    sortedJobs.map((job) => <JobCard key={job.id} job={job} />)
                  ) : (
                    <div className="col-span-2 flex flex-col items-center justify-center p-12 border rounded-lg bg-muted/10">
                      <Briefcase size={48} className="text-muted-foreground mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No job listings found</h3>
                      <p className="text-muted-foreground text-center">
                        There are no job listings matching your filter criteria.
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="open" className="m-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {openJobs
                    .filter(job => departmentFilter === "all" || job.department === departmentFilter)
                    .map((job) => <JobCard key={job.id} job={job} />)}
                </div>
              </TabsContent>

              <TabsContent value="on-hold" className="m-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {onHoldJobs
                    .filter(job => departmentFilter === "all" || job.department === departmentFilter)
                    .map((job) => <JobCard key={job.id} job={job} />)}
                </div>
              </TabsContent>

              <TabsContent value="closed" className="m-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {closedJobs
                    .filter(job => departmentFilter === "all" || job.department === departmentFilter)
                    .map((job) => <JobCard key={job.id} job={job} />)}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* View Job Dialog */}
      <Dialog open={viewJobOpen} onOpenChange={setViewJobOpen}>
        {selectedJob && (
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <div className="flex justify-between items-center gap-4">
                <DialogTitle>{selectedJob.title}</DialogTitle>
                {getStatusBadge(selectedJob.status)}
              </div>
              <DialogDescription>
                <div className="flex flex-wrap gap-3 mt-2">
                  <span className="flex items-center gap-1">
                    <Briefcase size={14} />
                    {selectedJob.department}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin size={14} />
                    {selectedJob.location}
                  </span>
                  <span>•</span>
                  {getTypeBadge(selectedJob.type)}
                </div>
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Job Description</h3>
                <p>{selectedJob.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Requirements</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {selectedJob.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-6">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Posted Date</p>
                  <p>{new Date(selectedJob.postedDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Applications</p>
                  <p>{selectedJob.applicants} candidates</p>
                </div>
              </div>
            </div>

            <DialogFooter className="gap-2">
              {selectedJob.status === "open" && (
                <Button variant="outline" className="gap-2">
                  View Applicants
                </Button>
              )}
              <Button onClick={() => setViewJobOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>

      {/* New Job Dialog */}
      <Dialog open={newJobOpen} onOpenChange={setNewJobOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Post New Job</DialogTitle>
            <DialogDescription>
              Create a new job listing for candidates to apply.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Job Title
              </label>
              <Input id="title" placeholder="e.g. Senior Frontend Developer" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="department" className="text-sm font-medium">
                  Department
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="hr">Human Resources</SelectItem>
                    <SelectItem value="product">Product</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="type" className="text-sm font-medium">
                  Job Type
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="location" className="text-sm font-medium">
                Location
              </label>
              <Input id="location" placeholder="e.g. New York, NY (Remote)" />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Job Description
              </label>
              <Textarea
                id="description"
                placeholder="Provide a detailed description of the job..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="requirements" className="text-sm font-medium">
                Requirements
              </label>
              <Textarea
                id="requirements"
                placeholder="List the requirements for this position (one per line)"
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setNewJobOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-hr-blue-500 hover:bg-hr-blue-600" onClick={() => setNewJobOpen(false)}>
              Post Job
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
}
