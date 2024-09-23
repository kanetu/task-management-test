import { useQuery } from "@tanstack/react-query";
import UserInfoForm from "./components/UserInfoForm";

const Profile = () => {
  const useUsersQuery = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await fetch("/getUser", {
        method: "GET",
      });
      return res.json();
    },
    staleTime: 5000,
  });

  const { data, status, isFetching, isLoading } = useUsersQuery;

  console.log(
    `isFetching: ${isFetching} | isLoading: ${isLoading} | status: ${status}`
  );
  console.log(`----${JSON.stringify(data)}`);

  return (
    <div>
      <UserInfoForm></UserInfoForm>
    </div>
  );
};

export default Profile;
