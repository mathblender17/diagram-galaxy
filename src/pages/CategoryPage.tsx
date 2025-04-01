
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { DiagramGrid } from "@/components/diagrams/DiagramGrid";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const categoryData = {
  "cellular-structure": {
    name: "Cellular Structure",
    description: "Explore diagrams showing the internal and external structures of bacterial cells. These diagrams illustrate cell walls, membranes, ribosomes, plasmids, and other cellular components that are essential for understanding bacterial biology.",
  },
  "metabolic-pathways": {
    name: "Metabolic Pathways",
    description: "Browse visual representations of biochemical reactions and metabolic processes in bacteria. These diagrams help understand how bacteria convert nutrients into energy and building blocks for growth and reproduction.",
  },
  "bacterial-morphology": {
    name: "Bacterial Morphology",
    description: "Discover diagrams illustrating different shapes and arrangements of bacteria. Learn about cocci, bacilli, spirilla, and other morphological types, as well as arrangements like diplococci, streptococci, staphylococci, and more.",
  },
  "bacterial-genetics": {
    name: "Bacterial Genetics",
    description: "Explore visual explanations of genetic processes and structures in bacteria. These diagrams cover DNA replication, transcription, translation, gene regulation, horizontal gene transfer, and more.",
  },
  "bacterial-reproduction": {
    name: "Bacterial Reproduction",
    description: "View diagrams showing how bacteria reproduce and multiply. Learn about binary fission, conjugation, transformation, transduction, and other mechanisms of bacterial reproduction and genetic exchange.",
  },
  "bacterial-ecology": {
    name: "Bacterial Ecology",
    description: "Study illustrations of how bacteria interact with their environment and other organisms. These diagrams cover biofilms, quorum sensing, symbiotic relationships, and various ecological niches of bacteria.",
  },
};

export default function CategoryPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");

  useEffect(() => {
    if (id && categoryData[id as keyof typeof categoryData]) {
      const category = categoryData[id as keyof typeof categoryData];
      setCategoryName(category.name);
      setCategoryDescription(category.description);
    } else {
      // Handle invalid category
      navigate("/categories");
    }
  }, [id, navigate]);

  return (
    <Layout>
      <div className="mb-6">
        <Button variant="outline" size="sm" onClick={() => navigate("/categories")}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          All Categories
        </Button>
      </div>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-3">{categoryName}</h1>
        <p className="text-gray-600 max-w-4xl">{categoryDescription}</p>
      </div>
      
      <DiagramGrid category={categoryName} />
    </Layout>
  );
}
