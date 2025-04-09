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

const fixedDiagramData = [
  { 
    title: "Molecular Expressions Cell Biology: Bacteria Cell Structure", 
    imageUrl: "https://micro.magnet.fsu.edu/cells/procaryotes/images/procaryote.jpg",
    category: "Cellular Structure",
    complexity: "Basic"
  },
  { 
    title: "Bacteria | Cell, Evolution, & Classification | Britannica", 
    imageUrl: "https://cdn.britannica.com/85/78585-050-DF72434D/cells-animal-plant-ways-nucleus-difference-organelles.jpg",
    category: "Cellular Structure",
    complexity: "Intermediate"
  },
  { 
    title: "Bacterial Cell - ScienceDirect Overview", 
    imageUrl: "https://ars.els-cdn.com/content/image/3-s2.0-B978012802234400001X-f01-04-9780128022344.jpg",
    category: "Cellular Structure",
    complexity: "Advanced"
  },
  { 
    title: "Bacteria Cell Structure", 
    imageUrl: "https://i.ytimg.com/vi/4DYgGA9jdlE/maxresdefault.jpg",
    category: "Cellular Structure",
    complexity: "Basic"
  },
  { 
    title: "Bacteria Pathogen Overview", 
    imageUrl: "https://www.abpischools.org.uk/media/lb2pbe2b/pathogens39.jpg",
    category: "Bacterial Morphology",
    complexity: "Basic"
  },
  { 
    title: "Bacteria: Definition & Characteristics With Examples & Diagram", 
    imageUrl: "https://www.sciencefacts.net/wp-content/uploads/2020/06/Bacteria-Cell.jpg",
    category: "Bacterial Morphology",
    complexity: "Intermediate"
  },
  { 
    title: "Bacterial Cell Structure - ScienceDirect Topics", 
    imageUrl: "https://ars.els-cdn.com/content/image/3-s2.0-B978012802234400001X-f01-04-9780128022344.jpg",
    category: "Cellular Structure",
    complexity: "Advanced"
  },
  { 
    title: "Prokaryote Cell Overview", 
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Prokaryote_cell.svg",
    category: "Cellular Structure",
    complexity: "Basic"
  },
  { 
    title: "Bacteria Cell Wall & Cell Membrane | Overview & Function", 
    imageUrl: "https://study.com/cimages/videopreview/videopreview-full/z2r9zwzjun.jpg",
    category: "Bacterial Morphology",
    complexity: "Basic"
  },
  { 
    title: "Bacterial Cell Structure Diagram", 
    imageUrl: "https://i.ytimg.com/vi/4DYgGA9jdlE/sddefault.jpg",
    category: "Cellular Structure",
    complexity: "Basic"
  },
  { 
    title: "Flagellum Structure Diagram", 
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Flagellum_base_diagram-en.svg/1200px-Flagellum_base_diagram-en.svg.png",
    category: "Bacterial Morphology",
    complexity: "Intermediate"
  },
  { 
    title: "From The Origin of Species to the Origin of Bacterial Flagella", 
    imageUrl: "https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fnrmicro1493/MediaObjects/41579_2006_Article_BFnrmicro1493_Figa_HTML.jpg",
    category: "Bacterial Morphology",
    complexity: "Advanced"
  },
  { 
    title: "Flagellum Base Diagram", 
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/40/Flagellum_base_diagram-en.svg",
    category: "Bacterial Morphology",
    complexity: "Intermediate"
  },
  { 
    title: "Bacterial Flagellum: Irreducibly Complex?", 
    imageUrl: "https://cms.biologos.org/wp-content/uploads/2018/09/flagellum1.jpg",
    category: "Bacterial Morphology",
    complexity: "Intermediate"
  },
  { 
    title: "CryoEM Structures of Bacterial Flagellum Rotation", 
    imageUrl: "https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41564-024-01674-1/MediaObjects/41564_2024_1674_Fig1_HTML.png",
    category: "Bacterial Morphology",
    complexity: "Advanced"
  },
  { 
    title: "Bacterial Flagellum - Structure and Movement Mechanism", 
    imageUrl: "https://microbialnotes.com/wp-content/uploads/2022/11/flagella-pic.webp",
    category: "Bacterial Morphology",
    complexity: "Intermediate"
  },
  { 
    title: "CryoEM Structures: Flagellum Rotation Mechanics", 
    imageUrl: "https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41564-024-01674-1/MediaObjects/41564_2024_1674_Fig1_HTML.png",
    category: "Bacterial Morphology",
    complexity: "Advanced"
  },
  { 
    title: "Bacterial Flagellum vs Carbon Nanotube", 
    imageUrl: "https://www.mdpi.com/sustainability/sustainability-13-00021/article_deploy/html/images/sustainability-13-00021-g001-550.jpg",
    category: "Bacterial Morphology",
    complexity: "Advanced"
  },
  { 
    title: "Arrangement of Bacterial Flagella", 
    imageUrl: "https://as2.ftcdn.net/jpg/04/08/54/39/1000_F_408543949_fkxjpvmF3w6mJOzJ7Y3SzPviD2zzLcDr.jpg",
    category: "Bacterial Morphology",
    complexity: "Basic"
  },
  { 
    title: "Origin of Bacterial Flagella", 
    imageUrl: "https://media.springernature.com/w300/springer-static/image/art%3A10.1038%2Fnrmicro1493/MediaObjects/41579_2006_Article_BFnrmicro1493_Figa_HTML.jpg",
    category: "Bacterial Morphology",
    complexity: "Advanced"
  },
  { 
    title: "Bacterial Capsule Structure", 
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Prokaryote_cell.svg",
    category: "Bacterial Morphology",
    complexity: "Basic"
  },
  { 
    title: "Bacteria - Capsules and Slime Layers", 
    imageUrl: "https://cdn.britannica.com/03/58703-050-77C73F3C/material-bacteria-suspension-ink-India-light-microscope.jpg",
    category: "Bacterial Morphology",
    complexity: "Basic"
  },
  { 
    title: "Bacterial Capsule Types", 
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Bacteria_Capsules_and_Slime_Layers.jpg/220px-Bacteria_Capsules_and_Slime_Layers.jpg",
    category: "Bacterial Morphology",
    complexity: "Intermediate"
  },
  { 
    title: "Slime Layer Structure and Function", 
    imageUrl: "https://ars.els-cdn.com/content/image/3-s2.0-B9780128174951000074-f07-06-9780128174951.jpg",
    category: "Bacterial Morphology",
    complexity: "Advanced"
  },
  { 
    title: "Prokaryote Cell with Capsule", 
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Prokaryote_cell.svg/914px-Prokaryote_cell.svg.png",
    category: "Cellular Structure",
    complexity: "Basic"
  },
  { 
    title: "Bacterial Capsules Microscope View", 
    imageUrl: "https://www.carolina.com/images/product/large/294186_ms.jpg",
    category: "Bacterial Morphology",
    complexity: "Basic"
  },
  { 
    title: "Bacterial Capsule Formation", 
    imageUrl: "https://ars.els-cdn.com/content/image/3-s2.0-B9780128186190001507-f05-01-9780128186190.jpg",
    category: "Bacterial Morphology",
    complexity: "Intermediate"
  },
  { 
    title: "Bacterial Capsule Polymerization", 
    imageUrl: "https://media.springernature.com/m685/springer-static/image/art%3A10.1038%2Fs41589-024-01664-8/MediaObjects/41589_2024_1664_Figa_HTML.png",
    category: "Bacterial Genetics",
    complexity: "Advanced"
  },
  { 
    title: "Bacteria Capsule Staining", 
    imageUrl: "https://cdn.britannica.com/03/58703-050-77C73F3C/material-bacteria-suspension-ink-India-light-microscope.jpg?w=400&h=225&c=crop",
    category: "Bacterial Morphology",
    complexity: "Intermediate"
  },
  { 
    title: "Bacterial Capsule: Importance and Function", 
    imageUrl: "https://microbeonline.com/wp-content/uploads/2022/09/Bacterial-capsule.png",
    category: "Bacterial Morphology",
    complexity: "Basic"
  },
  { 
    title: "Bacterial Binary Fission Process", 
    imageUrl: "https://cdn.kastatic.org/ka-perseus-images/9de67b7db53646ceb661951251ddc2860ddadf01.png",
    category: "Bacterial Reproduction",
    complexity: "Basic"
  },
  { 
    title: "Bacterial Multiplication Process", 
    imageUrl: "https://useruploads.socratic.org/RYkjyGuGRLyuU9X0AOqR_Binary_fission.jpg",
    category: "Bacterial Reproduction",
    complexity: "Basic"
  },
  { 
    title: "Alternatives to Binary Fission in Bacteria", 
    imageUrl: "https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fnrmicro1096/MediaObjects/41579_2005_Article_BFnrmicro1096_Fig1_HTML.jpg",
    category: "Bacterial Reproduction",
    complexity: "Advanced"
  },
  { 
    title: "Binary Fission Process Diagram", 
    imageUrl: "https://www.shutterstock.com/image-vector/binary-fission-process-bacteria-vector-600nw-2258884109.jpg",
    category: "Bacterial Reproduction",
    complexity: "Basic"
  },
  { 
    title: "Reproduction Methods of Bacteria", 
    imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhlCLTieyI-lnTiTxn_UrQ85ZqJ-l9PNQqVrQLmHxxPd7K02BNTHOFuokRSYfaVqFKUvkUvWl_67Oz5AMFk7Q0VGMHmgcQa3yki1Rx5wA-7S7gwZtUgkUqtjc-lx4AwRyPrHpdN6Aj4flKCg3FZjM7oH1q36_I6-ZMycZsk8ersHAVNYiQ3JI2o9Fsg/s813/Asexual%20reproduction%20in%20bacteria%20by%20binary%20fission.png",
    category: "Bacterial Reproduction",
    complexity: "Intermediate"
  },
  { 
    title: "Binary Fission Process in E. coli", 
    imageUrl: "https://cdn.britannica.com/93/130893-050-5B4B3040/Escherichia-coli-bacteria-cytokinesis-stage-fission.jpg",
    category: "Bacterial Reproduction",
    complexity: "Intermediate"
  },
  { 
    title: "Binary Fission Process Stages", 
    imageUrl: "https://www.researchgate.net/publication/43492619/figure/fig3/AS:527493390372864@1502775632813/Binary-Fission-in-Bacteria-Parent-cell-divides-into-two-identical-daughter-cells-through.png",
    category: "Bacterial Reproduction",
    complexity: "Basic"
  },
  { 
    title: "Binary Fission Animation Frames", 
    imageUrl: "https://i.ytimg.com/vi/-Eyv7UfgLAY/hqdefault.jpg",
    category: "Bacterial Reproduction",
    complexity: "Basic"
  },
  { 
    title: "Salmonella Bacterial Reproduction", 
    imageUrl: "https://www.thoughtco.com/thmb/nTg6oiV1yNl6fJskH3fV6nQTWdM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/salmonella_bact_lg-56a09b3d5f9b58eba4b204de.jpg",
    category: "Bacterial Reproduction",
    complexity: "Intermediate"
  },
  { 
    title: "Reproduction in Bacteria - Various Methods", 
    imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiiScFZca-UQMlK8BvB8BYJgGKrPeUksWJ7BfNBbWBqyfCzmQ2KF4tAV6yG3nf5jm4k6AtGV8zrCI_0V10o9Xx9eODR9IcPMgZ5L4EkLtkRazHuXvWPymrCiddc6yA54Gy9pRaB_BEn0Ro/s640/bacterial+BinaryFission.jpg",
    category: "Bacterial Reproduction",
    complexity: "Intermediate"
  },
  { 
    title: "Bacterial Growth Curve Phases", 
    imageUrl: "https://www.thoughtco.com/thmb/hEQ8kivzpoYNimlmeZBdpGTLpaI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/growing_bacteria-5b56347ac9e77c0037c64487.jpg",
    category: "Bacterial Reproduction",
    complexity: "Basic"
  },
  { 
    title: "Bacteria Growth Curve - Phases Overview", 
    imageUrl: "https://cdn.britannica.com/68/6168-050-EB74BC4E/growth-curve-colonies-phases.jpg",
    category: "Bacterial Ecology",
    complexity: "Intermediate"
  },
  { 
    title: "Bacterial Growth on Polyethylene Surface", 
    imageUrl: "https://media.springernature.com/m685/springer-static/image/art%3A10.1038%2Fsrep15159/MediaObjects/41598_2015_Article_BFsrep15159_Fig1_HTML.jpg",
    category: "Bacterial Ecology",
    complexity: "Advanced"
  },
  { 
    title: "Bacterial Growth in High Temperatures", 
    imageUrl: "https://www.cortecvci.com/wp-content/uploads/bacterial-growth.jpg",
    category: "Bacterial Ecology",
    complexity: "Intermediate"
  },
  { 
    title: "Bacterial Growth Measurements", 
    imageUrl: "https://www.bmglabtech.com/hubfs/1_Webseite/5_Resources/Blogs/bacterial-growth-fig1.webp",
    category: "Bacterial Ecology",
    complexity: "Intermediate"
  },
  { 
    title: "Microbial Growth Chart", 
    imageUrl: "http://www2.hawaii.edu/~johnb/micro/medmicro/pictures/growthcurve.gif",
    category: "Bacterial Ecology",
    complexity: "Basic"
  },
  { 
    title: "Standard Bacterial Growth Curve", 
    imageUrl: "https://www.thoughtco.com/thmb/vAN9PIMmeiGizVyEcU6hevKAM9Y=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/bacterial_growth_curve-5b56356d4cedfd00371b477b.jpg",
    category: "Bacterial Ecology",
    complexity: "Basic"
  },
  { 
    title: "Bacterial Growth Curve Protocol", 
    imageUrl: "https://microbenotes.com/wp-content/uploads/2019/02/Bacterial-growth-curve.jpg",
    category: "Bacterial Ecology",
    complexity: "Intermediate"
  },
  { 
    title: "Bacterial Growth Measurements in Lab", 
    imageUrl: "https://www.bmglabtech.com/hubfs/1_Webseite/5_Resources/Blogs/bacterial-growth-fig4.webp",
    category: "Bacterial Ecology",
    complexity: "Advanced" 
  },
  { 
    title: "Bacterial Growth and Cell Size Control", 
    imageUrl: "https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fsrep15159/MediaObjects/41598_2015_Article_BFsrep15159_Fig1_HTML.jpg",
    category: "Bacterial Ecology",
    complexity: "Advanced"
  }
];

