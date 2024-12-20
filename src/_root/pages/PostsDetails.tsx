import { useParams, Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import PostStats from "@/components/shared/PostStats";
import {
  useGetPostById,
  useGetUserPosts,
  useDeletePost,
  useDeleteComment,
} from "@/components/react-query/queriesAndMutations";

import { multiFormatDateString } from "@/lib/utils";
import { useUserContext } from "@/context/AuthContext";
import Loader from "@/components/shared/Loader";
import { Models } from "appwrite";
import GridPostList from "@/components/shared/GridPostList";

const PostDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUserContext();

  const { data: post, isLoading } = useGetPostById(id);
  console.log(post?.comments);
  console.log(post?.tags);
  const { data: userPosts, isLoading: isUserPostLoading } = useGetUserPosts(
    post?.creator.$id
  );
  const { mutate: deletePost } = useDeletePost();
  const { mutate: deleteComment } = useDeleteComment();
  const relatedPosts = userPosts?.documents.filter(
    (userPost) => userPost.$id !== id
  );

  const handleDeletePost = () => {
    deletePost({ postId: id, imageId: post?.imageId });
    navigate(-1);
  };
  const handleDeleteComment = (commentId?:string) => {
    deleteComment({ commentId: commentId });
    navigate(-1);
  };
  return (
    <div className="post_details-container">
      <div className="hidden md:flex max-w-5xl w-full">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="shad-button_ghost"
        >
          <img
            src={"/assets/icons/back.svg"}
            alt="back"
            width={24}
            height={24}
          />
          <p className="small-medium lg:base-medium">Back</p>
        </Button>
      </div>

      {isLoading || !post ? (
        <Loader />
      ) : (
        <div className="post_details-card">
          <img
            src={post?.imageUrl}
            alt="creator"
            className="post_details-img"
          />

          <div className="post_details-info">
            <div className="flex-between w-full">
              <Link
                to={`/profile/${post?.creator.$id}`}
                className="flex items-center gap-3"
              >
                <img
                  src={
                    post?.creator.imageUrl ||
                    "/assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                  className="w-8 h-8 lg:w-12 lg:h-12 rounded-full"
                />
                <div className="flex gap-1 flex-col">
                  <p className="base-medium lg:body-bold text-light-1">
                    {post?.creator.name}
                  </p>
                  <div className="flex-center gap-2 text-light-3">
                    <p className="subtle-semibold lg:small-regular ">
                      {multiFormatDateString(post?.$createdAt)}
                    </p>
                    •
                    <p className="subtle-semibold lg:small-regular">
                      {post?.location}
                    </p>
                  </div>
                </div>
              </Link>

              <div className="flex-center gap-4">
                <Link
                  to={`/edit-post/${post?.$id}`}
                  className={`${user.id !== post?.creator.$id && "hidden"}`}
                >
                  <img
                    src={"/assets/icons/edit.svg"}
                    alt="edit"
                    width={24}
                    height={24}
                  />
                </Link>

                <Button
                  onClick={handleDeletePost}
                  variant="ghost"
                  className={`ost_details-delete_btn ${
                    user.id !== post?.creator.$id && "hidden"
                  }`}
                >
                  <img
                    src={"/assets/icons/delete.svg"}
                    alt="delete"
                    width={24}
                    height={24}
                  />
                </Button>
              </div>
            </div>

            <hr className="border w-full border-dark-4/80" />

            <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
              <p>{post?.caption}</p>
              <ul className="flex gap-1 mt-2 overflow-hidden">
                {post?.tags.map((tag: string, index: string) => (
                  <li
                    key={`${tag}${index}`}
                    className="text-light-3 small-regular"
                  >
                    #{tag}
                  </li>
                ))}
              </ul>
              <ul className="flex flex-col gap-2 mt-3 overflow-scroll custom-scrollbar max-w-xl max-h-60">
                {post?.comments.map((comment: Models.Document) => (
                  <li key={comment.$id} className="flex flex-col gap-1 ">
                    <div className="flex justify-between">
                      <div className="flex gap-3 items-center">
                        <Link to={`/profile/${post.creator.$id}`}>
                          <img
                            src={
                              comment.users?.imageUrl ||
                              "/assets/icons/profile-placeholder.svg"
                            }
                            alt="creator"
                            className="rounded-full w-12 lg:h-12"
                          />
                        </Link>
                            
                        <div className="flex flex-col">
                          <p className="body-medium  text-light-1">
                            {comment.users?.name}
                          </p>
                          <div className="flex items-center text-light-3 gap-2">
                            <p className="lg:small-regular subtle-semibold">
                              {multiFormatDateString(comment.$createdAt)}
                            </p>
                            -
                            <p className="lg:small-regular  subtle-semibold">
                              {post.location}
                            </p>
                          </div>
                        </div>
                      </div>
                      <Button
                        onClick={()=>handleDeleteComment(comment.$id)}
                        variant="ghost"
                        className={`ost_details-delete_btn ${
                          user.id == post?.creator.$id||user.id == comment?.users.$id ?"block": "hidden"
                        }`}
                      >
                        <img
                          src={"/assets/icons/delete.svg"}
                          alt="delete"
                          width={24}
                          height={24}
                        />
                      </Button>
                    </div>
                    <div className="text-[15px] font-semibold my-2 pl-10">
                      {comment.text}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full">
              <PostStats post={post} userId={user.id} />
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-5xl">
        <hr className="border w-full border-dark-4/80" />

        <h3 className="body-bold md:h3-bold w-full my-10">
          More Related Posts
        </h3>
        {isUserPostLoading || !relatedPosts ? (
          <Loader />
        ) : (
          <GridPostList posts={relatedPosts} />
        )}
      </div>
    </div>
  );
};

export default PostDetails;
