"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { MessageSquare, Image as ImageIcon, Send } from "lucide-react";
import { useGetOneComment } from "@/hooks/api/comment.hook";
import { get } from "http";
import { IComment } from "@/providers/http/comments/interface";

interface Comment {
  id: number;
  user: string;
  content: string;
  createdAt: Date;
  image?: string;
  replies?: Comment[];
  parentId?: number;
}

const demoComments: Comment[] = [
  {
    id: 1,
    user: "Alice",
    content:
      "This book was absolutely fascinating! The character development was exceptional.",
    createdAt: new Date("2024-03-15T10:00:00"),
    replies: [
      {
        id: 3,
        user: "Charlie",
        content: "I agree! The protagonist's journey was incredible.",
        createdAt: new Date("2024-03-15T11:30:00"),
        replies: [
          {
            id: 4,
            user: "Alice",
            content: "The ending was particularly moving.",
            createdAt: new Date("2024-03-15T12:00:00"),
          },
        ],
      },
    ],
  },
  {
    id: 2,
    user: "Bob",
    content:
      "I couldn't put it down. The plot twists kept me engaged throughout.",
    createdAt: new Date("2024-03-14T15:30:00"),
    image:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&q=80",
  },
];

export default function CommentsDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [comments, setComments] = useState<Comment[]>(demoComments);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<{ uuid: string } | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [uuid, setUUID] = useState<string | null>(null);

  const { data: comment, isLoading: isLoadingComment } = useGetOneComment(
    "2e88adcd-59a3-4656-8f43-7d432840eda2"
  );
  
  const getComments = (): any => {
    if (!comment?.replies || isLoadingComment) return;
    return (
      <>
        <div className="ml-8 space-y-4">
          {comment?.replies.map((reply) => (
            <>
              <CommentComponent key={reply.uuid} comment={reply} />
            </>
          ))}
        </div>
      </>
    );
  };

  // const addReplyToComment = (
  //   commentsList: Comment[],
  //   parentId: number,
  //   newReply: Comment
  // ): Comment[] => {
  //   return commentsList.map(comment => {
  //     if (comment.id === parentId) {
  //       return {
  //         ...comment,
  //         replies: [...(comment.replies || []), newReply]
  //       }
  //     }
  //     if (comment.replies) {
  //       return {
  //         ...comment,
  //         replies: addReplyToComment(comment.replies, parentId, newReply)
  //       }
  //     }
  //     return comment
  //   })
  // }

  // const handleSubmit = (e: React.FormEvent, parentInfo?: { id: number; level: number }) => {
  //   e.preventDefault()
  //   if (!newComment.trim() && !selectedImage) return

  //   const comment: Comment = {
  //     id: Date.now(),
  //     user: "Guest",
  //     content: newComment,
  //     createdAt: new Date(),
  //     image: selectedImage || undefined,
  //     parentId: parentInfo?.id,
  //   }

  //   if (parentInfo) {
  //     setComments(prevComments =>
  //       addReplyToComment(prevComments, parentInfo.id, comment)
  //     )
  //     setReplyingTo(null)
  //   } else {
  //     setComments(prevComments => [comment, ...prevComments])
  //   }

  //   setNewComment("")
  //   setSelectedImage(null)
  // }

  // const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0]
  //   if (file) {
  //     // In a real app, you'd upload to a server
  //     // For demo, we'll use a placeholder image
  //     setSelectedImage("https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&q=80")
  //   }
  // }

  const CommentComponent = ({
    comment,
    preview = false,
  }: {
    comment: IComment;
    preview?: boolean;
  }) => (
    <div className="space-y-4">
      <div className="flex gap-4 p-4 rounded-lg bg-muted/50">
        <Avatar>
          <AvatarFallback>{comment.user.name.split(" ")[0][0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-medium">{comment.user.name}</span>
            <span className="text-sm text-muted-foreground">
              {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
            </span>
          </div>
          <p className="text-sm">{comment.content}</p>
          {comment.url && (
            <div className="relative h-48 w-full rounded-lg overflow-hidden mt-2">
              <img
                src={comment.url}
                alt="Comment attachment"
                className="object-cover"
              />
            </div>
          )}
          {!preview && (
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground"
              onClick={() => setReplyingTo({ uuid: comment.uuid })}
            >
              Reply
            </Button>
          )}
        </div>
      </div>

      {replyingTo?.uuid === comment.uuid && (
        <div className="ml-8">
          <form onSubmit={(e) => {}} className="flex gap-2">
            <Textarea
              placeholder="Write a reply..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[60px]"
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}

      {comment.replies && !preview && (
        <div className="ml-8 space-y-4">
          {comment.replies.map((reply) => (
            <CommentComponent key={reply.uuid} comment={reply} />
          ))}
        </div>
      )}
    </div>
  );
  // return getComments(comment)

  return (

    <div className="space-y-4">
      {comments[0] && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {comments.length} Comments
              </span>
            </div>
            <Button
              variant="outline"
              onClick={() => setIsOpen(true)}
              className="text-muted-foreground"
            >
              View All
            </Button>
          </div>
          {comment && <CommentComponent comment={comment} preview />}
        </div>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Comments</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <form onSubmit={(e) => {}} className="space-y-4">
              <Textarea
                placeholder="Share your thoughts about this book..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[100px]"
              />
              <div className="flex justify-between items-center">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  asChild
                >
                  <label>
                    <ImageIcon className="h-4 w-4" />
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {}}
                    />
                  </label>
                </Button>
                <Button
                  type="submit"
                  disabled={!newComment.trim() && !selectedImage}
                >
                  Post Comment
                </Button>
              </div>
              {selectedImage && (
                <div className="relative h-48 w-full rounded-lg overflow-hidden">
                  <img
                    src={selectedImage}
                    alt="Upload preview"
                    className="object-cover"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => setSelectedImage(null)}
                  >
                    ×
                  </Button>
                </div>
              )}
            </form>


              {getComments()}
            
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
