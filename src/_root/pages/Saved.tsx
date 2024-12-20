import {
  useGetCurrentUser,
  useGetPosts,
} from "@/components/react-query/queriesAndMutations";
import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { Models } from "appwrite";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const Saved = () => {
  const { ref, inView } = useInView();
  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();
  const { data: user } = useGetCurrentUser();
  const savePosts = user?.save
    .map((savePost: Models.Document) => ({
      ...savePost.post,
      creator: {
        imageUrl: user.imageUrl,
      },
    }))
    .reverse();
  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);
  if (!posts) {
    return (
      <div className="w-full h-full flex-center">
        <Loader />
      </div>
    );
  }
  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <div className="flex-start gap-3 justify-start max-w-5xl w-full ">
          <img src="assets/icons/save.svg" width={36} height={36} alt="save" />
          <h2 className="h3-bold md:h2-bold text-left w-full">Saved Post</h2>
        </div>
      </div>
      <div className="flex-between mt-16 mb-7 w-full max-w-5xl">
        <h2 className="md:h3-bold body-bold">Posts</h2>
        <div className=" flex-center gap-3 rounded-xl bg-dark-3 px-4 py-2 cursor-pointer">
          <p className="small-meduim md:base-meduim text-light-2">All</p>
          <img
            src="assets/icons/filter.svg"
            width={20}
            height={20}
            alt="filter"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {!user ? (
          <Loader />
        ) : (
          <ul className="w-full flex justify-center max-w-5xl gap-9">
            {savePosts.length === 0 ? (
              <p className="text-light-4">No available posts</p>
            ) : (
              <GridPostList
                posts={savePosts}
                key={savePosts.$id}
                showStats={false}
                showUser={false}
              />
            )}
          </ul>
        )}
      </div>
      {hasNextPage && (
        <div className="mt-10 mb-5" ref={ref}>
          <Loader />
        </div>
      )}
    </div>
  );
};
export default Saved;
