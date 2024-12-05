import { useUserContext } from "@/context/AuthContext";
import { multiFormatDateString } from "@/lib/utils";
import { Models } from "appwrite";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";
type PostCardProps = {
  post: Models.Document;
  action?:'create' | 'update',
};
const PostCard = ({ post,action }: PostCardProps) => {
    const {user} = useUserContext();
    if(!post.creator) return;
    console.log(action)
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
        <Link to={`/edit-post/${post.$id}`} className={`${user.id !== post.creator.$id && "hidden"}`}>
        <img src="/assets/icons/edit.svg" alt="edit" width={20} height={20}/>
        </Link>
      </div>
      <Link to={`posts/${post.$id}`}>
      <div className="small-medium lg:base-medium py-5">
        <p>{post.caption}</p>
        <ul className="flex gap-3 mt-2">
        {post.tags.map((tag:string)=>(
            <li key={tag} className="text-light-3">
                #{tag}
            </li>
        ))}
        </ul>
      </div>
      <img src={post.imageUrl||'/assets/icons/profile-placeholder.svg'} alt="image" className="post-card_img " />
      </Link>
      <PostStats post={post} userId={user.id}/>
    </div>
  );
};

export default PostCard;
