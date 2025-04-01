
import { useState } from "react";
import { 
  Download,
  Heart,
  Share,
  FileText,
  X,
  Check,
  Copy,
  ChevronDown
} from "lucide-react";
import { Diagram, CitationFormat } from "@/data/diagramsData";
import { api } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import { CommentSection } from "../comments/CommentSection";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface DiagramDetailProps {
  diagram: Diagram;
  onLikeUpdate?: (diagram: Diagram) => void;
}

export function DiagramDetail({ diagram, onLikeUpdate }: DiagramDetailProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [likes, setLikes] = useState(diagram.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [showCitationDialog, setShowCitationDialog] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState<string>("png");
  const [copiedFormat, setCopiedFormat] = useState<CitationFormat | null>(null);

  const handleLike = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to like diagrams",
        variant: "destructive",
      });
      return;
    }
    
    try {
      if (isLiked) {
        const updatedDiagram = await api.diagrams.unlike(diagram.id);
        if (updatedDiagram) {
          setLikes(updatedDiagram.likes);
          setIsLiked(false);
          if (onLikeUpdate) {
            onLikeUpdate(updatedDiagram);
          }
        }
      } else {
        const updatedDiagram = await api.diagrams.like(diagram.id);
        if (updatedDiagram) {
          setLikes(updatedDiagram.likes);
          setIsLiked(true);
          if (onLikeUpdate) {
            onLikeUpdate(updatedDiagram);
          }
        }
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

  const handleDownload = () => {
    // In a real app, you would implement actual file download
    toast({
      title: "Download started",
      description: `Downloading diagram in ${downloadFormat.toUpperCase()} format`,
    });
    
    // Simulate download delay
    setTimeout(() => {
      toast({
        title: "Download complete",
        description: "Your diagram has been downloaded successfully",
      });
    }, 1500);
  };

  const handleShare = () => {
    // In a real app, you would implement actual sharing functionality
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "Diagram link copied to clipboard",
    });
  };

  const copyToClipboard = (format: CitationFormat) => {
    const citation = api.diagrams.getCitation(diagram, format);
    navigator.clipboard.writeText(citation);
    setCopiedFormat(format);
    
    setTimeout(() => {
      setCopiedFormat(null);
    }, 2000);
    
    toast({
      title: "Citation copied",
      description: `${format} citation copied to clipboard`,
    });
  };

  return (
    <div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="relative">
          <img
            src={diagram.imageUrl}
            alt={diagram.title}
            className="w-full object-cover max-h-[600px]"
          />
        </div>
        <div className="p-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <h1 className="text-2xl md:text-3xl font-bold">{diagram.title}</h1>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={handleLike}>
                <Heart className={`h-4 w-4 mr-2 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                {likes}
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => {
                    setDownloadFormat("png");
                    handleDownload();
                  }}>
                    PNG Format
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {
                    setDownloadFormat("jpg");
                    handleDownload();
                  }}>
                    JPG Format
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {
                    setDownloadFormat("pdf");
                    handleDownload();
                  }}>
                    PDF Format
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Dialog open={showCitationDialog} onOpenChange={setShowCitationDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Cite
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Citation Formats</DialogTitle>
                  </DialogHeader>
                  <Tabs defaultValue="apa">
                    <TabsList className="grid grid-cols-3">
                      <TabsTrigger value="apa">APA</TabsTrigger>
                      <TabsTrigger value="mla">MLA</TabsTrigger>
                      <TabsTrigger value="ieee">IEEE</TabsTrigger>
                    </TabsList>
                    <TabsContent value="apa" className="mt-4">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="relative bg-muted p-4 rounded-md">
                            <p className="pr-10 font-mono text-sm break-all">
                              {api.diagrams.getCitation(diagram, "APA")}
                            </p>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="absolute top-2 right-2"
                              onClick={() => copyToClipboard("APA")}
                            >
                              {copiedFormat === "APA" ? (
                                <Check className="h-4 w-4" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    <TabsContent value="mla" className="mt-4">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="relative bg-muted p-4 rounded-md">
                            <p className="pr-10 font-mono text-sm break-all">
                              {api.diagrams.getCitation(diagram, "MLA")}
                            </p>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="absolute top-2 right-2"
                              onClick={() => copyToClipboard("MLA")}
                            >
                              {copiedFormat === "MLA" ? (
                                <Check className="h-4 w-4" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    <TabsContent value="ieee" className="mt-4">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="relative bg-muted p-4 rounded-md">
                            <p className="pr-10 font-mono text-sm break-all">
                              {api.diagrams.getCitation(diagram, "IEEE")}
                            </p>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="absolute top-2 right-2"
                              onClick={() => copyToClipboard("IEEE")}
                            >
                              {copiedFormat === "IEEE" ? (
                                <Check className="h-4 w-4" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </DialogContent>
              </Dialog>
              
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="outline">{diagram.category}</Badge>
            <Badge variant="outline">{diagram.complexity}</Badge>
            {diagram.tags.map((tag, index) => (
              <Badge key={index} variant="secondary">{tag}</Badge>
            ))}
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{diagram.description}</p>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Details</h2>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
              <div>
                <dt className="text-sm text-gray-500">Subject</dt>
                <dd>{diagram.subject}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Category</dt>
                <dd>{diagram.category}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Uploaded by</dt>
                <dd>{diagram.uploaderName}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Date</dt>
                <dd>{new Date(diagram.createdAt).toLocaleDateString()}</dd>
              </div>
              {diagram.source && (
                <div>
                  <dt className="text-sm text-gray-500">Source</dt>
                  <dd>{diagram.source}</dd>
                </div>
              )}
              {diagram.author && (
                <div>
                  <dt className="text-sm text-gray-500">Author</dt>
                  <dd>{diagram.author}</dd>
                </div>
              )}
              {diagram.year && (
                <div>
                  <dt className="text-sm text-gray-500">Year</dt>
                  <dd>{diagram.year}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </div>
      
      <CommentSection diagramId={diagram.id} comments={diagram.comments} />
    </div>
  );
}
