import PostForm from "@/components/forms/PostForm"
import { useGetPostById } from "@/components/react-query/queriesAndMutations";
import Loader from "@/components/shared/Loader";
import { useParams } from "react-router-dom"

const EditPosts = () => {
  const {id} = useParams();
  const { data:post ,isPending}= useGetPostById(id || '');
  if(isPending) return <Loader/>
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="flex-start gap-3 justify-start max-w-5xl w-full ">
          <img
          src="/assets/icons/add-post.svg"
          width={36}
          height={36}
          alt="edit"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit Post</h2>
        </div>
        <PostForm action="Update" post={post}/>
      </div>
    </div>
  )
}

export default EditPosts