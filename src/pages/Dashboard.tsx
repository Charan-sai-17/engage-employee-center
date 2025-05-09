
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dashboardStats, leaveRequests, announcements } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const { pendingLeaveRequests } = leaveRequests.filter(request => request.status === "pending").length;
  const recentAnnouncements = announcements.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  ).slice(0, 3);

  const colors = ["#2563EB", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"];
  
  return (
    <PageLayout title="Dashboard">
      <div className="animate-fade-in">
        <h2 className="text-2xl font-bold mb-6">Welcome to HR Portal</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Employees</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.totalEmployees}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {dashboardStats.newHiresThisMonth} new this month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">On Leave</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.onLeaveEmployees}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {dashboardStats.pendingLeaveRequests} pending requests
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Open Positions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.openPositions}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Across {dashboardStats.departmentDistribution.length} departments
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">New Hires</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.newHiresThisMonth}</div>
              <p className="text-xs text-muted-foreground mt-1">
                This month
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Department Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dashboardStats.departmentDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                      nameKey="department"
                      label={({ department, percent }) => 
                        `${department}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {dashboardStats.departmentDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Leave Requests by Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dashboardStats.leavesByMonth}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#2563EB" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Pending Leave Requests</CardTitle>
            </CardHeader>
            <CardContent>
              {leaveRequests.filter(request => request.status === "pending").length > 0 ? (
                <div className="space-y-4">
                  {leaveRequests
                    .filter(request => request.status === "pending")
                    .slice(0, 5)
                    .map(request => (
                      <div key={request.id} className="flex items-center justify-between border-b pb-3">
                        <div>
                          <p className="font-medium">{request.employeeName}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline">{request.type}</Badge>
                            <span className="text-sm text-muted-foreground">
                              {new Date(request.startDate).toLocaleDateString()} - 
                              {new Date(request.endDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Badge className="bg-hr-green-500">Approve</Badge>
                          <Badge className="bg-hr-red-500">Reject</Badge>
                        </div>
                      </div>
                    ))
                  }
                </div>
              ) : (
                <p className="text-muted-foreground">No pending leave requests</p>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Announcements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAnnouncements.map(announcement => (
                  <div key={announcement.id} className="border-b pb-3">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{announcement.title}</p>
                      <Badge variant="outline" className="capitalize">{announcement.priority}</Badge>
                    </div>
                    <p className="text-sm line-clamp-2 mt-1">{announcement.content}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-muted-foreground">
                        By {announcement.author}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(announcement.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}
