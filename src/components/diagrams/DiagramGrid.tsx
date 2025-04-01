
import { useState, useEffect } from "react";
import { DiagramCard } from "./DiagramCard";
import { Diagram } from "@/data/diagramsData";
import { api } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DiagramGridProps {
  category?: string;
  searchQuery?: string;
  limit?: number;
}

export function DiagramGrid({ category, searchQuery, limit }: DiagramGridProps) {
  const [diagrams, setDiagrams] = useState<Diagram[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [filteredDiagrams, setFilteredDiagrams] = useState<Diagram[]>([]);
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    const fetchDiagrams = async () => {
      setLoading(true);
      try {
        let data: Diagram[];
        
        if (searchQuery) {
          data = await api.diagrams.search(searchQuery);
        } else if (category) {
          data = await api.diagrams.getByCategory(category);
        } else {
          data = await api.diagrams.getAll();
        }
        
        setDiagrams(data);
      } catch (err) {
        console.error("Error fetching diagrams:", err);
        setError("Failed to load diagrams. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchDiagrams();
  }, [category, searchQuery]);

  useEffect(() => {
    // Apply sorting to the diagrams
    const sortedDiagrams = [...diagrams];
    
    switch (sortBy) {
      case "newest":
        sortedDiagrams.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "oldest":
        sortedDiagrams.sort((a, b) => 
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      case "most-liked":
        sortedDiagrams.sort((a, b) => b.likes - a.likes);
        break;
      case "most-commented":
        sortedDiagrams.sort((a, b) => b.comments.length - a.comments.length);
        break;
      case "title-asc":
        sortedDiagrams.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        sortedDiagrams.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }
    
    setFilteredDiagrams(sortedDiagrams);
  }, [diagrams, sortBy]);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 12);
  };

  const handleLikeUpdate = (updatedDiagram: Diagram) => {
    setDiagrams(diagrams.map(d => 
      d.id === updatedDiagram.id ? updatedDiagram : d
    ));
  };

  if (loading) {
    return (
      <div className="diagram-grid">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="diagram-card">
            <Skeleton className="h-48 w-full" />
            <div className="p-4">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-2" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 my-8">{error}</div>;
  }

  if (filteredDiagrams.length === 0) {
    return (
      <div className="text-center my-12">
        <h3 className="text-lg font-medium mb-2">No diagrams found</h3>
        <p className="text-gray-500">
          {searchQuery 
            ? `No results for "${searchQuery}". Try a different search term.` 
            : category 
              ? `No diagrams found in the ${category} category.` 
              : "No diagrams available at the moment."}
        </p>
      </div>
    );
  }

  const visibleDiagrams = limit 
    ? filteredDiagrams.slice(0, limit) 
    : filteredDiagrams.slice(0, visibleCount);

  return (
    <div>
      <div className="flex justify-end mb-6">
        <div className="w-full max-w-xs">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="most-liked">Most Liked</SelectItem>
              <SelectItem value="most-commented">Most Commented</SelectItem>
              <SelectItem value="title-asc">Title (A-Z)</SelectItem>
              <SelectItem value="title-desc">Title (Z-A)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="diagram-grid">
        {visibleDiagrams.map(diagram => (
          <DiagramCard 
            key={diagram.id} 
            diagram={diagram} 
            onLikeUpdate={handleLikeUpdate}
          />
        ))}
      </div>
      
      {!limit && visibleCount < filteredDiagrams.length && (
        <div className="text-center mt-8">
          <Button onClick={handleLoadMore} variant="outline">
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
