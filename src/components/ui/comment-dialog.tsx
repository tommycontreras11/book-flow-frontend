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
import { useGetAllComment } from "@/hooks/api/comment.hook";
import { useCreateComment } from "@/mutations/api/comments";
import { IComment } from "@/providers/http/comments/interface";
import { formatDistanceToNow } from "date-fns";
import { Image as ImageIcon, MessageSquare, Send } from "lucide-react";
import { useState } from "react";

export default function CommentsDialog({ bookUUID }: { bookUUID: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenReply, setIsOpenReply] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [newReply, setNewReply] = useState("");
  const [replyingTo, setReplyingTo] = useState<{ uuid: string } | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [expandedReplies, setExpandedReplies] = useState<Set<string>>(
    new Set()
  );

  const { user } = useAuth();

  const {
    data: comments,
    totalComments,
    refetch,
    isLoading: isLoadingComments,
  } = useGetAllComment(bookUUID);

  const { mutate: createComment } = useCreateComment(() => {
    setNewComment("");
    setNewReply("");
    setSelectedImage(null);
    setReplyingTo(null);
    refetch();
  });

  const toggleReplies = (uuid: string) => {
    setExpandedReplies((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(uuid)) {
        newSet.delete(uuid);
      } else {
        newSet.add(uuid);
      }
      return newSet;
    });
  };

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

    formData.append("userUUID", user.uuid);
    formData.append("bookUUID", bookUUID);

    createComment(formData);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const CommentComponent = ({
    comment,
    isReply = false,
    preview = false,
    expandedReplies,
    toggleReplies,
  }: {
    comment: IComment;
    isReply?: boolean;
    preview?: boolean;
    expandedReplies: Set<string>;
    toggleReplies: (uuid: string) => void;
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
            <>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground"
                onClick={() => {
                  setReplyingTo({ uuid: comment.uuid });
                  setIsOpenReply(!isOpenReply);
                }}
              >
                Reply
              </Button>
              {comment?.replies && comment?.replies?.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground"
                  onClick={() => toggleReplies(comment.uuid)}
                >
                  {expandedReplies.has(comment.uuid)
                    ? "Hide replies"
                    : "View replies"}
                </Button>
              )}
            </>
          )}
          {expandedReplies.has(comment.uuid) && comment.replies && (
            <div className="space-y-4">
              {comment.replies.map((reply) => (
                <CommentComponent
                  key={reply.uuid}
                  isReply
                  comment={reply}
                  expandedReplies={expandedReplies}
                  toggleReplies={toggleReplies}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {!preview && replyingTo?.uuid === comment.uuid && isOpenReply && (
        <div className="ml-8">
          <form
            onSubmit={(e) => handleSubmit(e, comment.uuid)}
            className="flex gap-2"
          >
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
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {totalComments || 0} Comments
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
        {comments && (
          <CommentComponent
            expandedReplies={expandedReplies}
            toggleReplies={toggleReplies}
            comment={comments[0]}
            preview
          />
        )}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className="max-w-2xl max-h-[80vh] overflow-y-auto"
          aria-describedby={undefined}
        >
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

            {!isLoadingComments && comments && (
              <div className="ml-8 space-y-4">
                {comments.map((comment) => (
                  <>
                    <CommentComponent
                      key={comment.uuid}
                      expandedReplies={expandedReplies}
                      toggleReplies={toggleReplies}
                      comment={comment}
                    />
                  </>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
