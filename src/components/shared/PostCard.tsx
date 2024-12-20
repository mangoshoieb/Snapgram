import { useUserContext } from "@/context/AuthContext";
import { multiFormatDateString } from "@/lib/utils";
import { Models } from "appwrite";
import { Link, useNavigate } from "react-router-dom";
import PostStats from "./PostStats";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { CommentValidation } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateComment } from "../react-query/queriesAndMutations";
import { useToast } from "@/hooks/use-toast";
import Loader from "./Loader";
type PostCardProps = {
  post: Models.Document;
  action?: "create" | "update";
};
const PostCard = ({ post, action }: PostCardProps) => {
  const { mutateAsync: createComment, isPending: isCreateLoading } =
    useCreateComment();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useUserContext();
  if (!post.creator) return;
  console.log(action);

  // 1. Define your form.
  const form = useForm<z.infer<typeof CommentValidation>>({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      text: "",
    },
  });

  async function onSubmit(values: z.infer<typeof CommentValidation>) {
    if (post) {
      console.log({
        ...values,
        userId: user.id,
        postId: post.$id,
      });
      const newComment = await createComment({
        ...values,
        userId: user.id,
        postId: post.$id,
      });
      if (!newComment) {
        throw new Error("Failed to create comment");
      }
      toast({
        variant: "default",
        title: "Comment created successfully!",
      });
      return navigate(`/posts/${post.$id}`);
    }
  }
  const handleImageClick = () => {
    form.handleSubmit(onSubmit)();
  };
  return (
    <div className="post-card">
      <div className="flex-between">
        <div className="flex gap-3 items-center">
          <Link to={`/profile/${post.creator.$id}`}>
            <img
              src={
                post?.creator?.imageUrl ||
                "/assets/icons/profile-placeholder.svg"
              }
              alt="creator"
              className="rounded-full w-12 lg:h-12"
            />
          </Link>
          <div className="flex flex-col">
            <p className="base-meduim lg:body-bold text-light-1">
              {post?.creator.name}
            </p>
            <div className="flex items-center text-light-3 gap-2">
              <p className="lg:small-regular subtle-semibold">
                {multiFormatDateString(post.creator.$createdAt)}
              </p>
              -
              <p className="lg:small-regular  subtle-semibold">
                {post.location}
              </p>
            </div>
          </div>
        </div>
        <Link
          to={`/edit-post/${post.$id}`}
          className={`${user.id !== post.creator.$id && "hidden"}`}
        >
          <img src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
        </Link>
      </div>
      <Link to={`posts/${post.$id}`}>
        <div className="base-medium lg:body-medium py-5">
          <p>{post.caption}</p>
          <ul className="flex gap-3 mt-2">
            {post.tags.map((tag: string) => (
              <li key={tag} className="text-light-3">
                #{tag}
              </li>
            ))}
          </ul>
        </div>
        <img
          src={post.imageUrl || "/assets/icons/profile-placeholder.svg"}
          alt="image"
          className="post-card_img "
        />
      </Link>
      <PostStats post={post} userId={user.id} />
      <div className="flex mt-10 gap-4 items-center">
        <img
          src={user.imageUrl}
          alt="commentImg"
          className="w-12 h-12 rounded-full"
        />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col w-full max-w-lg"
          >
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center bg-dark-4 rounded-xl px-3 hover:ring-1 hover:ring-offset-1 ring-offset-light-3">
                      <Input
                        type="text"
                        className="comment_input"
                        placeholder="Write your comment"
                        {...field}
                      />
                      <img
                        src="assets/icons/email.png"
                        alt="location"
                        className="w-6 h-6 cursor-pointer"
                        onClick={handleImageClick}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  );
};

export default PostCard;
