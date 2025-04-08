
export type Role = 'admin' | 'student' | 'educator' | 'researcher';

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  profileImage?: string;
};

export type Comment = {
  id: string;
  userId: string;
  userName: string;
  text: string;
  timestamp: Date;
  parentId?: string; // For replies
  replies?: Comment[];
};

export type CitationFormat = 'APA' | 'MLA' | 'IEEE';

export type DiagramCategory = 
  | 'Cellular Structure' 
  | 'Metabolic Pathways' 
  | 'Bacterial Morphology' 
  | 'Bacterial Genetics' 
  | 'Bacterial Reproduction'
  | 'Bacterial Ecology';

export type Category = {
  id: string;
  name: string;
  description: string;
};

export type Diagram = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  thumbnailUrl: string;
  category: DiagramCategory;
  complexity: 'Basic' | 'Intermediate' | 'Advanced';
  uploaderId: string;
  uploaderName: string;
  subject: string;
  tags: string[];
  likes: number;
  likedByUserIds: string[]; // Track which users have liked this diagram
  comments: Comment[];
  approved: boolean;
  createdAt: Date;
  updatedAt: Date;
  source?: string;
  author?: string;
  year?: number;
};

// Define complexity levels as proper type
const complexityLevels = ["Basic", "Intermediate", "Advanced"] as const;
type ComplexityLevel = typeof complexityLevels[number];

const filterByComplexity = (diagrams: Diagram[], complexity: string): Diagram[] => {
  if (!complexity) return diagrams;
  
  const validComplexity = complexityLevels.includes(complexity as ComplexityLevel) 
    ? complexity as ComplexityLevel 
    : "Basic";
  
  return diagrams.filter(diagram => diagram.complexity === validComplexity);
};

// Generate 50 mock diagrams
const generateMockDiagrams = (): Diagram[] => {
  const categories: DiagramCategory[] = [
    'Cellular Structure', 
    'Metabolic Pathways', 
    'Bacterial Morphology', 
    'Bacterial Genetics', 
    'Bacterial Reproduction',
    'Bacterial Ecology'
  ];
  
  const complexities: ComplexityLevel[] = ['Basic', 'Intermediate', 'Advanced'];
  
  const subjects = [
    'Escherichia coli',
    'Staphylococcus aureus',
    'Bacillus subtilis',
    'Pseudomonas aeruginosa',
    'Mycobacterium tuberculosis',
    'Salmonella enterica',
    'Streptococcus pneumoniae',
    'Clostridium difficile',
    'Lactobacillus acidophilus',
    'Vibrio cholerae'
  ];
  
  const getRandomItem = <T>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)];
  };
  
  const generateRandomTags = (category: DiagramCategory, subject: string): string[] => {
    const baseTags = ['bacteria', subject.toLowerCase(), category.toLowerCase()];
    const additionalTags = [
      'microbiology', 'pathogen', 'gram-positive', 'gram-negative', 
      'antibiotic', 'resistance', 'biofilm', 'flagella', 'plasmid', 
      'prokaryote', 'clinical', 'medical', 'research', 'educational'
    ];
    
    const result = [...baseTags];
    const tagCount = Math.floor(Math.random() * 4) + 1; // 1-4 additional tags
    
    for (let i = 0; i < tagCount; i++) {
      const tag = getRandomItem(additionalTags);
      if (!result.includes(tag)) {
        result.push(tag);
      }
    }
    
    return result;
  };
  
  const diagrams: Diagram[] = [];
  
  for (let i = 1; i <= 50; i++) {
    const category = getRandomItem(categories);
    const subject = getRandomItem(subjects);
    const complexity = getRandomItem(complexities);
    
    const diagram: Diagram = {
      id: `diagram-${i}`,
      title: `${subject} ${category}`,
      description: `A detailed ${complexity.toLowerCase()} level diagram showing ${category.toLowerCase()} of ${subject}.`,
      imageUrl: `https://source.unsplash.com/random/800x600?bacteria,science,${i}`,
      thumbnailUrl: `https://source.unsplash.com/random/400x300?bacteria,science,${i}`,
      category,
      complexity,
      uploaderId: `user-${Math.floor(Math.random() * 10) + 1}`,
      uploaderName: `Researcher ${Math.floor(Math.random() * 10) + 1}`,
      subject,
      tags: generateRandomTags(category, subject),
      likes: Math.floor(Math.random() * 100),
      likedByUserIds: [], // Initialize empty array to track user likes
      comments: [],
      approved: Math.random() > 0.1, // 90% are approved
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
      updatedAt: new Date(Date.now() - Math.floor(Math.random() * 1000000000)),
      source: Math.random() > 0.3 ? 'Journal of Microbiology' : undefined,
      author: Math.random() > 0.3 ? `Dr. ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}. Smith` : undefined,
      year: Math.random() > 0.3 ? 2020 + Math.floor(Math.random() * 4) : undefined,
    };
    
    // Add random comments
    const commentCount = Math.floor(Math.random() * 5);
    for (let j = 0; j < commentCount; j++) {
      const comment: Comment = {
        id: `comment-${i}-${j}`,
        userId: `user-${Math.floor(Math.random() * 10) + 1}`,
        userName: `User ${Math.floor(Math.random() * 100) + 1}`,
        text: `This is a great diagram of ${subject}! It really helps understand the ${category.toLowerCase()}.`,
        timestamp: new Date(Date.now() - Math.floor(Math.random() * 1000000000)),
        replies: [],
      };
      
      // Add random replies
      if (Math.random() > 0.7) {
        const replyCount = Math.floor(Math.random() * 2) + 1;
        for (let k = 0; k < replyCount; k++) {
          const reply: Comment = {
            id: `reply-${i}-${j}-${k}`,
            userId: `user-${Math.floor(Math.random() * 10) + 1}`,
            userName: `User ${Math.floor(Math.random() * 100) + 1}`,
            text: `I agree! This diagram is very detailed and useful.`,
            timestamp: new Date(Date.now() - Math.floor(Math.random() * 100000000)),
            parentId: comment.id,
          };
          comment.replies?.push(reply);
        }
      }
      
      diagram.comments.push(comment);
    }
    
    diagrams.push(diagram);
  }
  
  return diagrams;
};

