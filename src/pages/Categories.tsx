
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { 
  Grid3x3, 
  Flask, 
  Dna, 
  Cells, 
  ArrowRight, 
  Microscope,
  TreePine 
} from "lucide-react";

const categories = [
  {
    id: "cellular-structure",
    name: "Cellular Structure",
    description: "Diagrams showing the internal and external structures of bacterial cells",
    icon: Cells,
    color: "bg-blue-500",
    count: 12,
  },
  {
    id: "metabolic-pathways",
    name: "Metabolic Pathways",
    description: "Visual representations of biochemical reactions and metabolic processes in bacteria",
    icon: Flask,
    color: "bg-green-500",
    count: 8,
  },
  {
    id: "bacterial-morphology",
    name: "Bacterial Morphology",
    description: "Diagrams illustrating different shapes and arrangements of bacteria",
    icon: Microscope,
    color: "bg-purple-500",
    count: 10,
  },
  {
    id: "bacterial-genetics",
    name: "Bacterial Genetics",
    description: "Visual explanations of genetic processes and structures in bacteria",
    icon: Dna,
    color: "bg-pink-500",
    count: 7,
  },
  {
    id: "bacterial-reproduction",
    name: "Bacterial Reproduction",
    description: "Diagrams showing how bacteria reproduce and multiply",
    icon: Grid3x3,
    color: "bg-orange-500",
    count: 6,
  },
  {
    id: "bacterial-ecology",
    name: "Bacterial Ecology",
    description: "Illustrations of how bacteria interact with their environment and other organisms",
    icon: TreePine,
    color: "bg-teal-500",
    count: 7,
  }
];

export default function Categories() {
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Diagram Categories</h1>
        <p className="text-gray-600">
          Browse our collection of bacteria-related diagrams by category
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/category/${category.id}`}
            className="block bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <div className={`h-24 ${category.color} flex items-center justify-center`}>
              <category.icon className="h-12 w-12 text-white" />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2 flex items-center justify-between">
                {category.name}
                <span className="text-sm font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {category.count} diagrams
                </span>
              </h2>
              <p className="text-gray-600 mb-4">{category.description}</p>
              <div className="flex items-center text-primary font-medium">
                Explore category
                <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
}
