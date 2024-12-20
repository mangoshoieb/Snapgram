import { useGetUserById } from "@/components/react-query/queriesAndMutations";
import GridPostList from "@/components/shared/GridPostList"
import Loader from "@/components/shared/Loader";


type LikedPostsProps ={
  currentUserId : string|number,
}
const LikedPosts = ({currentUserId}:LikedPostsProps) => {
  const { data: currentUser } = useGetUserById(currentUserId.toString());
  if (!currentUser)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
    console.log(currentUser)
  return (
    <div>
      <GridPostList posts={currentUser.liked} showUser={false} showStats={false} />
    </div>
  )
}

export default LikedPosts