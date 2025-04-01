
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/services/api";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Upload, Image, X } from "lucide-react";

export default function UploadDiagram() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [complexity, setComplexity] = useState("");
  const [subject, setSubject] = useState("");
  const [tags, setTags] = useState("");
  const [author, setAuthor] = useState("");
  const [source, setSource] = useState("");
  const [year, setYear] = useState<number | undefined>();
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if not logged in
  if (!user) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
          <p className="mb-6">You need to be logged in to upload diagrams.</p>
          <Button onClick={() => navigate("/login")}>
            Log In
          </Button>
        </div>
      </Layout>
    );
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !category || !complexity || !subject || !imagePreview) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields and upload an image",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, we would upload the image to a storage service first
      // For this mock, we'll use the preview as both image URL and thumbnail
      
      const parsedTags = tags
        .split(",")
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
      
      const newDiagram = await api.diagrams.uploadDiagram({
        title,
        description,
        category: category as any,
        complexity: complexity as any,
        subject,
        tags: parsedTags,
        uploaderId: user.id,
        uploaderName: user.name,
        imageUrl: imagePreview,
        thumbnailUrl: imagePreview,
        author: author || undefined,
        source: source || undefined,
        year: year || undefined,
      });
      
      toast({
        title: "Upload successful",
        description: "Your diagram has been submitted for approval",
      });
      
      // Redirect to the diagram page
      navigate(`/diagram/${newDiagram.id}`);
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your diagram",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Upload a Diagram</h1>
          <p className="text-gray-600">
            Share your knowledge by uploading a bacterial diagram to our encyclopedia. 
            All submissions will be reviewed before publication.
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Diagram Details</CardTitle>
            <CardDescription>
              Please provide accurate information about your diagram.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Upload image section */}
              <div className="space-y-2">
                <Label htmlFor="diagram-image">Diagram Image <span className="text-red-500">*</span></Label>
                
                {imagePreview ? (
                  <div className="relative mt-2 rounded-lg overflow-hidden border border-gray-200">
                    <img
                      src={imagePreview}
                      alt="Diagram preview"
                      className="max-h-80 mx-auto"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 rounded-full w-8 h-8 p-0"
                      onClick={removeImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <Image className="h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-sm text-gray-600 mb-2">
                        Drag and drop your diagram, or{" "}
                        <label className="text-primary hover:underline cursor-pointer">
                          browse
                          <input
                            id="diagram-image"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                          />
                        </label>
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Basic information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title <span className="text-red-500">*</span></Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="E.g., E. coli Cell Structure"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject <span className="text-red-500">*</span></Label>
                  <Input
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="E.g., Escherichia coli"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description <span className="text-red-500">*</span></Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide a detailed description of the diagram..."
                  rows={4}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="category">Category <span className="text-red-500">*</span></Label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cellular Structure">Cellular Structure</SelectItem>
                      <SelectItem value="Metabolic Pathways">Metabolic Pathways</SelectItem>
                      <SelectItem value="Bacterial Morphology">Bacterial Morphology</SelectItem>
                      <SelectItem value="Bacterial Genetics">Bacterial Genetics</SelectItem>
                      <SelectItem value="Bacterial Reproduction">Bacterial Reproduction</SelectItem>
                      <SelectItem value="Bacterial Ecology">Bacterial Ecology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="complexity">Complexity Level <span className="text-red-500">*</span></Label>
                  <Select value={complexity} onValueChange={setComplexity} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select complexity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Basic">Basic</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="E.g., microbiology, pathogen, gram-negative"
                />
              </div>
              
              {/* Source information (optional) */}
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-lg font-medium mb-4">Source Information (Optional)</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="Original author (if any)"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Input
                      id="year"
                      type="number"
                      value={year || ""}
                      onChange={(e) => setYear(e.target.value ? parseInt(e.target.value) : undefined)}
                      placeholder="Year of creation"
                      min={1800}
                      max={new Date().getFullYear()}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="source">Source</Label>
                  <Input
                    id="source"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    placeholder="E.g., textbook, journal, website"
                  />
                </div>
              </div>
              
              <div className="pt-6">
                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <Upload className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Diagram
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
