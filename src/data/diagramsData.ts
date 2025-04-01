
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
  comments: Comment[];
  approved: boolean;
  createdAt: Date;
  updatedAt: Date;
  source?: string;
  author?: string;
  year?: number;
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
  
  const complexities = ['Basic', 'Intermediate', 'Advanced'] as const;
  
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

export const mockDiagrams = generateMockDiagrams();

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
