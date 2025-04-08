
import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { DiagramGrid } from "@/components/diagrams/DiagramGrid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  BookOpen, 
  Upload, 
  Download, 
  MessageSquare, 
  FileText 
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

// Helper function to get URL query parameters
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const { user } = useAuth();
  const query = useQuery();
  const searchParam = query.get('search');
  
  useEffect(() => {
    if (searchParam) {
      setSearchQuery(searchParam);
      setIsSearching(true);
    }
  }, [searchParam]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearching(true);
    }
  };

  return (
    <Layout fullWidth>
      {/* Hero section */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-purple-900 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              The Ultimate Bacteria Diagram Encyclopedia
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Discover, learn, and share high-quality diagrams for research and education
            </p>
            
            <form onSubmit={handleSearch} className="max-w-xl mx-auto relative mb-8">
              <Input
                type="text"
                placeholder="Search diagrams by name, category, or tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-20 py-6 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/60 rounded-full"
              />
              <Search className="absolute left-4 top-4 h-5 w-5 text-white/70" />
              <Button 
                type="submit" 
                className="absolute right-1.5 top-1.5 rounded-full"
              >
                Search
              </Button>
            </form>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/categories">
                <Button variant="secondary" size="lg" className="rounded-full">
                  Browse All Diagrams
                </Button>
              </Link>
              {user ? (
                <Link to="/upload">
                  <Button size="lg" className="rounded-full bg-primary text-white hover:bg-primary/90">
                    <Upload className="mr-2 h-5 w-5" />
                    Upload Diagram
                  </Button>
                </Link>
              ) : (
                <Link to="/register">
                  <Button variant="outline" size="lg" className="rounded-full text-white border-white hover:bg-white/20">
                    Create Account
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-12">
        {isSearching ? (
          <>
            <h2 className="text-2xl font-bold mb-6">
              Search Results for "{searchQuery}"
            </h2>
            <DiagramGrid searchQuery={searchQuery} />
          </>
        ) : (
          <>
            {/* Features section */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-8 text-center">
                A Complete Platform for Bacterial Diagrams
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Comprehensive Collection</h3>
                  <p className="text-gray-600">
                    Access 50+ high-quality diagrams covering all aspects of bacterial biology and microbiology.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="bg-purple-100 text-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Download className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Easy Downloads</h3>
                  <p className="text-gray-600">
                    Download diagrams in multiple formats for your presentations, papers, and educational materials.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="bg-green-100 text-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Citation Support</h3>
                  <p className="text-gray-600">
                    Automatically generate citations in APA, MLA, and IEEE formats for academic integrity.
                  </p>
                </div>
              </div>
            </section>
            
            {/* Recent diagrams */}
            <section className="mb-16">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Recently Added Diagrams</h2>
                <Link to="/categories">
                  <Button variant="outline">View All</Button>
                </Link>
              </div>
              <DiagramGrid limit={8} />
            </section>
            
            {/* CTA section */}
            <section className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl overflow-hidden mb-16">
              <div className="p-8 md:p-12">
                <div className="max-w-3xl">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    Share Your Knowledge
                  </h2>
                  <p className="text-lg text-white/80 mb-6">
                    Have a valuable diagram to contribute? Join our community and help students and researchers worldwide.
                  </p>
                  {user ? (
                    <Link to="/upload">
                      <Button size="lg" variant="secondary" className="flex items-center">
                        <Upload className="mr-2 h-5 w-5" />
                        Upload Your Diagram
                      </Button>
                    </Link>
                  ) : (
                    <div className="flex flex-wrap gap-4">
                      <Link to="/register">
                        <Button size="lg" variant="secondary">
                          Create an Account
                        </Button>
                      </Link>
                      <Link to="/login">
                        <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/20">
                          Log In
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </Layout>
  );
}
