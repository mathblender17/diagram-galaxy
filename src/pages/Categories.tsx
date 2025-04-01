import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { api } from "@/services/api";
import { Category } from "@/data/diagramsData";
import { Separator } from "@/components/ui/separator";
import { Beaker, BookOpen, Microscope, BookIcon, BarChart, LineChart } from "lucide-react";

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const data = await api.categories.getAll();
        setCategories(data);
      } catch (e: any) {
        setError(e.message || "Failed to fetch categories");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Get icon component based on category name
  const getCategoryIcon = (name: string) => {
    const iconProps = { className: "h-10 w-10 text-primary mb-2" };
    
    switch (name.toLowerCase()) {
      case "bacteria":
        return <Microscope {...iconProps} />;
      case "anatomy":
        return <BookIcon {...iconProps} />;
      case "chemistry":
        return <Beaker {...iconProps} />;
      case "physics":
        return <BarChart {...iconProps} />;
      case "mathematics":
        return <LineChart {...iconProps} />;
      default:
        return <BookOpen {...iconProps} />;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <header className="mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Categories</h1>
          <p className="text-gray-500">Explore diagrams by category</p>
        </header>

        <Separator className="my-4" />

        {isLoading && <p className="text-center">Loading categories...</p>}
        {error && <p className="text-center text-red-500">Error: {error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex flex-col items-center">
                {getCategoryIcon(category.name)}
                <h2 className="text-xl font-semibold text-gray-700 mb-2">{category.name}</h2>
                <p className="text-gray-500 text-center">
                  {category.description || "No description available"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
