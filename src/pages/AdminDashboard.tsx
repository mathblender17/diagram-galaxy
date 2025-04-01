
import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/services/api";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Link, useNavigate } from "react-router-dom";
import { 
  CheckCircle, 
  Eye, 
  Trash2, 
  UserCheck, 
  Users, 
  FileCheck, 
  MessageSquare, 
  ExternalLink,
  Image,
  Activity
} from "lucide-react";
import { Diagram } from "@/data/diagramsData";

export default function AdminDashboard() {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [pendingDiagrams, setPendingDiagrams] = useState<Diagram[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("pending-diagrams");

  // Redirect if not admin
  if (!user || !isAdmin()) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="mb-6">You do not have permission to access the admin dashboard.</p>
          <Button onClick={() => navigate("/")}>
            Return to Home
          </Button>
        </div>
      </Layout>
    );
  }

  useEffect(() => {
    const fetchPendingDiagrams = async () => {
      try {
        const data = await api.diagrams.getUnapprovedDiagrams();
        setPendingDiagrams(data);
      } catch (error) {
        console.error("Error fetching pending diagrams:", error);
        toast({
          title: "Error",
          description: "Failed to load pending diagrams",
          variant: "destructive",
        });
      }
    };
    
    fetchPendingDiagrams();
  }, [toast]);

  const handleApproveDiagram = async (id: string) => {
    try {
      const success = await api.diagrams.approveDiagram(id);
      
      if (success) {
        setPendingDiagrams(pendingDiagrams.filter(diagram => diagram.id !== id));
        
        toast({
          title: "Diagram approved",
          description: "The diagram has been approved and is now publicly visible",
        });
      }
    } catch (error) {
      console.error("Error approving diagram:", error);
      toast({
        title: "Error",
        description: "Failed to approve the diagram",
        variant: "destructive",
      });
    }
  };

  const handleDeleteDiagram = async (id: string) => {
    if (!confirm("Are you sure you want to delete this diagram? This action cannot be undone.")) {
      return;
    }
    
    try {
      const success = await api.diagrams.deleteDiagram(id);
      
      if (success) {
        setPendingDiagrams(pendingDiagrams.filter(diagram => diagram.id !== id));
        
        toast({
          title: "Diagram deleted",
          description: "The diagram has been deleted successfully",
        });
      }
    } catch (error) {
      console.error("Error deleting diagram:", error);
      toast({
        title: "Error",
        description: "Failed to delete the diagram",
        variant: "destructive",
      });
    }
  };

  const filteredPendingDiagrams = pendingDiagrams.filter(diagram => 
    diagram.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    diagram.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    diagram.uploaderName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">
          Manage diagrams, users, and content across the platform.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-500">Pending Approvals</h3>
            <FileCheck className="h-6 w-6 text-orange-500" />
          </div>
          <p className="text-3xl font-bold">{pendingDiagrams.length}</p>
          <p className="text-sm text-gray-500 mt-2">Diagrams awaiting review</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-500">Total Diagrams</h3>
            <Image className="h-6 w-6 text-blue-500" />
          </div>
          <p className="text-3xl font-bold">50</p>
          <p className="text-sm text-gray-500 mt-2">Published diagrams</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-500">Total Users</h3>
            <Users className="h-6 w-6 text-purple-500" />
          </div>
          <p className="text-3xl font-bold">10</p>
          <p className="text-sm text-gray-500 mt-2">Registered users</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="p-6 border-b border-gray-200">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="pending-diagrams">Pending Diagrams</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="comments">Comments</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="pending-diagrams" className="p-6">
            <div className="mb-6">
              <Input
                placeholder="Search by title, category, or uploader..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-md"
              />
            </div>
            
            {filteredPendingDiagrams.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                {searchQuery ? (
                  <p>No pending diagrams match your search criteria.</p>
                ) : (
                  <p>No pending diagrams to review. All caught up!</p>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Uploader</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPendingDiagrams.map((diagram) => (
                      <TableRow key={diagram.id}>
                        <TableCell className="font-medium">{diagram.title}</TableCell>
                        <TableCell>{diagram.category}</TableCell>
                        <TableCell>{diagram.uploaderName}</TableCell>
                        <TableCell>{new Date(diagram.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              asChild
                            >
                              <Link to={`/diagram/${diagram.id}`}>
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Link>
                            </Button>
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() => handleApproveDiagram(diagram.id)}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteDiagram(diagram.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="users" className="p-6">
            <div className="mb-6">
              <Input
                placeholder="Search users..."
                className="max-w-md"
              />
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Sample users */}
                  <TableRow>
                    <TableCell className="font-medium">Dr. John Smith</TableCell>
                    <TableCell>john.smith@example.com</TableCell>
                    <TableCell>Educator</TableCell>
                    <TableCell>Jan 12, 2023</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <UserCheck className="h-4 w-4 mr-1" />
                          Manage
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Sarah Johnson</TableCell>
                    <TableCell>sarah.j@example.com</TableCell>
                    <TableCell>Researcher</TableCell>
                    <TableCell>Mar 5, 2023</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <UserCheck className="h-4 w-4 mr-1" />
                          Manage
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Michael Chen</TableCell>
                    <TableCell>m.chen@example.com</TableCell>
                    <TableCell>Student</TableCell>
                    <TableCell>Apr 18, 2023</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <UserCheck className="h-4 w-4 mr-1" />
                          Manage
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="comments" className="p-6">
            <div className="mb-6">
              <Input
                placeholder="Search comments..."
                className="max-w-md"
              />
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Comment</TableHead>
                    <TableHead>Diagram</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Sample comments */}
                  <TableRow>
                    <TableCell className="max-w-xs truncate">This diagram has been incredibly helpful for my research project!</TableCell>
                    <TableCell>E. coli Cell Structure</TableCell>
                    <TableCell>Sarah Johnson</TableCell>
                    <TableCell>May 3, 2023</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="max-w-xs truncate">I think there's an error in this diagram. The flagella structure isn't accurate.</TableCell>
                    <TableCell>Bacterial Flagella</TableCell>
                    <TableCell>Dr. John Smith</TableCell>
                    <TableCell>Apr 28, 2023</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
