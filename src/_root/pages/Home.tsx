import {
  useGetRecentPosts,
  useGetUsers,
} from "@/components/react-query/queriesAndMutations";
import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";
import UserCard from "@/components/shared/UserCard";
import { useUserContext } from "@/context/AuthContext";
import { Models } from "appwrite";

const Home = () => {
  const {user}= useUserContext()
  const { data: posts, isPending: isPostLoading } = useGetRecentPosts();
  const { data: creators, isPending: isCreatorLoading } = useGetUsers(6);
  return (
    <div className="flex flex-1 w-full">
      <div className="home-container">
        <div className="home-posts">
          <h3 className="h3-bold md:h2-bold text-left w-full">Home Feed</h3>
          {isPostLoading && !posts ? (
            <Loader />
          ) : (
            <ul className="flex flex-col items-center justify-center gap-9 w-full">
              {posts?.documents.map((post: Models.Document) => (
                <li className="w-full m-0">
                  <PostCard post={post} key={post.caption} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="home-creators">
        <h3 className="h3-bold md:h2-bold text-left w-full">Top Creators</h3>
        {isCreatorLoading && !creators ? (
          <Loader />
        ) : (
          <ul className="grid xl:grid-cols-2 gap-6">
            
            {creators?.documents.filter((creator) => creator.$id !== user.id).map((creator) => 
            (
              <li key={creator.$id}>
                <UserCard  user={creator} isAll={false}/>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
