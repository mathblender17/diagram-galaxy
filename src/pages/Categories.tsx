
import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { api } from "@/services/api";
import { Diagram } from "@/data/diagramsData";
import { Separator } from "@/components/ui/separator";
import { BookOpen } from "lucide-react";
import { DiagramGrid } from "@/components/diagrams/DiagramGrid";

export default function Categories() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiagrams = async () => {
      setIsLoading(true);
      try {
        await api.diagrams.getAll(); // Just to initialize the data
      } catch (e: any) {
        setError(e.message || "Failed to fetch diagrams");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDiagrams();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <header className="mb-6">
          <h1 className="text-3xl font-semibold text-gray-800 flex items-center">
            <BookOpen className="mr-2 h-8 w-8 text-primary" />
            Browse All Diagrams
          </h1>
          <p className="text-gray-500">Explore our complete collection of bacteria diagrams</p>
        </header>

        <Separator className="my-4" />

        {isLoading && <p className="text-center">Loading diagrams...</p>}
        {error && <p className="text-center text-red-500">Error: {error}</p>}
        
        {!isLoading && !error && (
          <DiagramGrid />
        )}
      </div>
    </Layout>
  );
}
