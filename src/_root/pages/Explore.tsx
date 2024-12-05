import {
  useGetPosts,
  useSearchPosts,
} from "@/components/react-query/queriesAndMutations";
import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import SearchResult from "@/components/shared/SearchResult";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const Explore = () => {
  const {ref,inView}= useInView();
  const [searchValue, setSearchValue] = useState("");
  // const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();
  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();
  const debouncedResult = useDebounce(searchValue, 500);
  const { data: searchedPosts, isFetching: isSearchFetching } =
    useSearchPosts(debouncedResult);
  useEffect(() => {
  if(inView && !searchValue) fetchNextPage()
  }, [inView,searchValue])
  

  if (!posts) {
    return (
      <div className="w-full h-full flex-center">
        <Loader />
      </div>
    );
  }
  const shouldShowSearchResult = searchValue !== "";
  const shouldShowPosts =
    !shouldShowSearchResult &&
    posts.pages.every((item) => item.documents.length === 0);
  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>
        <div className="flex gap-1 w-full rounded-lg bg-dark-4 px-4">
          <img
            src="assets/icons/search.svg"
            width={24}
            height={24}
            alt="search"
          />
          <Input
            type="text"
            placeholder="Search"
            className="explore-search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-between mt-16 mb-7 w-full max-w-5xl">
        <h2 className="md:h3-bold body-bold">Poupler today</h2>
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
        {shouldShowSearchResult ? (
          <SearchResult searchedPosts={searchedPosts?.documents} isSearchFetching={isSearchFetching}/>
        ) : shouldShowPosts ? (
          <p className="mt-10 text-center w-full text-light-4">End of posts</p>
        ) : (
          posts.pages.map((item, index) => (
            <GridPostList key={`page-${index}`} posts={item.documents} />
          ))
        )}
      </div>
      {hasNextPage && !searchValue &&(
        <div className="mt-10 mb-5" ref={ref} >
          <Loader/>
        </div>
      )}
    </div>
  );
};

export default Explore;