// Create a function to handle diagram persistence using localStorage
const getPersistedDiagrams = (): Diagram[] => {
  const storageDiagramsKey = 'bacteria-diagrams-data';
  
  // Try to get diagrams from localStorage
  const storedDiagramsStr = localStorage.getItem(storageDiagramsKey);
  
  if (storedDiagramsStr) {
    try {
      // Parse the stored JSON string
      const parsedData = JSON.parse(storedDiagramsStr);
      
      // Convert string dates back to Date objects
      const diagramsWithDates = parsedData.map((diagram: any) => ({
        ...diagram,
        createdAt: new Date(diagram.createdAt),
        updatedAt: new Date(diagram.updatedAt),
        comments: diagram.comments.map((comment: any) => ({
          ...comment,
          timestamp: new Date(comment.timestamp),
          replies: comment.replies?.map((reply: any) => ({
            ...reply,
            timestamp: new Date(reply.timestamp)
          }))
        }))
      }));
      
      return diagramsWithDates;
    } catch (error) {
      console.error('Error parsing stored diagrams:', error);
      // If there's an error, generate fresh diagrams
      const newDiagrams = generateMockDiagrams();
      saveDiagramsToStorage(newDiagrams);
      return newDiagrams;
    }
  }
  
  // If no stored diagrams, generate new ones and save them
  const newDiagrams = generateMockDiagrams();
  saveDiagramsToStorage(newDiagrams);
  return newDiagrams;
};

// Helper function to save diagrams to localStorage
export const saveDiagramsToStorage = (diagrams: Diagram[]): void => {
  localStorage.setItem('bacteria-diagrams-data', JSON.stringify(diagrams));
};

// Initialize diagrams with persistence
export const mockDiagrams = getPersistedDiagrams();

// Generate categories from the unique DiagramCategory values in the diagrams
export const mockCategories: Category[] = [
  { id: 'cat-1', name: 'Cellular Structure', description: 'Diagrams showing the cellular structure of various bacteria' },
  { id: 'cat-2', name: 'Metabolic Pathways', description: 'Diagrams illustrating bacterial metabolic processes' },
  { id: 'cat-3', name: 'Bacterial Morphology', description: 'Visual representations of bacterial shapes and forms' },
  { id: 'cat-4', name: 'Bacterial Genetics', description: 'Diagrams of bacterial DNA, plasmids, and genetic processes' },
  { id: 'cat-5', name: 'Bacterial Reproduction', description: 'Illustrations of bacterial reproduction mechanisms' },
  { id: 'cat-6', name: 'Bacterial Ecology', description: 'Diagrams showing bacterial interactions with environments' }
];

export const getMockCurrentUser = (): User => {
  return {
    id: 'user-1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'student',
  };
};

export const generateCitation = (diagram: Diagram, format: CitationFormat): string => {
  const author = diagram.author || diagram.uploaderName;
  const year = diagram.year || new Date().getFullYear();
  const title = diagram.title;
  const source = diagram.source || 'Diagram Encyclopedia';
  
  switch (format) {
    case 'APA':
      return `${author}. (${year}). ${title} [Diagram]. ${source}.`;
    case 'MLA':
      return `${author}. "${title}." ${source}, ${year}.`;
    case 'IEEE':
      return `[1] ${author}, "${title}," ${source}, ${year}.`;
    default:
      return `${author} (${year}). ${title}. ${source}.`;
  }
};
