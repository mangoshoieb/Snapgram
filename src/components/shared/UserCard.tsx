import { Models } from "appwrite";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

type UserCardProps = {
  user: Models.Document;
  isAll: boolean;
};

const UserCard = ({ user: currentUser, isAll }: UserCardProps) => {
  return (
    <Link to={`/profile/${currentUser?.$id}`} className="user-card">
      <img
        src={currentUser?.imageUrl || "/assets/icons/profile-placeholder.svg"}
        alt="creator"
        className={`${
          isAll ? "rounded-full w-20 lg:h-20" : "rounded-full w-14 lg:h-14"
        }`}
      />
      <div className="flex-center flex-col gap-1">
        <p
          className={`${
            isAll
              ? "font-bold text-[25px]"
              : "base-medium text-light-1 text-center line-clamp-1"
          }`}
        >
          {currentUser.name}
        </p>
        <p
          className={`${
            isAll
              ? "font-semigbold text-[20px] text-light-3"
              : "small-regular text-light-3 text-center line-clamp-1"
          }`}
        >
          @{currentUser.username}
        </p>
      </div>
      <Button
        type="button"
        size="sm"
        className={`${
          isAll
            ? "shad-button_primary p-6 px-12 font-semibold text-xl"
            : "shad-button_primary px-5 font-semibold"
        }`}
      >
        Follow
      </Button>
    </Link>
  );
};

export default UserCard;
