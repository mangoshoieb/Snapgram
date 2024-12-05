import { Models } from "appwrite"
import Loader from "./Loader"
import GridPostList from "./GridPostList"

type SearchResultProps ={
  isSearchFetching:boolean,
  searchedPosts?:Models.Document[],
}
const SearchResult = ({isSearchFetching,searchedPosts}:SearchResultProps) => {
  if(isSearchFetching) return <Loader/>
  console.log(searchedPosts)
  if(searchedPosts && searchedPosts.length >0){
    return<GridPostList posts={searchedPosts}/>
  }
  return (
    
    <p className="w-full flex-center text-light-4 mt-10">No result found</p>
  )
}

export default SearchResult