
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { leaveRequests, LeaveRequest } from "@/data/mockData";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar, CheckCircle, XCircle } from "lucide-react";

export default function LeaveManagement() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null);

  // Filter leave requests
  const filteredRequests = leaveRequests.filter(request => {
    return statusFilter === "all" || request.status === statusFilter;
  });

  // Group leave requests by status
  const pendingRequests = leaveRequests.filter(request => request.status === "pending");
  const approvedRequests = leaveRequests.filter(request => request.status === "approved");
  const rejectedRequests = leaveRequests.filter(request => request.status === "rejected");

  // Get leave request badge
  const getStatusBadge = (status: LeaveRequest["status"]) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-hr-green-500">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-hr-red-500">Rejected</Badge>;
      case "pending":
        return <Badge variant="outline" className="text-hr-amber-500 border-hr-amber-500">Pending</Badge>;
      default:
        return null;
    }
  };

  // Get leave type badge
  const getTypeBadge = (type: LeaveRequest["type"]) => {
    switch (type) {
      case "annual":
        return <Badge variant="outline" className="bg-hr-blue-50 text-hr-blue-600">Annual</Badge>;
      case "sick":
        return <Badge variant="outline" className="bg-hr-red-50 text-hr-red-500">Sick</Badge>;
      case "personal":
        return <Badge variant="outline" className="bg-hr-amber-50 text-hr-amber-500">Personal</Badge>;
      case "maternity":
        return <Badge variant="outline" className="bg-purple-50 text-purple-600">Maternity</Badge>;
      case "paternity":
        return <Badge variant="outline" className="bg-blue-50 text-blue-600">Paternity</Badge>;
      case "unpaid":
        return <Badge variant="outline" className="bg-gray-50 text-gray-600">Unpaid</Badge>;
      default:
        return null;
    }
  };

  const handleViewRequest = (request: LeaveRequest) => {
    setSelectedRequest(request);
    setIsDialogOpen(true);
  };

  const LeaveRequestTable = ({ requests }: { requests: LeaveRequest[] }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Employee</TableHead>
          <TableHead>Leave Type</TableHead>
          <TableHead>Period</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.length > 0 ? (
          requests.map(request => (
            <TableRow key={request.id}>
              <TableCell>
                <div>
                  <p className="font-medium">{request.employeeName}</p>
                  <p className="text-sm text-muted-foreground">ID: {request.employeeId}</p>
                </div>
              </TableCell>
              <TableCell>{getTypeBadge(request.type)}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Calendar size={14} className="text-muted-foreground" />
                  <span>{new Date(request.startDate).toLocaleDateString()} to {new Date(request.endDate).toLocaleDateString()}</span>
                </div>
              </TableCell>
              <TableCell>{getStatusBadge(request.status)}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewRequest(request)}
                >
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-8">
              <p className="text-muted-foreground">No leave requests found</p>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );

  return (
    <PageLayout title="Leave Management">
      <div className="animate-fade-in">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold">Leave Management</h2>
          <Button className="bg-hr-blue-500 hover:bg-hr-blue-600">Request Leave</Button>
        </div>

        <Card className="mb-6">
          <Tabs defaultValue="all">
            <CardHeader className="pb-0">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <CardTitle>Leave Requests</CardTitle>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="pending">
                    Pending
                    {pendingRequests.length > 0 && (
                      <Badge variant="outline" className="ml-2">
                        {pendingRequests.length}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="approved">Approved</TabsTrigger>
                  <TabsTrigger value="rejected">Rejected</TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <TabsContent value="all" className="m-0">
                <LeaveRequestTable requests={leaveRequests} />
              </TabsContent>
              <TabsContent value="pending" className="m-0">
                <LeaveRequestTable requests={pendingRequests} />
              </TabsContent>
              <TabsContent value="approved" className="m-0">
                <LeaveRequestTable requests={approvedRequests} />
              </TabsContent>
              <TabsContent value="rejected" className="m-0">
                <LeaveRequestTable requests={rejectedRequests} />
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          {selectedRequest && (
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Leave Request Details</DialogTitle>
                <DialogDescription>
                  Review the details of this leave request.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{selectedRequest.employeeName}</h3>
                  {getStatusBadge(selectedRequest.status)}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Leave Type</p>
                    <p className="font-medium capitalize">{selectedRequest.type}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Duration</p>
                    <p className="font-medium">
                      {new Date(selectedRequest.startDate).toLocaleDateString()} - 
                      {new Date(selectedRequest.endDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">Reason</p>
                  <p>{selectedRequest.reason || "No reason provided"}</p>
                </div>

                {selectedRequest.approver && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {selectedRequest.status === "approved" ? "Approved by" : "Rejected by"}
                    </p>
                    <p>{selectedRequest.approver} on {new Date(selectedRequest.approvedDate!).toLocaleDateString()}</p>
                  </div>
                )}
              </div>

              <DialogFooter>
                {selectedRequest.status === "pending" ? (
                  <>
                    <Button variant="outline" className="gap-2" onClick={() => setIsDialogOpen(false)}>
                      <XCircle size={16} />
                      Reject
                    </Button>
                    <Button className="gap-2 bg-hr-green-500 hover:bg-hr-green-600" onClick={() => setIsDialogOpen(false)}>
                      <CheckCircle size={16} />
                      Approve
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
                )}
              </DialogFooter>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </PageLayout>
  );
}
