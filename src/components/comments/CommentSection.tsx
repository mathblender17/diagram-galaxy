
import { useState, useEffect } from "react";
import { Comment } from "@/data/diagramsData";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/services/api";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Reply, Trash2 } from "lucide-react";

interface CommentSectionProps {
  diagramId: string;
  comments: Comment[];
}

export function CommentSection({ diagramId, comments: initialComments }: CommentSectionProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  
  // Sync comments when initialComments changes
  useEffect(() => {
    console.log("Initial comments updated:", initialComments);
    setComments(initialComments);
  }, [initialComments]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to comment",
        variant: "destructive",
      });
      return;
    }
    
    if (!commentText.trim()) {
      toast({
        title: "Empty comment",
        description: "Please enter a comment before submitting",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    console.log("Submitting comment:", commentText);
    
    try {
      console.log("Adding comment for diagram:", diagramId);
      const success = await api.diagrams.addComment(
        diagramId, 
        user.id, 
        user.name, 
        commentText
      );
      
      console.log("Comment submission response:", success);
      
      if (success) {
        // In a real app, you would fetch the updated comments
        // For now, we'll simulate it by adding a new comment
        const newComment: Comment = {
          id: `comment-${Date.now()}`,
          userId: user.id,
          userName: user.name,
          text: commentText,
          timestamp: new Date(),
          replies: [],
        };
        
        console.log("Adding new comment to UI:", newComment);
        // Create a new array to ensure React detects the state change
        setComments(prevComments => [newComment, ...prevComments]);
        setCommentText("");
        
        toast({
          title: "Comment added",
          description: "Your comment has been added successfully",
        });
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      toast({
        title: "Error",
        description: "Failed to add comment",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitReply = async (commentId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to reply",
        variant: "destructive",
      });
      return;
    }
    
    if (!replyText.trim()) {
      toast({
        title: "Empty reply",
        description: "Please enter a reply before submitting",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const success = await api.diagrams.addReply(
        diagramId,
        commentId,
        user.id,
        user.name,
        replyText
      );
      
      if (success) {
        // In a real app, you would fetch the updated comments
        // For now, we'll simulate it by adding the reply to the comment
        const updatedComments = comments.map(comment => {
          if (comment.id === commentId) {
            const newReply: Comment = {
              id: `reply-${Date.now()}`,
              userId: user.id,
              userName: user.name,
              text: replyText,
              timestamp: new Date(),
              parentId: commentId,
            };
            
            return {
              ...comment,
              replies: [...(comment.replies || []), newReply],
            };
          }
          return comment;
        });
        
        setComments(updatedComments);
        setReplyText("");
        setReplyingTo(null);
        
        toast({
          title: "Reply added",
          description: "Your reply has been added successfully",
        });
      }
    } catch (error) {
      console.error("Error adding reply:", error);
      toast({
        title: "Error",
        description: "Failed to add reply",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!user) return;
    
    try {
      const success = await api.diagrams.deleteComment(diagramId, commentId, user.id);
      
      if (success) {
        // Filter out the deleted comment
        const updatedComments = comments.filter(comment => comment.id !== commentId);
        
        // Also check for replies that need to be deleted
        const updatedWithRepliesFiltered = updatedComments.map(comment => {
          if (comment.replies) {
            return {
              ...comment,
              replies: comment.replies.filter(reply => reply.id !== commentId),
            };
          }
          return comment;
        });
        
        setComments(updatedWithRepliesFiltered);
        
        toast({
          title: "Comment deleted",
          description: "Your comment has been deleted successfully",
        });
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast({
        title: "Error",
        description: "Failed to delete comment",
        variant: "destructive",
      });
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-6 flex items-center">
          <MessageSquare className="mr-2 h-5 w-5" />
          Comments ({comments.length})
        </h2>
        
        {user ? (
          <form onSubmit={handleSubmitComment} className="mb-8">
            <div className="flex items-start gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.profileImage} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <Textarea
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="mb-2"
                />
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Post Comment"}
                </Button>
              </div>
            </div>
          </form>
        ) : (
          <div className="bg-gray-50 p-4 rounded-md mb-8 text-center">
            <p className="text-gray-700 mb-2">Please log in to add a comment</p>
            <Button asChild variant="outline">
              <a href="/login">Log In</a>
            </Button>
          </div>
        )}
        
        {comments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No comments yet. Be the first to comment!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {comments.map(comment => (
              <div key={comment.id} className="border-b border-gray-200 pb-6 last:border-0">
                <div className="flex items-start gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{comment.userName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-1">
                      <div>
                        <span className="font-medium">{comment.userName}</span>
                        <span className="text-gray-500 text-sm ml-2">
                          {formatDate(comment.timestamp)}
                        </span>
                      </div>
                      {user && user.id === comment.userId && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteComment(comment.id)}
                          className="h-8 px-2 text-gray-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <p className="text-gray-700 mb-3">{comment.text}</p>
                    
                    {user && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                        className="text-gray-500"
                      >
                        <Reply className="h-4 w-4 mr-1" />
                        Reply
                      </Button>
                    )}
                    
                    {replyingTo === comment.id && (
                      <div className="mt-4">
                        <Textarea
                          placeholder="Write a reply..."
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          className="mb-2"
                        />
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleSubmitReply(comment.id)}
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Submitting..." : "Post Reply"}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setReplyingTo(null);
                              setReplyText("");
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    {/* Replies */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="mt-4 pl-4 border-l-2 border-gray-200 space-y-4">
                        {comment.replies.map(reply => (
                          <div key={reply.id} className="flex items-start gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{reply.userName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-grow">
                              <div className="flex items-center justify-between mb-1">
                                <div>
                                  <span className="font-medium">{reply.userName}</span>
                                  <span className="text-gray-500 text-sm ml-2">
                                    {formatDate(reply.timestamp)}
                                  </span>
                                </div>
                                {user && user.id === reply.userId && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDeleteComment(reply.id)}
                                    className="h-6 px-2 text-gray-500"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                )}
                              </div>
                              <p className="text-gray-700">{reply.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
