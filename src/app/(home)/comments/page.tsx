"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/auth-context";
import { useGetOneComment } from "@/hooks/api/comment.hook";
import { useCreateComment } from "@/mutations/api/comments";
import { IComment } from "@/providers/http/comments/interface";
import { formatDistanceToNow, set } from "date-fns";
import { Image as ImageIcon, MessageSquare, Send } from "lucide-react";
import { useState } from "react";

interface Comment {
  id: number;
  user: string;
  content: string;
  createdAt: Date;
  image?: string;
  replies?: Comment[];
  parentId?: number;
}

export default function CommentsDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [newReply, setNewReply] = useState("");
  const [replyingTo, setReplyingTo] = useState<{ uuid: string } | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [uuid, setUUID] = useState<string | null>(null);
  const { user } = useAuth();

  const { data: comment, isLoading: isLoadingComment } = useGetOneComment(
    "2e88adcd-59a3-4656-8f43-7d432840eda2"
  );

  const { mutate: createComment } = useCreateComment(() => {
    setNewComment("");
    setNewReply("");
    setSelectedImage(null);
    setReplyingTo(null);
  });

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

  const handleSubmit = (e: React.FormEvent, parentUUID?: string) => {
    e.preventDefault();
    if (!user) return;

    const formData = new FormData();

    selectedImage && formData.append("file", selectedImage);

    if (parentUUID) {
      formData.append("parentCommentUUID", parentUUID);
      formData.append("content", newReply);
    } else {
      formData.append("content", newComment);
    }

    formData.append("userUUID", user?.uuid);
    formData.append("bookUUID", "2e88adcd-59a3-4656-8f43-7d432840eda2");

    createComment(formData);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you'd upload to a server
      // For demo, we'll use a placeholder image
      setSelectedImage(
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&q=80"
      );
    }
  };

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
          <form
            onSubmit={(e) => handleSubmit(e, comment.uuid)}
            className="flex gap-2"
          >
            {/* <Textarea
              placeholder="Write a reply..."
              value={newReply}
              onChange={(e) => setNewReply(e.target.value)}
              className="min-h-[60px]"
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
            </Button> */}
            <Textarea
              placeholder="Write a reply..."
              value={newReply}
              onChange={(e) => setNewReply(e.target.value)}
              className="min-h-[60px]"
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
                    onChange={handleImageUpload}
                  />
                </label>
              </Button>
              <Button
                type="submit"
                size="icon"
                disabled={!newReply.trim() && !selectedImage}
              >
                <Send className="h-4 w-4" />
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
      {comment?.replies && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {comment.replies?.length} Comments
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
            <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
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
                      onChange={handleImageUpload}
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
