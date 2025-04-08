
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Heart, 
  MessageSquare
} from "lucide-react";
import { Diagram } from "@/data/diagramsData";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/services/api";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";

interface DiagramCardProps {
  diagram: Diagram;
  onLikeUpdate?: (diagram: Diagram) => void;
}

export function DiagramCard({ diagram, onLikeUpdate }: DiagramCardProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [likes, setLikes] = useState(diagram.likes);
  const [isLiked, setIsLiked] = useState(false);

  // Check if the current user has liked this diagram
  useEffect(() => {
    if (user && diagram.likedByUserIds) {
      setIsLiked(diagram.likedByUserIds.includes(user.id));
    }
  }, [user, diagram.likedByUserIds]);

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to like diagrams",
        variant: "destructive",
      });
      return;
    }
    
    try {
      let updatedDiagram;
      
      if (isLiked) {
        updatedDiagram = await api.diagrams.unlike(diagram.id, user.id);
        if (updatedDiagram) {
          setLikes(updatedDiagram.likes);
          setIsLiked(false);
        }
      } else {
        updatedDiagram = await api.diagrams.like(diagram.id, user.id);
        if (updatedDiagram) {
          setLikes(updatedDiagram.likes);
          setIsLiked(true);
        }
      }
      
      if (updatedDiagram && onLikeUpdate) {
        onLikeUpdate(updatedDiagram);
      }
    } catch (error) {
      console.error("Error updating like status:", error);
      toast({
        title: "Error",
        description: "Failed to update like status",
        variant: "destructive",
      });
    }
  };

  return (
    <Link to={`/diagram/${diagram.id}`}>
      <Card className="h-full diagram-card overflow-hidden">
        <div className="relative h-48 overflow-hidden">
          <img
            src={diagram.thumbnailUrl}
            alt={diagram.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
            <div className="flex items-center text-white space-x-3">
              <div className="flex items-center space-x-1 cursor-pointer" onClick={handleLike}>
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                <span className="text-sm">{likes}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageSquare className="h-4 w-4" />
                <span className="text-sm">{diagram.comments.length}</span>
              </div>
            </div>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg line-clamp-1 mb-1">{diagram.title}</h3>
          <p className="text-sm text-gray-500 mb-2">{diagram.category}</p>
          <p className="text-sm text-gray-700 line-clamp-2">{diagram.description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
