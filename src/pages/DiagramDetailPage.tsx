
import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { DiagramDetail } from "@/components/diagrams/DiagramDetail";
import { DiagramGrid } from "@/components/diagrams/DiagramGrid";
import { Diagram } from "@/data/diagramsData";
import { api } from "@/services/api";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function DiagramDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [diagram, setDiagram] = useState<Diagram | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAdmin } = useAuth();

  const fetchDiagram = useCallback(async () => {
    if (!id) return;
    
    setLoading(true);
    setImageError(false);
    
    try {
      console.log(`Fetching diagram with id: ${id}`);
      const data = await api.diagrams.getById(id);
      
      if (!data) {
        setError("Diagram not found");
        return;
      }
      
      console.log("Diagram loaded:", data);
      console.log("Image URL:", data.imageUrl);
      console.log("Comment count:", data.comments.length);
      setDiagram(data);
    } catch (err) {
      console.error("Error fetching diagram:", err);
      setError("Failed to load diagram. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDiagram();
  }, [fetchDiagram]);

  const handleImageError = () => {
    console.error("Image failed to load:", diagram?.imageUrl);
    setImageError(true);
  };

  const handleDiagramUpdate = async (updatedDiagram: Diagram) => {
    setDiagram(updatedDiagram);
    await fetchDiagram();
  };

  const handleLikeUpdate = (updatedDiagram: Diagram) => {
    setDiagram(updatedDiagram);
  };

  const handleApprove = async () => {
    if (!diagram) return;
    
    try {
      const success = await api.diagrams.approveDiagram(diagram.id);
      
      if (success) {
        setDiagram({
          ...diagram,
          approved: true,
        });
        
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

  const handleDelete = async () => {
    if (!diagram) return;
    
    if (!confirm("Are you sure you want to delete this diagram? This action cannot be undone.")) {
      return;
    }
    
    try {
      const success = await api.diagrams.deleteDiagram(diagram.id);
      
      if (success) {
        toast({
          title: "Diagram deleted",
          description: "The diagram has been deleted successfully",
        });
        
        navigate("/");
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

  if (loading) {
    return (
      <Layout>
        <div className="mb-6">
          <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="h-[400px] bg-gray-100">
            <Skeleton className="h-full w-full" />
          </div>
          <div className="p-6">
            <Skeleton className="h-8 w-3/4 mb-4" />
            <Skeleton className="h-4 w-1/4 mb-6" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-2" />
            <Skeleton className="h-4 w-4/6 mb-6" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <Skeleton className="h-6 w-1/4 mb-6" />
            <Skeleton className="h-24 w-full mb-6" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !diagram) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className="text-gray-600 mb-6">{error || "Diagram not found"}</p>
          <Button onClick={() => navigate("/")}>Return to Home</Button>
        </div>
      </Layout>
    );
  }

  if (!diagram.approved && !isAdmin()) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Diagram Under Review</h1>
          <p className="text-gray-600 mb-6">
            This diagram is currently being reviewed by our team and is not yet publicly available.
          </p>
          <Button onClick={() => navigate("/")}>Return to Home</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        {isAdmin() && (
          <div className="flex space-x-2">
            {!diagram.approved && (
              <Button variant="outline" size="sm" onClick={handleApprove}>
                Approve Diagram
              </Button>
            )}
            <Button variant="destructive" size="sm" onClick={handleDelete}>
              Delete Diagram
            </Button>
          </div>
        )}
      </div>
      
      {imageError && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4 flex items-center space-x-3">
          <AlertCircle className="h-5 w-5 text-yellow-500" />
          <div>
            <p className="text-sm text-yellow-800">
              The image could not be displayed. Using placeholder instead.
            </p>
          </div>
        </div>
      )}
      
      <DiagramDetail 
        diagram={diagram} 
        onLikeUpdate={handleDiagramUpdate}
        onImageError={handleImageError}
      />
      
      <div className="mt-12 pt-6 border-t border-gray-200">
        <h2 className="text-2xl font-bold mb-6">Related Diagrams</h2>
        <DiagramGrid category={diagram.category} limit={4} />
      </div>
    </Layout>
  );
}
