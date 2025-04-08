import { Diagram, mockDiagrams, CitationFormat, generateCitation, mockCategories, Category, saveDiagramsToStorage } from "../data/diagramsData";

// Mock API service
export const api = {
  // Diagram operations
  diagrams: {
    getAll: async (): Promise<Diagram[]> => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockDiagrams.filter(diagram => diagram.approved);
    },
    
    getById: async (id: string): Promise<Diagram | undefined> => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockDiagrams.find(diagram => diagram.id === id);
    },
    
    getByCategory: async (category: string): Promise<Diagram[]> => {
      await new Promise(resolve => setTimeout(resolve, 400));
      return mockDiagrams.filter(
        diagram => diagram.approved && diagram.category.toLowerCase() === category.toLowerCase()
      );
    },
    
    search: async (query: string): Promise<Diagram[]> => {
      await new Promise(resolve => setTimeout(resolve, 600));
      const lowerQuery = query.toLowerCase();
      return mockDiagrams.filter(diagram => 
        diagram.approved && (
          diagram.title.toLowerCase().includes(lowerQuery) ||
          diagram.description.toLowerCase().includes(lowerQuery) ||
          diagram.subject.toLowerCase().includes(lowerQuery) ||
          diagram.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
        )
      );
    },
    
    like: async (id: string, userId: string): Promise<Diagram | undefined> => {
      await new Promise(resolve => setTimeout(resolve, 200));
      const diagram = mockDiagrams.find(d => d.id === id);
      
      if (diagram) {
        // Check if user already liked this diagram
        if (!diagram.likedByUserIds.includes(userId)) {
          diagram.likes += 1;
          diagram.likedByUserIds.push(userId);
          console.log(`User ${userId} liked diagram ${id}`);
          saveDiagramsToStorage(mockDiagrams); // Persist the changes
        }
      }
      return diagram;
    },
    
    unlike: async (id: string, userId: string): Promise<Diagram | undefined> => {
      await new Promise(resolve => setTimeout(resolve, 200));
      const diagram = mockDiagrams.find(d => d.id === id);
      
      if (diagram) {
        // Check if user has liked this diagram
        const userLikeIndex = diagram.likedByUserIds.indexOf(userId);
        if (userLikeIndex !== -1) {
          diagram.likes -= 1;
          diagram.likedByUserIds.splice(userLikeIndex, 1);
          console.log(`User ${userId} unliked diagram ${id}`);
          saveDiagramsToStorage(mockDiagrams); // Persist the changes
        }
      }
      return diagram;
    },
    
    addComment: async (diagramId: string, userId: string, userName: string, text: string): Promise<boolean> => {
      await new Promise(resolve => setTimeout(resolve, 300));
      console.log(`Adding comment to diagram ${diagramId} by user ${userId}: ${text}`);
      
      const diagram = mockDiagrams.find(d => d.id === diagramId);
      if (diagram) {
        const comment = {
          id: `comment-${Date.now()}`,
          userId,
          userName,
          text,
          timestamp: new Date(),
          replies: [],
        };
        console.log("Created new comment object:", comment);
        diagram.comments.push(comment);
        console.log(`Comment added to diagram. New comment count: ${diagram.comments.length}`);
        saveDiagramsToStorage(mockDiagrams); // Persist the changes
        return true;
      }
      console.log("Diagram not found for comment");
      return false;
    },
    
    addReply: async (
      diagramId: string, 
      commentId: string, 
      userId: string, 
      userName: string, 
      text: string
    ): Promise<boolean> => {
      await new Promise(resolve => setTimeout(resolve, 300));
      const diagram = mockDiagrams.find(d => d.id === diagramId);
      if (!diagram) return false;
      
      const comment = diagram.comments.find(c => c.id === commentId);
      if (comment) {
        const reply = {
          id: `reply-${Date.now()}`,
          userId,
          userName,
          text,
          timestamp: new Date(),
          parentId: commentId,
        };
        if (!comment.replies) {
          comment.replies = [];
        }
        comment.replies.push(reply);
        saveDiagramsToStorage(mockDiagrams); // Persist the changes
        return true;
      }
      return false;
    },
    
    deleteComment: async (diagramId: string, commentId: string, userId: string): Promise<boolean> => {
      await new Promise(resolve => setTimeout(resolve, 200));
      const diagram = mockDiagrams.find(d => d.id === diagramId);
      if (!diagram) return false;
      
      // Check if it's a top-level comment
      const commentIndex = diagram.comments.findIndex(c => c.id === commentId && c.userId === userId);
      if (commentIndex >= 0) {
        diagram.comments.splice(commentIndex, 1);
        saveDiagramsToStorage(mockDiagrams); // Persist the changes
        return true;
      }
      
      // Check if it's a reply
      for (const comment of diagram.comments) {
        if (comment.replies) {
          const replyIndex = comment.replies.findIndex(r => r.id === commentId && r.userId === userId);
          if (replyIndex >= 0) {
            comment.replies.splice(replyIndex, 1);
            saveDiagramsToStorage(mockDiagrams); // Persist the changes
            return true;
          }
        }
      }
      
      return false;
    },
    
    uploadDiagram: async (diagram: Omit<Diagram, 'id' | 'createdAt' | 'updatedAt' | 'comments' | 'likes' | 'approved' | 'likedByUserIds'>): Promise<Diagram> => {
      await new Promise(resolve => setTimeout(resolve, 800));
      const newDiagram: Diagram = {
        ...diagram,
        id: `diagram-${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date(),
        comments: [],
        likes: 0,
        likedByUserIds: [], // Initialize empty array
        approved: false,
      };
      mockDiagrams.unshift(newDiagram);
      saveDiagramsToStorage(mockDiagrams); // Persist the changes
      return newDiagram;
    },
    
    approveDiagram: async (id: string): Promise<boolean> => {
      await new Promise(resolve => setTimeout(resolve, 300));
      const diagram = mockDiagrams.find(d => d.id === id);
      if (diagram) {
        diagram.approved = true;
        saveDiagramsToStorage(mockDiagrams); // Persist the changes
        return true;
      }
      return false;
    },
    
    deleteDiagram: async (id: string): Promise<boolean> => {
      await new Promise(resolve => setTimeout(resolve, 300));
      const index = mockDiagrams.findIndex(d => d.id === id);
      if (index >= 0) {
        mockDiagrams.splice(index, 1);
        saveDiagramsToStorage(mockDiagrams); // Persist the changes
        return true;
      }
      return false;
    },
    
    getCitation: (diagram: Diagram, format: CitationFormat): string => {
      return generateCitation(diagram, format);
    },
    
    getUnapprovedDiagrams: async (): Promise<Diagram[]> => {
      await new Promise(resolve => setTimeout(resolve, 400));
      return mockDiagrams.filter(diagram => !diagram.approved);
    },
  },
  
  // Category operations
  categories: {
    getAll: async (): Promise<Category[]> => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockCategories;
    },
  },
  
  // User operations
  users: {
    login: async (email: string, password: string) => {
      // This is a mock function - in a real app, you'd authenticate against a backend
      await new Promise(resolve => setTimeout(resolve, 500));
      if (email && password.length >= 6) {
        return {
          id: 'user-1',
          name: email.split('@')[0],
          email,
          role: 'student' as const,
        };
      }
      throw new Error('Invalid credentials');
    },
    
    register: async (name: string, email: string, password: string, role: string) => {
      // This is a mock function
      await new Promise(resolve => setTimeout(resolve, 700));
      if (email && password.length >= 6) {
        return {
          id: `user-${Date.now()}`,
          name,
          email,
          role: role as any,
        };
      }
      throw new Error('Invalid registration details');
    },
  }
};