const complexityLevels = ["Basic", "Intermediate", "Advanced"] as const;
type ComplexityLevel = typeof complexityLevels[number];

const filterByComplexity = (diagrams: Diagram[], complexity: string): Diagram[] => {
  if (!complexity) return diagrams;
  
  const validComplexity = complexityLevels.includes(complexity as ComplexityLevel) 
    ? complexity as ComplexityLevel 
    : "Basic";
  
  return diagrams.filter(diagram => diagram.complexity === validComplexity);
};

const generateMockDiagrams = (): Diagram[] => {
  console.log("Generating mock diagrams from fixed list");
  
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
  
  const generateRandomTags = (category: DiagramCategory, subject: string, title: string): string[] => {
    const baseTags = ['bacteria', subject.toLowerCase(), category.toLowerCase()];
    const additionalTags = [
      'microbiology', 'pathogen', 'gram-positive', 'gram-negative', 
      'antibiotic', 'resistance', 'biofilm', 'flagella', 'plasmid', 
      'prokaryote', 'clinical', 'medical', 'research', 'educational'
    ];
    
    const titleWords = title.toLowerCase().split(' ')
      .filter(word => word.length > 3)
      .filter(word => !baseTags.includes(word))
      .slice(0, 2);
    
    const result = [...baseTags, ...titleWords];
    const tagCount = Math.floor(Math.random() * 3) + 1; // 1-3 additional tags
    
    for (let i = 0; i < tagCount; i++) {
      const tag = getRandomItem(additionalTags);
      if (!result.includes(tag)) {
        result.push(tag);
      }
    }
    
    return result;
  };
  
  const diagrams: Diagram[] = [];
  
  for (let i = 0; i < fixedDiagramData.length; i++) {
    const { title, imageUrl, category, complexity } = fixedDiagramData[i];
    const subject = getRandomItem(subjects);
    
    const thumbnailUrl = imageUrl;
    
    const diagram: Diagram = {
      id: `diagram-${i + 1}`,
      title: title,
      description: `A detailed ${complexity.toLowerCase()} level diagram showing ${category.toLowerCase()} of bacteria. ${title}`,
      imageUrl: imageUrl,
      thumbnailUrl: thumbnailUrl,
      category: category as DiagramCategory,
      complexity: complexity as ComplexityLevel,
      uploaderId: `user-${Math.floor(Math.random() * 10) + 1}`,
      uploaderName: `Researcher ${Math.floor(Math.random() * 10) + 1}`,
      subject,
      tags: generateRandomTags(category as DiagramCategory, subject, title),
      likes: Math.floor(Math.random() * 100),
      likedByUserIds: [], // Initialize empty array to track user likes
      comments: [],
      approved: Math.random() > 0.1, // 90% are approved
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
      updatedAt: new Date(Date.now() - Math.floor(Math.random() * 1000000000)),
      source: title.includes("|") ? title.split("|")[1].trim() : undefined,
      author: Math.random() > 0.3 ? `Dr. ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}. Smith` : undefined,
      year: Math.random() > 0.3 ? 2020 + Math.floor(Math.random() * 4) : undefined,
    };
    
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
  
  console.log(`Generated ${diagrams.length} diagrams from fixed list`);
  return diagrams;
};

const getPersistedDiagrams = (): Diagram[] => {
  const storageDiagramsKey = 'bacteria-diagrams-data';
  
  const storedDiagramsStr = localStorage.getItem(storageDiagramsKey);
  
  if (storedDiagramsStr) {
    try {
      console.log("Found existing diagrams in localStorage");
      const parsedData = JSON.parse(storedDiagramsStr);
      console.log(`Loaded ${parsedData.length} diagrams from localStorage`);
      
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
      console.log("Generating new diagrams due to parse error");
      const newDiagrams = generateMockDiagrams();
      saveDiagramsToStorage(newDiagrams);
      return newDiagrams;
    }
  }
  
  console.log("No diagrams in localStorage, generating new ones");
  const newDiagrams = generateMockDiagrams();
  saveDiagramsToStorage(newDiagrams);
  return newDiagrams;
};

export const saveDiagramsToStorage = (diagrams: Diagram[]): void => {
  console.log(`Saving ${diagrams.length} diagrams to localStorage`);
  localStorage.setItem('bacteria-diagrams-data', JSON.stringify(diagrams));
};

export const mockDiagrams = getPersistedDiagrams();

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
