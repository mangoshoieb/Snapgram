import { useGetUsers } from "@/components/react-query/queriesAndMutations";
import UserCard from "@/components/shared/UserCard";
import { Loader } from "lucide-react";

const AllUsers = () => {
  const { data: creators, isPending: isLoading } = useGetUsers(12);
  const alluser=true;
  return (
    <div className="common-container">
      <div className="user-container">
        <div className="flex-start gap-3 justify-start max-w-5xl w-full ">
          <img src="assets/icons/people.svg" width={36} height={36} alt="people" />
          <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>
        </div>
        {isLoading && !creators ? (
          <Loader />
        ) : (
          <ul className="user-grid">
            {creators?.documents.map((creator) => (
              <li key={creator?.$id} className="flex-1 min-w-[200px] w-full  ">
                <UserCard user={creator} isAll={alluser}/>
              </li>
            ))}
          </ul>
        )}
        </div>
      </div>

  );
};

export default AllUsers;
